<template>
      <div class="card p-3">
        <div class="grid border-b-smooth grid-cols-4">
          <div>
            <h4>Products List</h4>
            <p class="text-xs">Find and manage your uploaded products here</p>
          </div>
          <div class="flex gap-4 col-span-2 justify-center">
            <button class="flex gap-1  hover:text-primary">
              <svg class="w-4 h-4 mt-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 20 19">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3M9.5 1v10.93m4-3.93-4 4-4-4"/>
              </svg>
              Download Rejection Reasons
            </button>
            <button class="flex gap-1 hover:text-primary">
              <svg class="w-4 h-4 mt-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 20 19">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3M9.5 1v10.93m4-3.93-4 4-4-4"/>
              </svg>
              {{ $t('prod.download_rejection_reasons') }}
            </button>
          </div>
          <div class="text-end">
            <Nuxt-link :to="`/products/add`"
                       class="border border-primary bg-primary hover:text-white text-white p-2 rounded px-3  leading-3">
              {{ $t('prod.add_new_product') }}
            </Nuxt-link>
          </div>
        </div>
        <!-- -------------------------- -->
        <ul class="flex mb-0 list-none flex-wrap  w-50 shadow mt-10 flex-row">
          <li class="-mb-px mr-2 last:mr-0 cursor-pointer  flex-auto text-center">
            <NuxtLink class="text-xs font-bold uppercase px-5 py-3  block leading-normal"
               @click="toggleTabs('is_all_products')"
                      :to="`/products/all`"
               :class="{'bg-white border-white border-b-2': openTab !== 'is_all_products', 'border-b-2 border-primary': openTab === 'is_all_products'}">
              {{ $t('prod.all_product') }}
            </NuxtLink>
          </li>
          <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
            <NuxtLink class="text-xs font-bold uppercase px-5 py-3   block leading-normal" @click="toggleTabs('is_approved')"
                      :to="`/products/approved`"
               :class="{'bg-white border-white border-b-t': openTab !== 'is_approved', 'border-b-2 border-primary': openTab === 'is_approved'}">
              {{ $t('prod.approved') }}
            </NuxtLink>
          </li>
          <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
            <NuxtLink class="text-xs font-bold uppercase px-5 py-3   block leading-normal"
               @click="toggleTabs('is_pending_approval')"
                      :to="`/products/pending-approval`"
               :class="{'bg-white border-white border-b-t': openTab !== 'is_pending_approval', 'border-b-2 border-primary': openTab === 'is_pending_approval'}">
              {{ $t('prod.pending_approval') }}
            </NuxtLink>
          </li>
          <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
            <NuxtLink class="text-xs font-bold uppercase px-5 py-3   block leading-normal" @click="toggleTabs('is_rejected')"
                      :to="`/products/rejected`"
               :class="{'bg-white border-white border-b-t': openTab !== 'is_rejected', 'border-b-2 border-primary': openTab === 'is_rejected'}">
              {{ $t('prod.rejected') }}
            </NuxtLink>
          </li>
          <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
            <NuxtLink class="text-xs font-bold uppercase px-5 py-3   block leading-normal" @click="toggleTabs('is_archived')"
                      :to="`/products/archived`"
               :class="{'bg-white border-white border-b-t': openTab !== 'is_archived', 'border-b-2 border-primary': openTab === 'is_archived'}">
              {{ $t('prod.archived') }}
            </NuxtLink>
          </li>
          <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
            <NuxtLink class="text-xs font-bold uppercase px-5 py-3   block leading-normal" @click="toggleTabs('is_draft')"
                      :to="`/products/draft`"
               :class="{'bg-white border-white border-b-t': openTab !== 'is_draft', 'border-b-2 border-primary': openTab === 'is_draft'}">
              {{ $t('prod.draft') }}
            </NuxtLink>
          </li>
        </ul>

        <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">
          <div class="flex-auto ">
            <div class="tab-content input-wrapper tab-space">

              <div>
                <list-page
                  ref="listPage"
                  :list-api="api"
                  delete-api="deleteProduct"
                  route-name="products"
                  empty-store-variable="allProducts"
                  :name="$t('title.prod')"
                  :order-options="orderByProduct"
                  @delete-bulk="deleteBulk"
                  @list="itemList = $event"
                >
                  <template
                    v-slot:table-top="{orderOptions}"
                  >
                  <product-filter @filter="filterChanged"></product-filter>
                  </template>
                  <template  v-slot:table="{list}">
                <table id="basic-datatable" class="table mt-20  dt-responsive nowrap">
                  <thead>
                  <tr>
                    <th class="flex gap-4">
                      <input @click="actionCheckToggle()" id="allcheck" type="checkbox" @change="checkAll">
                      <select v-if="actionCheck" class="border border-smooth p-3 rounded" name="" id="">
                        <option value="">{{ $t('prod.action') }}</option>
                        <option value="">Set out of stock</option>
                        <option value="">Set in stock</option>
                        <option value="">Archive</option>
                      </select>
                    </th>
                    <th>{{ $t('prod.pImgs') }}</th>
                    <th>{{ $t('index.title') }}</th>
                    <th>{{ $t('prod.sku') }}</th>
                    <th>{{ $t('prod.category') }}</th>
                    <th>{{ $t('prod.price') }}</th>
                    <th style="width:10%">{{ $t('prod.available_quantity') }}</th>
                    <th>{{ $t('prod.create_update') }}</th>
                    <th>{{ $t('prod.status') }}</th>
                    <th>{{ $t('prod.visibility') }}</th>
                    <th>{{ $t('prod.action') }}</th>
                  </tr>
                  </thead>


                  <tbody>
                  <tr v-for="(value, index) in list" :key="index">
                    <td><input type="checkbox" :value="value.id" v-model="cbList"></td>
                    <td>
                      <nuxt-link
                        class="dply-felx j-left link"
                        style="max-width:100px;height:70px;object-fit:cover"
                        :to="`/products/${value.id}`"
                      >
                        <lazy-image
                          class="mr-20"
                          :data-src="getThumbImageURL(value.image)"
                          :alt="value.title.en"
                        />
                      </nuxt-link>
                    </td>
                    <td>{{ value.name }}</td>
                    <td>{{ value.sku }}</td>
                    <td v-if="value.category">{{ value.category.name }}</td>
                    <td v-else>No Category</td>
                    <td>
                      <p v-if="value.max_unit_price"><del>SAR {{ value.max_unit_price?.max_unit_price }}</del></p>
                      <p v-else>NAN</p>
                      <p v-if="value.min_selling_price">SAR {{ value.min_selling_price?.min_selling_price }}</p>
                    </td>
                    <td>
                      <input type="qty" :value="value.available_quantity">
                      <p class="text-xs" v-if="value.min_order_quantity">Min. Order Qty: {{  value.min_order_quantity[0]?.min_quantity }}</p>
                      <p class="text-xs" v-else>NAN</p>
                    </td>
                    <td>{{ value.status }}</td>
                    <td>Jan 4, 2024 9:48 AM <br>
                      Jan 4, 2024 9:48 AM
                    </td>
                    <td>{{ value.status }}</td>
                    <td>
                      <nuxt-link :to="`/products/${value.id}`">
                        <svg class="w-4 h-4 text-gray-800 dark:text-white cursor-pointer" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                          <path
                            d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                          <path
                            d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                        </svg>
                      </nuxt-link>
                    </td>
                  </tr>
                  </tbody>
                </table>
                  </template>
                </list-page>

              </div>
            </div>
          </div>
        </div>
      </div>

