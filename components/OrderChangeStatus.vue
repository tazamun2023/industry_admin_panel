<template>
  <div class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <toast-message v-if="hasError" :is-error="hasError"
                   :message="$t('error.has error sorry please select data reject')"/>
    <div class="z-50 bg-white p-6 relative rounded-md shadow sm:w-5/6 md:w-3/6 lg:w-2/6">
      <svg @click="closeModal" class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]"
           aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
      <div class="p-2">
        <h4 class="font-bold">{{ $t('changeStatus.title') }}
          {{ $t('changeStatus.from_status.' + selectedOrders[0]?.status) }}</h4>
        <p class="text-xs">{{ $t('changeStatus.confirmation') }}</p>
      </div>
      <div class="card p-4">
        <div class="flex justify-between border-b pb-4 border-smooth gap-4">
          <div>
            <p>{{ $t('orderReject.order') }}</p>
            <p class="text-xs">{{ selectedOrders[0]?.order_id }}</p>
          </div>
          <div>
            <p>{{ $t('orderReject.orderPlaced') }}</p>
            <p class="text-xs">{{ selectedOrders[0]?.order_placed }}</p>
          </div>

        </div>
        <div v-if="selectedOrders[0]?.status=='out_for_delivery'"
             class="flex justify-between border-b pb-4 border-smooth gap-4">
          <div>
            <p class="mb-2">{{ $t('changeStatus.add_file') }}</p>

            <vue-upload-images
              :old_images="[]"
              :max-files="1"
              @updateInput="saveAttachment">

            </vue-upload-images>

          </div>
        </div>

        <div class="w-full px-2 py-4 ">
          <div class="flex justify-between gap-4 items-end p-1 text-end  ltr:right-[40px] rtl:left-[40px]">
            <button @click="closeModal" class="bg-smooth px-4 w-[100px] text-error p-3 rounded leading-3">
              {{ $t('orderReject.cancel') }}
            </button>
            <ajax-button
              name="save"
              class="bg-primary px-4 w-[100px] text-white p-3 rounded leading-3"
              type="button"
              :text="$t('setting.sv')"
              @click="save"
              @clicked="save"
              :fetching-data="saveSata"
            />

            <!--            <button  class="bg-primary px-4 w-[100px] text-white p-3 rounded leading-3">-->
            <!--              {{ $t('orderReject.save') }}-->
            <!--            </button>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ToastMessage from "./ToastMessage.vue";
import AjaxButton from "./AjaxButton.vue";
import VueUploadImages from "./product/uploadImages.vue";

export default {
  components: {VueUploadImages, AjaxButton, ToastMessage},
  props: ['selectedOrders', 'saveSata'],
  data() {
    return {
      hasError: false,
      files: []
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    saveAttachment(images) {
      this.files = images
    },
    save() {

      this.saveSata = true
      let current_status = this.selectedOrders[0].status;
      let status = "";


      if (current_status === "approved")
        status = "ready_to_ship"
      else if (current_status === "ready_to_ship")
        status = "out_for_delivery"
      else if (current_status === "out_for_delivery")
        status = "delivered"
      let data = {
        status: status,
        files: this.files,
        order_id: this.selectedOrders[0]?.order_id,
      }
      this.$emit('save', data)
    }


  }
}
</script>
