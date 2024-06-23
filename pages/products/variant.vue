<template>
  <div>
    <div class="flex justify-center items-center h-full" v-if="is_loading">
      <spinner/>
    </div>
    <div v-else>
      <Variant
        :result="result"
        :selectedLevel1="selectedLevel1"
        :selectedLevel2="selectedLevel2"
        :selectedLevel3="selectedLevel3"
        :select_attr1="select_attr1"
        :select_attr2="select_attr2"
        :is_edit="is_edit"
        :variantsData="variantsData"
      ></Variant>
    </div>

  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import Variant from "@/components/variant/Variant.vue";
import AddProduct from "../../components/variant/AddProduct.vue";

export default {
  name: "VariantUpdate",
  components: {AddProduct, Variant},
  data() {
    return {
      is_edit: true,
      result: {},
      variantsData: [],
      selectedLevel1: null,
      selectedLevel2: null,
      selectedLevel3: null,
      select_attr1: 'color',
      select_attr2: 'size',
      is_loading: true,
      is_fetch: false

    }
  },
  computed: {
    id() {
      return !this.isAdding ? this.$route?.params?.id : ''
    },
    isAdding() {
      return isNaN(this.$route?.params?.id)
    },

    ...mapGetters(['mediaStorage']),
    ...mapGetters('admin', ['publicKey']),
    ...mapGetters('language', ['currentLanguage']),
    ...mapGetters('setting', ['setting']),
    ...mapGetters('common', ['allCategories', 'allTaxRules', 'allAttributes',
      'allBrands', 'allSKus', 'allProductCollections', 'allBundleDeals', 'allShippingRules', 'allColors', 'allBarcodes', 'allPackagingUnits', 'allDimensionUnits', 'allWeightUnits', 'allCountries', 'allStorageTemperatures', 'allTransportationModes', 'allWarehouses', 'allCategoriesTree'])

  },
  async mounted() {
    if (this.allCategoriesTree.length == 0) {
      try {
        await this.getCategoriesTree()
      } catch (e) {
        return this.$nuxt.error(e)
      }
    }

    await this.fetchingData(this.id)
  },
  methods: {
    async fetchingData(id) {
      try {
        this.is_loading = true
        var res = Object.assign({}, await this.getById({id: id, params: {}, api: 'getVariantProducts'}));


        if (res[0].variant_uu_id == null && !res[0].is_variant) {
          this.$router.push('/products/' + id)
          return;
        }

        let productVariants = [];
        for (let key in res) {
          if (!isNaN(key)) {

            productVariants.push(res[key]?.product_variant);
          }
        }

        for (let key in res) {
          if (!isNaN(key)) {
            this.result = {
              ...res[key],
              product_variants: productVariants,
            }
            this.variantsData.push(Object.assign({result: JSON.parse(JSON.stringify(this.result))}));
          }
        }
        // this.result = JSON.parse(JSON.stringify(this.variantsData[0].result))
        this.is_edit = this.$can('manage_products')
        this.updateLevel2()
        this.result.subCategory = res[0].subCategory
        this.updateLevel3()
        this.result.category_id = res[0].childCategory
        this.result.childCategory = res[0].childCategory
        this.selectedLevel3 = this.selectedLevel2.child.find(c => c.id === parseInt(this.result.childCategory));
        this.is_fetch = true;
        this.is_loading = false
      } catch (e) {
        return this.$nuxt.error(e)
      }
    },

    updateLevel2() {
      this.result.subCategory = "";  // Reset Level 2 selection
      this.result.category_id = "";  // Reset Level 2 selection
      this.selectedLevel1 = this.allCategoriesTree.find(c => c.id == (this.result.parentCategory));
      this.selectedLevel2 = null;  // Reset Level 2 selection
      // this.result.mainCategorySlug = this.selectedLevel1.slug
    },
    updateLevel3() {
      this.result.category_id = "";
      this.selectedLevel2 = this.selectedLevel1.child.find(c => c.id === parseInt(this.result.subCategory));
    },
    ...mapActions('common', ['getById', 'setById', 'setImageById', 'getDropdownList', 'setWysiwygImage', 'deleteData', 'getRequest', 'getCategoriesTree', 'fetchSKus']),
    ...mapActions('ui', ["setToastMessage", "setToastError"])
  }
}
</script>
