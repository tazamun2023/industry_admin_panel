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
              Download Rejection Reasons
            </button>
          </div>
          <div class="text-end">
            <Nuxt-link :to="`/products/add`"
                       class="border border-primary bg-primary hover:text-white text-white p-2 rounded px-3  leading-3">
              Add New Product
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
              All Products
            </NuxtLink>
          </li>
          <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
            <NuxtLink class="text-xs font-bold uppercase px-5 py-3   block leading-normal" @click="toggleTabs('is_approved')"
                      :to="`/products/approved`"
               :class="{'bg-white border-white border-b-t': openTab !== 'is_approved', 'border-b-2 border-primary': openTab === 'is_approved'}">
              Approved
            </NuxtLink>
          </li>
          <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
            <NuxtLink class="text-xs font-bold uppercase px-5 py-3   block leading-normal"
               @click="toggleTabs('is_pending_approval')"
                      :to="`/products/pending-approval`"
               :class="{'bg-white border-white border-b-t': openTab !== 'is_pending_approval', 'border-b-2 border-primary': openTab === 'is_pending_approval'}">
              Pending Approval
            </NuxtLink>
          </li>
          <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
            <NuxtLink class="text-xs font-bold uppercase px-5 py-3   block leading-normal" @click="toggleTabs('is_rejected')"
                      :to="`/products/rejected`"
               :class="{'bg-white border-white border-b-t': openTab !== 'is_rejected', 'border-b-2 border-primary': openTab === 'is_rejected'}">
              Rejected
            </NuxtLink>
          </li>
          <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
            <NuxtLink class="text-xs font-bold uppercase px-5 py-3   block leading-normal" @click="toggleTabs('is_archived')"
                      :to="`/products/archived`"
               :class="{'bg-white border-white border-b-t': openTab !== 'is_archived', 'border-b-2 border-primary': openTab === 'is_archived'}">
              Archived
            </NuxtLink>
          </li>
          <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
            <NuxtLink class="text-xs font-bold uppercase px-5 py-3   block leading-normal" @click="toggleTabs('is_draft')"
                      :to="`/products/draft`"
               :class="{'bg-white border-white border-b-t': openTab !== 'is_draft', 'border-b-2 border-primary': openTab === 'is_draft'}">
              Draft
            </NuxtLink>
          </li>
        </ul>

        <div class="relative flex flex-col min-w-0 break-words  w-full mb-6 rounded">
          <div class="flex-auto ">
            <div class="tab-content input-wrapper tab-space">

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
                <list-page
                  ref="listPage"
                  :list-api="api"
                  delete-api="deleteProduct"
                  route-name="products"
                  :name="$t('title.prod')"
                  :order-options="orderByProduct"
                  @delete-bulk="deleteBulk"
                  @list="itemList = $event"
                >
                  <template  v-slot:table="{list}">
                <table id="basic-datatable" class="table mt-20  dt-responsive nowrap">
                  <thead>
                  <tr>
                    <th class="flex gap-4"><input @click="actionCheckToggle()" id="allcheck" type="checkbox">
                      <select v-if="actionCheck" class="border border-smooth p-3 rounded" name="" id="">
                        <option value="">Action</option>
                        <option value="">Set Online</option>
                        <option value="">Set Ofline</option>
                        <option value="">Set out of stock</option>
                        <option value="">Set in stock</option>
                        <option value="">Archive</option>
                      </select>
                    </th>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>SKU</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th style="width:10%">Available Quantity</th>
                    <th>Created / Updated</th>
                    <th>Status</th>
                    <th>Visibility</th>
                    <th>Action</th>
                  </tr>
                  </thead>


                  <tbody>
                  <tr v-for="(value, index) in list" :key="index">
                    <td><input type="checkbox"></td>
                    <td><img style="max-width:100px;height:70px;object-fit:cover"
                             src="https://cfn-catalog-prod.tradeling.com/up/659450205593fb7a72ca2905/68dcb08693aa4cc1e265b3448bc5967e.png"
                             alt=""></td>
                    <td>{{ value.name }}</td>
                    <td>{{ value.sku }}</td>
                    <td v-if="value.category">{{ value.category.name }}</td>
                    <td v-else>No Category</td>
                    <td>
                      <p>
                        <del>AED 22 - AED 222</del>
                      </p>
                      <p>AED 22 - AED 222</p>
                    </td>
                    <td><input type="qty" value="7">
                      <p class="text-xs">Min. Order Qty: 12</p></td>
                    <td>Pending Approval</td>
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
                <div class="mt-10 text-end">
                  <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <a href="#"
                       class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                      <span class="sr-only">Previous</span>
                      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                              clip-rule="evenodd"/>
                      </svg>
                    </a>
                    <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
                    <a href="#" aria-current="page"
                       class="relative z-10 inline-flex items-center bg-primary px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
                    <a href="#"
                       class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
                    <a href="#"
                       class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
                    <span
                      class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                    <a href="#"
                       class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
                    <a href="#"
                       class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">9</a>
                    <a href="#"
                       class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">10</a>
                    <a href="#"
                       class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                      <span class="sr-only">Next</span>
                      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                              clip-rule="evenodd"/>
                      </svg>
                    </a>
                  </nav>
                </div>
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
    ListPage
  },
  computed: {
    currencyIcon() {
      return this.setting?.currency_icon || '$'
    },
    ...mapGetters('setting', ['setting']),
    ...mapGetters('language', ['currentLanguage']),
  },
  methods: {
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
