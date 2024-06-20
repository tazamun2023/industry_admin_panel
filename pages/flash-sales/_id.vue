<template>
  <data-page
    class="detail-width"
    ref="dataPage"
    set-api="setFlashSaleAction"
    get-api="getFlashSaleAction"
    route-name="flash-sales"
    :name="$t('profile.fSale')"
    :result="result"
    :validationKeys="[]"
    gate="view_flash_sales"
    manage_gate="manage_flash_sales"
    @result="settingResult"
  >
    <template v-slot:form="{hasError}">
      <ValidationObserver class="w-full" v-slot="{ invalid }">
        <ValidationProvider name="flash_sale_id" rules="required" v-slot="{ errors }"
                            :custom-messages="{required: $t('global.req', { type: $t('prod.title')}) }">
          <div class="input-group mb-3">
            <label class="w-full" for="mainCategory">{{ $t('index.title') }}</label>
            <lang-input :hasError="hasError" type="text" :title="$t('prod.name')" :valuesOfLang="result.title"
                        @updateInput="updateInput"></lang-input>
            <!--          <select class="border p-3 w-50 border-smooth rounded-lg uppercase" v-model="result.flash_sale_id">-->
            <!--            <option v-for="(item, index) in allFlashSale" :value="item.id">{{ item.title }}</option>-->
            <!--          </select>-->
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
          <span class="error">{{ errors[0] }}</span>
        </ValidationProvider>

        <div
          class="dply-felx block-xs mlr--7-5 inputs align-start j-left"
          :class="{'red-border': !!!result.start_time && hasError}"
        >
          <ValidationProvider name="start_time" rules="required" v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.eTime')}) }">

            <div
              class="input-wrapper mlr-7-5"
            >
              <label>{{ $t('prod.sTime') }}</label>
              <input
                type="date"
                v-model="result.start_time"
                :min="getTodayFormattedDate()"
              >
            </div>
          </ValidationProvider>

          <ValidationProvider name="end_time" rules="required" v-slot="{ errors }"
                              :custom-messages="{required: $t('global.req', { type: $t('prod.eTime')}) }">
            <div
              class="input-wrapper mlr-7-5"
            >
              <label>{{ $t('prod.eTime') }}</label>

              <!--            <datetime-->
              <!--              format="YYYY-MM-DD H:i:s"-->
              <!--              width="300px"-->
              <!--              v-model="result.end_time"-->
              <!--              readonly-->
              <!--            />-->
              <input
                type="date"
                v-model="result.end_time"
                :min="getEndFormattedDate(result.start_time)"
              >
              <span class="error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

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

        <div class="flex justify-between items-center">
          <h4>{{ $t('fSale.sProd') }}</h4>
          <span @click="ShowProductSearch"
                class="p-4 bg-primary text-white leading-3 cursor-pointer rounded">{{ $t('prod.Add product') }}</span>
        </div>

        <div class="table-wrapper mb-20 mb-sm-15">
          <table class="mn-w-600x">
            <tr class="lite-bold">
              <th>{{ $t('products.min_order_qty') }}</th>
              <th>{{ $t('products.name') }}</th>
              <th>{{ $t('prod.offered') }}({{ percentIcon }})</th>
              <th class="min-w-[200px]">{{ $t('fSale.sPrice') }}({{ currencyIcon }})</th>
              <th/>
            </tr>

            <tr
              v-for="(item, index) in result.products"
              :key="index"
              class="deletable"
              :class="{deleted: item.deleted}"
            >
              <td class="mx-w-130x">
                <!--                <ValidationProvider name="offered" rules="required|min_value:1|max_value:100" v-slot="{ errors }"-->
                <!--                                    :custom-messages="{required: $t('global.req', { type: $t('prod.offered')}) }">-->
                <!--                  <input-->
                <!--                    :disabled="item.deleted"-->
                <!--                    type="number"-->
                <!--                    step="any"-->
                <!--                    v-model="item.product.quantity"-->
                <!--                    :placeholder="$t('index.qty')"-->
                <!--                    @change="valueChangedQty(index)"-->
                <!--                  />-->
                <div class="input-group mb-3">
                <select @change="valueChangedQty(index)" v-model="item.product.quantity">
                  <template v-for="price in item.pricing ">
                    <option :value="price.quantity">{{ price.quantity }} {{$t('products.Or More')}}</option>

                  </template>
                  <option v-if="!item.quantity_in_range" :value="item.product.min_quantity">
                    ({{ item.product.min_quantity }})   {{$t('products.invalid Quantity')}}
                  </option>
                </select>
                </div>
                <!--                  <span class="error">{{ errors[0] }}</span>-->
                <!--                </ValidationProvider>-->
              </td>
              <td>
                <div class="flex gap-4 items-center">
                  <lazy-image
                    class="mr-20"
                    :data-src="(item.product.image)"
                    :alt="item.product.title"
                  />
                  <h5 class="mx-w-400x">{{ item.product.title }}</h5>
                </div>

              </td>

              <!--            <td>-->
              <!--              <price-format-->
              <!--                :price="item.product.offered"-->
              <!--              />-->
              <!--            </td>-->

              <td class="mx-w-130x">
                <ValidationProvider name="offered" rules="required|min_value:1|max_value:100" v-slot="{ errors }"
                                    :custom-messages="{required: $t('global.req', { type: $t('prod.offered')}) }">
                  <input
                    :disabled="item.deleted"
                    type="number"
                    step="any"
                    v-model="item.product.offered"
                    :placeholder="$t('prod.offered')"
                    @change="valueChanged(index)"
                  />
                  <span class="error">{{ errors[0] }}</span>
                </ValidationProvider>
              </td>
              <td>
                <!--                "quantity": 5,-->
                <!--                "unit_price": "55.00",-->
                <!--                "selling_price": "52.00"-->
                <div class="flex flex-col">
                  <div v-for="(price,index) in item.pricing ">
                    <div class="flex flex-row flex-nowrap "
                         :class="[{'text-primary':price.quantity>=item.product.quantity},{'text-error':price.quantity<item.product.quantity}]">
                     <div class="min-w-[60px]">
                      <span>{{ price.quantity }}</span>
                      <span
                        v-if="item.pricing.length==(index+1) ||(item.pricing.length>(index+1)  && (item.pricing[index + 1]?.quantity-1 > price.quantity)) ">
                               {{ (item.pricing[index + 1]) ? (" - " + (item.pricing[index + 1]?.quantity - 1)) : "+" }}
                          </span>
                     </div>:
                      <span v-if="price.quantity>=item.product.quantity" class="mx-2">
                        (
                        <del class="mx-2"> {{ price.selling_price }}</del>

                        {{ Number(price.selling_price-(price.selling_price*item.product.offered/100) ).toFixed(2)}}
                        )
                      </span>
                      <span v-else class="mx-2">({{ price.selling_price }})</span>
                    </div>
                    <!--                    <span>{{ item.product.selling }}</span>-->
                  </div>
                </div>
                <!--              <price-format-->
                <!--                :price="item.product.selling"-->
                <!--              />-->

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
              <td colspan="3"></td>
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
            <h4>{{ $t('prod.Select products') }}</h4>
            <!-- Modal Content -->
            <div class="mb-4">
              <p>{{ $t('prod.Search or select the product eligible for the promotion from the list below') }}</p>
              <product-search2
                ref="productSearch"
                :type="'flash_sale'"
                @product-clicked="addFlashProduct"
              />
            </div>
            <!-- Close Button -->
            <div class="flex gap-4 justify-end">
              <button @click="closeProductSearch" class="p-2 justify-end leading-3 rounded bg-primary text-white">
                {{ $t('prod.Submit') }}
              </button>
            </div>

          </div>
        </div>
      </ValidationObserver>
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
import {extend} from "vee-validate";
import {ValidationObserver, ValidationProvider} from 'vee-validate';

