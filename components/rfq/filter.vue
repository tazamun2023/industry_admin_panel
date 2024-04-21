<script>

import DataPage from "~/components/partials/DataPage";
import util from "~/mixin/util"
import Dropdown from '~/components/Dropdown'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "rfq-filter",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      selectedLevel1: null,
      selectedLevel2: null,
      selectedLevel3: null,
      result: {
        country_id: "",
        parent: '',
        search: '',
        from_date: '',
        to_date: '',
        parentCategory: '',
        subCategory: '',
        category_id: '',
        multi_products: '',
        status: ''
      }
    }
  },
  mixins: [util],
  components: {
    DataPage,
    Dropdown
  },
  computed: {
    ...mapGetters('language', ['currentLanguage']),
    ...mapGetters('common', ['allCategoriesTree','allCountries','allWeightUnits', ])

  },
  methods: {
    resultData(evt) {
      if (this.$route?.params?.id === 'add') {
        this.emptyAllList('allCategories')
      }
      this.result = evt
    },
    inFooterSelected(data) {
      this.result.in_footer = data.key
    },
    featuredSelected(data) {
      this.result.featured = data.key
    },
    categorySelected(data) {
      this.result.parent = data.key
    },

    titleChanged() {
      this.result.slug = this.convertToSlug(this.result.title)
    },
    dropdownSelected(data) {
      this.result.status = data.key
    },
    updateLevel2() {
      this.result.subCategory = "";  // Reset Level 2 selection
      this.result.category_id = "";  // Reset Level 2 selection
      this.selectedLevel1 = this.allCategoriesTree.find(c => c.id == (this.result.parentCategory));
      this.selectedLevel2 = null;  // Reset Level 2 selection
    },
    updateLevel3() {
      this.result.category_id = "";
     this.selectedLevel2 = this.selectedLevel1.child.find(c => c.id === parseInt(this.result.subCategory));

    },
    filterData() {
      this.$emit('filter',this.result);
    },
    clearFilter() {
      this.result.subCategory = ""
      this.result.category_id = ""
      this.result.country_id = ""
      this.result.parent = ""
      this.result.to_date = ""
      this.result.from_date = ""
      this.result.parentCategory = ""
      this.result.multi_products = ""
      this.result.search = ""
      this.result.status = ""
      this.$emit('filter',this.result);
    },
    ...mapActions('common', ['getCategoriesTree','getAllCountries', 'emptyAllList'])
  },
  async mounted() {


  if(this.$route?.query.search)
  {
    this.result.search=this.$route?.query.search
  }
  if(this.$route?.query.country_id)
  {
    this.result.country_id=this.$route?.query.country_id
  }
  if(this.$route?.query.from_date)
  {
    this.result.from_date=this.$route?.query.from_date
  }
  if(this.$route?.query.to_date)
  {
    this.result.to_date=this.$route?.query.to_date
  }

  if(this.$route?.query.parentCategory)
  {
    this.result.parentCategory=parseInt(this.$route?.query.parentCategory)
    this.updateLevel2()
  }
  if(this.$route?.query.subCategory)
  {
    this.result.subCategory=parseInt(this.$route?.query.subCategory)
    this.updateLevel3()
  }

    if(this.$route?.query.category_id)
    {
      this.result.category_id=parseInt(this.$route?.query.category_id)
    }
    if(this.$route?.query.country_id)
    {
      this.result.country_id=parseInt(this.$route?.query.country_id)
    }
  if(this.$route?.query.multi_products)
  {
    this.result.multi_products=this.$route?.query.multi_products
  }

    if (this.allCountries.length === 0) {
      try {
        await this.getAllCountries({api: 'getAllCountries', mutation: 'SET_ALL_COUNTRIES'})
      } catch (e) {
        return this.$nuxt.error(e)
      }
    }
    if (this.allCategoriesTree.length===0) {
      try {
        await this.getCategoriesTree()
      } catch (e) {
        return this.$nuxt.error(e)
      }
    }

  }
}
</script>

<template>
  <div class="flex flex-wrap card  relative  flex-col min-w-0 rounded break-words  bg-white border-1">
    <div class="md:w-full py-3">
      <div class="flex flex-wrap ">
        <div class="md:w-1/5 pr-4 pl-4">
          <div class="mb-4">
            <label for="">{{ $t("rfq.RFQ ID") }}</label>
            <input v-model="result.search" type="text" class="theme-input-style" :placeholder="$t('rfq.Search by RFQ ID or Product')">
          </div>
        </div>
