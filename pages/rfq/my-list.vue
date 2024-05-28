<template>
  <rfq-list api="getRfqsMYList" :open-tab="'my-list'"></rfq-list>
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
