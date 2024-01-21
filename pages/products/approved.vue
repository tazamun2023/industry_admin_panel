<template>
  <product-list api="getAllApprovedProducts"  :open-tab="`is_approved`"></product-list>
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
