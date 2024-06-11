<template>
  <div v-if="$can('manage_products')">
    <div class="tab-sidebar">
      <div class="col-md-12 p-4 title">
        <h4 v-if="is_clone">{{ $t('prod.clone_product') }}</h4>
        <h4 v-if="!id & !is_clone">{{ $t('prod.add_new_product') }}</h4>
        <h4 v-if="id">{{ $t('prod.edit_product') }}</h4>
        <p>{{ $t('prod.Fill out the form below to add a new product to your product list') }}</p>
      </div>

      <!-- ---------------- -->
      <div v-if="!is_next" class="tab-sidebar">
        <div class="input-wrapper p-3" v-if="!id">
          <input type="checkbox" class="custom-control-input" id="clonecheck_true" v-if="is_clone" v-show="is_clone"
                 v-model="is_clone" @click.prevent="isClone"/>
          <input type="checkbox" class="custom-control-input" id="clonecheck_false" v-else v-model="is_clone"/>
          <label class="custom-control-label fw-bold" for="clonecheck"><strong
            style="line-height: 26px;">{{ $t('prod.Clone from existing product') }}</strong></label>
        </div>
        <product-clone-section
          v-if="is_clone"
          :cloneProduct="cloneProduct"
        />
      </div>
      <div v-if="!is_next && !is_clone">
        <AddProduct :id="id" @GoNext="GoNext"></AddProduct>
      </div>
    </div>
    <div v-if="is_next">
      <Variant
        :result="variant?.result"
        :selectedLevel1="variant?.selectedLevel1"
        :selectedLevel2="variant?.selectedLevel2"
        :selectedLevel3="variant?.selectedLevel3"
        :select_attr1="variant?.select_attr1"
        :select_attr2="variant?.select_attr2"
        :variant_uu_id="variant?.variant_uu_id"
      ></Variant>
    </div>
  </div>

</template>

<script>

import AddProduct from "../../components/variant/AddProduct.vue";
import util from '~/mixin/util'
import VueUploadImages from "../../components/product/uploadImages.vue";
import LangInput from "../../components/langInput.vue";
import ProductCloneSection from "../../components/product/ProductCloneSection.vue";

export default {
  name: "AddProductPage",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      is_next: false,
      is_clone: false,
      result: null,
      variant: null,
    }
  },
  mixins: [util],
  components: {
    ProductCloneSection,
    LangInput, VueUploadImages,
    AddProduct,
  },
  computed: {
    id() {
      return !this.isAdding ? this.$route?.params?.id : ''
    },
  },

  methods: {
    cloneProduct(product) {

      // this.id=product.id
      this.fetchingData(product.id, 'cloneProduct').then(() => {
        this.is_clone = false
        this.result.id = ""
        this.result.sku = ""
        this.result.is_variant = false
        this.result.is_variant_save = false
        this.result.variant_uuid = ""
        this.result.product_variants = []
        this.result.product_variant = []
        this.result.images = []
        this.result.product_images = []
      })
    },
    GoNext(v) {
      this.is_next = true;
      this.variant = v;
      this.variant.result.product_variant={name:v.select_attr1,value:v.select_attr2}
    },
    isClone() {
      this.is_clone = !this.is_clone;
      this.tableShow = !this.tableShow;
    },
  }

}
</script>
