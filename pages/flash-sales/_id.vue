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

      <div class="input-wrapper">
        <label>{{ $t('index.title') }}</label>
        <select>
          <option v-for="(item, index) in allFlashSale" :value="item.id" >{{ item.title }}</option>
        </select>
<!--        <input-->
<!--          type="text"-->
<!--          :placeholder="$t('index.title')"-->
<!--          v-model="result.title"-->
<!--          :class="{invalid: !!!result.title && hasError}"-->
<!--        >-->
<!--        <span-->
<!--          class="error"-->
<!--          v-if="!!!result.title && hasError"-->
<!--        >-->
<!--          {{ $t('category.req', {type: $t('index.title')}) }}-->
<!--        </span>-->
      </div>

      <div
        class="dply-felx block-xs mlr--7-5 inputs align-start j-left"
        :class="{'red-border': !!!result.start_time && hasError}"
      >
        <div
          class="input-wrapper mlr-7-5"
        >
          <label>{{ $t('prod.sTime') }}</label>
          <datetime
            format="YYYY-MM-DD H:i:s"
            width="300px"
            v-model="result.start_time"
            readonly
          />
          <span
            class="error"
            v-if="!!!result.start_time && hasError"
          >
            {{ $t('category.req', {type: $t('prod.sTime')}) }}
          </span>
        </div>

        <div
          class="input-wrapper mlr-7-5"
          :class="{'red-border': !!!result.end_time && hasError}"
        >
          <label>{{ $t('prod.eTime') }}</label>

          <datetime
            format="YYYY-MM-DD H:i:s"
            width="300px"
            v-model="result.end_time"
            readonly
          />
          <span
            class="error"
            v-if="!!!result.end_time && hasError"
          >
            {{ $t('category.req', {type: $t('prod.eTime')}) }}
          </span>
          <span
            class="error"
            v-else-if="!dateValidation && hasError"
          >
            {{ $t('prod.greater') }}
          </span>
        </div>

        <div
          class="input-wrapper mlr-7-5"
        >
          <label class="block">
            {{ $t('category.status') }}
          </label>

          <dropdown
            :selectedKey="`${result.status}`"
            :options="statusObj"
            @clicked="dropdownSelected"
          />
        </div>
      </div><!--dply-felx inputs-->

<!--      <product-search-->
<!--        ref="productSearch"-->
<!--        @product-clicked="addFlashProduct"-->
<!--      />-->

      <h4>{{ $t('fSale.sProd') }}</h4>
      <div class="table-wrapper mb-20 mb-sm-15">
        <table class="mn-w-600x">
          <tr class="lite-bold">
            <th>{{ $t('index.title') }}</th>
            <!--            <th>{{ $t('brand.price') }}({{ currencyIcon }})</th>-->
            <th>{{ $t('fSale.sPrice') }}({{ currencyIcon }})</th>
            <th>{{ $t('prod.offered') }}({{ currencyIcon }})</th>
            <th/>
          </tr>

          <tr
            v-for="(item, index) in result.products"
            :key="index"
            class="deletable"
            :class="{deleted: item.deleted}"
          >
            <td>
              <div>
                <nuxt-link
                  :to="`/products/${item.product.id}`"
                  class="dply-felx j-left"
                >
                  <lazy-image
                    class="mr-20"
                    :data-src="getThumbImageURL(item.product.image)"
                    :alt="item.product.title"
                  />

                  <h5 class="mx-w-400x">{{ item.product.title }}</h5>
                </nuxt-link>
              </div>

            </td>
            <td>
<!--              <price-format-->
<!--                :price="item.product.selling"-->
<!--              />-->
              <span>{{ item.product.selling }}</span>
            </td>
            <!--            <td>-->
            <!--              <price-format-->
            <!--                :price="item.product.offered"-->
            <!--              />-->
            <!--            </td>-->
            <td class="mx-w-130x">
              <input
                :disabled="item.deleted"
                type="number"
                step="any"
                v-model="item.product.offered"
                placeholder="Offered"
                @change="valueChanged(index)"
              />
            </td>
            <td
              class="undo-container"
            >
              <button
                v-if="item.deleted"
                @click.prevent="undoDelete(index)"
                class="lite-btn"
              >
                {{ $t('fSale.undo') }}
              </button>
              <button
                v-else
                @click.prevent="deleteProduct(index)"
                class="lite-btn delete-btn"
              >
                {{ $t('category.delete') }}
              </button>
            </td>
          </tr>

          <tfoot>
          <tr>
            <td></td>
            <td colspan="3"><span
              @click="ShowProductSearch"
              class="p-4 bg-primary text-white leading-3 cursor-pointer rounded">Add product</span></td>
          </tr>
          </tfoot>

        </table>
      </div>
