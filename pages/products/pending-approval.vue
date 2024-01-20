<template>
  <product-list api="getAllPendingApprovalProducts"  :open-tab="`is_pending_approval`"></product-list>
</template>

<script>
import ProductList from "../../components/product/product-list.vue";
export default {
  name: "product",
  middleware: ['common-middleware', 'auth'],

  components: {
    ProductList,
  },

  methods: {},
  mounted() {
  }
}
</script>
