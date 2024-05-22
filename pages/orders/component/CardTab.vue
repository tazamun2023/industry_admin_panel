<template>
  <div class="flex gap-4 justify-between max-w-screen-md">
    <div>
      <p>{{ $t('order.orderId') }}: </p>
      <p class="font-bold">{{ order?.order_id }}</p>
    </div>
    <div>
      <p>{{ $t('order.orderPlaced') }}:</p>
      <p class="font-bold text-nowrap">{{ order?.order_placed }}</p>
    </div>
    <div>
      <p>{{ $t('orderDetails.type') }}</p>
      <p class="">
        {{ order?.type?.name }}
      </p>
    </div>
    <div>
      <p>{{ $t('order.paymentMethod') }}:</p>
      <payment-method :payment_method="order?.payment_method"></payment-method>

    </div>
    <div>
      <p>{{ $t('order.payment') }}:</p>
      <p class="font-bold"><span
        class="bg-primarylight px-2 text-nowrap text-primary rounded-3xl text-[12px]">
                            {{ order?.payment_status_data?.name }}

                          </span>
      </p>
    </div>
    <div>
      <p>{{ $t('order.status') }}:</p>
      <p class="font-bold"><span class="bg-theemlight
                          text-nowrap
                                    px-2 text-theem rounded-3xl text-[12px]">
                            {{ order?.status_data?.name }}
                          </span></p>
    </div>
    <div v-if="order?.pickup_date">
      <p>{{ $t('orderDetails.pickup_date') }}</p>
      <p class="font-bold text-nowrap">{{ order?.pickup_date }}</p>
    </div>
    <div class="tooltip" v-if="order?.pickup_location">
      <p>{{ $t('orderDetails.pickup_location') }}</p>
      <p class="font-bold text-primary flex" @mouseover="showTooltip = true"
         @mouseleave="showTooltip = false">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2"
                d="M17.8 14h0a7 7 0 1 0-11.5 0h0l.1.3.3.3L12 21l5.1-6.2.6-.7.1-.2Z"/>
        </svg>
        <span>{{ order.billing_address.name }}</span>
        <div class="tooltip-content" v-show="showTooltip">{{ order?.pickup_location }}</div>
      </p>
    </div>

  </div>


</template>
<script >
import PriceWithCurencyFormat from "../../../components/priceWithCurencyFormat.vue";
import PaymentMethod from "../../../components/paymentMethod.vue";

export  default  {
  components: {PaymentMethod, PriceWithCurencyFormat},
  data(){
   return {
    showTooltip: false
   }
  },
  props: {
    order: {
      type:Object,
      default: {}
    }
  }

}
</script>
<style >
.tooltip {
  position: relative;
}

.tooltip .tooltip-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 999;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  padding: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.tooltip:hover .tooltip-content {
  display: block;
}
</style>
