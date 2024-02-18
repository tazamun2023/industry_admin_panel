<template>
  <data-page
    class="detail-width"
    ref="dataPage"
    set-api="setFlashSale"
    get-api="getFlashSale"
    route-name="flash-sales"
    :name="$t('profile.fSale')"
    :validation-keys="['title', 'start_time', 'end_time']"
    :result="result"
    gate="flash_sale"
    @result="settingResult"
  >
    <template v-slot:form="{hasError}">
      <div class="tab-sidebar p-4">
        <h4 class="title">
          Create flash sale
        </h4>
        <form class="p-4" action="">
          <div class="input-wrapper">
            <h5>Promotion Name</h5>
            <input type="text" placeholder="e.g. July 20% electronics discount">
            <label class="text-xs" for="">This helps you keep track of your promotions; customers won’t be able to see
              this name</label>
          </div>
          <div class="input-wrapper">
            <div class="flex gap-4">
              <div>
                <label for="">Start date</label>
                <input type="date">
              </div>
              <div>
                <label for="">End date</label>
                <input type="date">
              </div>
            </div>
          </div>
          <div class="input-wrapper">
            <label for="">Type of promotion you would like to offer</label>
            <div class="flex gap-4">
              <div class="flex gap-4"><input name="type" id="percentage" type="radio" value="percentage" checked> <label
                for="percentage">Apply % off your product</label></div>
            </div>
          </div>
          <div class="input-wrapper">
            <p>Choose one product you would like to assign a free product to.</p>
            <table>
              <thead>
              <tr>
                <th>Quantity</th>
                <th>Product</th>
                <th class="percent" v-show="promotionType !== 'gift'">Discount per unit</th>
              </tr>
              </thead>
              <tr>
                <td>121</td>
                <td>lorem ipsum lorem ipsum lorem ipsum</td>
                <td class="percent" v-show="promotionType !== 'gift'">10%</td>
              </tr>
              <tfoot>
              <tr>
                <td></td>
                <td><span @click="productSearchModal"
                          class="p-4 bg-primary text-white leading-3 cursor-pointer rounded">Add product</span></td>
                <td v-show="promotionType !== 'gift'"></td>
              </tr>
              </tfoot>
            </table>
          </div>
          <div class="text-end m-0">
            <button class="p-2 justify-end leading-3 rounded bg-primary text-white ">Submit</button>
          </div>
        </form>
        <template v-if="is_product_modal">
          <div class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
            <div class="absolute inset-0 bg-black opacity-50"></div>
            <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-2/5">
              <svg @click="productSearch=false"
                   class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]"
                   aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <h4>Select products</h4>
              <!-- Modal Content -->
              <div class="mb-4">
                <p>Search or select the product eligible for the promotion from the list below</p>
                <div>
                  <div class="flex gap-1">
                    <input placeholder="Search products" type="text">
                    <button class="p-2 justify-end leading-3 rounded bg-primary text-white ">Search</button>
                  </div>
                </div>
                <div class="flex py-2 gap-4">
                  <select class="p-3 w-full border border-smooth rounded" name="" id="">
                    <option value="">Cat 1</option>
                    <option value="">Cat 2</option>
                  </select>
                  <select class="p-3 w-full border border-smooth rounded" name="" id="">
                    <option value="">Sub Cat 1</option>
                    <option value="">Sub Cat 2</option>
                  </select>
                  <select class="p-3 w-full border border-smooth rounded" name="" id="">
                    <option value="">Sub sub Cat 1</option>
                    <option value="">Sub sub Cat 2</option>
                  </select>
                </div>
                <div class="h-[300px] scrolbar overflow-y-scroll">
                  <table>
                    <tr>
                      <td><input style="width:20px" type="checkbox"></td>
                      <td>Qty: 1223</td>
                      <td>lorem ipsum lorem ipsum lorem ipsum</td>
                      <td>Discount:122</td>
                    </tr>
                    <tr>
                      <td><input style="width:20px" type="checkbox"></td>
                      <td>Qty: 1223</td>
                      <td>lorem ipsum lorem ipsum lorem ipsum</td>
                      <td>Discount:122</td>
                    </tr>
                  </table>
                </div>
              </div>
              <!-- Close Button -->
              <div class="flex gap-4 justify-end">
                <button @click="productSearch=false" class="p-2 justify-end leading-3 rounded bg-smooth text-primary ">
                  Cancel
                </button>
                <button class="p-2 justify-end leading-3 rounded bg-primary text-white ">Submit</button>
              </div>

            </div>
          </div>

        </template>
      </div>

    </template>
  </data-page>
