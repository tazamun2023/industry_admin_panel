<template>
  <product-list api="getAllArchivedProducts"  :open-tab="`is_archived`"></product-list>
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