extend('min', {
  validate(value, {length}) {
    return value.length >= length;
  },
  params: ['length'],
  message: 'The {_field_} field must have at least {length} characters'
});

export default {
  name: "flash-sale",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      is_productSearch: false,
      result: {
        id: '',
        title: {"ar": "", "en": ""},
        status: 2,
        start_time: '',
        end_time: '',
        time_zone: this.timeZone,
        flash_sale_id: '',
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
    Spinner,
    ValidationProvider,
    ValidationObserver
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
    percentIcon() {
      return this.setting?.percent_icon || '%'
    },
    ...mapGetters('setting', ['setting']),
    ...mapGetters('common', ['allFlashSale'])

  },
  methods: {
    getTodayFormattedDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    getEndFormattedDate(startTime) {
      if (startTime) {
        const endDate = new Date(startTime); // Convert start time to Date object
        endDate.setDate(endDate.getDate() + 1); // Add one day to the start time
        const year = endDate.getFullYear();
        const month = String(endDate.getMonth() + 1).padStart(2, '0');
        const day = String(endDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
    },

    settingResult(evt) {
      evt['start_time'] = moment(moment.utc(evt['start_time'])).local().format('YYYY-MM-DD')
      evt['end_time'] = moment(moment.utc(evt['end_time'])).local().format('YYYY-MM-DD')

      this.result = {...evt, time_zone: this.timeZone}
    },
    valueChanged(index) {
      // console.log(index)
      this.result.products[index] = {
        ...this.result.products[index],
        ...{updated: true}
      }
    },
    valueChangedQty(index) {
      // console.log(index)
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
            image: product.image ?? '',
            offered: product.offered??1,

            quantity: product.minOrderQuantity?.min_quantity ?? 0,
            selling: product.minSellingPrice?.min_selling_price ?? 0
          },
          pricing: product.pricing,
          quantity_in_range: true,
        })
      }
      this.$refs.productSearch.autoSuggestionClose()
    },
    updateInput(input, language, value) {
      this.$set(input, language, value);
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
