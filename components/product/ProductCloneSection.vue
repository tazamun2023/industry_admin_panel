<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate';
import ProductSearch from "@/components/partials/ProductSearch.vue";

export default {
  name: "ProductCloneSection",
  middleware: ['common-middleware', 'auth'],
  components: {
    ProductSearch,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    cloneProduct: {},
  },

  data() {
    return {
      hasError: false,
    }
  },

  methods: {
    ProductCloneSection() {
      this.$emit('ProductCloneSection', this.result);
    }
  },

  mounted() {

  }
}
</script>

<template>
<div>
  <form action="" class="p-3" id="product_sku">
    <div class="input-wrapper">
      <label for="name">{{ $t('prod.Clone All Data From Existing Product Using Product SKU Code') }}</label>
      <div
        class="relative flex flex-col min-w-0 min-h-96 rounded break-words  appendTable">
        <product-search
          ref="productSearch"
          @input="ProductCloneSection"
          @product-clicked="cloneProduct"
        />
      </div>
      <label style="font-size:12px;"
             for="">{{ $t('prod.You can find it on the Product details page in the ‘Overview’ section') }}</label>
    </div>
    <div class="input-wrapper mb-3">
      <div class="mt-4" role="alert">
        <div class="media-body bg-soft-dark p-1 rounded  pl-2 pr-2 font-size-14">
          <h6>{{ $t('prod.Learn how to create a new single product') }}</h6>
          <h6>{{ $t('Create a new single product from scratch or clone from existing product') }}</h6>
          <a href="">{{ $t('prod.Learn More') }}</a>
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-primary">{{ $t('prod.submit') }}</button>
  </form>
</div>
</template>

<style scoped>

</style>
