<template>
  <rfq-list api="getRfqsPending" :open-tab="'pending'"></rfq-list>
</template>

<script>
import RfqList from "../../components/rfq/rfq-list.vue";
export default {
  name: "ApprovedRFQ",
  middleware: ['common-middleware', 'auth'],

  components: {
    RfqList,
  },

  methods: {
  },
  mounted() {
  }
}
</script>
