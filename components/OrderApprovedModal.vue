<!-- components/Modal.vue -->
<template>
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
        <h4 class="font-bold">Approved Order: T233343r4343</h4>

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
            <h6 class="text-base font-bold text-blue-500">Orders Items</h6>
          </div>
        </div>
        <div class="w-full">
          <div class="flex items-center w-full">
            <div class="w-8 h-8 shrink-0 mx-[-1px] bg-primary p-1.5 flex items-center justify-center rounded-full">
              <span class="text-base text-white font-bold">2</span>
            </div>
            <div class="w-full h-1 mx-4 rounded-lg bg-primary"></div>
          </div>
          <div class="mt-2 mr-4">
            <h6 class="text-base font-bold text-blue-500">Pickup Address</h6>
          </div>
        </div>
        <div>
          <div class="flex items-center">
            <div class="w-8 h-8 shrink-0 mx-[-1px] bg-smooth p-1.5 flex items-center justify-center rounded-full">
              <span class="text-base text-white font-bold">3</span>
            </div>
          </div>
          <div class="mt-2">
            <h6 class="text-base text-smooth font-bold">Confirmation</h6>
          </div>
        </div>
      </div>
      <div v-if="firstBox" class="firstStep">
        <div class="my-2 p-4 border border-smooth rounded" v-for="(order,i) in selectedOrders" :key="i">

          <div class="flex gap-4 justify-between" >
            <div class="flex gap-4">
              <div>
                <p>Order</p>
                <p class="font-bold">{{order?.order_id}}</p>
              </div>
              <div>
                <p>Order Placed</p>
                <p class="font-bold">09-nov-23</p>
              </div>
              <div>
                <p>Payment Method</p>
                <p class="font-bold">Credit Card</p>
              </div>
              <div>
                <p>Payment</p>
                <p class="font-bold text-primary"><span
                  class="text-primary bg-primarylight px-2 rounded-3xl">Paid</span></p>
              </div>
              <div>
                <p>Status</p>
                <p class="font-bold"><span class="text-primary bg-primarylight px-2 rounded-3xl">
                  {{order?.status}}
                </span></p>
              </div>
            </div>
            <div class="flex gap-4">
              <div>
                <p>Total</p>
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
                        <th scope="col" class="p-2">Product</th>
                        <th scope="col" class="p-2">Quantity</th>
                        <th scope="col" class="p-2">Agreed Price</th>
                        <th scope="col" class="p-2">Subtotal</th>
                        <th scope="col" class="p-2">Action</th>
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
                              <p>Sku: {{subItem.product.sku}}</p>
                            </div>
                          </div>

                        </td>
                        <td class="whitespace-nowrap p-2">{{subItem?.quantity}}</td>
                        <td class="whitespace-nowrap p-2">SAR {{subItem?.price}} / price</td>
                        <td class="whitespace-nowrap p-2">SAR {{subItem?.total_price}}</td>
                        <td class="whitespace-nowrap p-2">
                          <select @change="handleSelectChange($event,subItem)"
                                  class="p-3 border border-smooth rounded">
                            <option selected value="1">Available</option>
                            <option value="2">No Available</option>
                          </select>
                        </td>
                      </tr>
                      <tr v-if="subItemSelected?.order.product?.id == subItem?.product?.id && subItemSelected?.availabilityStatus == 2">
                        <td colspan="6">
                          <div class="py-2 w-50 mx-auto">
                            <label class="w-full text-warning capitalize py-2" for="">Select rejection reason</label>
                            <div class="flex gap-4">
                              <select class="p-4 w-full border border-smooth rounded" v-model="subItemSelected.reject_reasons">
                                <option :value="item.id" v-for="(item, index) in reasonsRejection" :key="index">
                                  {{item.description}}
                                </option>
                              </select>
                              <button
                                @click="saveProductUnAvaliable(subItem.product_id)"
                                class="py-4 m-0 rounded h-[52px] w-[80px] leading-5 bg-primary text-white hover:text-primary">
                                Save
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- ----------------- -->
                  <div class="w-full" >
                    <div class="w-2/5 ml-auto items-end border border-smooth p-4 rounded">
                      <div class="flex my-1 justify-between">
                        <div><h5>Item(S) Subtotal</h5></div>
                        <div><h5>SAR {{order?.order_total}}</h5></div>
                      </div>
                      <div class="flex my-1 justify-between">
                        <div><h5>Vat (%):</h5></div>
                        <div><h5>SAR 123343</h5></div>
                      </div>
                      <div class="flex my-1 justify-between">
                        <div><h5>Item(S) Total</h5></div>
                        <div><h5>SAR 123343</h5></div>
                      </div>
                      <div class="flex my-2 justify-between">
                        <div><h5 class="font-bold">Industry fee</h5></div>
                      </div>
                      <div class="flex my-1 justify-between">
                        <div><h5>Commission</h5></div>
                        <div><h5>SAR {{order?.commission}}</h5></div>
                      </div>
                      <div class="flex my-1 justify-between">
                        <div><h5>VAT(S) on Comission (5%)</h5></div>
                        <div><h5>SAR {{order?.commission_tax}}</h5></div>
                      </div>
                      <div class="flex my-1 justify-between">
                        <div><h5>Total Comission</h5></div>
                        <div><h5>SAR
                          {{ (order?.commission || 0) + (order?.commission_tax || 0) }}
                        </h5></div>
                      </div>
                      <div class="flex border-t border-smooth pt-2 my-1 justify-between">
                        <div><h5 class="font-bold">Total Payout</h5></div>
                        <div><h5 class="font-bold">SAR 123343</h5></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full border-t relative p-8 border-smooth">
            <div class="items-end p-1 text-end absolute ltr:right-[40px] mt-[-18px] rtl:left-[40px]">
              <button @click="closeModal" class="bg-smooth px-4 w-[100px] text-primary p-3 rounded leading-3">Cancel
              </button>
              <button @click="firstStep"
                      class="bg-primary hover:bg-primary px-4 w-[100px] text-white p-3 rounded leading-3">Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- -------------1st step end--------- -->
      <div v-if="secondBox" class="secondStep p-4">
        <div class="card p-4">
          <div class="flex justify-between">
            <h4>Pickup Address</h4>
            <a class="border border-smooth bg-primary text-white p-4 leading-3 rounded-lg" href="">Add Address</a>
          </div>

          <div class="card gap-4 my-4 p-2 flex" v-for="(address,d) in  addressList.data" :key="d">
            <div class="p-1">
              <input type="radio">
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
              <button class="bg-smooth px-4 text-primary p-1 rounded leading-3">Edit</button>
            </div>
          </div>
        </div>
        <div class="w-full border-t mb-2 p-2 border-smooth">
          <div class="items-end p-1 text-end absolute ltr:right-[40px] rtl:left-[40px]">
            <button @click="closeModal" class="bg-smooth px-4 w-[100px] text-primary p-3 rounded leading-3">Cancel
            </button>
            <button @click="backSecondStep" class="bg-smooth px-4 w-[100px] text-primary p-3 rounded leading-3">Back
            </button>
            <button @click="secondStep" class="bg-primary px-4 w-[100px] text-white p-3 rounded leading-3">Next</button>
          </div>
        </div>
      </div>
      <div v-if="thirdBox" class="thirdStep p-4">
        <div>
          <h4>Pickup Items</h4>
          <div class="card">
            <div>
              <table>
                <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>
                    <div class="flex items-flex gap-4">
                      <img class="w-10 h-10"
                           src="https://c8n.tradeling.com/img/plain/pim/rs:auto:300::0/f:webp/q:95/up/62971b6fa31f5224dcb37c3e/699288713187262780e1b8f337a3bdcf.jpg"
                           alt="">
                      <p class="pt-2">Product name here Product name here ...</p>
                    </div>
                  </td>
                  <td>
                    22
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card my-2 p-4">
            <h4>Pickup Address</h4>
            <p><strong>Office</strong></p>
            <p>12,test,dhaka area</p>
          </div>
        </div>

        <div class="w-full border-t p-2 mb-2 border-smooth">
          <p class="text-primary">Please keep your item ready for pickup 12 February 2023</p>
          <div class="items-end p-1  text-end absolute ltr:right-[40px] rtl:left-[40px]">
            <button @click="closeModal" class="bg-smooth px-4 w-[100px] text-primary p-3 rounded leading-3">Cancel
            </button>
            <button @click="backThirdStep" class="bg-smooth px-4 w-[100px] text-primary p-3 rounded leading-3">Back
            </button>
            <button @click="thirdStep" class="bg-primary px-4 w-[100px] text-white p-3 rounded leading-3">Next</button>
          </div>
        </div>
      </div>
      <!-- Close Button -->
      <div class="flex justify-end">
        <slot name="buttons">

        </slot>
      </div>

    </div>
  </div>
