<template>
  <div  class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <toast-message v-if="hasError" :is-error="hasError"
                   :message="$t('error.has error sorry please select data reject')"/>
    <div class="z-50 bg-white p-6 relative rounded-md shadow w-2/6">
      <svg @click="closeModal" class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]"
           aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
      <div class="p-2">
        <h4 class="font-bold">{{ $t('orderReject.title') }} #{{ selectedOrders[0]?.order_id }}</h4>
        <p class="text-xs">{{ $t('orderReject.confirmation') }}</p>
      </div>
      <div class="card p-4">
        <div class="flex border-b pb-4 border-smooth gap-4">
          <div>
            <p>{{ $t('orderReject.order') }}</p>
            <p class="text-xs">{{ selectedOrders[0]?.order_id }}</p>
          </div>
          <div>
            <p>{{ $t('orderReject.orderPlaced') }}</p>
            <p class="text-xs">{{ selectedOrders[0]?.order_placed }}</p>
          </div>
        </div>
        <div class="py-4">
          <label class="block py-2" for="">{{ $t('orderReject.selectRejectionReason') }}</label>
          <select class="p-4 w-full border border-smooth rounded" v-model="RejectionSelected">
            <option :value="item.id" v-for="(item, index) in reasonsRejection" :key="index">
              {{ item.description }}
            </option>
          </select>
        </div>
        <div class="w-full px-2 py-4 ">
          <div class="items-end p-1 text-end  ltr:right-[40px] rtl:left-[40px]">
            <button @click="closeModal" class="bg-smooth px-4 w-[100px] text-error p-3 rounded leading-3">{{ $t('orderReject.cancel') }}
            </button>
            <button @click="save" class="bg-primary px-4 w-[100px] text-white p-3 rounded leading-3">{{ $t('orderReject.save') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ToastMessage from "./ToastMessage.vue";

export default {
  components: {ToastMessage},
  props: ['selectedOrders','reasonsRejection'],
  data() {
    return {
      RejectionSelected: "",

      hasError: false,
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    save() {
      if (this.RejectionSelected === "") {
        this.hasError = true;
      } else {
        this.hasError= false;
        let data = {
          status: "reject",
          order_id: this.selectedOrders[0]?.order_id,
          reject_reasons: this.RejectionSelected
        }
        this.$emit('save', data)
      }

    }
  }
}
</script>