<!--        {{ result }}-->


          <!-- First Select - Search by Category -->
          <div class="md:w-1/5 pr-4 pl-4">

              <label for="">{{ $t("rfq.Search by Category") }}</label>
              <v-select
                :dir="$t('app.dir')"
                v-model="result.parentCategory"
                :options="allCategoriesTree"
                label="title"
                :reduce="cat => cat.id"
                :placeholder="$t('rfq.Search by Category')"
                @input="updateLevel2"
                class="custom-select"
              ></v-select>

          </div>

          <!-- Second Select - Select Sub Category -->
          <div class="md:w-1/5 pr-4 pl-4">

              <label for="">{{ $t("rfq.Select Sub Category") }}</label>
              <v-select
                :dir="$t('app.dir')"
                v-model="result.subCategory"
                :options="selectedLevel1?.child"
                label="title"
                :reduce="cat => cat.id"
                class="custom-select"
                :placeholder="$t('rfq.Select Sub Category')"
                @input="updateLevel3"
              ></v-select>

          </div>

          <!-- Third Select - Select Child Category -->
          <div class="md:w-1/5 pr-4 pl-4">

              <label for="">{{ $t("rfq.Select Child Category") }}</label>
              <v-select
                :dir="$t('app.dir')"
                v-model="result.category_id"
                :options="selectedLevel2?.child"
                :reduce="cat => cat.id"

                label="title"
                class="custom-select"
                :placeholder="$t('rfq.Select Child Category')"
              ></v-select>

          </div>
        <div class="md:w-1/5 pr-4 pl-4">
          <div class="mb-4 for-lang">
            <label for=""> {{ $t("rfq.RFQ Type") }} </label>
            <select
              class="bg-gray-50 border border-smooth text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
             v-model="result.multi_products">
              <option value="">{{ $t("app.Select on Option") }}</option>
              <option value="single">{{$t('rfq.Single product')}}</option>
              <option value="multi">  {{$t('rfq.Multi-product')}}</option>
            </select>
          </div>
        </div>
        <div class="md:w-1/5 pr-4 pl-4" v-if="$store.state.admin.isSuperAdmin">
          <div class="mb-4 for-lang">
            <label for=""> {{ $t("rfq.RFQ Status") }} </label>
            <select
              class="bg-gray-50 border border-smooth text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
             v-model="result.status">
              <option value="">{{ $t("app.Select on Status") }}</option>
              <option value="approved">{{$t('app.Approved')}}</option>
              <option value="rejected">  {{$t('app.Rejected')}}</option>
            </select>
          </div>
        </div>
        <div class="md:w-1/5 pr-4 pl-4">
            <label for=""> {{ $t("rfq.Shipping country") }} </label>
            <v-select
              :dir="$t('app.dir')"
              v-model="result.country_id"
              :options="allCountries"
              label="name"
              :reduce="c => c.id"
              :placeholder="$t('rfq.Shipping country') "
              class="custom-select"
            ></v-select>
        </div>
        <div class="md:w-1/5 pr-4 pl-4">
          <div class="mb-4">
            <label for=""> {{ $t("app.from") }} </label>
            <input type="date"  v-model="result.from_date" class="theme-input-style" placeholder="From (creation)">
          </div>
        </div>
        <div class="md:w-1/5 pr-4 pl-4">
          <div class="mb-4">
            <label for=""> {{ $t("app.to") }} </label>
            <input type="date" v-model="result.to_date" class="theme-input-style" placeholder="To (creation)">
          </div>
        </div>
        <div class="md:w-1/3 pr-4 pl-4">
          <div class="mb-4">
            <button type="button"
                    @click="filterData"
                    class="inline-block align-middle text-center select-none border 
                    font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline long mt-20">
              {{ $t("app.Apply Filters") }}
            </button>
            <button
              @click="clearFilter"
              class="inline-block align-middle
               text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 
               leading-normal no-underline bg-red-600  hover:bg-red-700 long mb-auto mt-20 ml-4 mr-4"
              > {{ $t("app.Clear Filter") }} </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
