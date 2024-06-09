<template>
  <p :dir="$t('app.dir')" class="text-nowrap">
    {{ formattedPrice }}
  </p>
</template>

<script>
import util from '~/mixin/util'

export default {
  props: {
    price: {
      type: Number,
      default() {
        return 0
      }
    },
    maximumFractionDigits: {
      type: Number,
      default() {
        return 2
      }
    },
    currency: {
      type: String,
      default() {
        return 'SAR'
      }
    },
  },
  mixins: [util],
  computed: {
    formattedPrice() {
      const p = Number(this.price, 2);
      const fractionDigits = Number.isInteger(p) ? 0 : this.maximumFractionDigits;
      return p.toLocaleString(this.$t('app.currency_local'), {
        style: 'currency',
        maximumFractionDigits: fractionDigits,
        currency: 'SAR',
        currencyDisplay: 'code' // or 'code' or 'name' depending on your preference
      });
    }
  }
}
</script>
