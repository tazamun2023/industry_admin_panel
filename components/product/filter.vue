<template>
<div>
  <div class="grid grid-cols-12 mt-20 gap-4">
    <div class="col-span-8">
      <div class="grid grid-cols-4 gap-4">
        <div>
          <div class="input-group flex">
            <input type="text" class="form-control" placeholder="Write Group Name"
                   aria-label="Recipient's username" aria-describedby="button-addon2">
            <div class="relative">
              <button class="grp-check absolute border-0 right-0 top-0" type="button" id="button-addon2">
                <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="form-group for-lang ar-lang">
          <select class="border border-smooth p-3 rounded" name="" id="">
            <option value="">Search by Category</option>
            <option value="">category 1</option>
            <option value="">category 1</option>
          </select>
        </div>

        <div class="form-group for-lang ar-lang">
          <select class="border border-smooth p-3 rounded" name="" id="">
            <option value="">Select Sub Category</option>
            <option value="">category 1</option>
            <option value="">category 1</option>
          </select>
        </div>

        <div class="col-md-3">
          <div class="form-group for-lang ar-lang">
            <select class="border border-smooth p-3 rounded" name="" id="">
              <option value="">Select Child Category</option>
              <option value="">category 1</option>
              <option value="">category 1</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-4">
      <div class="flex justify-end">
        <div class="form-group for-lang ar-lang mr-2 ml-2">
          <select class="border border-smooth p-3 rounded" name="" id="">
            <option value="">Rejection reasons</option>
            <option value="">Attributes</option>
            <option value="">Images</option>
            <option value="">Description</option>
            <option value="">General</option>
            <option value="">Titles</option>
            <option value="">Keywords</option>
            <option value="">Key Features</option>
            <option value="">Basic Information</option>
          </select>
        </div>
        <div class="form-group for-lang ar-lang mr-2 ml-2">
          <select class="border border-smooth p-3 rounded" name="" id="">
            <option value="">Status</option>
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
            <option value="">Sort By</option>
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
  </div>
</div>
</template>

<script>

import ListPage from "~/components/partials/ListPage";
import util from '~/mixin/util'
import LazyImage from "~/components/LazyImage";
import bulkDelete from "~/mixin/bulkDelete";
import moment from 'moment-timezone'
import ProductFilter from "../../components/product/filter.vue";

export default {
  name: "product-list",
  middleware: ['common-middleware', 'auth'],


  data() {
    return {
      collapsedId: 0,
      isCollapsed: false,
      activeIndex: null,
      itemList: [],
      dataLoading: true,
    }
  },
  components: {
    ProductFilter,
    LazyImage,
    ListPage
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
  mixins: [util, bulkDelete],
  methods: {

    filterChanged(result) {

      console.log(result)
      this.$router.push({
        query: {
          ...this.$route.query,
          page: 1,
          orderBy: 'created_at',
          orderByType: 'desc',
          ...result
          // filter: this.checkedFilter.join(','),
        }
      })
    },
    toggleCollapse(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
      this.isCollapsed = !this.isCollapsed;
      if (index == this.collapsedId)
        this.collapsedId = 0;
      else
        this.collapsedId = index;
    },
    dateFormat(dataTime) {
      return moment(moment.utc(dataTime)).local().format('D MMMM YYYY')
    }

  },
  mounted() {

  }
}
</script>
