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

            <nuxt-link
              class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
              v-bind:class="{'text-pink-600 bg-white border-white border-t-4': openTab !== 1, 'border-t-4 border-primary': openTab === 1}"
              :to="`/rfq`"
              :title="$t('app.Relevant to me')"
            >
              {{ $t("app.Relevant to me") }}
            </nuxt-link>
          </li>
          <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
            <nuxt-link
              class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
              v-bind:class="{'text-pink-600 bg-white border-white border-t-4': openTab !== 2, 'border-t-4 border-primary': openTab === 2}"
              :to="`/rfq/all`"
              :title="$t('app.All')"
            >
              {{ $t("app.All") }}
            </nuxt-link>

          </li>
          <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">


            <nuxt-link
              class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
              v-bind:class="{'text-pink-600 bg-white border-white border-t-4': openTab !== 3, 'border-t-4 border-primary': openTab === 3}"
              :to="`/rfq/my-list`"
              :title="$t('app.My List')"
            >
              {{ $t("app.My List") }}
            </nuxt-link>
          </li>
        </ul>
        <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">
          <div class="flex-auto">
            <div class="tab-content tab-space">
              <list-page
                v-if="$can('brand', 'view')"
                ref="listPage"
                :list-api="api"
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
                  <rfq-filter @filter="filterChanged"></rfq-filter>
                </template>
                <template v-slot:table="{list}">


                  <div v-for="(value, index) in list" :key="index">

                    <div class="card mt-20 p-1 m-2 bg-white">
                      <div class="grid grid-cols-7 gap-4">
                        <div>
                          <lazy-image
                            class="w-48 h-full object-cover rounded"
                            :data-src="getThumbImageURL(value.products[0].image)"
                            :alt=" value.products[0].name"
                          />

                          <!-- <div class="my-2 flex flex-row justify-start">
                            <template v-for="(product,index) in value.products">
                              <lazy-image
                                class="mr-15 img-40x"
                                :data-src="getThumbImageURL(product.image)"
                                :alt=" product.name"
                              />
                            </template>


                          </div> -->
                        </div>
                        <div class="col-span-5 p-3">
                          <div class="">
                            <h5 class="mb-4 ml-4 font-bold">
                              <a v-for="p in value.products">{{ p.name }}</a>
                            </h5>
                            <!-- <div class="p-2 ml-auto">
                              <svg class="w-6 h-6 text-gray-800 " aria-hidden="true"
                                   xmlns="http://www.w3.org/2000/svg" fill="none" viewcard="0 0 21 19">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"/>
                              </svg>
                            </div> -->
                          </div>
                          <table class="w-full ">
                            <tr>
                              <td class="rtl:text-end">
                                <p class="m-0 flex gap-2"><img class="w-5 h-5 mt-1" src="~/assets/icon/calendar-add.svg" alt=""> <strong> {{ $t("rfq.Created on") }} :</strong> {{ value.created }}</p>
                                <p class="m-0 flex gap-2"><img class="w-5 h-5 mt-1" src="~/assets/icon/timer.svg" alt=""> <strong>{{ $t("rfq.Expires on") }}:</strong> {{ value.expiry_date }}
                                </p>
                                <p class="m-0 flex gap-2"><img class="w-5 h-5 mt-1" src="~/assets/icon/clipboard-text.svg" alt=""><strong> {{ $t("rfq.RFQ ID") }}: </strong> RFQ{{ value.id }}</p>
                              </td>
                              <td class="rtl:text-end">
                                <p class="m-0 flex gap-2"><img class="w-5 h-5 mt-1" src="~/assets/icon/routing.svg" alt=""><strong> {{ $t("rfq.Shipping country") }}:</strong>
                                  {{ value.country.name }}
                                </p>
                                <p class="m-0 flex gap-2"><img class="w-5 h-5 mt-1" src="~/assets/icon/routing.svg" alt=""><strong>{{ $t("rfq.Shipping city") }}:</strong> {{ value.city.name }}
                                </p>
                                <p class="m-0 flex gap-2"><img class="w-5 h-5 mt-1" src="~/assets/icon/routing.svg" alt=""><strong> {{ $t("rfq.Shipping terms") }}:</strong>

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
                          <div class="qoute-card p-3">
                            <!-- <p><span>{{ $t("products.Total target price") }}:</span>
                              <span><strong> {{
                                  value.total_target_price.toLocaleString($t('app.currency_local'), {
                                    style: 'currency',
                                    maximumFractionDigits: 0,
                                    currency: 'SAR'
                                  })
                                }}</strong></span></p> -->
                                <div class="bg-primarylight text-primary relative p-3 uppercase rounded-lg">
                                  <span class="font-12px"> {{ $t("rfq.Received quotes") }} </span>
                                  <span
                                class="absolute bg-primary p-3 uppercase text-center font-semibold text-sm text-white align-baseline leading-none rounded m-1 top-0 right-0">
                                  {{ value.received_quotes }}</span>
                                </div>

                           <div class="text-center">
                            <nuxt-link
                              class="bg-primary rounded-lg uppercase text-white px-4 w-full p-3 mt-[70px]"
                              :to="`/rfq/${value.id}`"><i class="icofont-ui-add"></i> {{ $t("rfq.Submit Quotes") }}
                            </nuxt-link>
                           </div>
                          </div>
                        </div>
                      </div>
                      <div class="w-100">
                        <div>

                          <div
                            v-if="collapsedId==value.id"
                            class="mt-4 bg-gray-200 p-4 rounded"
                          >
                            <div class="table-responsive">
                              <table class="table mb-0">
                                <thead class="thead-light">
                                <tr>
                                  <!-- <th>{{ $t('products.Id') }}</th>
                                  <th> {{ $t('products.Image') }}</th> -->
                                  <th> {{ $t('products.Products') }} ({{ value.products.length }})</th>
                                  <th> {{ $t('products.Category') }}</th>
                                  <th> {{ $t('products.Quantity') }}</th>
                                  <th> {{ $t('products.Unit Target Price') }}</th>
                                  <th> {{ $t("products.Total target price") }}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="product in value.products">
                                  <!-- <td>{{ product.id }}</td>
                                  <td>
                                   </td> -->
                                  <td><div class="flex">
                                    <lazy-image
                                      class="mr-15 img-40x"
                                      :data-src="getThumbImageURL(product.image)"
                                      :alt=" product.name"
                                    /> <span class="mt-3">{{ product.name }}</span>
                                  </div></td>
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
                          <div class="text-center relative">
                            <img
                              @click="toggleCollapse(value.id)"
                              :class="{'rt180deg': isCollapsed, 'rounded-t-lg': !isCollapsed, 'rounded-b-lg': isCollapsed }"
                              class="w-10 h-10 absolute shadow mx-auto left-0 right-0 mt-[-36px]"
                              src="~/assets/icon/arrowdown.PNG"
                              alt=""
                            />
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
  props: {
    openTab: {
      type: String,
      default: 1
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
<style scoped>
.rt180deg{
  transform: rotate(180deg);
}
.font-12px{
  font-size: 12px;
}
</style>
