<template>
  <rfq-list api="getRfqsRelevent" 
  :open-tab="$store.state.admin.isVendor?'relevant_to_me':'all_rfq'"></rfq-list>
</template>

<script>
import RfqList from "../../components/rfq/rfq-list.vue";
export default {
  name: "rfq",
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
