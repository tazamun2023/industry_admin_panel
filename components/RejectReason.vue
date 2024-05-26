<script>
import {mapActions, mapGetters} from "vuex";
import Service from "@/services/service";

export default {
  name: 'RejectReason',
  props: {
    setId: {
      type: Number,
      required: true,
      default: ''
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
    param: {
      type: Object,
      required: true
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
        reject_reasons: []
      },
    }
  },

  computed: {
    // ...mapGetters('common', ['allRejectReasons']),
    // ...mapGetters('rfq', ['allRfqRejectReason'])
  },


  methods: {
    closeModal() {
      this.$emit('close');
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
              api: this.setApi,
            });
            // const {data} = await this.getRequest({params: {...this.param}, api: this.getApi });
            if (data.status==='rejected') {

              this.$emit('update',data.status)
              this.$emit('close');

              if (this.setApi==='setRejectProduct'){
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


    async fetchingData() {
      try {
        this.loading = true;
        let {data} = await this.getRequest({ params: { ...this.param }, api: this.getApi });
        this.allRejectReasons = data;
      } catch (error) {
        this.$nuxt.error(error);
      } finally {
        this.loading = false;
      }
    },

    ...mapActions('common', ['setRequest', 'getRequest']),
    // ...mapActions('rfq', [ 'getAllRfqRejectReason']),
    ...mapGetters('language', ['langCode', 'currentLanguage', 'languages']),
  },
  async mounted() {

    try {
      await this.fetchingData()
    } catch (e) {
      return this.$nuxt.error(e)
    }

  }
}
</script>

<template>
  <div>
    <div class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-[700px]">
        <svg @click="closeModal"
             class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]"
             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <div class="flex h-[400px] overflow-y-scroll flex-wrap">
          <div class="p-2 w-100 w-full" v-for="(item, index) in allRejectReasons" :key="index">
            <div class="p-2 rounded  h-full items-center">
              <input type="checkbox" v-model="rejected.reject_reasons" :value="item.id">
              <span class="font-medium">{{ item.name }}</span>
              <textarea
                class="resize-none border rounded-md mt-2 p-2 focus:outline-none focus:ring focus:border-blue-500"
                rows="4"
                readonly
                v-model="item.description"
                :placeholder="item.description"
              ></textarea>

            </div>
          </div>
          <div class="flex justify-center items-center h-full" v-if="loading">
            <spinner />
          </div>
        </div>
        <button class="bg-primary leading-3 hover:text-primary text-white px-4 py-2 rounded-md mr-2"
                @click.prevent="doRejected()">Submit
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
