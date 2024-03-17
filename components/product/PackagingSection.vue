<script>
import util from "@/mixin/util";

export default {
  name: "PackagingSection",
  middleware: ['common-middleware', 'auth'],
  mixins: [util],
  props: {
    result: {},
    allPackagingUnits:{},
    allTransportationModes:{}
  },

  methods:{
    PackagingSection(){
      this.$emit('PackagingSection', this.result);
    }
  }
}
</script>

<template>
  <div class="tab-sidebar p-3" >
    <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Packaging') }}</h4>
    <div class="grid grid-cols-2 gap-4">
      <div class="input-wrapper">
        <label for="">{{ $t('prod.Size') }} ? <strong class="text-error">*</strong></label>
        <div class="relative flex input-group gap-4 mb-3 w-full">
            <input type="text" class="form-control pr-12" placeholder="Size"
                   @keypress="onlyNumber"
                   @input="PackagingSection"
                   v-model="result.pk_size">
            <div class="absolute right-0 top-0">
              <select class="p-2 m-1 float-right border-l border-smooth uppercase"
                      v-model="result.pk_size_unit"
                      @input="PackagingSection"
              >
                <option value="">{{ $t('prod.Size Unit') }}</option>
                <option :value="index" v-for="(item, index) in allPackagingUnits" :key="index">{{
                    item.name
                  }}
                </option>
              </select>
            </div>
        </div>
      </div>
        <div class="input-wrapper">
          <label for="">{{ $t('prod.Number of units per carton') }} <strong
            class="text-error">*</strong></label>
          <div class=" mb-3">
            <input type="text" class="form-control" :placeholder="$t('prod.Number of units per carton')"
                   @input="PackagingSection"
                   @keypress="onlyNumber" v-model="result.pk_number_of_carton">
          </div>
        </div>
        <div class="input-wrapper">
          <label for="">{{ $t('prod.Average lead time(Days)') }} ?</label> <strong class="text-error">*</strong>
          <div class=" mb-3">
            <input type="text" class="form-control" :placeholder="$t('prod.Average lead time(Days)')"
                   @input="PackagingSection"
                   @keypress="onlyNumber" v-model="result.pk_average_lead_time">
          </div>
        </div>
      <div class="input-wrapper">
        <label for="">{{ $t('prod.Transportation Mode') }}</label>
        <div class=" mb-3">
          <select data-plugin="customselect" class="border p-3 w-full border-smooth rounded-lg uppercase"
                  v-model="result.pk_transportation_mode"
                  @input="PackagingSection"
          >
            <option :value="index" v-for="(item, index) in allTransportationModes" :key="index">{{
                item.name
              }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
