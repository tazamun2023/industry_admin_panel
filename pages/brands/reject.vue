<template>
  <all-brand :api="`getBrands`" :param="`reject`" :open-tab="3"></all-brand>
</template>

<script>
import AllBrand from "@/components/brand/AllBrand.vue";
export default {
  name: "RejectBrand",
  middleware: ['common-middleware', 'auth'],

  components: {
    AllBrand,
  },

  methods: {},
  mounted() {
  }
}
</script>

