<template>
  <check-validity :gate="'submit_quotation'" class="detail-width">
    <div v-if="loading" class="spinner-wrapper">
      <spinner :radius="60" color="primary"/>
    </div>
    <div v-if="rfq">
      <div class="flex flex-wrap ">
        <div class="md:w-full pr-4 pl-4">
          <div class="relative flex flex-col min-w-0 rounded break-words card  bg-white border-1 ">
            <div class="py-3 px-6 mb-0 bg-gray-200  text-gray-900 sm:flex justify-between items-center  py-3">
              <h4 class="font-20"> {{ $t("rfq.RFQ details") }}</h4>
              <h4 class="font-20 ">
                <nuxt-link class="flex" :to="`/rfq`">
                  <svg class="w-6 h-6 text-gray-800  mr-2 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                       fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 5H1m0 0 4 4M1 5l4-4"/>
                  </svg>
                  {{ $t("rfq.Submit Quote") }}
                </nuxt-link>
              </h4>
            </div>
            <div class="flex-auto p-6">
              <div class="flex flex-wrap ">
                <div class="md:w-1/4 pr-4 pl-4 mb-10">
                  <label class="font-14 bold black">{{ $t("rfq.RFQ ID") }}:</label><br>
                  <label><a href=""> RFQ{{ rfq.id }}</a></label>
                </div>
                <div class="md:w-1/4 pr-4 pl-4  mb-10">
                  <label class="font-14 bold black">{{ $t("Submitted on") }} </label><br>
                  <label>{{ rfq.created }}</label>
                </div>
                <div class="md:w-1/4 pr-4 pl-4  mb-10">
                  <label class="font-14 bold black">{{ $t("rfq.Expires on") }}</label><br>
                  <label> {{ rfq.expiry_date }}</label>
                </div>
                <div class="md:w-1/4 pr-4 pl-4  mb-10">
                  <label class="font-14 bold black"> {{ $t("rfq.Received quotes") }}</label><br>
                  <label> {{ rfq.received_quotes }} </label>
                </div>
                <div class="md:w-1/4 pr-4 pl-4  mb-10">
                  <label class="font-14 bold black">{{ $t("rfq.Shipping country") }}:</label><br>
                  <label><a href=""><img style="width:20px;"
                                         src="httlabels://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/ae.svg"
                                         alt=""> {{
                      rfq.country.name
                    }}</a></label>
                </div>
                <div class="md:w-1/4 pr-4 pl-4  mb-10">
                  <label class="font-14 bold black">{{ $t("rfq.Shipping city") }}</label><br>
                  <label>{{ rfq.city.name }}</label>
                </div>
                <div class="md:w-1/4 pr-4 pl-4  mb-10">
                  <label class="font-14 bold black">{{ $t("rfq.Shipping terms") }}</label><br>
                  <label>
                    <template v-for="(term, index) in rfq.shipmen_terms">
                      <span>{{ term.name }}</span>
                      <span class="mx-2" v-if="index + 1 < rfq.shipmen_terms.length">,</span>

                    </template>
                  </label>
                </div>
                <div class="md:w-1/4 pr-4 pl-4  mb-10">
                  <label class="font-14 bold black"> {{ $t("rfq.Created on") }} </label><br>
                  <label>{{ rfq.created }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================== -->
      <div class="flex flex-wrap  mt-20">
        <div class="xl:w-full pr-4 pl-4 lg:w-full pr-4 pl-4">
          <!-- Card -->
          <div class="relative flex flex-col min-w-0  break-words card mb-20">
            <div class="py-4 px-6 mb-0">
              <h4>{{ $t('rfq.Select products to add to your quote') }}</h4>
            </div>
            <div class="flex-auto p-6 pb-2">
              <div class="product-list">
                <div class="block w-full overflow-auto scrolling-touch">
                  <table id="conditionTable" class="hoverable whitespace-no-wrap">
                    <thead>
                    <tr>
                      <th> #</th>
                      <th> {{ $t('products.Image') }}</th>
                      <th> {{ $t('products.Products') }}</th>
                      <th> {{ $t('products.Category') }}</th>
                      <th> {{ $t('products.Quantity') }}</th>
                      <th> {{ $t('products.Unit Target Price') }}</th>
                      <th> {{ $t("products.Total target price") }}</th>

                      <th>{{ $t('app.Actions') }}</th>
                    </tr>
                    </thead>
                    <tbody>

                    <template v-for="(product, k) in rfq.products">
                      <tr>
                        <td>{{ k + 1 }}</td>
                        <td>
                          <!--                          <img :src="product.image" alt="">-->
                          <lazy-image class="mr-15 img-40x" :data-src="product.image" :alt="product.name"/>
                        </td>
                        <td class="w-1/4"> {{ product.name }}</td>
                        <td>{{ product.category?.title }}</td>
                        <td>{{ product.quantity }} {{ product.unit.name }}</td>
                        <td>
                          <price-with-curency-format :price=" product.target_price"></price-with-curency-format>

                        </td>
                        <td>
                          <price-with-curency-format :price=" product.total_target_price"></price-with-curency-format>
                        </td>


                        <td>
                          <button href="" target="_blank" @click="toggleCollapse(product.id)" id="addToQuote"
                                  :disabled="isDisable"
                                  class="inline-block align-middle text-center bg-primary text-white select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline long  mt-20">
                            {{ product?.qoute?.product_id !== "" ? $t('rfq.EditQuote') : $t('rfq.add to quote') }}
                          </button>
                        </td>
                      </tr>
                      <tr v-if="isCollapsed && activeProductId == product.id" id="add_form">
                        <td colspan="8">
                          <ValidationObserver v-slot="{ invalid }">
                            <form action="">
                              <div class="grid grid-cols-6 gap-4">

                                <div class=" col-span-2 grid grid-cols-5 mb-96">
                                  <div class="col-span-5 ">
                                    <div v-if="product.qoute?.product_id>0" class="lg:px-2   max:h-12 ">
                                      <label class="mt-3 mb-2" for="">{{ $t('products.Products') }}*</label>
                                      <div class="flex rounded-lg h-full border border-smooth  flex-col">
                                        <div class="flex items-center  py-1">
                                          <p class="leading-relaxed textelipse  text-base">
                                            {{ product.qoute?.product.title }}
                                          </p>
                                          <button @click="deleteRfqProduct(product.id)" type="button"
                                                  title="Clear Selected"
                                                  aria-label="Clear Selected" class="vs__clear h-[30px]"
                                                  style="">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
                                              <path
                                                d="M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z"></path>
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <ProductSearch v-else ref="productSearch"

                                                   @product-clicked="addRFQProduct($event,product.id)">
                                      <template v-slot:labelRight>
                                        <!--                                        <nuxt-link to="to" ></nuxt-link>-->
                                        <!--                                        <NuxtLink to="/products/quote/add?quote="-->
                                        <!--                                                  class="leading-6 inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:text-primary sm:ml-3 sm:w-auto">-->
                                        <!--                                          {{ $t('app.Continue') }}-->
                                        <!--                                        </NuxtLink>-->

                                        <button type="button" @click="saveUploadNewProduct(product.id)"
                                                class="text-primary border-none  text-sm  hover:text-primary">
                                          {{ $t("rfq.Upload a new product") }} +
                                        </button>

                                      </template>
                                    </ProductSearch>
                                    <span class="error"
                                          v-if="!product.name ">{{
                                        $t('addressPopup.isRequired', {type: $t('products.name')})
                                      }}</span>

                                  </div>
                                  <!--                                  <div class="col-span-2 ">-->
                                  <!--                                    <button type="button" @click="addProduct"-->
                                  <!--                                            class="inline-block bg-primary w-50  align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline  text-white hover:text-primary"-->
                                  <!--                                            data-toggle="modal"-->
                                  <!--                                            data-target="#staticBackdrop">-->
                                  <!--                                      {{-->
                                  <!--                                        product.qoute.product_id !== "" ? $t('rfq.change') : $t('products.add')-->
                                  <!--                                      }}-->
                                  <!--                                    </button>-->
                                  <!--                                  </div>-->
                                </div>
                                <div class="">
                                  <ValidationProvider name="type" class="w-full" rules="required" v-slot="{ errors }"
                                                      :custom-messages="{ required: $t('rfq.quantityRequired') }">
                                    <label for="" class="mt-3 mb-2">{{ $t('products.Quantity') }}*</label>
                                    <div class="flex border rounded  border-smooth bg-white">
                                      <input name="quantity" v-model="rfq.products[k].qoute.quantity"
                                             placeholder="qty" required="" aria-required="true" type="number"
                                             class="block appearance-none w-full  px-2  text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded no-radius border-none">
                                      <!--                                      <select class="border-none w-50 bg-unit text-center" v-model="rfq.products[k].qoute.unit_id"-->
                                      <!--                                              id="">-->
                                      <!--                                        <template v-for="unit in allUnits">-->
                                      <!--                                          <option :value="unit.id">{{ unit.name }}</option>-->
                                      <!--                                        </template>-->
                                      <!--                                      </select>-->
                                    </div>
                                    <span class="error text-error">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                </div>
                                <div class="">
                                  <ValidationProvider tag="div" class="w-full" v-slot="{ errors }"
                                                      :rules="{required: true}"
                                                      :name="'product_unit_' + k">
                                    <label class="mt-3 mb-2" for="">{{ $t('unit.unit') }} <span
                                      class="text-error">*</span></label>
                                    <v-select
                                      v-model="rfq.products[k].qoute.unit_id"
                                      :dir="$t('app.dir')"
                                      :options="allUnits"
                                      label="name"
                                      max-height="150"
                                      :searchable="false"
                                      :allow-empty="false"
                                      :placeholder="$t('products.Unit')"
                                      :reduce="c => c.id"
                                    ></v-select>
                                    <span class="error">{{ errors[0] }}</span>

                                  </ValidationProvider>

                                </div>
                                <div>
                                  <ValidationProvider name="type" class="w-full" rules="required" v-slot="{ errors }"
                                                      :custom-messages="{ required: `${$t('rfq.UnitpriceRequired')}` }">
                                    <label class="mt-3 mb-2" for="">{{ $t('rfq.Unit offer price') }}*</label>
                                    <div class="flex border rounded  border-smooth bg-white">
                                      <label class="p-3" for="">{{ $t('app.SAR') }}</label>
                                      <input type="number" v-model="rfq.products[k].qoute.total_offer_price"
                                             min="1"
                                             @input="validateTotalPrice(k, $event)" placeholder="0"
                                             class="block appearance-none w-full py-1 px-2  text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded no-radius border-none">
                                    </div>
                                    <span class="error text-error"
                                          v-if="rfq.products[k].qoute.product_id && (rfq.products[k].qoute.total_offer_price == ''
                                        || rfq.products[k].qoute.total_offer_price == 0)  && change
                                      ">{{ $t('rfq.costPriceGreater1') }}</span>
                                    <span v-if="rfq.products[k].qoute.product_id" class="error text-error">{{
                                        errors[0]
                                      }}</span>
                                  </ValidationProvider>
                                </div>

                                <div v-if="product.qoute">
                                  <label class="mt-3 mb-2" for=""> {{ $t('rfq.Total target price') }}*</label>
                                  <div class="flex border rounded  border-smooth bg-white">
                                    <label class="p-3" for="">{{ $t('app.SAR') }}</label>
                                    <input name="quantity" placeholder="0"
                                           :value="rfq.products[k].qoute.quantity * rfq.products[k].qoute.total_offer_price"
                                           disabled
                                           class="block appearance-none w-full py-1 px-2  text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded no-radius border-none">
                                  </div>
                                  <div class="mb-4 text-right flex justify-center">
                                    <button v-if="product?.qoute?.product_id !== ''" id="add_form_cancel"
                                            @click.prevent="
                                          deleteProduct(k)
                                          , toggleCollapse('', 1)"
                                            class="inline-block align-middle text-center select-none border
                                       font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline  long mb-auto mt-20 ml-2 mr-2">
                                      {{ $t('rfq.Remove') }}
                                    </button>
                                    <button id="add_form_cancel" @click="toggleCollapse"
                                            class="inline-block align-middle text-center select-none border
                                      font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline  long mb-auto mt-20 ml-2 mr-2">
                                      {{ $t('app.Cancel') }}
                                    </button>
                                    <!--                                    :disabled="rfq.products[k].qoute.disabled"-->
                                    <button
                                      :disabled="!( rfq.products[k].qoute.unit_id>0 && rfq.products[k].qoute.quantity>0  && rfq.products[k].qoute.total_offer_price>0  )"
                                      v-if="rfq.products[k].qoute.product_id" type="button"
                                      @click="toggleCollapse('', 1)" class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded
                                       py-1 px-3 leading-normal no-underline bg-red-600 text-white  bg-primary  hover:text-primary
                                        long mt-20">
                                      {{ $t('app.Save') }}
                                    </button>

                                  </div>
                                </div>
                              </div>

                            </form>
                          </ValidationObserver>
                        </td>
                      </tr>
                      <tr v-if="!isCollapsed && activeProductId !== product.id && product?.qoute?.product_id !== ''">
                        <td colspan="8">
                          <div class="grid grid-cols-5 gap-4 bg-[#fafafa] border-[0.5px] border-solid
                                 border-[#BFBFBF] rounded-15 my-2 p-20">
                            <div>
                              <label for="">{{ $t('products.name') }}</label>
                              <div class="flex  rounded p-1  ">
                                  <span class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal  text-gray-800
                                          rounded no-radius border-none font-bold">{{ product.qoute?.product?.title }}
                                  </span>
                              </div>
                            </div>
                            <div>
                              <label for="">{{ $t('rfq.Quantity') }}</label>
                              <div class="flex  rounded p-1  ">
                                  <span class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal  text-gray-800
                                          rounded no-radius border-none font-bold">{{ product.qoute?.quantity }} {{
                                      product.unit.name
                                    }}
                                  </span>
                              </div>
                            </div>
                            <div>
                              <label for="">{{ $t('rfq.Unit offer price') }}</label>
                              <div class="flex  rounded p-1  ">
                                  <span class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal  text-gray-800
                                        rounded no-radius font-bold ">{{ product.qoute?.total_offer_price }}
                                    {{ $t('app.SAR') }}
                                  </span>
                              </div>
                            </div>
                            <div>
                              <label for=""> {{ $t('rfq.Total target price') }}</label>
                              <div class="flex  rounded p-1  ">
                                  <span class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal  text-gray-800
                                          rounded no-radius font-bold border-none text-orange-500">{{
                                      product.qoute?.total_offer_price * product.qoute?.quantity
                                    }}
                                    {{ $t('app.SAR') }}
                                  </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!-- End Card -->
        </div>
      </div>
      <!-- ================= -->
      <div class="flex flex-wrap mt-20">
        <div class="xl:w-full  lg:w-full pr-4 pl-4">
          <!-- Card -->
          <div class="relative flex flex-col min-w-0 rounded break-words card mb-20">
            <div class="py-3 px-6 mb-0 bg-gray-200  text-gray-900  py-3">
              <h4>{{ $t('rfq.Additional information') }}</h4>
            </div>
            <div class="flex-auto p-4">

              <div class="flex flex-wrap ">
                <div class="md:w-1/3 pr-4 pl-4">
                  <div class="mb-4">
                    <label for="">{{ $t('rfq.quote_expired_message') }}</label>
                    <!--                    <datepicker :type="'date'" v-model="result.expiry_date" :default-value="new Date()"-->
                    <!--                                :format="dateFormat" :disabled-date="disabledBeforeTodayAndAfterAWeek"></datepicker>-->

                    <datepicker class="mbwidth " v-model="result.expiry_date" :type="'date'"
                                :default-value="new Date()" :format="dateFormat"

                                :disabled-date="disabledBeforeTodayAndAfterAWeek"></datepicker>

                  </div>
                </div>
                <div class="md:w-full pr-4 pl-4">
                  <div class="mb-4">
                    <label for=""> {{ $t('rfq.Additional Details') }}</label>
                    <textarea v-model="result.additional_details" class="theme-input-style" id=""
                              :placeholder="$t('rfq.Additional Details Message')" cols="30" rows="10"></textarea>
                  </div>
                </div>
                <div class="md:w-full pr-4 pl-4">
                  <div class="mb-4 text-right">
                    <button id="add_form_cancel" @click="addDraftQuote('add')"
                            class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline long mb-auto  ml-4 mr-4">
                      {{ $t('prod.Save Draft') }}

                    </button>
                    <button v-if="rfq?.quotation_id>0 && rfq?.status_quotes=='draft'" id="add_form_cancel"
                            @click="addDraftQuote('discard')"
                            class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline long mb-auto  ml-4 mr-4">
                      {{ $t('app.Discard Draft') }}
                    </button>
                    <button type="button" :disabled="!canSend" @click="addQuote"
                            class="inline-block align-middle text-center select-none border bg-primary font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline  text-white   long lg">
                      {{ $t('app.Done') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </check-validity>
</template>
<script>


import AjaxButton from '~/components/AjaxButton'
import Spinner from '~/components/Spinner'
import util from '~/mixin/util'
import {mapGetters, mapActions} from 'vuex'
import outsideClick from '~/directives/outside-click'
import ProductSearch from "../../components/partials/ProductSearch.vue";
import LazyImage from "../../components/LazyImage.vue";
import ProductSearch2 from "../../components/partials/ProductSearch2.vue";
import Datepicker from 'vue2-datepicker';
import {ValidationObserver, ValidationProvider} from "vee-validate";
import PriceWithCurencyFormat from "../../components/priceWithCurencyFormat.vue";

export default {

  name: "RFQDetails",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      dateFormat: 'Y-MM-DD',
      // lang: {
      //   formatLocale: {
      //     firstDayOfWeek: 1,
      //   },
      //   monthBeforeYear: false,
      // },
      activeProductId: 0,
      isCollapsed: false,
      isDisable: false,
      open: false,
      validPrice: false,
      tableShow: '',
      is_upload: '',
      uploadNewText: false,
      copy_from_product: false,
      select_from_my_catalog: false,
      upload_new_product: false,
      result: {
        id: "",
        rfq_id: "",
        additional_details: "",
        expiry_date: "",
        is_draft: false,
        products: []
      },
      minDate: null,
      rfq: null,
      loading: false,
      productData: [],
      prod: "",
      change: false
    }
  },
  directives: {outsideClick},
  mixins: [util],
  components: {
    PriceWithCurencyFormat,
    Datepicker,
    ProductSearch2,
    LazyImage,
    ProductSearch,
    AjaxButton,
    Spinner,
    ValidationObserver, ValidationProvider
  },
  computed: {
    productList() {
      return this.productData?.data || []
    },
    id() {
      return this.$route?.params?.id
    },

    canSend() {
      return (
        (this.result.products.length > 0) &&
        (this.result.expiry_date != null && this.result.expiry_date != ""
          && (new Date(this.result.expiry_date) > new Date()))
      )
    },
    ...mapGetters('common', ['allUnits',])
  },
  methods: {
    ...mapActions('common', ['getRequest']),
    async fetchingDataList() {
      this.fetchingProductList = true
      try {
        this.productData = await this.getRequest({
          params: {
            page: this.productPage,
            orderby: 'created_at',
            type: 'DESC',
            search: this.searchedString,
            page_type: this.type,
            type_selected: this.type
          },
          api: 'getProducts'
        })

      } catch (e) {
        return this.$nuxt.error(e)
      }
      // this.fetchingProductList = false
    },
    validateTotalPrice(k, val) {
      this.change = true;
      if (this.rfq.products[k]?.qoute.total_offer_price == "" || this.rfq.products[k]?.qoute.total_offer_price == 0) {
        this.$set(this.rfq.products[k].qoute, 'disabled', true);
        if (val.target.value == '') {
          this.$set(this.rfq.products[k].qoute, 'total_offer_price', 0);
        }
      } else {
        this.$set(this.rfq.products[k].qoute, 'disabled', false);
        if (val.target.value == '') {
          this.$set(this.rfq.products[k].qoute, 'total_offer_price', 0);
        }
      }
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const formattedMonth = month < 10 ? `0${month}` : month;
      const formattedDay = day < 10 ? `0${day}` : day;
      return `${year}-${formattedMonth}-${formattedDay}`;
    },
    disabledBeforeTodayAndAfterAWeek(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const minSelectableDate = new Date(today.getTime() + 3 * 24 * 3600 * 1000);
      return date < minSelectableDate;
    },

    getTodayDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate() + 3;
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    },
    async deleteProduct(index) {
      this.rfq.products[index].qoute.product.title = '';
      this.rfq.products[index].qoute.product_id = '';
    },

    toggleCollapse(id = "", save = 0) {
      this.isCollapsed = !this.isCollapsed;
      this.isDisable = !this.isDisable;
      this.activeProductId = id
      if (save == 1)
        this.save()
    },
    save() {
      // this.$swal({
      //   title: "Are you sure?",
      //   icon: "question",
      //   iconHtml: "؟",
      //   confirmButtonText: "Yes",
      //   cancelButtonText: "Noا",
      //   showCancelButton: true,
      //   showCloseButton: true
      // });
      this.result.rfq_id = this.id
      let products = this.rfq.products
      let qoutes = [];
      for (var i = 0; i < products.length; i++) {
        let q = products[i].qoute;
        if (q?.product_id >= 0 && q?.unit_id > 0) {
          qoutes.push({
            product_id: q.product_id,
            unit_id: q.unit_id,
            quantity: q.quantity,
            rfq_product_id: q.rfq_product_id,
            total_offer_price: q.total_offer_price,
            disabled: q.total_offer_price == '' || q.total_offer_price == 0 ? true : false
          })
        }
      }
      this.result = {...this.result, products: qoutes}
      // console.log(this.result)
    },
    async addQuote() {
      this.result.expiry_date = this.formatDate(this.result.expiry_date)
      console.log('this.result', this.result)
      this.result.is_draft = false;
      this.save()
      if (this.canSend)
        await this.setById({
          id: this.id,
          params: this.result,
          api: 'setQuote'
        }).then((res) => {
          console.log('respose', res)
          return this.$router.push(`/rfq/quotation-details/` + res.data.quotation_id)
        })
    },
    async addDraftQuote(type) {
      this.result.expiry_date = this.result.expiry_date ? this.formatDate(this.result.expiry_date) : null
      this.result.is_draft = true
      this.result.draft_action = type
      this.save()
      // if (this.canSend)
      this.setById({
        id: this.id,
        params: this.result,
        api: 'setQuote'
      }).then((res) => {
        console.log(res)
        console.log(res.data)
        this.rfq = res.data
        this.saveDataResponce()
        if (type === 'add')
          this.$router.push(`/rfq`)

        // alert('saved')
      })


    },
    addProduct() {
      this.open = true;
      this.tableShow = 'select_from_my_catalog'
    },
    async saveSelectedProduct() {
      this.open = false
      if (this.tableShow === 'copy_from_product') {
        this.result.is_draft = true
        var rfqProduct = this.rfq.products.find(p => p.qoute.rfq_product_id == this.activeProductId);
        await this.setById({
          id: this.id,
          params: this.result,
          api: 'setQuote'
        }).then((res) => {
          alert('true')
          return this.$router.push(`/products/add?id=` + rfqProduct.qoute.product.id + `&rfq_product_id=` + this.activeProductId + `&quote=` + res.id)
        })
      }

    },
    async saveUploadNewProduct(activeProductId) {
      this.open = false
      // if (this.tableShow === 'upload_new_product') {
      this.result.is_draft = true
      this.result.rfq_id = this.id
      var rfqProduct = this.rfq.products.find(p => p.qoute.rfq_product_id == activeProductId);

      await this.setById({
        id: this.id,
        params: this.result,
        api: 'setQuote'
      }).then((res) => {
        return this.$router.push({
          path: '/products/add',
          query: {
            rfq_product_id: activeProductId,
            quote: this.id
          }
        });
        //  this.$router.push(`/products/quote/add?rfq_product_id=` + this.activeProductId + `&quote=` + res.id)
      })
      // }

    },
    cancel() {
      this.open = false
      var rfqProduct = this.rfq.products.find(p => p.qoute.rfq_product_id == this.activeProductId);
      rfqProduct.qoute.product = {};
      rfqProduct.qoute.product_id = "";
    },
    changeValues() {
      this.tableShow = false
    },
    tableNotShow(tab = null) {
      this.tableShow = false;
      this.uploadNewText = true;
      this.is_upload = tab
      this.upload_new_product = tab
    },
    productTableShow(type) {
      this.tableShow = type;
      this.uploadNewText = false;
      // if(type == 'select_from_my_catalog') {
      //   this.select_from_my_catalog = !this.select_from_my_catalog
      // }
      // if(type == 'copy_from_product') this.copy_from_product = true ;
      // if(type == 'upload_new_product') this.upload_new_product = true ;
    },
    addRFQProduct(product, activeProductId) {

      var rfqProduct = this.rfq.products.find(p => p.qoute.rfq_product_id == activeProductId);
      console.log(product, activeProductId, rfqProduct)
      rfqProduct.qoute.product = product;
      rfqProduct.qoute.product_id = product.id;
      // this.$refs.productSearch.autoSuggestionClose()
      this.save()
      var index = this.rfq.products.findIndex(p => p.product_id === rfqProduct.product_id);
      this.$set(this.rfq.products[index].qoute, 'unit_id', rfqProduct.unit.id);
    },
    deleteRfqProduct(activeProductId) {

      var rfqProduct = this.rfq.products.find(p => p.qoute.rfq_product_id == activeProductId);
      rfqProduct.qoute.product_id = null;
      // this.$refs.productSearch.autoSuggestionClose()
      this.save()
    },
    saveDataResponce() {
      if (this.rfq.quote != null) {
        if (this.rfq.quote.status != 'draft')
          return this.$router.push(`/rfq/quotation-details/` + this.rfq.quotation_id)
        // this.result.expiry_date =
        this.result.expiry_date = this.rfq.quote.expiry_date
        this.result.additional_details = this.rfq.quote.additional_details
      } else {
        this.result.expiry_date = ""
        this.result.additional_details = ""
      }


      this.result.products = []

      for (var i = 0; i < this.rfq.products.length; i++) {
        // if (i< this.rfq.quote.products.length&&(!this.rfq.products[i].find(q => q.rfq_product_id == this.rfq.products[i].id)))
        var rfq_product = this.rfq.products[i];
        if (this.rfq.quote != null && this.rfq.quote.products.findIndex(p => p.rfq_product_id == this.rfq.products[i].id) > -1) {
          let p = this.rfq.quote.products.find(p => p.rfq_product_id == this.rfq.products[i].id);
          this.rfq.products[i].qoute = ({
            rfq_product_id: p.rfq_product_id,
            product: p.product,
            unit: p.unit,
            unit_id: p.unit?.id ?? rfq_product.unit_id,
            product_id: p.product.id,
            id: p.id,
            quantity: p.quantity ?? rfq_product.quantity,
            total_offer_price: p.total_offer_price ?? rfq_product.target_price,
            disabled: p?.total_offer_price == '' || p?.total_offer_price == 0 ? true : false
          })
        } else
          this.rfq.products[i].qoute = ({
            rfq_product_id: rfq_product.id,
            product: {},
            unit: {},
            unit_id: rfq_product.unit_id,
            product_id: "",
            id: "",
            quantity: rfq_product.quantity,
            total_offer_price: rfq_product.target_price,
            disabled: true
          })
        console.log('point', this.rfq.products[i].qoute);
      }

      this.save()

    },
    async fetchingData() {
      try {
        this.loading = true
        this.rfq = Object.assign({}, await this.getById({
          id: this.id,
          params: {time_zone: this.timeZone},
          api: 'getRFQ'
        }))
        this.saveDataResponce()
        console.log("this.rfq.products")
        console.log(this.rfq.products)

        this.loading = false
      } catch (e) {
        return this.$nuxt.error(e)
      }
    },

    ...mapActions('common', ['setRequest', 'getById', 'setById']),
    ...mapActions('common', ['getAllUnits'])
  },
  async mounted() {
    this.minDate = this.getTodayDate();
    await this.fetchingData()
    await this.fetchingDataList()
    this.select_from_my_catalog = true;

    if (this.allUnits.length == 0) {
      try {
        await this.getAllUnits()
      } catch (e) {
        return this.$nuxt.error(e)
      }
    }
  }
}
</script>
<style>
.both-border {
  border: 1px solid #ced4da;
  border-radius: 7px !important;
  background: #e9ecef;
  padding: 2px;
}

.vs--single .vs__selected {

  width: auto;

}

.border-none {
  border: 0px !important;
}

.no-radius {
  border-radius: 0px !important;
}
</style>


