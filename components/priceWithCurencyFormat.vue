<template>
  <p :dir="$t('app.dir')">
    {{price?
      price.toLocaleString($t('app.currency_local'), {
        style: 'currency',
        maximumFractionDigits: maximumFractionDigits,
        currency: currency,
        // currencyDisplay: 'code' // or 'code' or 'name' depending on your preference

      }):"0"
    }}
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

}
</script>
