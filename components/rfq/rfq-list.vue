<template>

  <div>

    <!-- ---------------       -->
    <div class="row  mb-2">
      <div class="card p-20 col-md-12">
        <div class="card-body">
          <div class="row mt-2">
            <div class="col-md-12">
              <h4 class="bold black">{{ $t('rfq.RFQ Marketplace') }}</h4>
              <p class="font-14">{{ $t('rfq.RFQ Marketplace Description') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>



    <!-- ==================tab============== -->
    <div class="flex  mt-20 flex-wrap">
      <div class="w-full">
        <ul class="flex mb-0 list-none flex-wrap pt-3 w-50 pb-4 flex-row">
          <li class="-mb-px mr-2 last:mr-0   flex-auto text-center">
            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
               href="/rfq"
               v-bind:class="{'text-pink-600 bg-white border-white border-t-4': openTab !== 1, 'border-t-4 border-primary': openTab === 1}">
              {{ $t("app.Relevant to me") }}
            </a>
          </li>
          <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
               href="/rfq/all"
               v-bind:class="{'text-pink-600 bg-white border-white border-t-4': openTab !== 2, 'border-t-4 border-primary': openTab === 2}">
              {{ $t("app.All") }}
            </a>
          </li>
          <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <a class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
               href="/rfq/my-list"
               v-bind:class="{'text-pink-600 bg-white border-white border-t-4': openTab !== 3, 'border-t-4 border-primary': openTab === 3}">
              {{ $t("app.My List") }}
            </a>
          </li>
        </ul>
        <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">
          <div class="flex-auto">
            <div class="tab-content tab-space">
              <list-page
                v-if="$can('brand', 'view')"
                ref="listPage"
                list-api="getRfqsAll"
                delete-api="deleteBrand"
                route-name="rfqs"
                empty-store-variable="allRfqs"
                :name="$t('rfq.rfq')"
                gate="brand"
                :order-options="orderOptions"
                @delete-bulk="deleteBulk"
                @list="itemList = $event"
              >
                <template
                  v-slot:table-top="{orderOptions}"
                >
                  <rfq-filter></rfq-filter>
                </template>
                <template v-slot:table="{list}">


                  <div v-for="(value, index) in list" :key="index">

                    <div class="card mt-20 p-4 bg-white">
                      <div class="grid grid-cols-7 gap-4">
                        <div>
                          <img src="https://cdn.pixabay.com/photo/2016/10/26/09/19/arbutus-1771003__340.jpg"
                               class="w-48 h-32 object-cover rounded" alt="...">
                        </div>
                        <div class="col-span-5">
                          <div class="flex justify-end">
                            <h5 class="mb-4 ml-4">
                              <a v-for="p in value.products">{{ p.name }}</a>
                            </h5>
                            <div class="p-2 ml-auto">
                              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                   xmlns="http://www.w3.org/2000/svg" fill="none" viewcard="0 0 21 19">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"/>
                              </svg>
                            </div>
                          </div>
                          <table class="w-full ">
                            <tr>
                              <td class="rtl:text-end">
                                <p class="m-0"><strong>{{ $t("rfq.Created on") }} :</strong> {{ value.created }}</p>
                                <p class="m-0"><strong>{{ $t("rfq.Expires on") }}:</strong> {{ value.expiry_date }}
                                </p>
                                <p class="m-0"><strong> {{ $t("rfq.RFQ ID") }}: </strong> RFQ{{ value.id }}</p>
                              </td>
                              <td class="rtl:text-end">
                                <p class="m-0"><strong> {{ $t("rfq.Shipping country") }}:</strong>
                                  {{ value.country.name }}
                                </p>
                                <p class="m-0"><strong>{{ $t("rfq.Shipping city") }}:</strong> {{ value.city.name }}
                                </p>
                                <p class="m-0"><strong> {{ $t("rfq.Shipping terms") }}:</strong>

                                  <template v-for="(term,index) in value.shipmen_terms">
                                    <span>{{ term.name }}</span>
                                    <span class="mx-2" v-if="index+1<value.shipmen_terms.length">,</span>

                                  </template>
                                </p>
                              </td>
                            </tr>
                          </table>
                        </div>
                        <div>
                          <div class="qoute-card text-center">
                            <p><span>{{ $t("products.Total target price") }}:</span>
                              <span><strong> {{
                                  value.total_target_price.toLocaleString($t('app.currency_local'), {
                                    style: 'currency',
                                    maximumFractionDigits: 0,
                                    currency: 'SAR'
                                  })
                                }}</strong></span></p>
                            <p>
                              <span> {{ $t("rfq.Received quotes") }}: </span>
                              <span
                                class="inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded bg-green-500  hover:green-600 ml-2 mr-2">
                                  {{ value.received_quotes }}</span>
                            </p>
                            <nuxt-link
                              class="inline-block align-middle hover:bg-primary  hover:text-white   hover:border-primary shadow text-center select-none border border-smooth  font-normal whitespace-no-wrap rounded py-1 mt-3 px-3 leading-normal no-underline  mr-4 mb-3  sm:mb-0"
                              :to="`/rfq/${value.id}`"><i class="icofont-ui-add"></i> {{ $t("rfq.Submit Quotes") }}
                            </nuxt-link>
                          </div>
                        </div>
                      </div>
                      <div class="w-100">
                        <div>
                          <button
                            @click="toggleCollapse(value.id)"
                            class="flex items-center hover:text-primary bg-primary text-white font-bold py-2 px-4 rounded"
                          >
                            <svg class="w-6 h-4 mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewcard="0 0 20 14">
                              <path
                                d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                            </svg>
                            {{ $t('rfq.View all products') }}
                          </button>
                          <div
                            v-if="collapsedId==value.id"
                            class="mt-4 bg-gray-200 p-4 rounded"
                          >
                            <div class="table-responsive">
                              <table class="table mb-0">
                                <thead class="thead-light">
                                <tr>
                                  <th>{{ $t('products.Id') }}</th>
                                  <th> {{ $t('products.Image') }}</th>
                                  <th> {{ $t('products.Products') }} ({{ value.products.length }})</th>
                                  <th> {{ $t('products.Category') }}</th>
                                  <th> {{ $t('products.Quantity') }}</th>
                                  <th> {{ $t('products.Unit Target Price') }}</th>
                                  <th> {{ $t("products.Total target price") }}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="product in value.products">
                                  <td>{{ product.id }}</td>
                                  <td>
                                    <img style="width:20px;"
                                         src="https://cdn.pixabay.com/photo/2016/10/26/09/19/arbutus-1771003__340.jpg"
                                         alt="zoom" class="img-thumbnail"/></td>
                                  <td> {{ product.name }}</td>
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
                                </tr>

                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </list-page>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ==================tab============== -->

  </div>


</template>

<script>

import ListPage from "~/components/partials/ListPage";
import util from '~/mixin/util'
import LazyImage from "~/components/LazyImage";
import bulkDelete from "~/mixin/bulkDelete";
import moment from 'moment-timezone'
import RfqFilter from "../../components/rfq/filter.vue";

export default {
  name: "rfq-list",
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
    RfqFilter,
    LazyImage,
    ListPage
  },
  props:{
    openTab:{
      type:String,
      default:1
    },
  },
  mixins: [util, bulkDelete],
  methods: {

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
