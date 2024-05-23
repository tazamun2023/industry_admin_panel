<template>
  <div class="max-w-screen-sm ltr:ml-auto rtl:mr-auto ltr:items-start rtl:items-end border border-smooth p-4 rounded"
       :class="[width]"
  >
    <div class="flex my-1 justify-between">
      <div><span>{{ $t('approveModal.itemTotal') }}</span></div>
      <div>
        <span>
          <price-with-curency-format :price="order?.sub_total "></price-with-curency-format>
        </span>
      </div>
    </div>
    <div class="flex my-1 justify-between">
      <div><span>{{ $t('approveModal.vat') }} ({{ order?.vat_percent }}%):</span></div>
      <div>
        <span>
          <price-with-curency-format :price="order?.vat "></price-with-curency-format>
        </span>
      </div>
    </div>
    <div class="flex my-1 justify-between">
      <div><span>{{ $t('approveModal.itemTotal') }}</span></div>
      <div>
        <span>

          <price-with-curency-format :price="order?.total "></price-with-curency-format>
        </span>
      </div>
    </div>
    <div class="flex my-2 justify-between">
      <div><span class="font-bold">{{ $t('orderDetails.industry_fee') }}</span></div>
    </div>
    <div class="flex my-1 justify-between">
      <div><span>{{ $t('approveModal.commission') }}</span></div>
      <div>
        <span>
          <price-with-curency-format :price="order?.commission "></price-with-curency-format>
        </span>
      </div>
    </div>
    <div class="flex my-1 justify-between">
      <div><span>{{ $t('approveModal.vatOnCommission') }} ({{ order?.commission_on_vat_percent }}%)</span></div>
      <div>
        <span>
          <price-with-curency-format :price="order?.commission_on_vat "></price-with-curency-format>
        </span>
      </div>
    </div>
    <div class="flex my-1 justify-between">
      <div><span>{{ $t('approveModal.totalCommission') }}</span></div>
      <div>
        <span>
          <price-with-curency-format :price="order?.commission_total "></price-with-curency-format>
        </span>
      </div>
    </div>
    <div class="flex border-t border-smooth pt-2 my-1 justify-between">
      <div><span class="font-bold">{{ $t('approveModal.totalPayout') }}</span></div>
      <div>
        <span class="font-bold">
          <price-with-curency-format :price="order?.seller_payout "></price-with-curency-format>
        </span>
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
