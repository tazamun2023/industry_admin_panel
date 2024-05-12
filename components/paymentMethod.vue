<template>
  <p class="flex gap-4 items-center  text-[14px]">
    <strong class="text-smoothlight">{{ reference_number ?? payment_method }}</strong>
    <img v-if="payment_method=='bank'"  class="w-5 h-5 mt-1" src="~/assets/icon/bank-g.svg" alt="">
    <img v-else class="w-5 h-5 mt-1" src="~/assets/icon/card.svg" alt="">

  </p>
</template>

<script>
import util from '~/mixin/util'

export default {
  props: {
    reference_number: {
      type: Number,
      default() {
        return null
      }
    },

    payment_method: {
      type: String,
      default() {
        return 'bank'
      }
    },
  },
  mixins: [util],

}
</script>
