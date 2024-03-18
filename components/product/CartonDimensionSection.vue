<script>
import util from "@/mixin/util";
import {ValidationProvider} from "vee-validate";

export default {
  name: "CartonDimensionSection",
  middleware: ['common-middleware', 'auth'],
  mixins: [util],
  components: {
    ValidationProvider
  },
  props: {
    result: {},
    is_draft: {},
    allWeightUnits: {},
    allDimensionUnits: {},
  },
  methods: {
    CartonDimensionSection() {
      this.$emit('CartonDimensionSection', this.result);
    }
  }
}
</script>

<template>
  <div class="tab-sidebar p-3">
    <h4 class="header-title mt-0 text-capitalize mb-1 ">{{ $t('prod.Carton Dimensions & Weight') }}</h4>
    <p>
      {{
        $t("prod.Enter the dimensions and weight of the carton to help calculate shipping rate These measurements are for the products shipping container")
      }}.</p>
    <div class="grid grid-cols-2 gap-4">
      <div class="input-wrapper">
        <label for="">{{ $t('prod.Weight') }} ? <strong class="text-error">*</strong></label>
        <div class="relative flex input-group gap-4 mb-3">
          <ValidationProvider name="pc_weight" class="w-full" :rules="{ required: !is_draft}" v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.Weight')}) }">
            <input
              type="text"
              class="form-control pr-12"
              :placeholder="$t('prod.Weight')"
              @keypress="onlyNumber"
              @input="CartonDimensionSection"
              v-model="result.pc_weight">

            <div class="absolute right-0 top-0">
              <select class="p-2 m-1 float-right border-l border-smooth uppercase"
                      @input="CartonDimensionSection"
                      v-model="result.pc_weight_unit_id">
                <!--                  <option value="0">Select</option>-->
                <option v-for="(item, index) in allWeightUnits" :key="index" :value="index">{{
                    item.name
                  }}
                </option>
              </select>
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>
      <div class="input-wrapper">
        <label for="">{{ $t('prod.Length') }} ?</label>
        <div class="relative flex input-group gap-4 mb-3">
          <ValidationProvider name="pc_weight" class="w-full" :rules="{ required: !is_draft }" v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.Length')}) }">
            <input type="text" class="form-control pr-12" placeholder="Carton Length"
                   aria-label="Recipient's username"
                   @keypress="onlyNumber"
                   @input="CartonDimensionSection"
                   v-model="result.pc_length">

            <div class="absolute right-0 top-0">
              <select class="p-2 m-1 float-right border-l border-smooth uppercase"
                      @input="CartonDimensionSection"
                      v-model="result.pc_length_unit_id">
                <option v-for="(item, index) in allDimensionUnits" :key="index" :value="index">{{
                    item.name
                  }}
                </option>
              </select>
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>

      <div class="input-wrapper">
        <label for="">{{ $t('prod.Height') }} ? <strong class="text-error">*</strong></label>
        <div class="relative flex input-group gap-4 mb-3">
          <ValidationProvider name="pc_height" class="w-full" :rules="{ required: !is_draft }" v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.Height')}) }">
            <input type="text" class="form-control pr-12" placeholder="Carton Height"
                   aria-label="Recipient's username"
                   @keypress="onlyNumber"
                   @input="CartonDimensionSection"
                   v-model="result.pc_height">
            <div class="absolute right-0 top-0">
              <select class="p-2 m-1 float-right border-l border-smooth uppercase"
                      @input="CartonDimensionSection"
                      v-model="result.pc_height_unit_id">
                <option v-for="(item, index) in allDimensionUnits" :key="index" :value="index">{{
                    item.name
                  }}
                </option>
              </select>
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>

      <div class="input-wrapper">
        <label for="">{{ $t('prod.Width') }} ? <strong class="text-error">*</strong></label>
        <div class="relative flex input-group gap-4 mb-3">
          <ValidationProvider name="pc_width" class="w-full" :rules="{ required: !is_draft }" v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.Width')}) }">
            <input type="text" class="form-control pr-12" :placeholder="$t('prod.Width')"
                   aria-label="Recipient's username"
                   @keypress="onlyNumber"
                   @input="CartonDimensionSection"
                   v-model="result.pc_width">

            <div class="absolute right-0 top-0">
              <select class="p-2 m-1 float-right border-l border-smooth uppercase"
                      @input="CartonDimensionSection"
                      v-model="result.pc_width_unit_id">
                <option v-for="(item, index) in allDimensionUnits" :key="index" :value="index">{{
                    item.name
                  }}
                </option>
              </select>
            </div>
            <span class="error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>
