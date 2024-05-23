<template>
  <div class="max-w-screen-sm ltr:ml-auto rtl:mr-auto ltr:items-start rtl:items-end border border-smooth p-4 rounded"
       :class="[width]"
  >
    <div class="flex my-1 justify-between">
      <div><h6>{{ $t('approveModal.itemTotal') }}</h6></div>
      <div>
        <h6>
          <price-with-curency-format :price="order?.sub_total "></price-with-curency-format>
        </h6>
      </div>
    </div>
    <div class="flex my-1 justify-between">
      <div><h6>{{ $t('approveModal.vat') }} ({{ order?.vat_percent }}%):</h6></div>
      <div>
        <h6>
          <price-with-curency-format :price="order?.vat "></price-with-curency-format>
        </h6>
      </div>
    </div>
    <div class="flex my-1 justify-between">
      <div><h6>{{ $t('approveModal.itemTotal') }}</h6></div>
      <div>
        <h6>

          <price-with-curency-format :price="order?.total "></price-with-curency-format>
        </h6>
      </div>
    </div>
    <div class="flex my-2 justify-between">
      <div><h6 class="font-bold">{{ $t('orderDetails.industry_fee') }}</h6></div>
    </div>
    <div class="flex my-1 justify-between">
      <div><h6>{{ $t('approveModal.commission') }}</h6></div>
      <div>
        <h6>
          <price-with-curency-format :price="order?.commission "></price-with-curency-format>
        </h6>
      </div>
    </div>
    <div class="flex my-1 justify-between">
      <div><h6>{{ $t('approveModal.vatOnCommission') }} ({{ order?.commission_on_vat_percent }}%)</h6></div>
      <div>
        <h6>
          <price-with-curency-format :price="order?.commission_on_vat "></price-with-curency-format>
        </h6>
      </div>
    </div>
    <div class="flex my-1 justify-between">
      <div><h6>{{ $t('approveModal.totalCommission') }}</h6></div>
      <div>
        <h6>
          <price-with-curency-format :price="order?.commission_total "></price-with-curency-format>
        </h6>
      </div>
    </div>
    <div class="flex border-t border-smooth pt-2 my-1 justify-between">
      <div><h6 class="font-bold">{{ $t('approveModal.totalPayout') }}</h6></div>
      <div>
        <h6 class="font-bold">
          <price-with-curency-format :price="order?.seller_payout "></price-with-curency-format>
        </h6>
      </div>
    </div>
  </div>


</template>
<script>
import PriceWithCurencyFormat from "../../../components/priceWithCurencyFormat.vue";
import PaymentMethod from "../../../components/paymentMethod.vue";

export default {
  components: {PaymentMethod, PriceWithCurencyFormat},
  data() {
    return {
      showTooltip: false
    }
  },
  props: {
    order: {
      type: Object,
      default: {}
    },
    width: {
      type: String,
      default: " "
    }
  }

}
</script>
