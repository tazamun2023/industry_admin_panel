<template>
  <div>
    <div class="flex justify-center items-center h-full" v-if="is_loading">
      <spinner />
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
import th from "vue2-datepicker/locale/es/th";

export default {
  name: "VariantUpdate",
  data() {
    return {
      is_edit: true,
      result: {
        hts_code: '',
        variant_uu_id: '',
        parent_sku: '',
        clone_products: [],
        unit_id: 9,
        variants_type: [],
        product_variant: [],
        product_variants: [],
        features: [
          {"ar": "", "en": ""},
        ],
        product_prices: [
          {
            "quantity": "",
            "unit_price": "",
            "selling_price": "",
          }
        ],
        is_draft: false,
        is_variant: false,
        parentCategory: '',
        subCategory: '',
        childCategory: '',
        /*Product Inventory*/
        available_quantity: '',
        /*End Product Inventory*/
        mainCategorySlug: null,
        subCategorySlug: null,
        childCategorySlug: null,
        selectedMainCategory: 0,
        selectedSubCategory: 0,
        selectedChildCategory: 0,

        /*Additional details*/
        additional_details_row: [
          {
            "name": "",
            "value": ""
          }
        ],
        additional_attributes: [],
        additional_attributes_value: [],
        /*Additional details*/
        /*Shipping details*/
        is_ready_to_ship: 1,
        is_buy_now: 1,
        is_availability: 0,
        is_dangerous: 0,
        is_offer_private_label_option: 1,
        storage_temperature: '',
        stock_location: 1,
        country_of_origin: 193,
        /*Shipping details*/
        /*Product Identifiers*/
        barcode_type: '',
        barcode: null,
        sku: null,
        /*Product Identifiers*/
        minimum_order_quantity: 0,
        /*product price start*/
        pp_unit_of_measure_id: 0,

        pp_quantity: [],
        pp_unit_price: [],
        pp_selling_price: [],
        /*product price end*/

        /*product variant start*/
        variantTypes: ['color', 'size'],
        variant_unit_of_measure: 1,
        variantRows: [
          {size: 0, color: ""},
        ],
        productVariants: {
          variantTypes: ['color', 'size'],
          pv_name: [],
          variantValues: [
            [], []
          ],
        },
        /*product variant end*/
        /*additional attribute start*/
        add_attribute_name: [],
        add_attribute_value: [],
        /*additional attribute end*/
        /*packaging start*/
        pk_size: '',
        pk_size_unit: 1,
        pk_number_of_carton: '',
        pk_average_lead_time: '', //days
        pk_transportation_mode: 1,
        /*packaging end*/
        /*product dimensions start*/
        pdime_weight: '',
        pdime_weight_unit_id: 17,
        pdime_height: '',
        pdime_length: '',
        pdime_width: '',
        pdime_unit: '',
        pdime_dimention_unit: 19,
        /*product dimensions end*/
        /*product cartons start*/
        pc_weight: '',
        pc_weight_unit_id: 17,
        pc_height: '',
        pc_height_unit_id: 19,
        pc_length: '',
        pc_length_unit_id: 19,
        pc_width: '',
        pc_width_unit_id: 19,
        /*end product cartons*/
        id: '',
        title: {ar: '', en: ''},
        tags: ',',
        basic_keyword_en: '',
        basic_keyword_ar: '',
        overview: '',
        description: {ar: '', en: ''},
        status: '',
        is_quote: '',
        brand_id: '',
        primary_category_id: '',
        category_id: '',
        bundle_deal_id: '',
        unit: 10,
        badge: '',
        subcategory_id: '',
        tax_rule_id: '',
        shipping_rule_id: '',
        purchased: '',
        selling: '',
        offered: '',
        refundable: 1,
        warranty: 1,
        meta_description: '',
        flash_sale_product: '',
        meta_title: '',
        images: '',
        slug: '',
        video: '',
        product_images: [],
        product_collections: [],
        product_categories: [],
        PriceingRows: [
          {pp_quantity: 5, pp_unit_price: 0, pp_selling_price: 0},
        ],
        basicInfoen: [[]],
        basicInfoEng: [{}],
        basicInfoAr: [{}],
        basicInfoar: [[]],
        variantkey: '',
        variantColorsType: 'color',
        variantColors: [],
        variantSizeType: 'size',
        variantSize: [],
      },

      variantsData: [],
      selectedLevel1: null,
      selectedLevel2: null,
      selectedLevel3: null,
      select_attr1: '',
      select_attr2: '',
      is_loading: true,
      is_fetch: false

    }
  },
  computed:{
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

        // Initialize an array to store product variants
        let productVariants = [];

        for (let key in res) {
          if (!isNaN(key)) {
            let productVariant = {
              name: res[key]?.product_variant?.name||'',
              color_name: res[key]?.product_variant?.color.name?.en||'',
              value: res[key]?.product_variant?.value||'',
              product_id: res[key]?.product_variant?.product_id||'',
            };
            productVariants.push(productVariant);
          }
        }


        // Object.keys(res).length
        this.result = {
          parentCategory: res[0]?.category?.id,
          subCategory: res[0]?.sub_category?.id,
          childCategory: res[0]?.child_category?.id,
          parent_sku: res[0]?.parent_sku,
          title: res[0]?.title,
          description: res[0]?.description,
          brand_id: res[0]?.brand_id,
          unit_id: res[0]?.unit_id,
          product_variants: productVariants,
          features: res[0]?.product_features?.map(item => (item.name)),
          unit: res[0]?.unit,
          meta_title: res[0]?.meta_title,
          meta_description: res[0]?.meta_description,
          selling: res[0]?.selling,
          purchased: res[0]?.selling,
          offered: res[0]?.offered,
          images: res[0]?.images,
          product_images: res[0]?.product_images,
          video: res[0]?.video,
          status: res[0]?.status,

          product_prices: res[0]?.product_prices,

          /*Basic Information*/
          basic_keyword_en: res[0]?.basic_keyword_en,
          basic_keyword_ar: res[0]?.basic_keyword_ar,
          basicInfoAr: res[0]?.title,
          basicInfoEng: res[0]?.title,
          /*end Basic Information*/
          /* Product Identifiers*/
          barcode_type: res[0]?.barcode_id,
          barcode: res[0]?.barcode_number,
          sku: res[0]?.sku,
          /* end Product Identifiers*/



          /*Product Inventory*/
          available_quantity: res[0]?.available_quantity,
          /*ende Product Inventory*/
          /*Packaging*/

          pk_size: res[0]?.packaging?.size,
          pk_size_unit: res[0]?.packaging?.size_unit,
          pk_number_of_carton: res[0]?.packaging?.number_of_carton,
          pk_average_lead_time: res[0]?.packaging?.average_lead_time,
          pk_transportation_mode: res[0]?.packaging?.transportation_mode,
          /*emd Packaging*/

          /*Carton Dimensions & Weight*/
          pc_weight: res[0]?.product_carton?.weight,
          pc_weight_unit_id: res[0]?.product_carton?.weight_unit_id,
          pc_height: res[0]?.product_carton?.height,
          pc_height_unit_id: res[0]?.product_carton?.height_unit_id,
          pc_length: res[0]?.product_carton?.length,
          pc_length_unit_id: res[0]?.product_carton?.length_unit_id,
          pc_width: res[0]?.product_carton?.width,
          pc_width_unit_id: res[0]?.product_carton?.width_unit_id,
          /*end Carton Dimensions & Weight*/
          /*Product dimensions & weight*/
          pdime_weight: res[0]?.product_dimension?.weight,
          pdime_weight_unit_id: res[0]?.product_dimension?.weight_unit_id,
          pdime_height: res[0]?.product_dimension?.height,
          pdime_length: res[0]?.product_dimension?.length,
          pdime_width: res[0]?.product_dimension?.width,
          pdime_dimention_unit: res[0]?.product_dimension?.dimention_unit,
          /*end Product dimensions & weight*/
          /*Pricing*/
          // pp_unit_of_measure_id: res[0]?.product_prices.length != 0?res[0]?.product_prices?.[0].unit_of_measure_id:0,
          pp_quantity: res[0]?.product_prices?.map(price => price.quantity),
          pp_unit_price: res[0]?.product_prices?.map(price => price.unit_price),
          pp_selling_price: res[0]?.product_prices?.map(price => price.selling_price),
          /*Shipping details*/
          is_ready_to_ship: res[0]?.is_ready_to_ship,
          is_buy_now: res[0]?.is_buyable,
          is_availability: res[0]?.is_available,
          storage_temperature: res[0]?.storage_temperature_id,
          stock_location: res[0]?.warehouse_id,
          country_of_origin: res[0]?.product_origin_id,
          is_dangerous: res[0]?.is_dangerous,

          product_variant: res[0]?.product_single_variant ?? [],
          PriceingRows: res[0]?.product_prices,
          is_variant: res[0]?.product_variant ? true : false,
          additional_details_row: res[0]?.additional_attribute?.map(item => ({name: item.name, value: item.value})),
          hts_code: res[0]?.hts_code,
          variant_uu_id: res[0]?.variant_uu_id,
        },
        this.select_attr1= 'color';
        this.select_attr2= 'size';

        this.updateLevel2()
        this.result.subCategory = res[0]?.sub_category?.id
        this.updateLevel3()
        this.result.category_id = res[0]?.child_category?.id
        this.result.childCategory = res[0]?.child_category?.id


        let productVariants1 = [];

        for (let key in res) {
          if (!isNaN(key)) {
            let productVariant = {
              name: res[key]?.product_variant?.name||'',
              color_name: res[key]?.product_variant?.color.name?.en||'',
              value: res[key]?.product_variant?.value||'',
              product_id: res[key]?.product_variant?.product_id||'',
            };
            productVariants1.push(productVariant);
          }
        }

        for (let key in res) {
          // Check if the key is a number
          if (!isNaN(key)) {
            const variant = {
              parentCategory: res[key].category?.id,
              subCategory: res[key].sub_category?.id,
              childCategory: res[key].child_category?.id,
              hts_code: res[key].hts_code || '',
              parent_sku: res[key].parent_sku || '',
              unit_id: res[key].unit_id || 9,
              clone_products: [],
              variants_type: [],
              product_variant: res[key].product_variant,
              variant_uu_id: res[key]?.variant_uuid,
              product_variants: productVariants1,
              features: res[key].product_features?.map(item => (item.name)) || [
                {"ar": "", "en": ""},
              ],


              /*Product Inventory*/
              available_quantity: res[key].available_quantity || '',
              /*End Product Inventory*/


              /*Additional details*/
              additional_details_row: res[key].additional_attribute?.map(item => ({name: item.name, value: item.value})) || [
                {
                  "name": "",
                  "value": ""
                }
              ],
              additional_attributes: res[key]?.additional_attribute || [],
              additional_attributes_value: [],
              /*Additional details*/
              /*Shipping details*/
              is_ready_to_ship: res[key].is_ready_to_ship || 1,
              is_buy_now: res[key].is_buyable,
              is_availability: res[key].is_available,
              is_dangerous: res[key].is_dangerous || 0,
              is_offer_private_label_option: res[key].is_offer_private_label_option || 1,
              stock_location: res[key].warehouse_id || 1,
              storage_temperature: res[key].storage_temperature_id || '',
              country_of_origin: res[key].product_origin_id || 194,

              /*Shipping details*/
              /*Product Identifiers*/
              barcode_type: res[key].barcode_id || '',
              barcode: res[key].barcode_number || '',
              sku: res[key].sku || '',
              minimum_order_quantity: res[key].minimum_order_quantity || 0,
              pp_unit_of_measure_id: res[key].pp_unit_of_measure_id || 0,


              /*Product Identifiers*/

              /*product price start*/


              pp_quantity: [],
              pp_unit_price: [],
              pp_selling_price: [],
              /*product price end*/

              /*product variant start*/
              variantTypes: ['color', 'size'],
              variant_unit_of_measure: 1,
              variantRows: [
                {size: 0, color: ""},
              ],
              productVariants: {
                variantTypes: ['color', 'size'],
                pv_name: [],
                variantValues: [
                  [], []
                ],
              },
              /*product variant end*/
              /*additional attribute start*/
              add_attribute_name: [],
              add_attribute_value: [],
              /*additional attribute end*/
              /*packaging start*/
              pk_size: res[key].packaging.size || '',
              pk_size_unit: res[key].packaging.size_unit || 1,
              pk_number_of_carton: res[key].packaging.number_of_carton || '',
              pk_average_lead_time: res[key].packaging.average_lead_time || '', //days
              pk_transportation_mode: res[key].packaging.transportation_mode || 1,
              /*packaging end*/
              /*product dimensions start*/
              pdime_weight: res[key].product_dimension.weight || '',
              pdime_weight_unit_id: res[key].product_dimension.weight_unit_id || 17,
              pdime_height: res[key].product_dimension.height || '',
              pdime_length: res[key].product_dimension.length || '',
              pdime_width: res[key].product_dimension.width || '',
              pdime_unit: this.result.unit_id || '',
              pdime_dimention_unit: res[key].product_dimension.dimention_unit,
              /*product dimensions end*/
              /*product cartons start*/
              pc_weight: res[key].product_carton.weight || '',
              pc_weight_unit_id: res[key].product_carton.weight_unit_id || 17,
              pc_height: res[key].product_carton.height || '',
              pc_height_unit_id: res[key].product_carton.height_unit_id || 19,
              pc_length: res[key].product_carton.length || '',
              pc_length_unit_id: res[key].product_carton.length_unit_id || 19,
              pc_width: res[key].product_carton.width || '',
              pc_width_unit_id: res[key].product_carton.width_unit_id || 19,
              /*end product cartons*/
              id: res[key].id || '',
              title: res[key].title || {ar: '', en: ''},
              tags: res[key].tags || ',',
              basic_keyword_en: res[key].basic_keyword_en || '',
              basic_keyword_ar: res[key].basic_keyword_ar || '',
              overview: res[key].overview || '',
              description: res[key].description || {ar: '', en: ''},
              status: res[key].status || '',
              is_quote: res[key].is_quote || '',
              brand_id: res[key].brand_id || '',
              primary_category_id: res[key].primary_category_id || '',
              category_id: res[key].category_id || '',
              bundle_deal_id: res[key].bundle_deal_id || '',
              unit: res[key].unit ||10,
              badge: res[key].badge || '',
              subcategory_id: res[key].subcategory_id ||'',
              tax_rule_id: res[key].tax_rule_id || '',
              shipping_rule_id: res[key].shipping_rule_id ||'',
              purchased: res[key].purchased ||'',
              selling: res[key].selling ||'',
              offered: res[key].offered ||'',
              refundable: res[key].refundable ||1,
              warranty: res[key].warranty ||1,
              meta_description: res[key].meta_description ||'',
              flash_sale_product: res[key].flash_sale_product ||'',
              meta_title: res[key].meta_title ||'',
              images: res[key].images ||'',
              slug: res[key].slug ||'',
              video: res[key].video ||'',
              product_images: res[key].images,
              product_collections: [],
              product_categories: [],
              PriceingRows: this.result.product_prices,
              product_prices: res[key].product_prices,
              basicInfoen: [[]],
              basicInfoEng: [{}],
              basicInfoAr: [{}],
              basicInfoar: [[]],
              variantkey: '',
              variantColorsType: 'color',
              variantColors: [],
              variantSizeType: 'size',
              variantSize: [],
            };
            this.variantsData.push(Object.assign({result: variant}));
          }
        }



        this.is_fetch = true;
        this.is_loading = false

      }catch (e) {
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
      // this.result.subCategorySlug = this.selectedLevel2.slug
    },
    // updateLevel4() {
    //   this.result.category_id = "";
    //   this.selectedLevel = this.selectedLevel1.child.find(c => c.id === parseInt(this.result.subCategory));
    //   // this.result.subCategorySlug = this.selectedLevel2.slug
    // },

    ...mapActions('common', ['getById', 'setById', 'setImageById', 'getDropdownList', 'setWysiwygImage', 'deleteData', 'getRequest', 'getCategoriesTree']),
    ...mapActions('ui', ["setToastMessage", "setToastError"]),
  }
}
</script>
