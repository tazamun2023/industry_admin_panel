<script>
import util from "@/mixin/util";

export default {
  name: "ProductPriceingSection",
  middleware: ['common-middleware', 'auth'],
  mixins: [util],
  props: {
    result: {},
    allPackagingUnits: {},
    product_price: {},
  },
  methods: {
    ProductPriceingSection() {
      this.$emit('ProductPriceingSection', this.result);
    },
    removePriceingRows(index) {
      if (index != 0) {
        // this.result.product_prices.push(Object.assign({}, this.product_price))
        this.result.product_prices.splice(index, 1);
        this.ProductPriceingSection()
      }
    },
    addPriceingRows() {
      try {
        this.result.product_prices.push(Object.assign({}, this.product_price))
        this.ProductPriceingSection()
      } catch (e) {
        console.log(e);
      }
    },
  }
}
</script>

<template>
  <div class="tab-sidebar p-3">
    <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Pricing') }}</h4>
    <div class="input-wrapper">
      <label for="">{{ $t('prod.Unit of measure') }} ? <strong class="text-error">*</strong></label>
      <div class="input-group mb-3">
        <select class="border p-3 w-50 border-smooth rounded-lg uppercase"
                v-model="result.unit_id">
          <option value="0">{{ $t('prod.Unit') }}</option>
          <option v-for="(item, index) in allPackagingUnits" :key="index" :value="index">{{
              item.name
            }}
          </option>
        </select>
      </div>
    </div>
    <p><span class="fw-bold">{{ $t('prod.Price list') }}</span> {{ $t('prod.KSA Market(GULF) - SAR') }}</p>
    <p>
      {{
        $t('prod.Add pricing to your product You can also create bulk pricing rules to offer price discounts based on quantity breaks')
      }}</p>
    <div class="table-responsive">
      <table class="table table-bordered mb-0">
        <thead>
        <tr>
          <th scope="col">{{ $t('prod.Minimum order quantity') }}</th>
          <th scope="col">{{ $t('prod.Unit price') }}</th>
          <th scope="col">{{ $t('prod.Sale price') }} ? ({{ $t('prod.optional') }})</th>
          <th></th>
        </tr>
        </thead>
        <tbody>

        <tr v-for="(product_price, index) in result.product_prices" :key="index">
          <td class="p-2">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Quantity"
              @keypress="onlyNumber"
              v-model="product_price.quantity"
              @input="ProductPriceingSection"
            >
          </td>
          <td class="p-2">
            <div class="relative flex">
              <label class="pricename absolute left-0 top-0 p-3" for="">SAR</label>
              <input type="text" style="padding: 1px 56px;" class="form-control px-20" placeholder="Enter Price"
                     @keypress="onlyNumber"
                     @input="ProductPriceingSection"
                     v-model="product_price.unit_price">
            </div>
          </td>
          <td class="p-2">
            <div class="relative flex">
              <label class="pricename absolute left-0 top-0 p-3" for="">{{ $t('prod.SAR') }}</label>
              <input type="text" style="padding: 1px 56px;" class="form-control px-20" placeholder="Enter Price"
                     @keypress="onlyNumber"
                     @input="ProductPriceingSection"
                     v-model="product_price.selling_price">
            </div>
          </td>
          <td class="p-2">
            <button type="button" class="btn  btn-outline-secondary" @click.prevent="removePriceingRows(index)">
                               <span><svg class="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                          fill="none" viewBox="0 0 18 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
  </svg></span>
            </button>
          </td>
        </tr>

        </tbody>
      </table>
      <button v-if="result.product_prices.length <= 2" class="btn btn-link fw-bold"
              @click.prevent="addPriceingRows()">+ {{ $t('prod.ADD TIER') }}
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
