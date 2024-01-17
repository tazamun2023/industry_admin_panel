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
        id: '',
        title: '',
        status: 2,
        featured: 2,
        parent: '',
        slug: '',

        parentCaregory: '',
        subCaregory: '',
        category_id: '',
        meta_description: '',
        in_footer: 2,
        meta_title: '',
        image: ''
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
    ...mapGetters('common', ['allCategoriesTree'])
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
      this.result.subCaregory = "";  // Reset Level 2 selection
      this.result.category_id = "";  // Reset Level 2 selection
      this.selectedLevel1 = this.allCategoriesTree.find(c => c.id == (this.result.parentCaregory));
      this.selectedLevel2 = null;  // Reset Level 2 selection
    },
    updateLevel3() {
      this.result.category_id = "";
     this.selectedLevel2 = this.selectedLevel1.child.find(c => c.id === parseInt(this.result.subCaregory));

    },
    ...mapActions('common', ['getCategoriesTree', 'emptyAllList'])
  },
  async mounted() {
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
  <div class="flex flex-wrap card  relative flex flex-col min-w-0 rounded break-words  bg-white border-1">
    <div class="md:w-full py-3">
      <div class="flex flex-wrap ">
        <div class="md:w-1/5 pr-4 pl-4">
          <div class="mb-4">
            <label for="">{{ $t("rfq.RFQ ID") }}</label>
            <input type="text" class="theme-input-style" :placeholder="$t('rfq.Search by RFQ ID or Product')">
          </div>
        </div>
        {{ result }}


          <!-- First Select - Search by Category -->
          <div class="md:w-1/5 pr-4 pl-4">

              <label for="">{{ $t("rfq.Search by Category") }}</label>
              <v-select
                :dir="$t('app.dir')"
                v-model="result.parentCaregory"
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
            <div class="mb-4 for-lang">
              <label for="">{{ $t("rfq.Select Sub Category") }}</label>
              <v-select
                :dir="$t('app.dir')"
                v-model="result.subCaregory"
                :options="selectedLevel1?.child"
                label="title"
                :reduce="cat => cat.id"
                class="custom-select"
                :placeholder="$t('rfq.Select Sub Category')"
                @input="updateLevel3"
              ></v-select>
            </div>
          </div>

          <!-- Third Select - Select Child Category -->
          <div class="md:w-1/5 pr-4 pl-4">
            <div class="mb-4 for-lang">
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
          </div>
        <div class="md:w-1/5 pr-4 pl-4">
          <div class="mb-4 for-lang">
            <label for=""> {{ $t("rfq.RFQ Type") }} </label>
            <select
              class="bg-gray-50 border border-smooth text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
              name="" id="">
              <option value="">Select on Option</option>
              <option value="">Single product</option>
              <option value="">Multi-product</option>
            </select>
          </div>
        </div>
        <div class="md:w-1/5 pr-4 pl-4">
          <div class="mb-4 for-lang">
            <label for=""> {{ $t("rfq.Location") }} </label>
            <select
              class="bg-gray-50 border border-smooth text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
              name="" id="">
              <option value="">Select on Option</option>
              <option value="">Bangladesh</option>
              <option value="">Yemeen</option>
            </select>
          </div>
        </div>
        <div class="md:w-1/5 pr-4 pl-4">
          <div class="mb-4">
            <label for=""> {{ $t("app.from") }} </label>
            <input type="date" class="theme-input-style" placeholder="From (creation)">
          </div>
        </div>
        <div class="md:w-1/5 pr-4 pl-4">
          <div class="mb-4">
            <label for=""> {{ $t("app.to") }} </label>
            <input type="date" class="theme-input-style" placeholder="To (creation)">
          </div>
        </div>
        <div class="md:w-1/3 pr-4 pl-4">
          <div class="mb-4">
            <button type="button"
                    class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline long mt-20">
              {{ $t("app.Apply Filters") }}
            </button>
            <a
              class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-red-600 text-white hover:bg-red-700 long mb-auto mt-20 ml-4 mr-4"
              href=""> {{ $t("app.Clear Filter") }} </a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
