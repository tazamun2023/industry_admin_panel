<template>
  <div class="w-full mt-2 border-t border-smooth pt-7">
    <div class="w-3/5 ltr:ml-auto rtl:mr-auto ltr:items-end rtl:items-start border border-smooth p-4 rounded">
      <div class="flex my-1 justify-between">
        <div><h5>{{ $t('approveModal.itemTotal') }}</h5></div>
        <div>
          <h5>
            <price-with-curency-format :price="order?.sub_total "></price-with-curency-format>
          </h5>
        </div>
      </div>
      <div class="flex my-1 justify-between">
        <div><h5>{{ $t('approveModal.vat') }} ({{ order?.vat_percent }}%):</h5></div>
        <div>
          <h5>
            <price-with-curency-format :price="order?.vat "></price-with-curency-format>
          </h5>
        </div>
      </div>
      <div class="flex my-1 justify-between">
        <div><h5>{{ $t('approveModal.itemTotal') }}</h5></div>
        <div>
          <h5>

            <price-with-curency-format :price="order?.total "></price-with-curency-format>
          </h5>
        </div>
      </div>
      <div class="flex my-2 justify-between">
        <div><h5 class="font-bold">{{ $t('orderDetails.industry_fee') }}</h5></div>
      </div>
      <div class="flex my-1 justify-between">
        <div><h5>{{ $t('approveModal.commission') }}</h5></div>
        <div>
          <h5>
            <price-with-curency-format :price="order?.commission "></price-with-curency-format>
          </h5>
        </div>
      </div>
      <div class="flex my-1 justify-between">
        <div><h5>{{ $t('approveModal.vatOnCommission') }} ({{ order?.commission_on_vat_percent }}%)</h5></div>
        <div>
          <h5>
            <price-with-curency-format :price="order?.commission_on_vat "></price-with-curency-format>
          </h5>
        </div>
      </div>
      <div class="flex my-1 justify-between">
        <div><h5>{{ $t('approveModal.totalCommission') }}</h5></div>
        <div>
          <h5>
            <price-with-curency-format :price="order?.commission_total "></price-with-curency-format>
          </h5>
        </div>
      </div>
      <div class="flex border-t border-smooth pt-2 my-1 justify-between">
        <div><h5 class="font-bold">{{ $t('approveModal.totalPayout') }}</h5></div>
        <div>
          <h5 class="font-bold">
            <price-with-curency-format :price="order?.seller_payout "></price-with-curency-format>
          </h5>
        </div>
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
    }
  }

}
</script>
