<template>
  <rfq-list api="getRfqsAll"  :open-tab="2"></rfq-list>
</template>

<script>
import RfqList from "../../components/rfq/rfq-list.vue";
export default {
  name: "rfq",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      openTab: 1,
      collapsedId: 0,
    }
  },
  components: {
    RfqList,
  },

  methods: {
  },
  mounted() {
  }
}
</script>
