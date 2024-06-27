<template>
  <div v-if="$can('manage_products')">
    <div class="tab-sidebar">
      <div class="col-md-12 p-4 title">
        <h4 v-if="is_clone ">{{ $t('prod.clone_product') }}</h4>
        <h4 v-if="!id & !is_clone">{{ $t('prod.add_new_product') }}</h4>
        <h4 v-if="id">{{ $t('prod.edit_product') }}</h4>
        <p>{{ $t('prod.Fill out the form below to add a new product to your product list') }}</p>
      </div>
      <!-- ---------------- -->
      <div v-if="!is_variant &&!is_next && !isRfqProduct" class="tab-sidebar">
        <div class="input-wrapper p-3" v-if="!id">
          <input type="checkbox" class="custom-control-input" id="clonecheck_true"
                 v-model="is_clone" />

          <label class="custom-control-label fw-bold" for="clonecheck"><strong
            style="line-height: 26px;">{{ $t('prod.Clone from existing product') }}</strong></label>
        </div>

      </div>
      <div v-if="!is_next ">
        <AddProduct @checkVariant="checkVariant" :is_clone="is_clone" :id="id" @changeClone="changeClone" @GoNext="GoNext"></AddProduct>
      </div>
    </div>
    <div v-if="is_next">
      <Variant
        :result="variant.result"
        :selectedLevel1="variant?.selectedLevel1"
        :selectedLevel2="variant?.selectedLevel2"
        :selectedLevel3="variant?.selectedLevel3"
        :select_attr1="variant?.select_attr1"
        :from-single="true"
        :is_edit="$can('manage_products')"
        :select_attr2="variant?.select_attr2"
        :variant_uuid="variant?.variant_uuid"
      ></Variant>
    </div>
  </div>

</template>

<script>

import AddProduct from "../../components/variant/AddProduct.vue";
import util from '~/mixin/util'
import Variant from "../../components/variant/Variant.vue";

export default {
  name: "AddProductPage",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      is_variant: false,
      is_next: false,
      is_clone: false,
      result: null,
      variant: null,
    }
  },
  mixins: [util],
  components: {
    Variant,
    AddProduct,
  },
  computed: {
    id() {
      return !this.isAdding ? this.$route?.params?.id : ''
    },
    isAdding(){
      return isNaN(this.$route?.params?.id)
    },
    isRfqProduct() {
      return parseInt(this.$route.query?.rfq_product_id ?? 0) > 0;

    },
  },

  methods: {
    changeClone(v) {
      console.log("v",v)
      this.is_clone=v
    },
    checkVariant(v) {
      console.log("v",v)
      this.is_variant=v
    },
    GoNext(v) {
      console.log(v)
      this.variant = v;
      this.variant.result.product_variant={name:v.select_attr1,value:v.select_attr2}
      this.is_next = true;
    },


  }

}
</script>
