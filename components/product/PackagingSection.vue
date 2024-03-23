<script>
import util from "@/mixin/util";
import {ValidationProvider} from "vee-validate";

export default {
  name: "PackagingSection",
  middleware: ['common-middleware', 'auth'],
  mixins: [util],
  components: {
    ValidationProvider
  },
  props: {
    result: {},
    allPackagingUnits: {},
    is_draft: {},
    allTransportationModes: {}
  },

  methods: {
    PackagingSection() {
      this.$emit('PackagingSection', this.result);
    }
  }
}
</script>

<template>
  <div class="tab-sidebar p-3">
    <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Packaging') }}</h4>
    <div class="grid grid-cols-2 gap-4">
      <div class="input-wrapper">
        <label for="">{{ $t('prod.Size') }} ? <strong class="text-error">*</strong></label>
        <div class="relative flex input-group gap-4 mb-3 w-full">
          <ValidationProvider name="pk_size" class="w-full" :rules="{ required: !is_draft && result.pk_size_unit==='' }" v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.Size')}) }">
            <input type="text" class="form-control pr-12" :placeholder="$t('prod.Size')"
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
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>
      <ValidationProvider name="pk_number_of_carton" class="w-full" :rules="{ required: !is_draft }" v-slot="{ errors }"
                          :custom-messages="{required: $t('global.req', { type: $t('prod.Number of units per carton')}) }">
        <div class="input-wrapper">
          <label for="">{{ $t('prod.Number of units per carton') }} <strong
            class="text-error">*</strong></label>
          <div class=" mb-3">
            <input type="text" class="form-control" :placeholder="$t('prod.Number of units per carton')"
                   @input="PackagingSection"
                   @keypress="onlyNumber" v-model="result.pk_number_of_carton">
          </div>
          <span class="error">{{ errors[0] }}</span>
        </div>
      </ValidationProvider>
      <ValidationProvider name="pk_average_lead_time" class="w-full" :rules="{ required: !is_draft }"
                          v-slot="{ errors }"
                          :custom-messages="{required: $t('global.req', { type: $t('prod.Average lead time(Days)')}) }">
        <div class="input-wrapper">
          <label for="">{{ $t('prod.Average lead time(Days)') }} ?</label> <strong class="text-error">*</strong>
          <div class=" mb-3">
            <input type="text" class="form-control" :placeholder="$t('prod.Average lead time(Days)')"
                   @input="PackagingSection"
                   @keypress="onlyNumber" v-model="result.pk_average_lead_time">
          </div>
          <span class="error">{{ errors[0] }}</span>
        </div>
      </ValidationProvider>
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
