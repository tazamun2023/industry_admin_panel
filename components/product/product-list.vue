<template>
  <div class="card p-3">
    <div class="grid border-b-smooth grid-cols-4">
      <div>
        <h4>{{ $t('prod.product_list') }}</h4>
        <p class="text-xs">Find and manage your uploaded products here</p>
      </div>
      <div class="flex gap-4 col-span-2 justify-center">
        <button class="flex gap-1  hover:text-primary">
          <svg class="w-4 h-4 mt-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 20 19">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3M9.5 1v10.93m4-3.93-4 4-4-4"/>
          </svg>
          {{ $t('prod.download_rejection_reasons') }}
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
        <NuxtLink class="text-xs font-bold uppercase px-5 py-3   block leading-normal"
                  @click="toggleTabs('is_approved')"
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
        <NuxtLink class="text-xs font-bold uppercase px-5 py-3   block leading-normal"
                  @click="toggleTabs('is_rejected')"
                  :to="`/products/rejected`"
                  :class="{'bg-white border-white border-b-t': openTab !== 'is_rejected', 'border-b-2 border-primary': openTab === 'is_rejected'}">
          {{ $t('prod.rejected') }}
        </NuxtLink>
      </li>
      <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center">
        <NuxtLink class="text-xs font-bold uppercase px-5 py-3   block leading-normal"
                  @click="toggleTabs('is_archived')"
                  :to="`/products/archived`"
                  :class="{'bg-white border-white border-b-t': openTab !== 'is_archived', 'border-b-2 border-primary': openTab === 'is_archived'}">
          {{ $t('prod.archived') }}
        </NuxtLink>
      </li>
      <li class="-mb-px mr-2 last:mr-0 cursor-pointer flex-auto text-center" v-if="$store.state.admin.isVendor">
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
              <template v-slot:table="{list}">
                <table id="basic-datatable" class="table mt-20  dt-responsive nowrap">
                  <thead>
                  <tr>
                    <th class="flex gap-4">
                      <input @click="actionCheckToggle()" id="allcheck" type="checkbox" @change="checkAll">
                      <select v-if="actionCheck && openTab !== 'is_draft' &&  $store.state.admin.isVendor" class="border border-smooth p-3 rounded">
                        <option value="">{{ $t('prod.action') }}</option>
                        <option value="">Set out of stock</option>
                        <option value="">Set in stock</option>
                        <option value="">Set Online</option>
                        <option value="">Set Offline</option>
                        <option value="">Archive</option>
                      </select>
                    </th>
                    <th>{{ $t('prod.pImgs') }}</th>
                    <th v-if="$store.state.admin.isSuperAdmin">{{ $t('prod.vendor_name') }}</th>
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
                          :alt="value.title?.en"
                        />
                      </nuxt-link>
                    </td>
                    <td v-if="$store.state.admin.isSuperAdmin"> {{ value.vendor_name}}</td>
                    <td>{{ value.title?.length > 30 ? value.title.substring(0, 30) + '...' : value.title }}</td>
                    <td>{{ value.sku }}</td>
                    <td v-if="value.category">{{ value.category.name }}</td>
                    <td v-else>No Category</td>
                    <td>
                      <p v-if="value.maxUnitPrice">
                        <del>SAR {{ value.maxUnitPrice?.max_unit_price }}</del>
                      </p>
                      <p v-else>NAN</p>
                      <p v-if="value.minSellingPrice">SAR {{ value.minSellingPrice?.min_selling_price }}</p>
                    </td>
                    <td>
                      <p v-if="showTitleQtyMessage === index" class="text-primary">Enter to update quantity!</p>
                      <input type="qty" title="Enter to update" :value="value.available_quantity" @keypress="onlyNumber"
                             @focusout="updateQty(value.id, $event)">
                      <p class="text-xs" v-if="value.minOrderQuantity">Min. Order Qty:
                        {{ value.minOrderQuantity[0]?.min_quantity }}</p>
                      <p class="text-xs" v-else>NAN</p>
                    </td>
                    <td>{{ value.created }}<br>
                      {{ value.updated }}
                    </td>
                    <td>
                      {{ value.status }} <br>
                      <span class="text-error cursor-pointer underline" @click="openModal(index)">show</span>
                      <Modal :showModal="modalVisible" :is_reject_modal="is_reject_modal" :providedId="index" @closeModal="closeModal">
                        <div class="flex justify-between relative">
                            <h4>Rejection reasons {{ index }}</h4>

                          </div>
                          <div class="mb-4 mt-10">
                            <slot>

                              <p><strong>General</strong></p>
                              <ul>
                                <li class="block py-2 mx-3">lorem lorem lorem </li>
                              </ul>
                              <p><strong>General</strong></p>
                              <ul>
                                <li class="block py-2 mx-3">lorem lorem lorem </li>
                              </ul>
                            </slot>
                          </div>
                          <template v-slot:buttons>
                            <button @click="closeModal" class="bg-primary leading-3 hover:text-primary text-white px-4 py-2 rounded-md mr-2">Close Modal</button>
                            <!-- Your Submit button or other buttons go here -->
                          </template>
                      </Modal>
                    </td>
                    <td>{{ value.status }}</td>
                    <td>

                      <button id="dropdownDefaultButton" @click="toggleDropdown(index)"
                              class="bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 relative"
                              type="button">{{ $t('prod.action') }}
                        <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 10 6">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4"/>
                        </svg>
                      </button>
                      <div id="dropdown"
                           class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute ml-[-50px]"
                           v-if="visibleDropdown === index"
                      >
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownDefaultButton">
                          <nuxt-link
                            v-if="$store.state.admin.isSuperAdmin"
                            class="block px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                            :to="`/products/show/${value.id}`">Show
                            <!--                            <span v-if="$store.state.admin.isVendor">yes</span>-->
                          </nuxt-link>