<!--      <SearchFlashProduct-->
<!--        v-if="is_productSearch"-->
<!--        @close="closeProductSearch"-->
<!--      ></SearchFlashProduct>-->
      <div class="fixed bg-modal  inset-0 z-50 flex items-center justify-center" v-if="is_productSearch">
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-2/5">
          <svg @click="closeProductSearch"
               class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]"
               aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <h4>Select products</h4>
          <!-- Modal Content -->
          <div class="mb-4">
            <p>Search or select the product eligible for the promotion from the list below</p>
            <product-search2
              ref="productSearch"
              @product-clicked="addFlashProduct"
            />
<!--            <div>-->
<!--              <div class="flex gap-1">-->
<!--                -->
<!--                &lt;!&ndash;            <input placeholder="Search products" type="text">&ndash;&gt;-->
<!--                &lt;!&ndash;            <button class="p-2 justify-end leading-3 rounded bg-primary text-white ">Search</button>&ndash;&gt;-->
<!--              </div>-->
<!--            </div>-->
            <!--        <div class="flex py-2 gap-4">-->
            <!--          <select class="p-3 w-full border border-smooth rounded" name="" id="">-->
            <!--            <option value="">Cat 1</option>-->
            <!--            <option value="">Cat 2</option>-->
            <!--          </select>-->
            <!--          <select class="p-3 w-full border border-smooth rounded" name="" id="">-->
            <!--            <option value="">Sub Cat 1</option>-->
            <!--            <option value="">Sub Cat 2</option>-->
            <!--          </select>-->
            <!--          <select class="p-3 w-full border border-smooth rounded" name="" id="">-->
            <!--            <option value="">Sub sub Cat 1</option>-->
            <!--            <option value="">Sub sub Cat 2</option>-->
            <!--          </select>-->
            <!--        </div>-->
            <!--        <div class="h-[300px] scrolbar overflow-y-scroll">-->
            <!--          <table>-->
            <!--            <tr>-->
            <!--              <td><input style="width:20px" type="checkbox"></td>-->
            <!--              <td>Qty: 1223</td>-->
            <!--              <td>lorem ipsum lorem ipsum lorem ipsum</td>-->
            <!--              <td>Discount:122</td>-->
            <!--            </tr>-->
            <!--            <tr>-->
            <!--              <td><input style="width:20px" type="checkbox"></td>-->
            <!--              <td>Qty: 1223</td>-->
            <!--              <td>lorem ipsum lorem ipsum lorem ipsum</td>-->
            <!--              <td>Discount:122</td>-->
            <!--            </tr>-->
            <!--          </table>-->
            <!--        </div>-->
          </div>
          <!-- Close Button -->
          <div class="flex gap-4 justify-end">
            <button @click="closeProductSearch" class="p-2 justify-end leading-3 rounded bg-smooth text-primary ">
              Cancel
            </button>
            <button class="p-2 justify-end leading-3 rounded bg-primary text-white ">Submit</button>
          </div>

        </div>
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
import SearchFlashProduct from "@/pages/flash-sales/SearchFlashProduct.vue";

export default {
  name: "flash-sale",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      is_productSearch: false,
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
    SearchFlashProduct,
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
    ...mapGetters('common', ['allFlashSale'])

  },
  methods: {
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
      if (this.result.products.findIndex((o) => {
        return o.product.id === product.id
      }) === -1) {
        this.result.products.push({
          price: 0,
          product: {
            id: product.id,
            title: product.title,
            image: product.image,
            offered: product.offered,
            selling: product.minSellingPrice?.min_selling_price
          }
        })
      }
      this.$refs.productSearch.autoSuggestionClose()
    },
    dropdownSelected(data) {
      this.result.status = data.key
    },
    ShowProductSearch() {
      this.is_productSearch = true
    },
    closeProductSearch() {
      this.is_productSearch = false
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
    ...mapActions('common', ['getById']),
    ...mapActions('common', ['getAllFlashSale']),
  },


  async mounted() {
    try {
      await this.getAllFlashSale({api: 'getAllFlashSale', mutation: 'SET_ALL_FLASH_SALE'})
    } catch (e) {
      return this.$nuxt.error(e)
    }
    // try {
    //   await this.getAllFlashSale()
    // } catch (e) {
    //   return this.$nuxt.error(e)
    // }

  }

}
</script>

<style lang="stylus">

</style>
