<script>
import {mapActions, mapGetters} from "vuex";
import Service from "@/services/service";
import CustomeModal from "./CustomeModal.vue";

export default {
  name: 'RejectReason',
  components: {CustomeModal},
  props: {
    setId: {
      type: Number,
      required: true,
      default: ''
    },
    showModal: {
      type: Boolean,
      default: false
    },
    setApi: {
      type: String,
      required: true,
      default: ''
    },
    getApi: {
      type: String,
      required: true,
      default: ''
    },
    type: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    isRadio: {
      type: Boolean,
      default: true
    },
    has_others: {
      type: Boolean,
      default: true
    },
    close: {
      type: Boolean,
      default() {
        return false
      }
    },
  },
  data() {
    return {
      setRejectApi: 'setRejectProduct',
      loading: false,
      allRejectReasons: [],
      rejected: {
        status: 'rejected',
        id: this.setId,
        others: "",
        reject_reasons: []
      },
    }
  },

  computed: {
    ...mapGetters('reject-reasons', ['reject_reasons_types']),
    // ...mapGetters('rfq', ['allRfqRejectReason'])
  },


  methods: {
    closeModal() {
      this.$emit('close');
    },
    async doRejected() {
      try {

        var atLeastOneSelected = this.rejected.reject_reasons.length > 0;


        if ((this.isRadio === false && atLeastOneSelected) || (this.isRadio && atLeastOneSelected !== "")) {
          if (this.rejected.others.length < 10 && ((this.isRadio && this.rejected.reject_reasons === 'other') || (!this.isRadio && this.rejected.reject_reasons.includes('other')))) {
            this.$swal({
              title: "Error",
              text: "Please write at least 10 characters.",
              icon: "error",
            });
            return;
          }

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
              api: this.setApi,
            });
            // const {data} = await this.getRequest({params: {...this.param}, api: this.getApi });
            console.log('data', data)
            if (data) {
              this.$emit('update', data)
              this.$emit('close');

              if (this.setApi === 'setRejectProduct') {
                return this.$router.push({path: `/products`});
              }
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
    ...mapActions('reject-reasons', ['getRejectReasons',]),
    ...mapActions('common', ['setRequest', 'getRequest']),
    // ...mapActions('rfq', [ 'getAllRfqRejectReason']),
    ...mapGetters('language', ['langCode', 'currentLanguage', 'languages']),
  },
  async mounted() {
    if (this.reject_reasons_types == null || this.reject_reasons_types[this.type].length === 0)
      await this.getRejectReasons({type: this.type})
    // try {
    //   await this.fetchingData()
    // } catch (e) {
    //   return this.$nuxt.error(e)
    // }

  }
}
</script>

<template>
  <custome-modal
    :title="` ${title }  `"
    :show-modal="showModal"
    @close="closeModal"
    size="lg">
    <div class="mx-2 min-h-64" v-if="reject_reasons_types && reject_reasons_types!=undefined">
      <div class="  w-full" v-for="(group, index) in reject_reasons_types[this.type]" :key="index">
        <div class="my-2">
          <span class="font-medium" v-if="group.group !== group.type">{{ group.group_name }}</span>
          <div class="mx-3">
            <div v-for="item in group.reasons">
              <div class="flex my-1">
                <input class="min-w-5 mx-2" :type="isRadio?'radio':'checkbox'" v-model="rejected.reject_reasons"
                       :value="item.id">
                <label>{{ item.description }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class=" my-1 mx-3">
        <div v-if="has_others" class="flex my-1">

          <input class="min-w-5 mx-2" :type="isRadio?'radio':'checkbox'" v-model="rejected.reject_reasons"
                 value="other">
          <label>{{ $t('roles.Other') }}</label>
        </div>

        <textarea class="mx-5 my-2" v-if="rejected.reject_reasons=='other'" v-model="rejected.others"> </textarea>

      </div>
    </div>
    <template v-slot:buttons>
      <button class="bg-primary leading-3 hover:text-primary text-white px-4 py-2 rounded-md mr-2"
              @click.prevent="doRejected()">Submit
      </button>
    </template>
  </custome-modal>
</template>

<style scoped>

</style>
