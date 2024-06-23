<template>
  <div class="lg:grid grid-cols-2 gap-4 my-4">
    <div class="relative my-2">
      <div class="p-4 bg-whitelight shodow rounded-[16px] border border-theemlight">
        <h4 class="font-bold text-[18px] text-theem">{{ $t('orderDetails.ShippingAddress') }}</h4>
        <p class="text-[14px] font-bold capitalize">{{ orderDetails.shipping_address?.name }}</p>
        <p class="flex items-center gap-4"><img class="h-4 w-4" src="~/assets/icon/phone.svg" alt="">{{
            orderDetails.shipping_address?.phone
          }}</p>
      </div>
    </div>
    <div class="relative my-2">
      <div class="p-4 bg-whitelight shodow rounded-[16px] border border-theemlight">
        <h4 class="font-bold text-[18px] text-theem">{{ $t('orderDetails.BillingAddress') }}</h4>
        <p class="text-[14px] font-bold capitalize">{{ orderDetails.billing_address?.name }}</p>
        <p class="flex items-center gap-4"><img class="h-4 w-4" src="~/assets/icon/phone.svg" alt="">{{
            orderDetails.billing_address?.phone
          }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import util from '~/mixin/util'

export default {
  props: {
    orderDetails: {
      type: Object,
      default() {
        return {}
      }
    },


  },
  mixins: [util],

}
</script>