</template>

<script>
import ListPage from "~/components/partials/ListPage"
import {mapGetters} from 'vuex'
import util from '~/mixin/util'
import LazyImage from "~/components/LazyImage"
import bulkDelete from "~/mixin/bulkDelete";
import ProductFilter from "../../components/product/filter.vue";

export default {
  name: "product-list",
  props: {
    openTab: {
      type: String,
      default: 'is_all_products'
    },
    api: {
      type: String,
      default: "getAllProducts"
    },
  },
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      // openTab: 'is_all_products',
      actionCheck: false,
      orderByProduct: {
        title: {title: this.$t('index.title')},
        category_id: {title: this.$t('category.catUp')},
        purchased: {title: this.$t('prod.purchased')},
        selling: {title: this.$t('prod.selling')},
        offered: {title: this.$t('prod.offered')},
        created_at: {title: this.$t('category.date')},
        status: {title: this.$t('category.status')},
      }
    }
  },
  mixins: [util, bulkDelete],
  components: {
    LazyImage,
    ListPage,
    ProductFilter
  },
  computed: {
    currencyIcon() {
      return this.setting?.currency_icon || '$'
    },
    ...mapGetters('setting', ['setting']),
    ...mapGetters('language', ['currentLanguage']),
  },
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
    dateFormat(dataTime) {
      return moment(moment.utc(dataTime)).local().format('D MMMM YYYY')
    },
    toggleTabs: function (tab) {
      this.openTab = tab
    },
    actionCheckToggle() {
      this.actionCheck = !this.actionCheck
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
