<script>
import ListPage from "@/components/partials/ListPage.vue";
import customer from "@/mixin/customer";
import {mapGetters} from "vuex";
import EditButtonIcon from "@/components/partials/EditButtonIcon.vue";
import DeleteButtonIcon from "@/components/partials/DeleteButtonIcon.vue";

export default {
  name: 'CustomerPayment',
  components: {DeleteButtonIcon, EditButtonIcon, ListPage},
  middleware: ['common-middleware', 'auth'],
  mixins: [customer],
  props: {
    customer_id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      param: {
        "customer_id": this.customer_id
      },
      deleteModal: false,

    }
  },

  computed: {
    ...mapGetters('language', ['langCode'])
  },

  methods: {
    openDeleteModal() {
        this.deleteModal = true
    },
    closeModal() {
      this.deleteModal = false
    }

  }

}
</script>

<template>
  <div>
    <list-page
      :filter="false"
      ref="listPage"
      list-api="getCustomerPaymentCard"
      delete-api="adminDeleteCard"
      route-name="vendors"
      :param="param"
      empty-store-variable="allCustomerPaymentCard"
      :name="$t('title.prod')"
      @list="itemList = $event"
    >
      <template v-slot:table="{list}">
        <table>
          <thead>
          <tr>
<!--            <th>{{ $t('customer.Bank Name / Card Name') }}</th>-->
            <th>{{ $t('customer.Account / Holder name') }}</th>
            <th>{{ $t('customer.A / C / Card Number') }}</th>
           <th>{{ $t('customer.Type') }}</th>
            <th>{{ $t('global.action') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(value, index) in list" :key="index">
            <td>{{ value.holder_name }}</td>
            <td>{{ value.card_no }}</td>
            <td>{{ value.card_type }}</td>
              <td>
                <button
                  v-if="$can('manage_content')"
                  @click="openDeleteModal(value.id)" class="border-0">
                  <delete-button-icon/>
                </button>
            </td>
            <DeleteModal v-if="deleteModal" @closeModal="closeModal">
              <template v-slot:title>
                <h4>{{ $t('vendor.deletemessage') }}</h4>
              </template>
              <!-- -----------default slot------- -->
              <!-- -----------default slot------- -->
              <template v-slot:buttons>
                <div class="flex gap-4 pt-4 justify-end">
                  <button @click="deleteModal=false" class="p-2 border border-smooth rounded leading-3 ">
                    {{ $t('address.cancel') }}
                  </button>
                  <button @click="$refs.listPage.deleteItemWithModal(value.id), deleteModal=false"
                          class="p-2 border border-smooth bg-primary text-white  rounded leading-3 hover:text-primary">
                    {{ $t('category.delete') }}
                  </button>
                </div>
              </template>
            </DeleteModal>
          </tr>

          </tbody>
        </table>
      </template>
    </list-page>
  </div>
</template>

<style scoped>

</style>
