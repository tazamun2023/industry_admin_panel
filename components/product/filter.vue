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
        sort_by: '',
        from_date: '',
        to_date: '',
        parentCategory: '',
        subCategory: '',
        category_id: '',
        status: '',
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
    filterStatus(){
      if (this.result.search!==''){
        this.filterData()
      }
    },
    filterBySort(){
      if (this.result.sort_by!==''){
        this.filterData()
      }
    },
    doSearch(){
      if (this.result.status!==''){
        this.filterData()
      }
    },

    filterData() {
      if (this.result.search!=='' || this.result.status!=='' || this.result.parentCategory!=='' || this.result.subCategory!==''|| this.result.category_id!==''|| this.result.sort_by!==''){
        this.$emit('filter',this.result);
      }
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
    if(this.$route?.query.status)
    {
      this.result.status=this.$route?.query.status
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
    <div class="col-span-9">
      <div class="grid grid-cols-6 gap-4">
        <div>
          <div class="input-group flex">
            <input type="text" class="form-control" :placeholder="$t('prod.write_group_name')"
                   v-model="result.search"
                   @input="doSearch"
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
        <div class="flex col-span-2">
          <button type="button"
                  @click="filterData"
                  class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline long">
            {{ $t("app.Apply Filters") }}
          </button>
          <a
            class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-2 px-3 leading-normal no-underline bg-red-600 hover:bg-red-700 long mb-auto  ml-4 mr-4"
            href=""> {{ $t("prod.clear_filter") }} </a>
        </div>
      </div>
    </div>
    <div class="col-span-3">
      <div class="flex justify-end">
        <div class="form-group for-lang ar-lang mr-2 ml-2">
          <select class="border border-smooth p-3 rounded" v-model="result.status" @change="filterStatus">
            <option value="">{{ $t('prod.status') }}</option>
            <option value="pending">{{ $t('prod.pending_approval') }}</option>
            <option value="approved">{{ $t('prod.approved') }}</option>
            <option value="rejected">{{ $t('prod.rejected') }}</option>
            <option value="draft">{{ $t('prod.draft') }}</option>
            <option value="archived">{{ $t('prod.archived') }}</option>
            <option value="in_stock">{{ $t('prod.in_stock') }}</option>
            <option value="out_of_stock">{{ $t('prod.out_of_stock') }}</option>
          </select>
        </div>
        <div class="form-group for-lang ar-lang mr-2 ml-2">
          <select class="border border-smooth p-3 rounded" v-model="result.sort_by" @change="filterBySort">
            <option value="">{{ $t('prod.sortBy') }}</option>
            <option value="a_to_z">A to Z</option>
            <option value="z_to_a">Z to A</option>
            <option value="created_first">Created First</option>
            <option value="created_last">Created Last</option>
            <option value="update_new">Update New</option>
            <option value="update_old">Update Old</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
