<template>
  <Transition name="fade">
    <product-list api="getAllProducts" :open-tab="'is_all_products'"></product-list>
  </Transition>
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
