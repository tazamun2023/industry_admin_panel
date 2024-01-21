<script>

import DataPage from "~/components/partials/DataPage";
import util from "~/mixin/util"
import Dropdown from '~/components/Dropdown'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "product-list",
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
    ...mapGetters('common', ['allCategoriesTree','allCountries'])
  },
  props: {
    openTab: {
      type: String,
      default: 'is_all_products'
    },
    api: {
      type: String,
      default: "getRfqsAll"
    },
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

    if (this.allCountries.length == 0) {
      try {
        await this.getAllCountries({api: 'getAllCountries', mutation: 'SET_ALL_COUNTRIES'})
      } catch (e) {
        return this.$nuxt.error(e)
      }
    }
    if (this.allCategoriesTree.length==0) {
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
  <div class="grid grid-cols-12 mt-20 gap-4">
    <div class="col-span-8">
      <div class="grid grid-cols-4 gap-4">
        <div>
          <div class="input-group flex">
            <input type="text" class="form-control" :placeholder="$t('prod.write_group_name')"
                   v-model="result.search"
                   aria-label="Recipient's username" aria-describedby="button-addon2">
<!--            <div class="relative">-->
<!--              <button class="grp-check absolute border-0 right-0 top-0" type="button" id="button-addon2">-->
<!--                <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true"-->
<!--                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">-->
<!--                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"-->
<!--                        stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>-->
<!--                </svg>-->
<!--              </button>-->
<!--            </div>-->
          </div>
        </div>
        <div class="form-group for-lang ar-lang">
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

        <div class="form-group for-lang ar-lang">
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

        <div class="col-md-3">
          <div class="form-group for-lang ar-lang">
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
        </div>
      </div>
    </div>
    <div class="col-span-4">
      <div class="flex justify-end">
        <div class="form-group for-lang ar-lang mr-2 ml-2">
          <select class="border border-smooth p-3 rounded" name="" id="">
            <option value="">{{ $t('prod.status') }}</option>
            <option value="">Pending</option>
            <option value="">Approved</option>
            <option value="">Rejected</option>
            <option value="">Online</option>
            <option value="">Ofline</option>
            <option value="">In Stock</option>
            <option value="">Out of Stock</option>
          </select>
        </div>
        <div class="form-group for-lang ar-lang mr-2 ml-2">
          <select class="border border-smooth p-3 rounded" name="" id="">
            <option value="">{{ $t('prod.sortBy') }}</option>
            <option value="">A to Z</option>
            <option value="">Z to A</option>
            <option value="">Created First</option>
            <option value="">Created Last</option>
            <option value="">Update New</option>
            <option value="">Update Old</option>
          </select>
        </div>
      </div>
    </div>
    <div class="col-span-4">
      <div class="mb-4">
        <button type="button"
                @click="filterData"
                class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline long mt-20">
          {{ $t("app.Apply Filters") }}
        </button>
        <a
          class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-red-600 text-white hover:bg-red-700 long mb-auto mt-20 ml-4 mr-4"
          href=""> {{ $t("app.Clear Filter") }} </a>
      </div>
    </div>
  </div>
</template>
