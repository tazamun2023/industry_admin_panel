<template>
  <quote-list api="getDraftQuoteRfqs" :open-tab="'draft_quotes'"></quote-list>
</template>

<script>
import QuoteList from "~/components/rfq/quote-list.vue";
export default {
  name: "DraftQuote",
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
