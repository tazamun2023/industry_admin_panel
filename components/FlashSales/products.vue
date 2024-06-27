<template>


</template>
<script>
import LazyImage from "../LazyImage.vue";
import {mapGetters} from "vuex";

export default {
  name: 'FlashSalesProducts',
  components: {LazyImage},

  props: {
    products: {
      type: Array,
      required: true
    }
  },
  computed: {

    currencyIcon() {
      return this.setting?.currency_icon || '$'
    },
    percentIcon() {
      return this.setting?.percent_icon || '%'
    },
    ...mapGetters('setting', ['setting']),
  },


}
</script>
