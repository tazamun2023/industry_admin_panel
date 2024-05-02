<!-- components/Modal.vue -->
<template v-if="$can('fulfil_orders')">
  <div class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-50"></div>

    <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/2 lg:w-2/3 xl:w-3/5">
      <svg @click="closeModal" class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]"
           aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
      <!-- Modal Content -->
      <div class="mb-4">
        <h4 class="font-bold">{{$t('approveModal.approvedOrder')}}: {{ selectedOrders[0]?.order_id }}</h4>

      </div>
      <div class="flex px-20 ">
        <div class="w-full">
          <div class="flex items-center w-full">
            <div class="w-8 h-8 shrink-0 mx-[-1px] bg-primary p-1.5 flex items-center justify-center rounded-full">
              <span class="text-base text-white font-bold">1</span>
            </div>
            <div class="w-full h-1 mx-4 rounded-lg bg-primary"></div>
          </div>
          <div class="mt-2 mr-4">
            <h6 class="text-base font-bold text-blue-500">{{$t('approveModal.ordersItems')}}</h6>
          </div>
        </div>
        <div class="w-full">
          <div class="flex items-center w-full">
            <div :class="{'w-8 h-8 shrink-0 mx-[-1px] bg-primary p-1.5 flex items-center justify-center rounded-full':secondBox || thirdBox,
            'w-8 h-8 shrink-0 mx-[-1px] bg-smooth p-1.5 flex items-center justify-center rounded-full': !thirdBox && !secondBox,
            }">
              <span class="text-base text-white font-bold">2</span>
            </div>
            <div :class="{'w-full h-1 mx-4 rounded-lg bg-primary': secondBox || thirdBox ,'w-full h-1 mx-4 rounded-lg bg-smooth':!thirdBox && !secondBox}" ></div>
          </div>
          <div class="mt-2 mr-4">
            <h6 class="text-base font-bold text-blue-500">{{$t('approveModal.pickupAddress')}}</h6>
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
            <h6 :class="{'text-base text-primary font-bold': thirdBox,'text-base text-smooth font-bold': !thirdBox}">{{$t('approveModal.confirmation')}}</h6>
          </div>
        </div>
      </div>
      <div v-if="firstBox" class="firstStep">
        <div class="my-2 p-4 border border-smooth rounded" v-for="(order,i) in selectedOrders" :key="i">

          <div class="flex gap-4 justify-between" >
            <div class="flex gap-4">
              <div>
                <p>{{$t('approveModal.order')}}</p>
                <p class="font-bold">{{order?.order_id}}</p>
              </div>
              <div>
                <p>{{$t('approveModal.orderPlaced')}}</p>
                <p class="font-bold">09-nov-23</p>
              </div>
              <div>
                <p>{{$t('approveModal.paymentMethod')}}</p>
                <p class="font-bold">{{ $t(`paymentMethod.${order.payment_method}`) }}</p>
              </div>
              <div>
                <p>{{$t('approveModal.payment')}}</p>
                <p class="font-bold text-primary"><span
                  class="text-primary  px-2 rounded-3xl">{{ $t(`status.${order.payment_status}`) }}</span></p>
              </div>
              <div>
                <p>{{$t('approveModal.status')}}</p>
                <p class="font-bold"><span class="text-primary  px-2 rounded-3xl">
                  {{ $t(`status.${order.status}`) }}
                </span></p>
              </div>
            </div>
            <div class="flex gap-4">
              <div>
                <p>{{$t('approveModal.total')}}</p>
                <p><strong>{{order?.total_price}}</strong></p>
              </div>

            </div>
          </div >

          <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <div class="overflow-y-scroll h-[250px] scroll-thin">
                    <table class="min-w-full  text-left text-sm font-light">
                      <thead class=" font-medium ">
                      <tr>
                        <th scope="col" class="p-2 w-[50px]">#</th>
                        <th scope="col" class="p-2">{{$t('order.total')}}</th>
                        <th scope="col" class="p-2">{{$t('orderDetails.quantity')}}</th>
                        <th scope="col" class="p-2">>{{$t('orderDetails.agreed_price')}}</th>
                        <th scope="col" class="p-2">{{$t('orderDetails.subtotal')}}</th>
                        <th scope="col" class="p-2">{{$t('vendor.action')}}</th>
                      </tr>
                      </thead>
                      <tbody v-for="(subItem,x) in order?.sub_order_items" :key="x">
                      <tr class=" " >
                        <td class="whitespace-nowrap p-2 font-medium">{{ x + 1 }}</td>
                        <td class="whitespace-nowrap p-2">
                          <div class="flex items-center gap-4">
                            <LazyImage
                              :data-src="subItem.product.image"
                              :title="subItem.product.title"
                              :alt="subItem.product.title"
                              class="w-10 h-10"
                            />
                            <div>
                              <a href="">{{subItem.product.title.slice(0, 30)}}....</a>
                              <p>{{$t('vendor.sku')}}: {{subItem.product.sku}}</p>
                            </div>
                          </div>

                        </td>
                        <td class="whitespace-nowrap p-2">{{subItem?.quantity}}</td>
                        <td class="whitespace-nowrap p-2">{{ $t('app.SAR') }} {{subItem?.price}} / {{ $t('brand.price') }}</td>
                        <td class="whitespace-nowrap p-2">{{ $t('app.SAR') }} {{subItem?.total_price}}</td>
                        <td class="whitespace-nowrap p-2">
                          <select @change="handleSelectChange($event,subItem)"
                                  class="p-3 border border-smooth rounded">
                            <option :selected="selectedOrdersall && selectedOrdersall.sub_order_items[x]?.status == 'available' ? true : false" value="1">
                              {{ $t('order.available') }}</option>
                            <option :selected="selectedOrdersall && selectedOrdersall.sub_order_items[x]?.status == 'unavailable' ? true : false" value="0">
                              {{ $t('order.noAvailable') }}</option>
                          </select>
                        </td>
                      </tr>
                      <tr v-if="subItemSelected && subItemSelected?.order.product?.id == subItem?.product?.id && subItemSelected?.availabilityStatus == 0">
                        <td colspan="6">
                          <div class="py-2 w-50 mx-auto">
                            <label class="w-full text-warning capitalize py-2" for="">{{ $t('orderReject.selectRejectionReason') }}</label>
                            <div class="flex gap-4">
                              <select class="p-4 w-full border border-smooth rounded" v-model="subItemSelected.reject_reasons">
                                <option :value="item.id" v-for="(item, index) in reasonsRejection" :key="index">
                                  {{item.description}}
                                </option>
                              </select>
                              <button
                                @click="saveProductUnAvaliable(subItem.product_id)"
                                class="py-4 m-0 rounded h-[52px] w-[80px] leading-5 bg-primary text-white hover:text-primary">

                                {{ $t('orderReject.save') }}
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- ----------------- -->
                  <div class="w-full mt-2 border-t border-smooth pt-7" >
                    <div class="w-2/5 ltr:ml-auto rtl:mr-auto ltr:items-end rtl:items-start border border-smooth p-4 rounded">
                      <div class="flex my-1 justify-between">
                        <div><h5>{{ $t('approveModal.itemTotal') }}</h5></div>
                        <div><h5>{{ $t('app.SAR') }} {{order?.sub_total}}</h5></div>
                      </div>
                      <div class="flex my-1 justify-between">
                        <div><h5>{{ $t('approveModal.vat') }}:</h5></div>
                        <div><h5>{{ $t('app.SAR') }} {{order?.vat}}</h5></div>
                      </div>
                      <div class="flex my-1 justify-between">
                        <div><h5>{{ $t('approveModal.itemTotal') }}</h5></div>
                        <div><h5>{{ $t('app.SAR') }} {{order?.total}}</h5></div>
                      </div>
                      <div class="flex my-2 justify-between">
                        <div><h5 class="font-bold">{{ $t('orderDetails.industry_fee') }}</h5></div>
                      </div>
                      <div class="flex my-1 justify-between">
                        <div><h5>{{ $t('approveModal.commission') }}</h5></div>
                        <div><h5>{{ $t('app.SAR') }} {{order?.commission}}</h5></div>
                      </div>
                      <div class="flex my-1 justify-between">
                        <div><h5>{{ $t('approveModal.vatOnCommission') }}</h5></div>
                        <div><h5>{{ $t('app.SAR') }} {{order?.tax_percentage}}</h5></div>
                      </div>
                      <div class="flex my-1 justify-between">
                        <div><h5>{{ $t('approveModal.totalCommission') }}</h5></div>
                        <div><h5>{{ $t('app.SAR') }}
                          {{ (order?.commission || 0) + (order?.commission_tax || 0) }}
                        </h5></div>
                      </div>
                      <div class="flex border-t border-smooth pt-2 my-1 justify-between">
                        <div><h5 class="font-bold">{{ $t('approveModal.totalPayout') }}</h5></div>
                        <div><h5 class="font-bold">{{ $t('app.SAR') }} 123343</h5></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full border-t relative p-8 border-smooth">
            <div class="items-end p-1 text-end absolute ltr:right-[40px] mt-[-18px] rtl:left-[40px]">
              <button @click="closeModal" class="bg-smooth px-4 w-[100px] text-primary p-3 rounded leading-3">{{ $t('approveModal.cancel') }}
              </button>
              <button @click="firstStep"
                      class="bg-primary hover:bg-primary px-4 w-[100px] text-white p-3 rounded leading-3">{{ $t('approveModal.next') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- -------------1st step end--------- -->
      <div v-if="secondBox" class="secondStep p-4">
        <div class="card p-4">
          <div class="flex justify-between">
            <h4> {{ $t('approveModal.pickupAddress') }}</h4>
            <a   v-if="$can('edit_addresses')" class="border border-smooth bg-primary text-white p-4 leading-3 rounded-lg" @click="showModelAddAddress">
              {{ $t('approveModal.pickupAddress') }}</a>
          </div>

          <div  v-for="(address,d) in  addressList.data" :key="d"
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
              <h4>{{ address?.address_name }} <span class="text-xs text-primary p-1 bg-primarylight rounded-3xl"> {{ address?.country }} - {{ address?.city }}</span></h4>
              <p><span>{{ address?.address_name }},</span> <span>{{ address?.district }},</span> <span>{{ address?.street }},</span> <span>{{ address?.building_number }},</span>
                <span>{{address?.shipping_address}}</span></p>
              <p class="flex">
                <svg class="w-6 h-6 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m18.4 14.8-1.2-1.3a1.7 1.7 0 0 0-2.4 0l-.7.7a1.7 1.7 0 0 1-2.4 0l-1.9-1.9a1.7 1.7 0 0 1 0-2.4l.7-.6a1.7 1.7 0 0 0 0-2.5L9.2 5.6a1.6 1.6 0 0 0-2.4 0c-3.2 3.2-1.7 6.9 1.5 10 3.2 3.3 7 4.8 10.1 1.6a1.6 1.6 0 0 0 0-2.4Z"/>
                </svg>
                <span>+{{address?.phone_code}} {{ address.phone }}</span></p>
            </div>
            <div class="ml-auto">
              <button class="bg-smooth px-4 text-primary p-1 rounded leading-3" @click="closeModelAddAddress"
              v-if="$can('edit_addresses')"
              >{{ $t('category.edit') }}</button>
            </div>
          </div>
        </div>
        <div class="w-full border-t mb-2 p-2 border-smooth">
          <div class="items-end p-1 text-end absolute ltr:right-[40px] rtl:left-[40px]">
            <button @click="closeModal" class="bg-smooth px-4 w-[100px] text-primary p-3 rounded leading-3">{{ $t('approveModal.cancel') }}
            </button>
            <button @click="backSecondStep" class="bg-smooth px-4 w-[100px] text-primary p-3 rounded leading-3">{{ $t('approveModal.back') }}
            </button>
            <button @click="secondStep" v-if="addressSelected" class="bg-primary px-4 w-[100px] text-white p-3 rounded leading-3">{{ $t('approveModal.next') }}</button>
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
                      <p class="pt-2">{{order.product.title.slice(0,30)}}...</p>
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
            <p>{{ addressSelected.address_name }},{{ addressSelected.country }},{{addressSelected.city}}
            ,{{addressSelected.building_number}}
            </p>
          </div>
        </div>

        <div class="w-full border-t p-2 mb-2 border-smooth">
          <p class="text-primary">Please keep your item ready for pickup 12 February 2023</p>
          <div class="items-end p-1  text-end absolute ltr:right-[40px] rtl:left-[40px]">
            <button @click="closeModal" class="bg-smooth px-4 w-[100px] text-primary p-3 rounded leading-3">{{ $t('approveModal.cancel') }}
            </button>
            <button @click="backThirdStep" class="bg-smooth px-4 w-[100px] text-primary p-3 rounded leading-3">{{ $t('approveModal.back') }}
            </button>
            <button @click="approveSave" class="bg-primary px-4 w-[100px] text-white p-3 rounded leading-3">{{ $t('approveModal.save') }}</button>
          </div>
        </div>
      </div>
      <!-- Close Button -->
      <div class="flex justify-end">
        <slot name="buttons">

        </slot>
      </div>
      <div  v-if="addressmodal">
      <AddAddressModel @close="closeModelAddAddress" :address="addressSelected" >

      </AddAddressModel>
      </div>
    </div>
  </div>
</template>

<script>
import LazyImage from "./LazyImage.vue";
import {mapGetters, mapActions} from "vuex";
import AddAddressModel from "./AddAddressModel.vue";

export default {
  components: {AddAddressModel, LazyImage},
  computed :{
    ...mapGetters('order',['orders','selectedOrdersall']),
    ...mapGetters('address',['addressList']),
  },
  data() {
    return {
      firstBox: true,
      secondBox: false,
      thirdBox: false,
      selectedValue: '',
      rejectionReason: '',
      orders: "",
      addressmodal:false,
      subItemSelected: {
        order: "",
        availabilityStatus: "",
        reject_reasons: "",
        status: ""
      },
      addressSelected:""
    }
  },
  methods: {
    ...mapActions('address',['getVendorAddress']),
    updateAddreess() {

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
      this.addressmodal = ! this.addressmodal
    },
    showModelAddAddress() {
      this.addressSelected = "";
      this.closeModelAddAddress();
    },
    handleSelectChange(event, subItem) {
      console.log(event.target.value, subItem)
      if(event.target.value == 0) {
        this.subItemSelected.availabilityStatus = event.target.value;
        this.subItemSelected.order = subItem;
      } else {
        this.subItemSelected.availabilityStatus = event.target.value;
        this.subItemSelected.order = subItem;
        this.saveProductAvaliable(subItem.product_id);
      }

    },
    saveProductUnAvaliable(product_id) {
      this.$store.commit('order/CHANGE_ORDER_SELECTED',{
        payload:{
          product_id:product_id,
          reject_reasons:this.subItemSelected.reject_reasons,
          status:this.subItemSelected.availabilityStatus
        }
      })
      this.subItemSelected.order=""
      this.subItemSelected.availabilityStatus="";
      this.subItemSelected.status="";
      this.subItemSelected.reject_reasons="";
    },
    saveProductAvaliable(product_id) {
      this.$store.commit('order/CHANGE_ORDER_SELECTED',{
        payload:{
          product_id:product_id,
          reject_reasons: null,
          status: 1
        }
      })

    },
    approveSave() {
      let orders=[];
      this.selectedOrdersall?.sub_order_items.map((item,index) => {
        orders[index]= {
          id: item.product_id,
          status: item.status == 'unavailable' ? 0 : 1,
          reject_reason_id: item.status == 'unavailable' ? item.reason_id : null
        }
        return item;
      });
      let data= {
        order_id: this.selectedOrdersall.order_id,
        pickup_address_id: this.addressSelected.id,
        products: orders
      }
      this.$emit('approveOrder',data)
    }
  },
  mounted() {
    this.orders = this.selectedOrders;
    this.getVendorAddress();
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
