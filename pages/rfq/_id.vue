<template>
  <check-validity :gate="'submit_quotation'" class="detail-width">
    <div v-if="loading" class="spinner-wrapper">
      <spinner :radius="60" color="primary" />
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
                      d="M13 5H1m0 0 4 4M1 5l4-4" />
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
                        src="httlabels://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/ae.svg" alt=""> {{
                          rfq.country.name }}</a></label>
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
                            <lazy-image class="mr-15 img-40x" :data-src="product.image" :alt="product.name" />
                          </td>
                          <td class="w-1/4"> {{ product.name }}</td>
                          <td>{{ product.category?.title }}</td>
                          <td>{{ product.quantity }} {{ product.unit.name }}</td>
                          <td> {{
                            product.target_price.toLocaleString($t('app.currency_local'), {
                              style: 'currency',
                              maximumFractionDigits: 0,
                              currency: 'SAR'
                            })
                          }}
                          </td>
                          <td> {{
                            product.total_target_price.toLocaleString($t('app.currency_local'), {
                              style: 'currency',
                              maximumFractionDigits: 0,
                              currency: 'SAR'
                            })
                          }}
                          </td>


                          <td>
                            <button href="" target="_blank" @click="toggleCollapse(product.id)" id="addToQuote"
                              :disabled="isDisable"
                              class="inline-block align-middle text-center bg-primary text-white select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline long  mt-20">
                              {{ product.qoute.product_id !== "" ? $t('rfq.Edit Quote') : $t('rfq.add to quote') }}
                            </button>
                          </td>
                        </tr>
                        <tr v-if="isCollapsed && activeProductId == product.id" id="add_form">
                          <td colspan="8">
                            <ValidationObserver  v-slot="{ invalid }">
                            <form action="">
                              <div class="grid grid-cols-5 gap-4">
                                <div class="col-span-2">
                                  <label for="">{{ $t('products.name') }}*</label>
                                  <div class="flex border rounded p-1 border-smooth bg-white">
                                    <button type="button" @click="addProduct"
                                      class="inline-block bg-primary w-50  align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline  text-white hover:text-primary"
                                      data-toggle="modal" data-target="#staticBackdrop">
                                      {{ product.qoute.product_id !== "" ? $t('rfq.change') : $t('products.add') }}
                                    </button>
                                    <span
                                      class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded no-radius border-none">
                                      {{ product.qoute.product.title }}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <ValidationProvider name="type" class="w-full" rules="required"
                                    v-slot="{ errors }"
                                    :custom-messages="{ required: $t('rfq.quantityRequired')}">
                                  <label for="">{{ $t('products.Quantity') }}*</label>
                                  <div class="flex border rounded p-1 border-smooth bg-white">
                                    <input name="quantity" v-model="rfq.products[k].qoute.quantity" placeholder="qty"
                                      required="" aria-required="true" type="number"
                                      class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded no-radius border-none">
                                    <select class="border-none w-50 bg-unit" v-model="rfq.products[k].qoute.unit_id" id="">
                                      <template v-for="unit in allUnits">
                                        <option :value="unit.id" >{{ unit.name }}</option>
                                      </template>
                                    </select>
                                  </div>
                                  <span  class="error text-error">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                </div>
                                <div>
                                  <ValidationProvider name="type" class="w-full" rules="required"
                                    v-slot="{ errors }"
                                    :custom-messages="{ required: `${$t('rfq.UnitpriceRequired')}` }">
                                    <label for="">{{ $t('rfq.Unit offer price') }}*</label>
                                    <div class="flex border rounded p-1 border-smooth bg-white">
                                      <label class="p-3" for="">{{ $t('app.SAR') }}</label>
                                      <input type="number" v-model="rfq.products[k].qoute.total_offer_price"
                                      @blur="validateTotalPrice(k, $event)"
                                        placeholder="0" 
                                        class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded no-radius border-none">
                                    </div>
                                    <span class="error text-error" v-if="rfq.products[k].qoute.product_id && (rfq.products[k].qoute.total_offer_price == ''
                                      || rfq.products[k].qoute.total_offer_price == 0)
                                    ">{{ $t('rfq.costPriceGreater1') }}</span>
                                    <span v-if="rfq.products[k].qoute.product_id" class="error text-error">{{ errors[0] }}</span>
                                  </ValidationProvider>
                                </div>

                                <div>
                                  <label for=""> {{ $t('rfq.Total target price') }}*</label>
                                  <div class="flex border rounded p-1 border-smooth bg-white">
                                    <label class="p-3" for="">{{ $t('app.SAR') }}</label>
                                    <input name="quantity" placeholder="0"
                                      :value="rfq.products[k].qoute.quantity * rfq.products[k].qoute.total_offer_price"
                                      disabled
                                      class="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded no-radius border-none">
                                  </div>
                                  <div class="mb-4 text-right flex justify-center">
                                    <button v-if="product.qoute.product_id !== ''" id="add_form_cancel" @click.prevent="
                                      deleteProduct(k)
                                      , toggleCollapse('', 1)"
                                      class="inline-block align-middle text-center select-none border
                                       font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline  long mb-auto mt-20 ml-2 mr-2">
                                      {{ $t('app.Remove') }}
                                    </button>
                                    <button id="add_form_cancel" @click="toggleCollapse"
                                      class="inline-block align-middle text-center select-none border 
                                      font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline  long mb-auto mt-20 ml-2 mr-2">
                                      {{ $t('app.Cancel') }}
                                    </button>
                                    <button :disabled="rfq.products[k].qoute.disabled" v-if="rfq.products[k].qoute.product_id"
                                      type="button" @click="toggleCollapse('', 1)" class="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded
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
                    <datepicker :type="'date'" v-model="result.expiry_date" :default-value="new Date()"
                      :format="dateFormat" :disabled-date="disabledBeforeTodayAndAfterAWeek"></datepicker>

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
                    <button id="add_form_cancel" @click="addDraftQuote"
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
      <!-- ================= -->
      <!-- ==========modal============= -->
      <div v-if="open" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 w-full">
                <div class="grid grid-cols-1 gap-4">
                  <div class="flex justify-between items-center">
                    <h4 class="font-14 bold black pb-2  pt-2">{{ $t('rfq.How would you like to add a product') }}</h4>
                    <svg @click="cancel" class="cursor-pointer w-4 h-4 text-gray-800  font-14" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                  </div>
                </div>
                <div class="sm:flex sm:items-start">

                  <div class="modal-body">

                    <div class="relative flex flex-col min-w-0 rounded break-words bg-white p-2">
                      <div class="grid grid-cols-3 gap-4">
                        <div class="relative block mb-2 inline-block p-1">
                          <input class="absolute mt-1 -ml-4 existing" type="radio" name="inlineRadioOptions"
                            id="productLog" @click="productTableShow('select_from_my_catalog')"
                            v-model="select_from_my_catalog">
                          <label class="text-gray-700  mb-0 font-14 bold black pb-2" for="productLog">
                            {{ $t("rfq.Select from my catalogue") }}
                          </label>
                        </div>
                        <div class="relative block mb-2 inline-block p-1">
                          <input class="absolute mt-1 -ml-4 existing" type="radio" name="inlineRadioOptions"
                            id="allproductLog" @click="productTableShow('copy_from_product')"
                            v-model="copy_from_product">
                          <label class="text-gray-700  mb-0 font-14 bold black pb-2" for="allproductLog">
                            {{ $t("rfq.Copy from website catalogue") }}
                          </label>
                        </div>
                        <div class="relative block mb-2 inline-block p-1">
                          <input class="absolute mt-1 -ml-4 " type="radio" name="inlineRadioOptions"
                            @click="productTableShow('upload_new_product')" id="upload_new" value="option3"
                            v-model="upload_new_product">
                          <label class="text-gray-700  mb-0 font-14 bold black pb-2" for="upload_new">
                            {{ $t("rfq.Upload a new product") }}</label>
                        </div>
                      </div>
                      <div v-if="tableShow !== 'upload_new_product'"
                        class="relative flex flex-col min-w-0 min-h-96 rounded break-words  appendTable">
                        <product-search2 ref="productSearch" @product-clicked="addRFQProduct" :type="tableShow" />
                      </div>
                      <div v-if="uploadNewText"
                        class="relative flex flex-col min-w-0 rounded break-words for_upload_message">
                        <p>{{ $t('rfq.selectProductMessage') }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-smooth px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <div v-if="tableShow === 'upload_new_product'">
                  <!--                  return this.$router.push(`/products/add?id=` + rfqProduct.qoute.product.id + `&rfq_product_id=` + this.activeProductId + `&quote=` + res.id)-->

                  <!--                  <NuxtLink to="/products/quote/add?quote="-->
                  <!--                            class="leading-6 inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:text-primary sm:ml-3 sm:w-auto">-->
                  <!--                    {{ $t('app.Continue') }}-->
                  <!--                  </NuxtLink>-->

                  <button type="button" @click="saveUploadNewProduct"
                    class="leading-6 inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:text-primary sm:ml-3 sm:w-auto">
                    {{ $t('app.Continue') }}
                  </button>
                </div>
                <div v-else>
                  <button type="button" @click="saveSelectedProduct"
                    class="leading-6 inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:text-primary sm:ml-3 sm:w-auto">
                    {{ $t('app.Save') }}
                  </button>
                  <button type="button" @click="cancel"
                    class="leading-6 mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                    {{ $t('app.Cancel') }}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ==========modal end============= -->
      <!-- ====================end========== -->
    </div>
  </check-validity>
</template>
<script>


import AjaxButton from '~/components/AjaxButton'
import Spinner from '~/components/Spinner'
import util from '~/mixin/util'
import { mapGetters, mapActions } from 'vuex'
import outsideClick from '~/directives/outside-click'
import ProductSearch from "../../components/partials/ProductSearch.vue";
import LazyImage from "../../components/LazyImage.vue";
import ProductSearch2 from "../../components/partials/ProductSearch2.vue";
import Datepicker from 'vue2-datepicker';
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {

  name: "RFQDetails",
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      dateFormat: 'Y-M-D',
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
      loading: false
    }
  },
  directives: { outsideClick },
  mixins: [util],
  components: {
    Datepicker,
    ProductSearch2,
    LazyImage,
    ProductSearch,
    AjaxButton,
    Spinner,
    ValidationObserver, ValidationProvider
  },
  computed: {
    id() {
      return this.$route?.params?.id
    },

    canSend() {
      return (
        (this.result.products.length == this.rfq.products.length) &&
        (this.result.expiry_date != null && this.result.expiry_date != ""
          && (new Date(this.result.expiry_date) > new Date()))
      )
    },
    ...mapGetters('common', ['allUnits',])
  },
  methods: {
    validateTotalPrice(k, val) {
      if (this.rfq.products[k]?.qoute.total_offer_price == "" || this.rfq.products[k]?.qoute.total_offer_price == 0) {
        this.$set(this.rfq.products[k].qoute, 'disabled', true);
        if(val.target.value == '') {
        this.$set(this.rfq.products[k].qoute, 'total_offer_price', 0);
        }
      } else {
        this.$set(this.rfq.products[k].qoute, 'disabled', false);
        if(val.target.value == '') {
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
        if (q.product_id >= 0 && q.unit_id > 0) {
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
      this.result = { ...this.result, products: qoutes }
      // console.log(this.result)
    },
    async addQuote() {
      this.result.expiry_date = this.formatDate(this.result.expiry_date)
      this.save()
      if (this.canSend)
        await this.setById({
          id: this.id,
          params: this.result,
          api: 'setQuote'
        }).then((res) => {
          return this.$router.push(`/rfq/quotation-details/`+res.id)
        })
    },
    async addDraftQuote() {
      this.result.expiry_date = this.formatDate(this.result.expiry_date)
      this.result.is_draft = true
      this.save()
      // if (this.canSend)
      await this.setById({
        id: this.id,
        params: this.result,
        api: 'setQuote'
      }).then(() => {

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
    async saveUploadNewProduct() {
      this.open = false
      if (this.tableShow === 'upload_new_product') {
        this.result.is_draft = true
        this.result.rfq_id = this.id
        var rfqProduct = this.rfq.products.find(p => p.qoute.rfq_product_id == this.activeProductId);

        await this.setById({
          id: this.id,
          params: this.result,
          api: 'setQuote'
        }).then((res) => {
          return this.$router.push({
            path: '/products/quote/add',
            query: {
              rfq_product_id: this.activeProductId,
              quote: res.id
            }
          });
          //  this.$router.push(`/products/quote/add?rfq_product_id=` + this.activeProductId + `&quote=` + res.id)
        })
      }

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
    addRFQProduct(product) {
      var rfqProduct = this.rfq.products.find(p => p.qoute.rfq_product_id == this.activeProductId);
      rfqProduct.qoute.product = product;
      rfqProduct.qoute.product_id = product.id;
      this.$refs.productSearch.autoSuggestionClose()
      this.save()
      var index = this.rfq.products.findIndex(p => p.product_id === rfqProduct.product_id);
      this.$set(this.rfq.products[index].qoute, 'unit_id', rfqProduct.unit.id);
    },
    async fetchingData() {
      try {
        this.loading = true
        this.rfq = Object.assign({}, await this.getById({
          id: this.id,
          params: { time_zone: this.timeZone },
          api: 'getRFQ'
        }))
        this.result.products = []

        for (var i = 0; i < this.rfq.products.length; i++) {
          // if (i< this.rfq.quote.products.length&&(!this.rfq.products[i].find(q => q.rfq_product_id == this.rfq.products[i].id)))

          if (this.rfq.quote != null && this.rfq.quote.products.findIndex(p => p.rfq_product_id == this.rfq.products[i].id) > -1) {
            let p = this.rfq.quote.products.find(p => p.rfq_product_id == this.rfq.products[i].id);
            this.rfq.products[i].qoute = ({
              rfq_product_id: p.rfq_product_id,
              product: p.product,
              unit: p.unit,
              unit_id: p.unit.id,
              product_id: p.product.id,
              id: p.id,
              quantity: p.quantity ?? 1,
              total_offer_price: p.total_offer_price ?? 0,
              disabled: q.total_offer_price == '' || q.total_offer_price == 0 ? true : false
            })
          } else
            this.rfq.products[i].qoute = ({
              rfq_product_id: this.rfq.products[i].id,
              product: {},
              unit: {},
              unit_id: "",
              product_id: "",
              id: "",
              quantity: 1,
              total_offer_price: 0,
              disabled: true
            })
          console.log('point', this.rfq.products[i].qoute);
        }




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

.border-none {
  border: 0px !important;
}

.no-radius {
  border-radius: 0px !important;
}
</style>
<style>
@import 'vue2-datepicker/index.css';

.mx-calendar-content .cell {
  color: black !important;
}

.mx-calendar-content .cell.disabled {
  color: #ccc !important;
}

.mx-table-date .cell.not-current-month {
  color: black !important;
}
</style>