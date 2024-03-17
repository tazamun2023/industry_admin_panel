<script>
export default {
  name: "ProductInventorySection",
  middleware: ['common-middleware', 'auth'],
  props: {
    result:{

    }
  },

  methods:{

    ProductInventorySection(){
      this.$emit('ProductInventorySection', this.result);
    },

    availableQuantity() {
      // const ava_qty = this.result.available_quantity;
      this.compareMethods()
    },

    compareMethods() {
      if (this.min_qty === this.result.available_quantity) {
        this.result.is_availability = 1;
      } else if (this.min_qty > this.result.available_quantity) {
        this.result.is_availability = 0;
      } else {
        this.result.is_availability = 1;
      }

    },

    onlyNumber($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        $event.preventDefault();
      }
    },

  }
}
</script>

<template>
  <div class="tab-sidebar p-3" >
    <div class="border-b border-smooth">
      <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Fulfillment') }}</h4>
      <p>{{ $t('prod.Setup shipping and inventory details for this product') }}</p>
    </div>
    <div class="mt-10">
      <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Product Inventory') }}</h4>
      <p>{{ $t('prod.Enter the available quantity of your product') }}</p>
    </div>

    <div class="input-wrapper">
      <label for="">{{ $t('prod.Available quantity') }} ? <strong class="text-error">*</strong></label>
      <input type="text" class="form-control" v-model="result.available_quantity" @keypress="onlyNumber"
             @input="availableQuantity" @change="ProductInventorySection">
      <label>{{ $t('prod.Minimum order quantity') }}: 1</label>
    </div>
  </div>
</template>

<style scoped>

</style>