<!--                          v-if="openTab === 'is_draft' || openTab === 'is_rejected' || openTab === 'is_pending_approval' || openTab === 'is_approved' || openTab === 'is_archived'"-->
                          <nuxt-link
                            v-if="$store.state.admin.isVendor"
                            class="block px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                            :to="`/products/${value.id}`">Edit
<!--                            <span v-if="$store.state.admin.isVendor">yes</span>-->
                          </nuxt-link>

<!--                          <li-->
<!--                            v-if="openTab !== 'is_archived'"-->
<!--                            class="block px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"-->
<!--                            @click.prevent="stockUpdate(value.id, 0)">Set out of stock</li>-->
<!--                          <li-->
<!--                            v-if="openTab !== 'is_archived' || openTab !== 'is_approved'"-->
<!--                            class="block px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"-->
<!--                            @click="stockUpdate(value.id, 1)"-->
<!--                          >Set in stock</li>-->
<!--                          <li
                            class="block px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                             @click="statusUpdate(value.id, 'archived')"
                            v-if="openTab === 'archived'"
                          >Archive</li>-->
                          <li
                            class="block px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                            @click="statusUpdate(value.id, 'archived')"
                            v-if="openTab === 'is_approved' && $store.state.admin.isVendor"
                          >
                            Archive
                          </li>

                          <li
                            class="block px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                            v-if="value.status === 'archived' && $store.state.admin.isVendor"
                            @click="statusUpdate(value.id, 'approved')"
                          >
                            Back to Approved
                          </li>

<!--                          v-if="openTab === 'is_draft' || openTab === 'is_rejected' || openTab === 'is_approved' || openTab === 'is_archived'"-->
                          <li
                            class="block px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                            @click.prevent="isDelete(value.id)"
                            v-if="$store.state.admin.isVendor"
                          >Delete</li>
                        </ul>
                      </div>
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
<!-- ----------------modal--------------- -->



</template>

<script>
import ListPage from "~/components/partials/ListPage"
import {mapActions, mapGetters} from 'vuex'
import util from '~/mixin/util'
import LazyImage from "~/components/LazyImage"
import bulkDelete from "~/mixin/bulkDelete";
import ProductFilter from "../../components/product/filter.vue";
import moment from 'moment-timezone';
import Modal from "~/components/Modal.vue";

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
      modalVisible: false,
      is_reject_modal: '',
      visibleDropdown: null,
      showTitleQtyMessage: null,
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
    ProductFilter,
    Modal
  },
  computed: {
    currencyIcon() {
      return this.setting?.currency_icon || '$'
    },
    ...mapGetters('setting', ['setting']),
    ...mapGetters('language', ['currentLanguage']),
  },
  methods: {
    openModal(index) {
      this.modalVisible = true;
      this.is_reject_modal = index;
    },
    closeModal() {
      this.modalVisible = false;
    },
    async stockUpdate(id, is_available = null) {
      await this.setById({
        id: id,
        params: {is_available: is_available},
        api: 'updateStock'
      }).then(() => {
        this.visibleDropdown = null
        // window.location.reload()
      })
    },

    async statusUpdate(id, status = null) {
      if (status != null) {
        await this.setById({
          id: id,
          params: {status: status},
          api: 'updateStatus'
        }).then(() => {
          this.visibleDropdown = null
          // window.location.reload()
        })
      }
    },
    async isDelete(id) {
      await this.setById({
        id: id,
        params: {status: status},
        api: 'deleteProduct`'
      }).then(() => {
        this.visibleDropdown = null
        // window.location.reload()
      })
    },

    async updateQty(id, event) {
      let available_quantity = event.target.value;
      if (available_quantity !== '') {
        await this.setById({
          id: id,
          params: {available_quantity: available_quantity},
          api: 'setAvailableQty'
        }).then(() => {

          // alert('saved')
        })
      }
    },
    // checkInput(index) {
    //   this.showTitleQtyMessage = index;
    // },

    DateTimeFormat(dateTime) {
      return moment(dateTime, 'MMM D, YYYY h:mm A').format('MMM D, YYYY h:mm A');
    },
    toggleDropdown(index) {
      this.visibleDropdown = this.visibleDropdown === index ? null : index;
    },

    onlyNumber($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
        $event.preventDefault();
      }
    },

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
    },
    ...mapActions('common', ['getById', 'setById', 'setImageById', 'getDropdownList', 'setWysiwygImage', 'deleteData', 'getRequest', 'getCategoriesTree'])

  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
