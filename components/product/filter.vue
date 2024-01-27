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
      isDropdownVisible: false,
      isShortDropdownVisible: false,
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
    ...mapGetters('common', ['allCategoriesTree', 'allCountries'])
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
    toggleDropdown() {
      // Toggle the visibility of the dropdown
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    toggleDropdownByShort() {
      // Toggle the visibility of the dropdown
      this.isShortDropdownVisible = !this.isShortDropdownVisible;
    },
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
    filterStatus(status) {
      this.result.status = status
      if (this.result.status !== '') {
        this.filterData()
      }
      this.isDropdownVisible = false
    },
    filterBySort(sort) {
      this.result.sort_by = sort;
      if (this.result.sort_by !== '') {
        this.filterData()
      }
      this.isShortDropdownVisible = false
    },
    doSearch() {
      if (this.result.status !== '') {
        this.filterData()
      }
    },
    clearFilterData(){
      this.result = []
      this.$emit('filter', this.result);
    },

    filterData() {
      if (this.result.search !== '' || this.result.status !== '' || this.result.parentCategory !== '' || this.result.subCategory !== '' || this.result.category_id !== '' || this.result.sort_by !== '') {
        this.$emit('filter', this.result);
      }
    },
    ...mapActions('common', ['getCategoriesTree', 'getAllCountries', 'emptyAllList'])
  },
  async mounted() {


    if (this.$route?.query.search) {
      this.result.search = this.$route?.query.search
    }
    if (this.$route?.query.country_id) {
      this.result.country_id = this.$route?.query.country_id
    }
    if (this.$route?.query.from_date) {
      this.result.from_date = this.$route?.query.from_date
    }
    if (this.$route?.query.to_date) {
      this.result.to_date = this.$route?.query.to_date
    }

    if (this.$route?.query.parentCategory) {
      this.result.parentCategory = parseInt(this.$route?.query.parentCategory)
      this.updateLevel2()
    }
    if (this.$route?.query.subCategory) {
      this.result.subCategory = parseInt(this.$route?.query.subCategory)
      this.updateLevel3()
    }

    if (this.$route?.query.category_id) {
      this.result.category_id = parseInt(this.$route?.query.category_id)
    }
    if (this.$route?.query.country_id) {
      this.result.country_id = parseInt(this.$route?.query.country_id)
    }
    if (this.$route?.query.multi_products) {
      this.result.multi_products = this.$route?.query.multi_products
    }
    if (this.$route?.query.status) {
      this.result.status = this.$route?.query.status
    }

    if (this.allCountries.length == 0) {
      try {
        await this.getAllCountries({api: 'getAllCountries', mutation: 'SET_ALL_COUNTRIES'})
      } catch (e) {
        return this.$nuxt.error(e)
      }
    }
    if (this.allCategoriesTree.length == 0) {
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
            class="inline-block align-middle cursor-pointer text-center select-none border font-normal whitespace-no-wrap rounded py-2 px-3 leading-normal no-underline bg-red-600 hover:bg-red-700 long mb-auto  ml-4 mr-4"
            @click.prevent="clearFilterData"> {{ $t("prod.clear_filter") }} </a>
        </div>
      </div>
    </div>
    <div class="col-span-3">
      <div class="flex justify-end">
        <div class="form-group for-lang ar-lang mr-2 ml-2">
          <button @click="toggleDropdown"
                  class="bg-blue-700 hover:bg-blue-800 relative font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
                  type="button">
            {{ $t('prod.status') }}
            <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 4 4 4-4"/>
            </svg>
          </button>

          <!-- filter by status menu -->
          <div v-if="isDropdownVisible"
               class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute ml-[-50px]">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <a class="block cursor-pointer px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                 @click.prevent="filterStatus('pending')">{{ $t('prod.pending_approval') }}</a>
              <a class="block cursor-pointer px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                 @click.prevent="filterStatus('approved')">{{ $t('prod.approved') }}</a>
              <a class="block cursor-pointer px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                 @click.prevent="filterStatus('rejected')">{{ $t('prod.rejected') }}</a>
              <a class="block cursor-pointer px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                 @click.prevent="filterStatus('draft')">{{ $t('prod.draft') }}</a>
              <a class="block cursor-pointer px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                 @click.prevent="filterStatus('archived')">{{ $t('prod.archived') }}</a>
              <a class="block cursor-pointer px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                 @click.prevent="filterStatus('in_stock')">{{ $t('prod.in_stock') }}</a>
              <a class="block cursor-pointer px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                 @click.prevent="filterStatus('out_of_stock')">{{ $t('prod.out_of_stock') }}</a>
            </ul>
          </div>
          <!-- end filter by status menu -->
        </div>
        <div class="form-group for-lang ar-lang mr-2 ml-2">
          <button @click="toggleDropdownByShort"
                  class="bg-blue-700 hover:bg-blue-800 relative font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
                  type="button">
            {{ $t('prod.sortBy') }}
            <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 4 4 4-4"/>
            </svg>
          </button>

          <!-- filter by status menu -->
          <div v-if="isShortDropdownVisible"
               class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute ml-[-50px]">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <a class="block cursor-pointer px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                 @click.prevent="filterBySort('a_to_z')">{{ $t('prod.a_to_z') }}</a>
              <a class="block cursor-pointer px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                 @click.prevent="filterBySort('z_to_a')">{{ $t('prod.z_to_a') }}</a>
              <a class="block cursor-pointer px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                 @click.prevent="filterBySort('created_first')">{{ $t('prod.created_first') }}</a>
              <a class="block cursor-pointer px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                 @click.prevent="filterBySort('created_last')">{{ $t('prod.created_last') }}</a>
              <a class="block cursor-pointer px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                 @click.prevent="filterBySort('update_new')">{{ $t('prod.update_new') }}</a>
              <a class="block cursor-pointer px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                 @click.prevent="filterBySort('update_old')">{{ $t('prod.Update Old') }}</a>
            </ul>
          </div>
          <!-- end filter by status menu -->
        </div>
      </div>
    </div>
  </div>
</template>
