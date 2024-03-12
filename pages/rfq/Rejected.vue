<template>
  <rfq-list api="getRejectedRfqs" :open-tab="'rejected'"></rfq-list>
</template>

<script>
import RfqList from "../../components/rfq/rfq-list.vue";
export default {
  name: "RejectedRFQ",
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
