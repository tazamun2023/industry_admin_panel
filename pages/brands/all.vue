<template>
  <all-brand :api="`getBrands`" :param="`all`" :open-tab="1"></all-brand>
</template>

<script>
import AllBrand from "@/components/brand/AllBrand.vue";
export default {
  name: "product",
  middleware: ['common-middleware', 'auth'],

  components: {
    AllBrand,
  },

  methods: {},
  mounted() {
  }
}
</script>
