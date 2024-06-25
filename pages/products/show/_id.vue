<template>
  <div v-if="$can('approve_products') || $can('manage_products') ">
    <div class="tab-sidebar">
      <div class="col-md-12 p-4 title">
        <h4 v-if="id">{{ $t('prod.edit_product') }}</h4>
        <p>{{ $t('prod.Fill out the form below to add a new product to your product list') }}</p>
      </div>
      <AddProduct :is_show="true" :id="id">

        <template v-slot:actions>
          <div class="button-group border-t border-smooth mt-20">
            <div class="flex justify-end gap-4 pt-3">
              <button type="button" @click.prevent="doApproved()"
                      class="btn mb-10 w-25 bg-primary">
                {{ $t('prod.Approved') }}
              </button>
              <button type="button" @click.prevent="isRejected()"
                      class="btn mb-10 w-25 bg-error">
                {{ $t('prod.Rejected') }}
              </button>
            </div>
          </div>
        </template>
      </AddProduct>


    </div>
    <reject-reason
      v-if="is_reject_modal"
      :show-modal="is_reject_modal"
      :get-api="'RejectReasonsProduct'"
      :has_others="false"
      :is-radio="false"
      :title="$t('prod.Rejected')"
      :set-api="'setRejectProduct'"
      :set-id="parseInt(id)"
      type="BankPayment"
      @close="closeRejectModal"
    ></reject-reason>
  </div>
</template>

<script>

import AddProduct from "../../../components/variant/AddProduct.vue";
import util from '~/mixin/util'
import {mapActions} from "vuex";

export default {
  name: "ShowProductPage",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      param: {
        "type": 'Products'
      },
      modalVisible: false,
      setRejectApi: 'setRejectProduct',
      setApprovedProduct: 'setApprovedProduct',
      routeName: 'products',
      is_reject_modal: false,
      is_next: false,
      result: null,
      variant: null,
    }
  },
  mixins: [util],
  components: {
    AddProduct,
  },
  computed: {
    id() {
      return this.$route?.params?.id
    },
  },
  methods: {
    closeModal() {
      this.modalVisible = false;
    },
    closeRejectModal() {
      this.is_reject_modal = false;
    },
    async doRejected() {
      try {
        const atLeastOneSelected = this.rejected.reject_reasons.length > 0;

        if (atLeastOneSelected) {
          const confirmation = await this.$swal({
            title: "Are you sure?",
            icon: "question",
            iconHtml: "؟",
            confirmButtonText: "Yes",
            cancelButtonText: "Noا",
            showCancelButton: true,
            showCloseButton: true,
          });

          if (confirmation) {
            const data = await this.setRequest({
              params: this.rejected,
              api: this.setRejectApi,
            });


            if (data) {
              this.is_reject_modal = false;
              this.modalVisible = false;

              const pathSuffix = this.redirect ? '' : `/show/${this.id}`;
              this.$router.push({path: `/${this.routeName}${pathSuffix}`});
            }
          }
        } else {
          // Show an error message or handle the validation failure appropriately
          // For example:
          this.$swal({
            title: "Error",
            text: "Please select at least one reason.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error in doRejected:", error);
        // Handle error (e.g., show an error message)
      }
    },
    isRejectedTest() {
      this.is_reject_modal_test = !this.is_reject_modal_test
    },
    isRejected() {
      this.is_reject_modal = !this.is_reject_modal;
    },
    async doApproved() {
      const confirmation = await this.$swal({
        title: "Are you sure?",
        icon: "question",
        iconHtml: "؟",
        confirmButtonText: "Yes",
        cancelButtonText: "Noا",
        showCancelButton: true,
        showCloseButton: true,
      });

      if (confirmation.value) {
        const data = await this.setRequest({
          params: {id: this.id},
          api: this.setApprovedProduct,
        });

        if (data) {
          this.is_reject_modal = false;
          this.modalVisible = false;

          this.$router.push({path: `/${this.routeName}/approved`})
        }
      }
    },
    ...mapActions('common', ['setRequest'])

  }

}
</script>
