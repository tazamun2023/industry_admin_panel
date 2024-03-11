<template>
  <quote-list api="getOrderPlacedQuoteRfqs" :open-tab="'order_placed'"></quote-list>
</template>

<script>
import QuoteList from "~/components/rfq/quote-list.vue";
export default {
  name: "OrderPlaced",
  middleware: ['common-middleware', 'auth'],

  components: {
    QuoteList,
  },

  methods: {
  },
  mounted() {
  }
}
</script>
