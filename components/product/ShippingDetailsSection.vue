<script>
import util from "@/mixin/util";

export default {
  name: "ShippingDetailsSection",
  middleware: ['common-middleware', 'auth'],
  mixins: [util],
  props: {
    result: {},
    allStorageTemperatures: {},
    allWarehouses: {},
    allCountries: {},
  },
  methods: {
    ShippingDetailsSection() {
      this.$emit('ShippingDetailsSection', this.result);
    }
  }
}
</script>

<template>
  <div class="tab-sidebar p-3">
    <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Shipping details') }}</h4>
    <div class="grid grid-cols-2 gap-4">
      <div class="col-md-6">
        <div class="input-wrapper">
          <label for="">{{ $t('prod.Is Ready To Ship') }} ?</label>
          <select class="border p-3 w-full border-smooth rounded-lg uppercase" v-model="result.is_ready_to_ship"
                  @input="ShippingDetailsSection"
          >
            <option value="1">{{ $t('prod.Yes') }}</option>
            <option value="0">{{ $t('prod.No') }}</option>
          </select>
        </div>
      </div>
      <div class="col-md-6">
        <div class="input-wrapper">
          <label for="">{{ $t('prod.Is Buy Now') }} ?</label>
          <select class="border p-3 w-full border-smooth rounded-lg uppercase"
                  @input="ShippingDetailsSection"
                  v-model="result.is_buy_now">
            <option value="1">{{ $t('prod.Yes') }}</option>
            <option value="0">{{ $t('prod.No') }}</option>
          </select>
        </div>
      </div>
      <div class="col-md-6">
        <div class="input-wrapper">
          <label for="">{{ $t('prod.Availability') }}</label>
          <select class="border p-3 w-full border-smooth rounded-lg uppercase"
                  disabled
                  @input="ShippingDetailsSection"
                  v-model="result.is_availability">
            <option value="1">{{ $t('prod.In Stock') }}</option>
            <option value="0">{{ $t('prod.Out of Stock') }}</option>
          </select>
        </div>
      </div>

      <div class="col-md-6">
        <div class="input-wrapper">
          <label for="">{{ $t('prod.Storage temperature') }} <strong class="text-error">*</strong></label>
          <select class="border p-3 w-full border-smooth rounded-lg"
                  @input="ShippingDetailsSection"
                  v-model="result.storage_temperature">
            <option value="0" disabled>{{ $t('prod.Select Option') }}</option>
            <option v-for="(item, index) in allStorageTemperatures" :key="index" :value="index">{{ item.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="col-md-6">
        <div class="input-wrapper">
          <label for="">{{ $t('prod.Ware House') }} <strong class="text-error">*</strong></label>
          <select class="border p-3 w-full border-smooth rounded-lg" v-model="result.stock_location"
                  @input="ShippingDetailsSection">
            <option v-for="(item, index) in allWarehouses" :key="index" :value="index">{{ item.name }}</option>
          </select>
        </div>
      </div>

      <div class="col-md-6">
        <div class="input-wrapper">
          <label for="">{{ $t('prod.Country of origin') }} <strong class="text-error">*</strong></label>
          <select class="border p-3 w-full border-smooth rounded-lg" v-model="result.country_of_origin"
                  @input="ShippingDetailsSection">
            <option v-for="(item, index) in allCountries" :key="index" :value="index" disabled>{{
                item.name
              }}
            </option>
          </select>
        </div>
      </div>

      <div class="col-md-6">
        <div class="input-wrapper">
          <label for="">{{ $t('prod.Dangerous Goods') }}</label>
          <select class="border p-3 w-full border-smooth rounded-lg uppercase"
                  v-model="result.is_dangerous"
                  @input="ShippingDetailsSection">
            <option value="1">{{ $t('prod.Yes') }}</option>
            <option value="0">{{ $t('prod.No') }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
