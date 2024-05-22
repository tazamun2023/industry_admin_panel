<!-- components/Modal.vue -->
<template v-if="$can('fulfil_orders')">
  <custome-modal :title="` ${$t('approveModal.approvedOrder') }  ${selectedOrders[0]?.order_id }`"
                 :show-modal="showModal"
                 @close="closeModal" size="lg">

    <template v-slot:header2>
      <div class="flex px-20 ">
        <div class="w-full">
          <div class="flex items-center w-full">
            <div class="w-8 h-8 shrink-0 mx-[-1px] bg-primary p-1.5 flex items-center justify-center rounded-full">
              <span class="text-base text-white font-bold">1</span>
            </div>
            <div class="w-full h-1 mx-4 rounded-lg bg-primary"></div>
          </div>
          <div class="mt-2 mr-4">
            <h6 class="text-base font-bold text-blue-500">{{ $t('approveModal.ordersItems') }}</h6>
          </div>
        </div>
        <div class="w-full">
          <div class="flex items-center w-full">
            <div :class="{'w-8 h-8 shrink-0 mx-[-1px] bg-primary p-1.5 flex items-center justify-center rounded-full':secondBox || thirdBox,
            'w-8 h-8 shrink-0 mx-[-1px] bg-smooth p-1.5 flex items-center justify-center rounded-full': !thirdBox && !secondBox,
            }">
              <span class="text-base text-white font-bold">2</span>
            </div>
            <div
              :class="{'w-full h-1 mx-4 rounded-lg bg-primary': secondBox || thirdBox ,'w-full h-1 mx-4 rounded-lg bg-smooth':!thirdBox && !secondBox}"></div>
          </div>
          <div class="mt-2 mr-4">
            <h6 class="text-base font-bold text-blue-500">{{ $t('approveModal.pickupAddress') }}</h6>
          </div>
        </div>
        <div>
          <div class="flex items-center">
            <div :class="{'w-8 h-8 shrink-0 mx-[-1px] bg-primary p-1.5 flex items-center justify-center rounded-full':thirdBox,
            'w-8 h-8 shrink-0 mx-[-1px] bg-smooth p-1.5 flex items-center justify-center rounded-full': !thirdBox,
            }">
              <span class="text-base text-white font-bold">3</span>
            </div>
          </div>
          <div class="mt-2">
            <h6 :class="{'text-base text-primary font-bold': thirdBox,'text-base text-smooth font-bold': !thirdBox}">
              {{ $t('approveModal.confirmation') }}</h6>
          </div>
        </div>
      </div>
    </template>


    <div v-if="firstBox" class="firstStep">
      <div class="my-2 p-4 border border-smooth rounded" v-for="(order,i) in selectedOrders" :key="i">

        <div class="flex gap-4 justify-between">
          <card-tab :order="order" class="flex-1"></card-tab>
          <div class="flex gap-4 flex-none w-16">
            <div>
              <p>{{ $t('approveModal.total') }}</p>
              <price-with-curency-format :price="order?.sub_total"></price-with-curency-format>

            </div>

          </div>
        </div>
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <order-items :order="order"
                           :show_taxes="false"
                           :change_status="true"
                           @save="saveProductUnAvaliable"
                           :selectedOrdersall="selectedOrdersall"
                           @selectChange="handleSelectChange"
                           :sub-item-selected="subItemSelected"
                           :reasons-rejection="reasonsRejection">

              </order-items>
              <order-summary :order="order"></order-summary>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- -------------1st step end--------- -->
    <div v-if="secondBox" class="secondStep p-4">
      <div class="card p-4">
        <div class="flex justify-between">
          <h4> {{ $t('approveModal.pickupAddress') }}</h4>
          <a v-if="$can('edit_addresses')"
             class="border border-smooth bg-primary text-white p-4 leading-3 rounded-lg"
             @click="showModelAddAddress">
            {{ $t('approveModal.pickupAddress') }}</a>
        </div>
        <div class="p-1">
          <div v-for="(address,d) in  addressList.data" :key="d"
               @click="focusAddress(address)"
               :class="{
    'card gap-4 my-4 p-2 flex border border-primary cursor-pointer':
      addressSelected.id === address.id,
    'card gap-4 my-4 p-2 flex cursor-pointer':
      addressSelected.id !== address.id
  }"
          >
            <div class="p-1">
              <input type="radio"
                     :id="'addressRadio_' + d"
                     :value="address"
                     v-model="addressSelected"
                     :checked="addressSelected != '' && addressSelected.id === address.id ? true : false"

                     @change="focusAddress(address)"
              />
            </div>
            <div>
              <h4>{{ address?.address_name }} <span class="text-xs text-primary p-1 bg-primarylight rounded-3xl"> {{
                  address?.country
                }} - {{ address?.city }}</span></h4>
              <p><span>{{ address?.address_name }},</span> <span>{{ address?.district }},</span>
                <span>{{ address?.street }},</span> <span>{{ address?.building_number }},</span>
                <span>{{ address?.shipping_address }}</span></p>
              <p class="flex">
                <svg class="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m18.4 14.8-1.2-1.3a1.7 1.7 0 0 0-2.4 0l-.7.7a1.7 1.7 0 0 1-2.4 0l-1.9-1.9a1.7 1.7 0 0 1 0-2.4l.7-.6a1.7 1.7 0 0 0 0-2.5L9.2 5.6a1.6 1.6 0 0 0-2.4 0c-3.2 3.2-1.7 6.9 1.5 10 3.2 3.3 7 4.8 10.1 1.6a1.6 1.6 0 0 0 0-2.4Z"/>
                </svg>
                <span>+{{ address?.phone_code }} {{ address.phone }}</span></p>
            </div>
            <div class="ml-auto">
              <button class="bg-smooth px-4 text-primary p-1 rounded leading-3" @click="closeModelAddAddress"
                      v-if="$can('edit_addresses')"
              >{{ $t('category.edit') }}
              </button>
            </div>
          </div>
        </div>
        <div class="flex justify-between ">
          <pagination :total-page="addressList.last_page" @handCurrentPage="handCurrentPage"></pagination>
        </div>
        <div>
        </div>
      </div>
    </div>

    <div v-if="thirdBox" class="thirdStep p-4">
      <div>
        <h4>{{ $t('approveModal.pickupItems') }}</h4>
        <div class="card">
          <div>
            <table>
              <thead>
              <tr>
                <th>{{ $t('orderDetails.product') }}</th>
                <th>{{ $t('orderDetails.quantity') }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(order,index) in selectedOrdersall.sub_order_items" :key="index"
                  v-if="order.status == 'available'"
              >
                <td>
                  <div class="flex items-flex gap-4">
                    <div class="flex gap-4">
                      <LazyImage
                        :data-src="order.product.image"
                        :title="order.product.title"
                        :alt="order.product.title"
                        class="w-10 h-10"
                      />
                      <p class="pt-2">{{ order.product.title.slice(0, 30) }}...</p>
                    </div>
                  </div>
                </td>
                <td>
                  {{ order.quantity }}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card my-2 p-4">
          <h4>{{ $t('approveModal.pickupAddress') }}</h4>
          <p><strong>{{ addressSelected.type }}</strong></p>
          <p>{{ addressSelected.address_name }},{{ addressSelected.country }},{{ addressSelected.city }}
            ,{{ addressSelected.building_number }}
          </p>
        </div>
      </div>

    </div>


    <template v-slot:buttons>
      <button v-if="firstBox" @click="firstStep"
              class="bg-primary hover:bg-primary px-4 w-[100px] text-white p-3 rounded leading-3">
        {{ $t('approveModal.next') }}
      </button>
      <button v-if="secondBox" @click="backSecondStep"
              class="bg-smooth px-4 w-[100px] text-primary p-3 rounded leading-3">
        {{ $t('approveModal.back') }}
      </button>
      <button @click="secondStep" v-if="secondBox && addressSelected"
              class="bg-primary px-4 w-[100px] text-white p-3 rounded leading-3">{{ $t('approveModal.next') }}
      </button>
      <button v-if="thirdBox" @click="backThirdStep"
              class="bg-smooth px-4 w-[100px] text-primary p-3 rounded leading-3">
        {{ $t('approveModal.back') }}
      </button>
      <button v-if="thirdBox" @click="approveSave" class="bg-primary px-4 w-[100px] text-white p-3 rounded leading-3">
        {{ $t('approveModal.save') }}
      </button>
    </template>

    <div v-if="addressmodal">
      <AddAddressModel @close="closeModelAddAddress" :address="addressSelected">

      </AddAddressModel>
    </div>


  </custome-modal>
</template>

<script>
import LazyImage from "./LazyImage.vue";
import {mapGetters, mapActions} from "vuex";
import AddAddressModel from "./AddAddressModel.vue";
import Pagination from './partials/Pagination.vue';
import PriceWithCurencyFormat from "./priceWithCurencyFormat.vue";
import OrderSummary from "../pages/orders/component/OrderSummary.vue";
import CardTab from "../pages/orders/component/CardTab.vue";
import OrderItems from "../pages/orders/component/OrderItems.vue";
import CustomeModal from "./CustomeModal.vue";

export default {
  components: {
    CustomeModal,
    OrderItems, CardTab, OrderSummary, PriceWithCurencyFormat, AddAddressModel, LazyImage, Pagination
  },
  computed: {
    ...mapGetters('order', ['selectedOrdersall']),
    ...mapGetters('address', ['addressList']),
  },
  data() {
    return {
      firstBox: true,
      secondBox: false,
      thirdBox: false,
      selectedValue: '',
      rejectionReason: '',
      orders: "",
      addressmodal: false,
      // addressList:[],
      param: {
        page: ""
      },
      subItemSelected: {
        order: "",
        availabilityStatus: "",
        reject_reasons: "",
        status: ""
      },
      addressSelected: ""
    }
  },
  methods: {
    ...mapActions('address', ['getVendorAddress']),
    ...mapActions('common', ['getRequest']),
    updateAddreess() {

    },
    handCurrentPage(e) {
      this.fetchingData()
    },
    async fetchingData() {
      try {
        const data = await this.getRequest({
          params: {
            ...this.param,
            ...this.$route.query,
            ...{time_zone: this.timeZone}
          },
          api: "getVendorAddress"
        })
        console.log('data', data);
        this.$store.commit('address/SET_VENDOR_ADDRESS', data)
      } catch (e) {
        return this.$nuxt.error(e)
      }
    },
    closeModal() {
      this.$emit('close');
    },
    focusAddress(item) {
      console.log(item)
      this.addressSelected = item;
    },
    firstStep() {
      this.firstBox = false;
      this.secondBox = true;
      this.thirdBox = false
    },
    secondStep() {
      this.firstBox = false;
      this.secondBox = false;
      this.thirdBox = true
    },
    backThirdStep() {
      this.firstBox = false;
      this.secondBox = true;
      this.thirdBox = false
    },
    backSecondStep() {
      this.firstBox = true;
      this.secondBox = false;
      this.thirdBox = false
    },

    closeModelAddAddress() {
      this.addressmodal = !this.addressmodal
    },
    showModelAddAddress() {
      this.addressSelected = "";
      this.closeModelAddAddress();
    },
    handleSelectChange(value, subItem) {
      console.log("event.target.value, subItem")
      console.log(value, subItem)
      if (value == 0) {
        this.subItemSelected.availabilityStatus = value;
        this.subItemSelected.order = subItem;
      } else {
        this.subItemSelected.availabilityStatus = value;
        this.subItemSelected.order = subItem;
        this.saveProductAvaliable(subItem.product_id);
      }

    },
    saveProductUnAvaliable(product_id) {
      console.log(product_id)
      console.log(this.subItemSelected)
      this.$store.commit('order/CHANGE_ORDER_SELECTED', {
        payload: {
          product_id: product_id,
          reject_reasons: this.subItemSelected.reject_reasons,
          status: this.subItemSelected.availabilityStatus
        }
      })
      this.subItemSelected.order = ""
      this.subItemSelected.availabilityStatus = "";
      this.subItemSelected.status = "";
      this.subItemSelected.reject_reasons = "";
    },
    saveProductAvaliable(product_id) {
      this.$store.commit('order/CHANGE_ORDER_SELECTED', {
        payload: {
          product_id: product_id,
          reject_reasons: null,
          status: 1
        }
      })

    },
    approveSave() {
      let orders = [];
      this.selectedOrdersall?.sub_order_items.map((item, index) => {
        orders[index] = {
          id: item.product_id,
          status: item.status == 'unavailable' ? 0 : 1,
          reject_reason_id: item.status == 'unavailable' ? item.reason_id : null
        }
        return item;
      });
      let data = {
        order_id: this.selectedOrdersall.order_id,
        pickup_address_id: this.addressSelected.id,
        products: orders
      }
      this.$emit('approveOrder', data)
    }
  },
  mounted() {
    this.orders = this.selectedOrders;
    if (!this.addressList)
      this.fetchingData();
    this.$router.beforeEach((to, from, next) => {
      if (to.query.page !== undefined) {
        this.param.page = to.query.page;
        this.fetchingData();
      } else {
        next();
      }
    });
  },
  props: ['showModal', 'is_reject_modal', 'providedId', 'selectedOrders', 'reasonsRejection']
};
</script>

<style class="scoped">
/* For WebKit browsers (Chrome, Safari) */
.scroll-thin::-webkit-scrollbar {
  width: 6px; /* Adjust as needed for thickness */
}

.scroll-thin::-webkit-scrollbar-thumb {
  background-color: gray;
}

.scroll-thin::-webkit-scrollbar-track {
  background-color: lightgray;
}
</style>
