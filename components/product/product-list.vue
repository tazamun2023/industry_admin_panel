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
                          :alt="value.title?.en"
                        />
                      </nuxt-link>
                    </td>
                    <td>{{ value.title?.length > 30 ? value.title.substring(0, 30)+'...' : value.title }}</td>
                    <td>{{ value.sku }}</td>
                    <td v-if="value.category">{{ value.category.name }}</td>
                    <td v-else>No Category</td>
                    <td>
                      <p v-if="value.maxUnitPrice"><del>SAR {{ value.maxUnitPrice?.max_unit_price }}</del></p>
                      <p v-else>NAN</p>
                      <p v-if="value.minSellingPrice">SAR {{ value.minSellingPrice?.min_selling_price }}</p>
                    </td>
                    <td>
                      <p  v-if="showTitleQtyMessage === index" class="text-primary">Enter to update quantity!</p>
                      <input type="qty" title="Enter to update" :value="value.available_quantity" @keypress="onlyNumber" @focusout="updateQty(value.id, $event)" >
                      <p class="text-xs" v-if="value.minOrderQuantity">Min. Order Qty: {{  value.minOrderQuantity[0]?.min_quantity }}</p>
                      <p class="text-xs" v-else>NAN</p>
                    </td>
                    <td>{{ value.created }}<br>
                      {{  value.updated }}
                    </td>
                    <td>
                      {{ value.status }} <span @click="openModal('index')">show</span>
                      <Modal :showModal="modalVisible" :modalId="currentModalId" :providedId="'index'" @closeModal="closeModal">
                        <div class="flex justify-between relative">
                            <h4>Rejection reasons {{ index }}</h4>
                            
                          </div>
                          <div class="mb-4">
                            <slot>
                            
                              <p><strong>General</strong></p>
                              <ul>
                                <li class="block py-2">lorem lorem lorem </li>
                                <li  class="block py-2">lorem lorem lorem </li>
                                <li  class="block py-2">lorem lorem lorem </li>
                                <li  class="block py-2">lorem lorem lorem </li>
                              </ul>
                            </slot>
                          </div>
                      </Modal>
                    </td>
                    <td>{{ value.status }}</td>
                    <td>
                      <select class="border border-smooth p-3 rounded" name="" id="">
                        <option value="">{{ $t('prod.action') }}</option>
                        <option value="">
                          <nuxt-link :to="`/products/${value.id}`">Edit</nuxt-link>
                        </option>
                        <option @click="stockUpdate(value.id, 0)">Set out of stock</option>
                        <option  @click="stockUpdate(value.id, 1)">Set in stock</option>
                        <option value="">Archive</option>
                        <option value="">Delete</option>
                      </select>
<!--                      <nuxt-link :to="`/products/${value.id}`">-->
<!--                        <svg class="w-4 h-4 text-gray-800 dark:text-white cursor-pointer" aria-hidden="true"-->
<!--                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">-->
<!--                          <path-->
<!--                            d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>-->
<!--                          <path-->
<!--                            d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>-->
<!--                        </svg>-->
<!--                      </nuxt-link>-->
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
        <!-- ------------------modal----------- -->
        <div v-if="rejectModal" class="fixed bg-modal inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="z-50 bg-white p-6 rounded-md shadow-md w-full md:w-1/2 lg:w-2/3 xl:w-1/4">
      <!-- Modal Content -->
      <div class="flex justify-between relative">
        <h4>Rejection reasons</h4>
        <svg @click="rejectModlHandle()" class="w-4 h-4 text-gray-800 absolute ltr:right-0  rtl:left-0 cursor-pointer mt-[-10px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
  </svg>
      </div>
      <div class="mb-4">
        <slot>
         
          <p><strong>General</strong></p>
          <ul>
            <li class="block py-2">lorem lorem lorem </li>
            <li  class="block py-2">lorem lorem lorem </li>
            <li  class="block py-2">lorem lorem lorem </li>
            <li  class="block py-2">lorem lorem lorem </li>
          </ul>
        </slot>
      </div>
      <!-- Close Button -->
     <div class="text-end">
      <button @click="rejectModlHandle()"  class="bg-primary leading-3 hover:text-primary text-white px-4 py-2 rounded-md">Close Modal</button>
     </div>
    </div>
  </div>
<!-- ==================modal------------2 -->

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
import moment from 'moment-timezone'
import Modal from "~/components/product/Modal.vue"
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
      currentModalId: '',
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
    openModal(modalId) {
      this.modalVisible = true;
      this.currentModalId = modalId;
    },
    closeModal() {
      this.modalVisible = false;
    },
   async stockUpdate(id, is_available=null){
     await this.setById({
       id: id,
       params: {is_available: is_available},
       api: 'updateStock'
     }).then(()=>{

       // window.location.reload()
     })
    },

   async updateQty(id, event){
     let available_quantity = event.target.value;
     if (available_quantity !== ''){
       await this.setById({
         id: id,
         params: {available_quantity: available_quantity},
         api: 'setAvailableQty'
       }).then(()=>{

         // alert('saved')
       })
     }
    },
    // checkInput(index) {
    //   this.showTitleQtyMessage = index;
    // },

    DateTimeFormat(dateTime){
      return moment(dateTime, 'MMM D, YYYY h:mm A').format('MMM D, YYYY h:mm A');
    },

    onlyNumber ($event) {
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
