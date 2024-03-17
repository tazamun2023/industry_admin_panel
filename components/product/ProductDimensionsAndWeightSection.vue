<script>
import util from "@/mixin/util";

export default {
  name: "ProductDimensionsAndWeightSection",
  middleware: ['common-middleware', 'auth'],
  mixins: [util],
  props: {
    result: {},
    allWeightUnits: {},
    allDimensionUnits: {},
  },
  methods: {
    ProductDimensionsAndWeightSection() {
      this.$emit('ProductDimensionsAndWeightSection', this.result);
    }
  }
}
</script>

<template>
  <div class="tab-sidebar p-3">
    <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Product dimensions & weight') }}</h4>
    <p>{{ $t("prod.These attributes provide information about the products dimensions and weight") }}.</p>
    <div class="input-wrapper">
      <label for="">{{ $t('prod.Weight') }} ? <strong class="text-error">*</strong></label>
      <div class="relative flex input-group gap-4 w-50 mb-3">
          <input
            type="text"
            class="form-control pr-12"
            :placeholder="$t('prod.Weight')"
            @keypress="onlyNumber"
            v-model="result.pdime_weight"
            @input="ProductDimensionsAndWeightSection"
          >
          <div class="absolute right-0 top-0">
            <select
              class="p-2 m-1 float-right border-l border-smooth uppercase"
              @input="ProductDimensionsAndWeightSection"
              v-model="result.pdime_weight_unit_id"
            >
              <option v-for="(item, index) in allWeightUnits" :key="index" :value="index">{{ item.name }}</option>
            </select>
          </div>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-4">
      <div class="input-wrapper">
        <label for="">{{ $t('prod.Length') }} ? <strong class="text-error">*</strong></label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" :placeholder="$t('prod.Length')"
                   @keypress="onlyNumber"
                   @input="ProductDimensionsAndWeightSection"
                   v-model="result.pdime_length">
          </div>
      </div>
      <div class="input-wrapper">
        <label for="">{{ $t('prod.Height') }} ? <strong class="text-error">*</strong></label>
          <div class="input-group mb-3">
            <input
              type="text" class="form-control"
              :placeholder="$t('prod.Height')"
              @keypress="onlyNumber"
              @input="ProductDimensionsAndWeightSection"
              v-model="result.pdime_height">
          </div>
      </div>

      <div class="input-wrapper">
        <label for="">{{ $t('prod.Width') }} ? <strong class="text-error">*</strong></label>
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Enter Width"
                   @keypress="onlyNumber"
                   @input="ProductDimensionsAndWeightSection"
                   v-model="result.pdime_width">
          </div>
      </div>
      <div class="input-wrapper">
        <label for="">{{ $t('prod.Dimension Unit') }}</label>
        <select data-plugin="customselect" class="border p-3 w-full border-smooth rounded-lg uppercase"
                @input="ProductDimensionsAndWeightSection"
                v-model="result.pdime_dimention_unit">
          <option v-for="(item, index) in allDimensionUnits" :key="index" :value="index">{{
              item.name
            }}
          </option>
        </select>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>
