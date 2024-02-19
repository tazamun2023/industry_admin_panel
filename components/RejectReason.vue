<script>
import {mapActions, mapGetters} from "vuex";
import Service from "@/services/service";

export default {
  name: 'RejectReason',
  props: {
    type: {
      type: String,
      default() {
        return null
      }
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
      rejected: {
        status: 'rejected',
        product_id: !this.isAdding ? this.$route?.params?.id : '',
        reject_reasons: []
      },
    }
  },

  computed: {
    ...mapGetters('common', ['allRejectReasons']),
    ...mapGetters('rfq', ['allRfqRejectReason'])
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
              api: this.setRejectApi,
            });


            if (data) {
              this.$emit('close');
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


    ...mapActions('common', ['setRequest', 'getRequest']),
    ...mapActions('rfq', [ 'getAllRfqRejectReason']),
  },
  async mounted() {

    try {
      await this.getAllRfqRejectReason()
    } catch (e) {
      return this.$nuxt.error(e)
    }

  }
}
</script>

<template>
  <div>
    <div class="fixed bg-modal  inset-0 z-50 flex items-center justify-center" v-if="type==='product'">
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
        </div>
        <button class="bg-primary leading-3 hover:text-primary text-white px-4 py-2 rounded-md mr-2"
                @click.prevent="doRejected()">Submit
        </button>
      </div>
    </div>
    <div class="fixed bg-modal  inset-0 z-50 flex items-center justify-center" v-else>
      <div class="absolute inset-0 bg-black opacity-50"></div>

      <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-1/4">
        <svg @click="closeModal"
             class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]"
             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <div class="p-2">
          <h4 class="font-bold">Reject Order #572168327328</h4>
          <p class="text-xs">You are about to reject following order. Please select rejection reason.</p>
        </div>
        <div class="card p-4">
          <div class="flex border-b pb-2 border-smooth gap-4">
            <div>
              <p>Order</p>
              <p class="text-xs">T298479387r439</p>
            </div>
            <div>
              <p>Order Placed</p>
              <p class="text-xs">03 Aug 23</p>
            </div>
          </div>
          <div class="py-2">
            <label for="">Select rejection reason</label>
            <select class="p-2 border border-smooth rounded">
              <option value="">Please Select</option>
              <option value="">Out of Stock</option>
              <option value="">Product Near Expiry</option>
              <option value="">Pricing Error</option>
              <option value="">No Document for Internation Shipping</option>
            </select>
          </div>
          <div class="w-full p-2 ">
            <div class="items-end p-1 text-end  ltr:right-[40px] rtl:left-[40px]">
              <button @click="closeModal" class="bg-smooth px-4 w-[100px] text-primary p-3 rounded leading-3">Cancel
              </button>
              <button class="bg-primary px-4 w-[100px] text-white p-3 rounded leading-3">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
