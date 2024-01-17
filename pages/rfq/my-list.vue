<template>
  <rfq-list api="getRfqsMYList" :open-tab="3"></rfq-list>
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
