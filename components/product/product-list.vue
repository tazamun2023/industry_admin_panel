<template>
  <div class="card p-3">
    <div v-if="vendorId==0" class="grid border-b-smooth grid-cols-4">
      <div>
        <h4>{{ $t('prod.product_list') }}</h4>
        <p class="text-xs">{{ $t('prod.Find and manage your uploaded products here') }}</p>
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
          {{ $t('prod.download_rejection_products') }}
        </button>
      </div>
      <div class="text-end" v-if="$store.state.admin.isVendor">
        <Nuxt-link :to="`/products/add`"
                   class="border border-primary bg-primary hover:text-white text-white p-2 rounded px-3  leading-3">
          {{ $t('prod.add_new_product') }}
        </Nuxt-link>
      </div>
    </div>
    <!-- -------------------------- -->
    <ul v-if="vendorId==0" class="flex mb-0 list-none flex-wrap  w-full shadow mt-10 flex-row">
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
              gate="view_products"
              :param="{vendor_id:vendorId}"
              manage_gate="view_products"

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
                      <button v-if="actionCheck && openTab !== 'is_draft' &&  $store.state.admin.isVendor"
                              @click="toggleMultiDropdown"
                              class="bg-blue-700 hover:bg-blue-800 relative font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
                              type="button">
                        {{ $t('prod.status') }}
                        <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 10 6">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 4 4 4-4"/>
                        </svg>
                      </button>

                      <!-- filter by status menu -->
                      <div
                        v-if="isMultiDropdownVisible"
                        class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute mt-[50px]">
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownDefaultButton">
                          <a
                            class="block cursor-pointer px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                            @click.prevent="setStatus(1, null)">{{ $t('prod.set_online') }}</a>
                          <a
                            class="block cursor-pointer px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                            @click.prevent="setStatus(0, null)">{{ $t('prod.set_offline') }}</a>
                          <a v-if="openTab !== 'is_archived'"
                             class="block cursor-pointer px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                             @click.prevent="setStatus(null, true)">{{ $t('prod.archived') }}</a>
                          <a v-if="openTab === 'is_archived'"
                             class="block cursor-pointer px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                             @click.prevent="statusUpdate(value.id, 'approved')">{{ $t('prod.back_to_approved') }}</a>
                        </ul>
                      </div>
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
<!--                      /products/variant/${value.id}-->
                      <nuxt-link
                        v-if="$can('manage_products') && value.is_variant && $store.state.admin.isVendor"
                        class="dply-felx j-left link"
                        style="max-width:100px;height:70px;object-fit:cover"
                        :to="`/products/variant/${value.id}`"
                      >
                        <lazy-image
                          v-if="value.image"
                          class="mr-20"
                          :data-src="getThumbImageURL(value.image)"
                          :alt="value.title?.en"
                        />
                        <lazy-image
                          v-else
                          class="mr-20"
                          :data-src="getThumbImageURL(value.first_thumb_image)"
                          :alt="value.title?.en"
                        />
                      </nuxt-link>
                      <nuxt-link
                        v-else
                        class="dply-felx j-left link"
                        style="max-width:100px;height:70px;object-fit:cover"
                        :to="$store.state.admin.isSuperAdmin?`/products/show/${value.id}`:`/products/${value.id}`"
                      >

                        <lazy-image
                          v-if="value.image"
                          class="mr-20"
                          :data-src="getThumbImageURL(value.image)"
                          :alt="value.title?.en"
                        />
                        <lazy-image
                          v-else
                          class="mr-20"
                          :data-src="getThumbImageURL(value.first_thumb_image)"
                          :alt="value.title?.en"
                        />
                      </nuxt-link>
                    </td>
                    <td v-if="$store.state.admin.isSuperAdmin"> {{ value.vendor?.local_name }}</td>
                    <td>
                      <span v-if="value.is_variant" class="flex items-center rounded-md bg-primary-light px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10 w-[55px] text-primary">Variant</span>
                      {{ value.title?.length > 30 ? value.title.substring(0, 30) + '...' : value.title }}
                    </td>
                    <td>{{ value.sku }}</td>
                    <td v-if="value.category">{{ value.category.name }}</td>
                    <td v-else>No Category</td>
                    <td v-if="value.product_prices[0]?.selling_price">
                      <p>
                        <del>SAR {{ value.product_prices[0]?.unit_price }}</del>
                      </p>
                      <p>
                        SAR {{ value.product_prices[0]?.selling_price }}
                      </p>
                    </td>
                    <td v-else>
                      <p>
                        SAR {{ value.product_prices[0]?.unit_price }}
                      </p>
                    </td>
                    <td>
                      <p v-if="showTitleQtyMessage === index" class="text-primary">Enter to update quantity!</p>
                      <input v-if="$store.state.admin.isVendor" type="qty" title="Enter to update"
                             :value="value.available_quantity" @keypress="onlyNumber"
                             @change="updateQty(value.id, $event)">
                      <input v-else type="text" :value="value.available_quantity" disabled>
                      <p class="text-xs" v-if="value.minOrderQuantity">Min. Order Qty:
                        {{ value.minOrderQuantity?.min_quantity }}</p>
                      <p class="text-xs" v-else>NAN</p>
                    </td>
                    <td>{{ value.created }}<br>
                      {{ value.updated }}
                    </td>
                    <td>
                      <div class="flex">
                        {{ value.status }}
                        <div class="tooltip">
                          <svg v-if="value.status==='rejected'"
                               style="height: 15px; width: 15px; color: red; margin-top: 5px" viewBox="0 0 24 24"
                               focusable="false" id="popover-trigger-64" aria-haspopup="dialog" aria-expanded="false"
                               aria-controls="popover-content-64">
                            <path fill="currentColor"
                                  d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"></path>
                          </svg>
                          <span class="tooltiptext" style="width: 260px; margin-left: -100px">Click on this product to view why your product has been rejected and make edits accordingly.</span>
                        </div>
                      </div>
                      <br>
                      <span class="text-error cursor-pointer underline" @click="openModal(index)"
                            v-if="value.status==='rejected'">
                        {{ $t('prod.show') }}
                      </span>
                      <Modal :showModal="modalVisible" :is_reject_modal="is_reject_modal" :providedId="index"
                             @closeModal="closeModal" v-if="value.reject_reasons">
                        <div class="flex justify-between relative">
                          <h4><strong>Rejection reasons</strong></h4>

                        </div>
                        <div class="mb-4 mt-10">
                          <slot>
                            <div v-for="(reject_reason_item, index) in value.reject_reasons">
                              <p class="capitalize">
                                <strong>{{ translateRejectReason(reject_reason_item.name) }}</strong></p>
                              <ul>
                                <li class="block py-2 mx-3">{{
                                    translateRejectReason(reject_reason_item.description)
                                  }}
                                </li>
                              </ul>
                            </div>
                          </slot>
                        </div>
                      </Modal>
                    </td>
                    <td v-if="value.is_buyable===1">Online</td>
                    <td v-else>Offline</td>
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
                            v-if="$can('approve_products')"
                            class="block px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                            :to="`/products/show/${value.id}`">
                            {{ $t('prod.Show')}}
                          </nuxt-link>
                          <!--                          v-if="openTab === 'is_draft' || openTab === 'is_rejected' || openTab === 'is_pending_approval' || openTab === 'is_approved' || openTab === 'is_archived'"-->
                          <nuxt-link
                            v-if="$can('manage_products') && !value.is_variant"
                            class="block px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                            :to="`/products/${value.id}`">
                            {{ $t('prod.Edit')}}
                          </nuxt-link>
                          <nuxt-link
                            v-if="$can('manage_products') && value.is_variant"
                            class="block px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white"
                            :to="`/products/variant/${value.id}`">
                            {{ $t('prod.Edit')}}
                          </nuxt-link>
                          <li
                            class="block px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                            @click="statusUpdate(value.id, 'archived')"
                            v-if="openTab === 'is_approved' && $store.state.admin.isVendor"
                          >
                            {{ $t('prod.Archive')}}
                          </li>

                          <li
                            class="block px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                            v-if="value.status === 'archived' && $store.state.admin.isVendor"
                            @click="statusUpdate(value.id, 'approved')"
                          >
                            {{ $t('prod.back_to_approved') }}
                          </li>
                          <li
                            class="block px-4 py-2 hover:bg-primary dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                            @click.prevent="$refs.listPage.deleteItem(value.id), visibleDropdown=null"
                            v-if="$store.state.admin.isVendor"
                          >
                            {{ $t('prod.Delete')}}
                          </li>
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
    vendorId: {
      type: Number,
      default: 0
    },
  },
  middleware: ['common-middleware', 'auth'],
  data() {
    return {
      modalVisible: false,
      isMultiDropdownVisible: false,
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
    translateRejectReason(text) {
      var lang = this.currentLanguage ? this.currentLanguage.code : 'en';
      return text[lang] || text['en'] || text;
    },

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
      const confirmation = await this.$swal({
        title: "Are you sure?",
        icon: "question",
        iconHtml: "؟",
        confirmButtonText: "Yes",
        cancelButtonText: "Noا",
        showCancelButton: true,
        showCloseButton: true,
      });
      if (confirmation.value) {
        if (status != null) {
          await this.setById({
            id: id,
            params: {status: status},
            api: 'updateStatus'
          }).then(() => {
            this.visibleDropdown = null
            // window.location.reload()
            if (status === 'approved') {
              this.$router.push({path: `/products/approved`})
            }
            if (status === 'archived') {
              this.$router.push({path: `/products/archived`})
            }
          })
        }
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

    setThumbImage(thumb_url, url) {
      if (thumb_url !== null) {
        return thumb_url;
      } else {
        //if no thumb set then 1st image thumb
        return url;
      }
    },

    // async updateQty(id, event) {
    //   let available_quantity = event.target.value;
    //
    //   if (available_quantity !== '') {
    //     await this.setById({
    //       id: id,
    //       params: {available_quantity: available_quantity},
    //       api: 'setAvailableQty'
    //     }).then(data => {
    //       console.log(data)
    //     })
    //   }
    // },
    async updateQty(id, event) {
      let available_quantity = event.target.value;

      // Validate if input is a valid number and within the specified range
      if (/^\d+$/.test(available_quantity) && available_quantity >= 0 && available_quantity <= 99999999) {
        await this.setById({
          id: id,
          params: { available_quantity: available_quantity },
          api: 'setAvailableQty'
        }).then(data => {
          console.log(data);
        });
      } else {
        // If input is not a valid number or out of range, reset input value to empty string
        event.target.value = '';
        this.setToastError(this.$t('prod.Input value must be a number between 0 and 99999999'));
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
    toggleMultiDropdown() {
      this.isMultiDropdownVisible = !this.isMultiDropdownVisible;
    },
    actionCheckToggle() {
      this.actionCheck = !this.actionCheck
    },
    async setStatus(status = null, archived = null) {
      // console.log(this.cbList)
      let params = {};

      if (status !== null) {
        params = {set_status: status, product_ids: this.cbList};
      } else if (archived !== null) {
        params = {set_archived: archived, product_ids: this.cbList};
      }

      if (status !== null || archived !== null) {
        const data = await this.setRequest({
          params,
          api: 'updateVisibility',
        });
        this.isMultiDropdownVisible = false;
        this.$router.go()
      }
    },
    ...mapActions('common', ['getById', 'setById', 'setImageById', 'getDropdownList', 'setWysiwygImage', 'deleteData', 'getRequest', 'getCategoriesTree', 'setRequest']),
    ...mapActions('ui', ["setToastMessage", "setToastError"]),
  },
  mounted() {

  }
}
</script>

<style scoped>
/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
