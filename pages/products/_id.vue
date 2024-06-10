<template>

  <div v-if="$can('manage_products')">
    <div v-if="!is_next" class="tab-sidebar">
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
          @ProductCloneSection="ProductCloneSection"
        />
      </div>

      <div v-if="!is_next && !is_clone">
        <AddProduct @isNextChange="is_next=true"></AddProduct>
      </div>
    </div>
    <div v-if="is_next">
      <Variant
        :result="result"
        :selectedLevel1="selectedLevel1"
        :selectedLevel2="selectedLevel2"
        :selectedLevel3="selectedLevel3"
        :select_attr1="select_attr1"
        :select_attr2="select_attr2"
        :variant_uu_id="variant_uu_id"
      ></Variant>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Spinner from '~/components/Spinner'
import util from '~/mixin/util'
import Variant from "@/components/variant/Variant2.vue";
import AddProduct from "../../components/variant/AddProduct.vue";

export default {
  name: "AddProductPage",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      is_next: false,
      is_click_available: false,
      variant_uu_id: '',
      is_variant_save: false,
      is_variant_edit: false,
      is_variant_save_after_edit: false,
      selectedLevel1: null,
      selectedLevel2: null,
      selectedLevel3: null,
      isThumb: null,
      allKeywords: [],
      isFirstThumb: null,
      openTab: 1,
      uploadModal: false,
      is_clone: false,
      is_variant: false,
      is_draft: true,
      pv_type: false,
      isColor: false,
      isSize: false,
      selectedAttribute1: null,
      selectedAttribute2: null,
      disableAttribute2: false,
      disableAttribute1: false,
      is_barcode: false,
      search_sku: '',
      tableShow: false,
      clone_product: null,
      uploadNewText: false,
      select_attr1: '',
      select_attr2: '',

      productFormOpen: true,
      showCategories: false,
      routeName: 'products',
      getApi: 'getProduct',
      getColorApi: 'getColors',
      setApi: 'setProduct',
      setImageApi: 'setProductImage',
      setVideoApi: 'setProductVideo',
      fileKeys: ['id', 'tax_rule_id', 'shipping_rule_id'],
      validationKeys: ['title.en'],
      validationKeysIfIsDraft: ['parentCategory', 'subCategory', 'childCategory'],
      validationKeysIfNotVariant: ['parentCategory', 'subCategory', 'childCategory', 'brand_id', 'basicInfoEng', 'basic_keyword_en', 'barcode_type', 'sku', 'pk_size', 'pk_size_unit', 'pk_number_of_carton', 'pk_average_lead_time', 'pk_transportation_mode', 'pc_weight', 'pc_weight_unit_id', 'pc_length', 'pc_length_unit_id', 'pc_height', 'pc_height_unit_id', 'pc_width', 'pc_width_unit_id', 'pdime_weight', 'pdime_weight_unit_id', 'pdime_length', 'pdime_height', 'pdime_width', 'pdime_dimention_unit', 'unit_id', 'storage_temperature'],
      validationKeysIfVariantNext: ['parentCategory', 'subCategory', 'childCategory', 'brand_id', 'parent_sku'],
      subCategories: [],
      childCategories: [],
      features: {"ar": "", "en": ""},
      errorMessage: '',
      product_price: {
        "quantity": "",
        "unit_price": "",
        "selling_price": "",
      },

      product_variant: {
        "name": "",
        "color_name": "",
        "value": "",
        "product_id": ""
      },
      product_variant_type: {
        "color": "color",
        "size": "size",
      },
      additional_details: {
        "name": "",
        "value": "",
      },
      min_qty: null,
      is_submit: false,
      variant_copy: [],
      result: {
        hts_code: '',
        variant_uuid: '',
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
        is_always_available: false,
        is_dangerous: 0,
        is_offer_private_label_option: 1,
        storage_temperature: '',
        stock_location: 1,
        country_of_origin: 194,
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
      hasError: false,
      hasErrorQty: false,
      loading: false,
      formSubmitting: false,
      redirect: false,
      fileUploading: false,
      videoUploading: false,
    }
  },
  mixins: [util],
  components: {
    AddProduct,
    Spinner,
    Variant,
  },
  provide: {
    // fetchingData: () => {
    //   this.fetchingData()
    // },
  },

  computed: {
    availabilityStatus: {
      get() {
        return this.result.is_availability ? "1" : "0";
      },
      set(value) {
        this.result.is_availability = value === "1";
      }
    },
    error() {
      return error
    },

    skuRules() {
      // if (!this.id) {
      return {
        required: !this.is_draft,
        uniqueSku: this.is_sku_exsist, // Pass allSKus as a parameter to uniqueSku
        min: 2,
        max: 32
      };
    },

    UnitPriceValidationRules() {
      return {
        required: !this.is_draft,
        min_value: 1,
        max_value: 99999999,
        regex: /^(?:\d*\.\d{1,2}|\d+)$/
      }
    },
    PriceValidationRules() {
      const unit_prices = [];
      const selling_prices = [];

      this.result.product_prices.forEach(price => {
        // Check if selling price is not null before pushing into arrays
        if (price?.selling_price !== null) {
          unit_prices.push(parseFloat(price?.unit_price));
          selling_prices.push(parseFloat(price?.selling_price));
        }
      });

      return {
        min_value: 1,
        max_value: 99999999,
        regex: /^(?:\d*\.\d{1,2}|\d+)$/,
        priceComparison: {unit_prices, selling_prices}
      };
    },
    QuantityValidationRules() {
      return {
        required: !this.is_draft,
        min_value: 1,
        max_value: 99999999,
        regex: /^\d+$/,
        quantityComparison: {
          first: parseInt(this.result.product_prices[0]?.quantity),
          second: parseInt(this.result.product_prices[1]?.quantity),
          third: parseInt(this.result.product_prices[2]?.quantity)
        }
      };
    },
    availableQuantityValidationRules() {
      return {
        required: !this.is_draft && !this.result.is_always_available,
        min_value: 0,
        max_value: 99999999,
      };
    },
    BarcodeValidationRules() {
      let validationRules = {
        required: !this.is_draft && this.result.barcode_type != 4
      };

      const barcodeLength = this.result.barcode?.length || 0;

      switch (this.result.barcode_type) {
        case '1':
          if (barcodeLength <= 8) {
            validationRules.min = 8;
          } else if (barcodeLength <= 13) {
            validationRules.min = 13;
            validationRules.max = 13;
          } else {
            validationRules.max = 13;
          }
          break;

        case '2':
          if (barcodeLength <= 8) {
            validationRules.min = 8;
          } else if (barcodeLength <= 12) {
            validationRules.min = 12;
            validationRules.max = 12;
          } else if (barcodeLength <= 13) {
            validationRules.min = 13;
            validationRules.max = 13;
          } else if (barcodeLength <= 14) {
            validationRules.min = 14;
            validationRules.max = 14;
          } else {
            validationRules.max = 14;
          }
          break;

        case '3':
          if (barcodeLength <= 12) {
            validationRules.min = 12;
          } else {
            validationRules.max = 12;
          }
          break;

        default:
          break;
      }

      return validationRules;
    },
    PackagingValidationRules() {
      return {
        required: !this.is_draft,
        min_value: 0.000001,
        max_value: 99999999
      };
    },
    NotDraftValidationRules() {
      return {
        required: !this.is_draft,
      };
    },

    CartonDimensionValidationRules() {
      return {
        required: !this.is_draft,
        min_value: 0.000001,
        max_value: 99999999
      };
    },
    ProductDimensionValidationRules() {
      return {
        required: !this.is_draft,
        min_value: 0.000001,
        max_value: 99999999
      };
    },
    AverageLeadValidationRules() {
      return {
        required: !this.is_draft,
        min_value: 1,
        max_value: 99
      };
    },
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
    ...mapGetters('common', ['is_sku_exsist', 'allCategories', 'allTaxRules', 'allAttributes',
      'allBrands', 'allSKus', 'allProductCollections', 'allBundleDeals', 'allShippingRules', 'allColors', 'allBarcodes', 'allPackagingUnits', 'allDimensionUnits', 'allWeightUnits', 'allCountries', 'allStorageTemperatures', 'allTransportationModes', 'allWarehouses', 'allCategoriesTree'])
  },
  watch: {
    selectedColor(newIndex) {

    },
    'result.barcode_type'(newValue, oldValue) {
      if (newValue == 4) {
        this.result.barcode = '';
      }
    },
    'result.is_always_available'(newValue, oldValue) {
      if (newValue == 1) {
        this.result.available_quantity = '';
        this.result.is_availability = 1;
      } else {
        this.result.is_availability = 0;
      }
    }
  },
  methods: {
    async changeSKU(sku, product_id) {
      this.debouncedInputHandler();

    },
    debouncedInputHandler: _.debounce(function () {
      // This code will run when the user stops typing
      console.log('User stopped typing, current value:', this.inputValue);
      this.checkIfVaildSKU({sku: this.result.sku, product_id: this.result.id})
      // Add any additional logic here
    }, 1000),

    compareMethods() {
      let ava_qty = parseInt(this.result.available_quantity);
      let product_prices_min_qty = parseInt(this.result.product_prices[0]?.quantity);

      if (!isNaN(ava_qty) && !isNaN(product_prices_min_qty)) {
        this.result.is_availability = ava_qty >= product_prices_min_qty ? 1 : 0;
      }
    },

    availableQuantity() {
      this.compareMethods()
    },
    ProductCloneSection(result) {

    },
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
    doNext() {

      this.is_next = true;
      this.variant_uu_id = this.generateUUID();
      this.result.id = this.id;

    },
    generateUUID() {
      // Get current timestamp
      var timestamp = new Date().getTime();

      // Generate a random number
      var randomNumber = Math.ceil(Math.random() * 1000000);

      // Combine timestamp and random number
      var uuid = timestamp.toString() + randomNumber.toString();

      return uuid;
    },
    async doVariantReset() {
      const confirmation = await this.$swal({
        title: "Are you sure?",
        icon: "question",
        iconHtml: "؟",
        confirmButtonText: "Yes",
        cancelButtonText: "Noا",
        showCancelButton: true,
        showCloseButton: true,
      });
      if (confirmation.value) {
        this.result.product_variants = []
      }
    },
    doVariantCancel() {
      this.is_variant_save = true; // Assuming canceling resets to Save mode
      this.is_variant_edit = true;
      this.is_variant_save_after_edit = false;

      if (this.variant_copy) {
        this.result.product_variants = this.variant_copy
      }

    },
    doVariantEdit() {
      this.variant_copy = [...this.result.product_variants];
      this.variant_copy = JSON.parse(JSON.stringify(this.result.product_variants));
      this.is_variant_save = false;
      this.is_variant_edit = true;
      this.is_variant_save_after_edit = true;
    },

    doVariantSave() {
      // Check if product_variants is not empty
      if (this.result.product_variants.length !== 0) {
        for (let i = 0; i < this.result.product_variants.length; i++) {
          const variant = this.result.product_variants[i];
          // Check if any variant has missing name or value
          if (!variant.name && !variant.value) {
            // Show error message and exit loop early
            this.setToastError(this.$t('prod.Color or value cannot be empty'));
            return;
          }
        }
        // If all variants have name and value, toggle save and edit flags
        this.is_variant_save = true;
        this.is_variant_edit = true;
        this.is_variant_save_after_edit = false;
        this.variant_copy = null
      } else {
        // If there are no variants, show error message
        this.setToastError(this.$t('prod.Color or value cant empty value'));
      }
    },
    doDraft() {
      this.is_draft = true;
      this.result.is_draft = true;
      this.result.status = 'draft'
      if (this.result.storage_temperature === 0) {
        this.result.storage_temperature = null
      }
      if (this.result.brand_id === 0) {
        this.result.brand_id = null
      }
      if (this.result.barcode_type === 0) {
        this.result.barcode_type = null
      }
      if (this.result.unit_id === 0) {
        this.result.unit_id = null
      }
      if (this.validationKeysIfIsDraft.findIndex((i) => {
        return (!this.result[i])
      }) > -1) {
        this.hasError = true
        return false
      }
      this.checkForm()

    },
    async doSubmit() {
      this.is_draft = false;
      this.result.is_draft = false;
      this.is_submit = true
      if (this.validationKeysIfNotVariant.findIndex((i) => {
        return (!this.result[i])
      }) > -1) {
        this.hasError = true
        return false
      }
      if (this.is_sku_exsist) {
        this.hasError = true
        return false
      }
      if (this.result.storage_temperature === 0) {
        this.result.storage_temperature = null
      }
      if (this.result.brand_id === 0) {
        this.result.brand_id = null
      }
      if (this.result.barcode_type === 0) {
        this.result.barcode_type = null
      }
      if (this.result.unit_id === 0) {
        this.result.unit_id = null
      }
      this.result.status = 'pending'
      this.result.is_quote = false
      this.result.is_variant = false
      // this.checkForm()
      const data = await this.setById({
        id: this.id,
        params: {
          ...this.result,
          rfq_id: this.$route.query?.quote,
          rfq_product_id: this.$route.query?.rfq_product_id
        },
        api: this.setApi
      })
      if (data.status === 200) {
        var path = '/products/pending-approval';
        if (data.data.status === "approved")
          path = '/products/approved';
        this.$router.push({path});

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
    onlyNumber($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        $event.preventDefault();
        this.handleInput($event)
      }
    },
    addVariantValueRows() {
      this.result.product_variants.push({...this.product_variant});
    },
    setColorName(index, event) {
      this.result.product_variants[index].color_name = this.allColors[event.target.value].name
    },
    addAdditionalDetailsRows(index) {
      this.result.additional_details_row.push(Object.assign({}, this.additional_details))
    },
    addPriceingRows() {
      try {
        this.result.product_prices.push(Object.assign({}, this.product_price))
      } catch (e) {
        console.log(e);
      }
    },

    removeAdditionalDetailsRows(index) {
      // console.log(index)
      if (index != 0) {
        this.result.additional_details_row.splice(index, 1);
      }
    },
    saveAttachment(images) {
      console.log(images)
      // this.result.rfq_attachments = rfq_attachments
      this.result.product_images = images
    },
    removePriceingRows(index) {
      console.log(index)
      if (index != 0) {
        // this.result.product_prices.push(Object.assign({}, this.product_price))
        this.result.product_prices.splice(index, 1);
      }
    },

    isAttr(event, attributeType) {
      const value = String(event.target.value);
      //backend need check
      this.result.variants_type = [
        (this.select_attr1 === 'color' || this.select_attr1 === 'size') ? this.select_attr1 : null,
        (this.select_attr2 === 'color' || this.select_attr2 === 'size') ? this.select_attr2 : null
      ].filter(value => value !== null);


      if (attributeType === 'color') {
        this.disableAttribute2 = value === 'color';
      } else if (attributeType === 'size') {
        this.disableAttribute1 = value === 'size';
      } else {
        this.result.variants_type = []
      }
    },
    removeVariantRows(index) {
      console.log(index)
      if (index != 0) {
        this.result.product_variants.splice(index, 1);

      }
    },
    updateInput(input, language, value) {
      this.$set(input, language, value);
    },
    isClone() {
      this.is_clone = !this.is_clone;
      this.tableShow = !this.tableShow;
    },
    isVariant() {
      this.is_variant = !this.is_variant;
      // this.result.status = 'draft';
      this.result.is_variant = !this.result.is_variant;
      if (!this.is_variant) {
        this.result.variantRows = [];
        this.result.variantRows = [{size: 0, color: ""}];
        this.result.productVariants.variantValues = [[], []];
      }
    },

    getThumb(url) {
      return url
    },
    async checkForm() {

      this.formSubmitting = true
      try {

        delete this.result.created_at
        delete this.result.updated_at
        this.result.is_draft = true;
        const data = await this.setById({
          id: this.id,
          params: {
            ...this.result,
            rfq_id: this.$route.query?.quote,
            rfq_product_id: this.$route.query?.rfq_product_id
          },
          api: this.setApi
        })

        console.log(data)
        if (data.status === 200) {
          const path = this.is_draft ? '/products/draft' : `/${this.routeName}${this.redirect ? '' : '/pending-approval'}`;
          this.$router.push({path});
        }

      } catch (e) {
        return this.$nuxt.error(e)
      }
      this.formSubmitting = false
    },
    scrollToTop(ref = "productForm") {
      this.$refs[ref].scrollIntoView({behavior: "smooth"})
    },
    async fetchingData(id, api = 'getProduct') {

      try {
        this.loading = true
        var res = Object.assign({}, await this.getById({id: id, params: {}, api: api}))
        // console.log('res', res)
        this.result = {
          title: res.title,
          description: res.description,
          parentCategory: res.category?.id,
          subCategory: res.sub_category?.id,
          childCategory: res.child_category?.id,
          product_prices: res.product_prices,
          unit_id: res.unit_id,
          features: res.product_features?.map(item => (item.name)),
          unit: res.unit,
          brand_id: res.brand_id,
          meta_title: res.meta_title,
          meta_description: res.meta_description,
          selling: res.selling,
          purchased: res.selling,
          offered: res.offered,
          images: res.images,
          product_images: res.product_images,
          video: res.video,
          status: res.status,
          parent_sku: res.parent_sku,
          /*Basic Information*/
          basic_keyword_en: res.basic_keyword_en,
          basic_keyword_ar: res.basic_keyword_ar,
          basicInfoAr: res.title,
          basicInfoEng: res.title,
          /*end Basic Information*/
          /* Product Identifiers*/
          barcode_type: res.barcode_id,
          barcode: res.barcode_number,
          sku: res.sku,
          /* end Product Identifiers*/



          /*Product Inventory*/
          available_quantity: res.available_quantity,
          /*ende Product Inventory*/
          /*Packaging*/

          pk_size: res.packaging?.size,
          pk_size_unit: res.packaging?.size_unit,
          pk_number_of_carton: res.packaging?.number_of_carton,
          pk_average_lead_time: res.packaging?.average_lead_time,
          pk_transportation_mode: res.packaging?.transportation_mode,
          /*emd Packaging*/

          /*Carton Dimensions & Weight*/
          pc_weight: res.product_carton?.weight,
          pc_weight_unit_id: res.product_carton?.weight_unit_id,
          pc_height: res.product_carton?.height,
          pc_height_unit_id: res.product_carton?.height_unit_id,
          pc_length: res.product_carton?.length,
          pc_length_unit_id: res.product_carton?.length_unit_id,
          pc_width: res.product_carton?.width,
          pc_width_unit_id: res.product_carton?.width_unit_id,
          /*end Carton Dimensions & Weight*/
          /*Product dimensions & weight*/
          pdime_weight: res.product_dimension?.weight,
          pdime_weight_unit_id: res.product_dimension?.weight_unit_id,
          pdime_height: res.product_dimension?.height,
          pdime_length: res.product_dimension?.length,
          pdime_width: res.product_dimension?.width,
          pdime_dimention_unit: res.product_dimension?.dimention_unit,
          /*end Product dimensions & weight*/
          /*Pricing*/
          // pp_unit_of_measure_id: res.product_prices.length != 0?res.product_prices?.[0].unit_of_measure_id:0,
          pp_quantity: res.product_prices?.map(price => price.quantity),
          pp_unit_price: res.product_prices?.map(price => price.unit_price),
          pp_selling_price: res.product_prices?.map(price => price.selling_price),
          /*Shipping details*/
          is_ready_to_ship: res.is_ready_to_ship,
          is_buy_now: res.is_buyable,
          is_availability: res.is_available,
          is_always_available: res.is_always_available,
          storage_temperature: res.storage_temperature_id,
          stock_location: res.warehouse_id,
          country_of_origin: res.product_origin_id,
          is_dangerous: res.is_dangerous,

          product_variants: res.product_variant,
          product_variant: res.product_single_variant ?? [],
          PriceingRows: res.product_prices,
          is_variant: res.product_variant ? true : false,
          additional_details_row: res.additional_attribute?.map(item => ({name: item.name, value: item.value})),
          hts_code: res.hts_code,
          variant_uuid: res.variant_uuid,
          id: res.id,


        }
        this.isThumb = res.thumb_image;
        this.isFirstThumb = res.first_thumb_image;
        this.result.images = res.images
        this.min_qty = Math.min(...this.result.product_prices.map(item => item.quantity));
        this.select_attr1 = 'color';
        this.select_attr2 = 'size';
        this.is_variant = false;
        // this.result.PriceingRows = res.product_prices
        this.result.product_variants = res.product_variant ?? [];

        if (res.product_variant?.length != 0) {
          this.result.is_variant = true
          if (res.variant_uuid)
            this.$router.push('/products/variant/' + res.id)
        }


        this.updateLevel2()
        this.result.subCategory = res.sub_category?.id
        this.updateLevel3()
        this.result.category_id = res.child_category?.id
        this.result.childCategory = res.child_category?.id


        this.result.product_collections = [...new Set(this.result?.product_collections?.map((o) => {
          return o.product_collection_id
        }))]
        this.result.product_categories = [...new Set(this.result?.product_categories?.map((o) => {
          return o.category_id.toString()
        }))]
        console.log(this.result.product_categories)
        this.loading = false
      } catch (e) {
        return this.$nuxt.error(e)
      }
    },
    async findKeyword() {
      let res = await this.getById({id: 1, params: {keyword: ''}, api: 'findRfqKeyword'});
      this.allKeywords = res;
    },

    ...mapActions('common', ['checkIfVaildSKU', 'getById', 'setById', 'setImageById', 'getDropdownList', 'setWysiwygImage', 'deleteData', 'getRequest', 'getCategoriesTree']),
    ...mapActions('ui', ["setToastMessage", "setToastError"]),
  },
  async mounted() {

    this.getThumb(this.isThumb)

    this.compareMethods();
    this.selectedAttribute1 = 'color';
    this.selectedAttribute2 = 'size';
    if (this.allCategoriesTree.length == 0) {
      try {
        await this.getCategoriesTree()
      } catch (e) {
        return this.$nuxt.error(e)
      }
    }
    if (!this.isAdding) {
      await this.fetchingData(this.id)
    }
    if (this.$route.query?.id) {
      this.fetchingData(this.$route.query?.id).then(() => {
        this.result.id = ""
      })
    }
    if (this.allKeywords.length === 0) {
      await this.findKeyword()
    }
    if (!this.allCategories || !this.allTaxRules || !this.allAttributes || !this.allWeightUnits || !this.allCountries || !this.allStorageTemperatures || !this.allTransportationModes || !this.allWarehouses || !this.allSKus) {

      this.loading = true
      try {
        await this.getDropdownList()
      } catch (e) {
        return this.$nuxt.error(e)
      }
      this.loading = false
    }
  },
}
</script>