</template>

<script>

import datetime from 'vuejs-datetimepicker'
import {mapGetters, mapActions} from 'vuex'
import DataPage from '~/components/partials/DataPage'
import Dropdown from '~/components/Dropdown'
import Spinner from '~/components/Spinner'
import util from '~/mixin/util'
import {debounce} from 'debounce'
import moment from 'moment-timezone'
import ProductInventory from "../../components/partials/ProductInventory";
import ProductSearch from "../../components/partials/ProductSearch";
import LazyImage from "../../components/LazyImage";
import PriceFormat from "../../components/partials/PriceFormat";
import ProductSearch2 from "../../components/partials/ProductSearch2.vue";

export default {
  name: "flash-sale",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      is_product_modal: false,

      result: {
        id: '',
        title: '',
        status: 2,
        start_time: '',
        end_time: '',
        time_zone: this.timeZone,
        products: []
      }
    }
  },
  mixins: [util],
  components: {
    ProductSearch2,
    PriceFormat,
    LazyImage,
    ProductSearch,
    ProductInventory,
    DataPage,
    Dropdown,
    datetime,
    Spinner
  },
  watch: {
    searchedString: debounce(function () {
      this.fetchingData()
    }, 700)
  },
  computed: {
    dateValidation() {
      return new Date(this.result.end_time) > new Date(this.result.start_time)
    },
    currencyIcon() {
      return this.setting?.currency_icon || '$'
    },
    ...mapGetters('setting', ['setting']),
  },
  methods: {
    productSearchModal(){
      this.is_product_modal = true
    },
    settingResult(evt) {
      evt['start_time'] = moment(moment.utc(evt['start_time'])).local().format('YYYY-MM-DD HH:mm:ss')
      evt['end_time'] = moment(moment.utc(evt['end_time'])).local().format('YYYY-MM-DD HH:mm:ss')

      this.result = {...evt, time_zone: this.timeZone}
    },
    valueChanged(index) {
      this.result.products[index] = {
        ...this.result.products[index],
        ...{updated: true}
      }
    },
    addFlashProduct(product) {
      console.log('product', product)
      if (this.result.products.findIndex((o) => {
        return o.product.id === product.id
      }) === -1) {
        this.result.products.push({
          price: 0,
          product: {
            id: product.id,
            title: product.title,
            image: this.setThumbImage(product.thumb_image, product.first_thumb_image),
            offered: product.offered,
            selling: product.minSellingPrice?.min_selling_price
          }
        })
      }
      this.$refs.productSearch.autoSuggestionClose()
    },
    setThumbImage(thumb_url, url) {
      if (thumb_url !== null) {
        return thumb_url;
      } else {
        //if no thumb set then 1st image thumb
        return url;
      }
    },

    dropdownSelected(data) {
      this.result.status = data.key
    },
    deleteProduct(index) {
      this.result.products[index] = {
        ...this.result.products[index],
        ...{deleted: true}
      }
      this.result = {...this.result, ...{products: this.result.products}}
    },
    undoDelete(index) {
      this.result.products[index] = {
        ...this.result.products[index],
        ...{deleted: false}
      }
      this.result = {...this.result, ...{products: this.result.products}}
    },
    ...mapActions('common', ['getById'])
  },
  async mounted() {
  }
}
</script>

<style lang="stylus">

</style>