</template>

<script>
import LazyImage from "./LazyImage.vue";
import {mapGetters, mapActions} from "vuex";

export default {
  components: {LazyImage},
  computed :{
    ...mapGetters('order',['orders','selectedOrdersall']),
    ...mapGetters('address',['addressList'])
  },
  data() {
    return {
      firstBox: true,
      secondBox: false,
      thirdBox: false,
      selectedValue: '',
      rejectionReason: '',
      orders: "",
      subItemSelected: {
        order: "",
        availabilityStatus: "",
        reject_reasons: "",
        status: ""
      }
    }
  },
  methods: {
    ...mapActions('address',['getVendorAddress']),
    closeModal() {
      this.$emit('close');
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

    handleSelectChange(event, subItem) {
      this.subItemSelected.availabilityStatus = event.target.value;
      this.subItemSelected.order = subItem;
    },
    saveProductUnAvaliable(product_id) {
      // if(this.subItemSelected.availabilityStatus == 1) {
      //
      // } else {
      //   this.subItemSelected.status = "reject";
      //   this.$emit('save',this.subItemSelected);
      // }
      // قم بتحديث المصفوفة باستخدام دالة map
      this.$store.commit('order/CHANGE_ORDER_SELECTED',{
        payload:{
          product_id:product_id,
          reject_reasons:this.subItemSelected.reject_reasons,
          status:this.subItemSelected.availabilityStatus
        }
      })

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
