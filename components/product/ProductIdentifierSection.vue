<script>
import {ValidationProvider} from 'vee-validate';

export default {
  name: "ProductIdentifierSection",
  middleware: ['common-middleware', 'auth'],
  components: {
    ValidationProvider
  },
  props: {
    is_draft: {},
    allBarcodes: {},
    result: {}
  },

  data() {
    return {
      hasError: false,
    }
  },

  methods: {
    ProductIdentifierSection() {
      this.$emit('ProductIdentifierSection', this.result);
    }
  },

  mounted() {

  }
}
</script>

<template>
  <div class="tab-sidebar p-3">
      <h4 class="header-title mt-0 text-capitalize mb-1">{{ $t('prod.Product Identifiers') }}</h4>
      <p class="text-sm">
        {{ $t('prod.Enter barcode type and number for improved search/visibility of your product') }}.</p>
      <div class="grid grid-cols-2 gap-4">
        <ValidationProvider name="barcode_type" :rules="{ required: !is_draft }" v-slot="{ errors }"
                            :custom-messages="{required: $t('global.req', { type: $t('prod.Barcode type')}) }">
          <div class="input-wrapper mt-3 mt-sm-0">
            <label class="w-full">{{ $t('prod.Barcode type') }}</label>
            <select class="form-control w-full p-3 border border-smooth rounded-lg uppercase"
                    @input="ProductIdentifierSection"
                    v-model="result.barcode_type">
              <option value="">{{ $t('prod.Select Barcode') }}</option>
              <option :value="index" v-for="(item, index) in allBarcodes" :key="index">{{ item.name }}</option>
            </select>
            <span class="error">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>
        <div class="form-group input-wrapper mt-3 mt-sm-0">
          <label>{{ $t('prod.Barcode') }}</label>
          <input type="text" class="form-control" v-model="result.barcode"
                 @input="ProductIdentifierSection"
                 :placeholder="$t('prod.Barcode')"
                 :readonly="result.barcode_type===4">
        </div>
        <ValidationProvider name="sku" :rules="{ required: !is_draft }" v-slot="{ errors }"
                            :custom-messages="{required: $t('global.req', { type: $t('prod.SKU')}) }">
          <div class="form-group input-wrapper  mt-3 mt-sm-0">
            <label>{{ $t('prod.SKU') }} <strong class="text-error">*</strong></label>
            <input
              type="text" class="form-control"
              v-model="result.sku"
              :placeholder="$t('prod.SKU')"
              @input="ProductIdentifierSection"
            >
          </div>
          <span class="error">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
  </div>
</template>

<style scoped>

</style>
