<template>
  <check-validity :gate="'view_main_orders'">
    <div class="flex justify-between border-b border-smooth pb-3">
      <div class="flex items-center gap-4">
        <h3 class="font-bold">Order <span>{{ orderDetails.order_id }}</span></h3>
        <span class="bg-primarylight text-primary px-2 rounded-3xl font-bold text-[13px]"> {{
          $t(`status.${orderDetails?.status}`)
          }}</span>
      </div>
      <div>
        <!-- <invoice :order="order" /> -->
        <!-- <span @click="invoices = true"
          class="border-2 border-smooth text-smooth font-bold leading-5 p-2 rounded-lg uppercase">
          <a>Download Invoice</a></span> -->
      </div>
    </div>
    <div class="flex justify-between py-4">
      <div class="flex gap-4">
        <div>
          <p class="text-smoothlight">{{ $t('orderDetails.CreateDate') }}</p>
          <p class="text-smoothlight"><strong>{{ orderDetails.created_at }}</strong></p>
        </div>
        <div>
          <p class="text-smoothlight">{{ $t('order.paymentMethod') }}</p>
          <p class="flex gap-4 items-center  text-[14px]">
            <img class="h-5 w-5" src="~/assets/icon/bank.svg"> <strong class="text-smoothlight">
              {{ $t(`paymentMethod.${orderDetails?.payment_method}`) }}</strong>
          </p>
        </div>
        <div>
          <p class="text-smoothlight">{{ $t('order.payment') }}</p>
          <p class="text-theem"><span class="bg-theemlight  text-[14px]  px-2 rounded-3xl"><strong class="text-theem">
                {{ $t(`status.${orderDetails?.payment_status}`) }}</strong></span></p>
        </div>
      </div>
      <div>
        <div class="text-end">
          <p class="text-smoothlight">{{ $t('order.total') }}</p>
          <p><strong class="text-[14px]"> {{ orderDetails?.order_total }}</strong> <span
              class="text-primary  text-[14px]">{{ $t('app.SAR') }}</span></p>
          <a class="border-b border-smooth" href="">Show breakdown</a>
        </div>
      </div>
    </div>

    <div class="bg-smooth p-4 rounded-3xl">
      <div class="card my-4 p-4 rounded-3xl" v-for="(subItem, index) in orderDetails.sub_orders" :key="index">
        <div class="border-b border-smooth pb-2">
          <p><strong>{{ subItem.order_id }}</strong></p>
          <span> {{ index + 1 }}
            {{ $t('app.of') }}
            {{ orderDetails.sub_orders.length }} </span>
        </div>
        <div class="flex justify-between py-3 border-b border-smooth">
          <div class="flex gap-4">
            <p>{{ $t('orderDetails.messageOne') }}<br>
              {{ $t('orderDetails.messageTow') }}</p>

            <div>
              <p>{{ $t('orderDetails.ShipmentMethod') }}</p>
              <p>{{ orderDetails.payment_method }}</p>
            </div>
            <div>
              <p>{{ $t('orderDetails.ShipmentCost') }} </p>
              <p>{{ subItem.shipping_cost }} <span class="text-primary">{{ $t('app.SAR') }}</span></p>
            </div>
            <div>
              <p>{{ $t('global.status') }}</p>
              <p><span class="bg-primarylight text-primary px-2 rounded-3xl font-bold text-[13px]">
                  {{ $t(`status.${subItem?.status}`) }}
                </span></p>
            </div>
          </div>
          <div>
            <div class="text-end">
              <p>{{ $t('order.total') }}</p>
              <p>{{ getTotalSubOrderItemsPrice(subItem) }} <span class="text-primary">{{ $t('app.SAR') }}</span> </p>
            </div>
          </div>
        </div>

        <div class="flex flex-col my-3">
          <div class="-m-1.5 overflow-x-auto">
            <div class="p-1.5 min-w-full inline-block align-middle">
              <div class="rounded-lg overflow-hidden border border-smooth">
                <table class="min-w-full divide-y  divide-smooth">
                  <thead>
                    <tr>
                      <th scope="col" class="px-6 py-3 text-start text-xs font-medium   uppercase">
                        >{{ $t('orderDetails.product') }}</th>
                      <th scope="col" class="px-6 py-3 text-start text-xs font-medium  uppercase">
                        {{ $t('orderDetails.quantity') }}</th>
                      <th scope="col" class="px-6 py-3 text-start text-xs font-medium  uppercase">
                        {{ $t('orderDetails.ItemPrice') }}</th>
                      <th scope="col" class="px-6 py-3 text-start text-xs font-medium  uppercase">
                        {{ $t('orderDetails.ItemStatus') }}</th>
                      <th scope="col" class="px-6 py-3 text-start text-xs font-medium  uppercase">{{ $t('prod.sku') }}
                      </th>
                      <th scope="col" class="px-6 py-3 text-start text-xs font-medium  uppercase"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-smooth">
                    <tr v-for="(item, index) in subItem.sub_order_items" :key="index">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-smooth">
                        <div class="flex gap-4 items-center">
                          <LazyImage :data-src="item.product.image" :title="item.product.title"
                            :alt="item.product.title" class="w-10 h-10" />
                          <a class="text-primary underline" href="">{{ item.product.title.slice(0, 30) }} ...</a>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm">{{ item.quantity }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm">
                        <div class="flex items-center gap-4">
                          <span>{{ $t('app.SAR') }} / {{ item.price }}</span>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm"><span
                          class="bg-theemlight text-theem px-2 rounded-3xl">{{ $t(`status.${item.status}`) }}</span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm">{{ $t('prod.sku') }}:{{ item.product.sku }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm">
                        <div class="flex items-center gap-4">
                          <span>
                            <template v-for="char in $t('app.SAR').split('')">
                              <br>{{ char }}
                            </template>
                          </span>
                          <span>{{ item.total_price }}/ {{ $t('orderDetails.TotalPrice') }}</span>
                        </div>
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

    <div class="grid grid-cols-2 p-4 gap-4">
      <div></div>
      <div>
        <div class="flex justify-between">
          <p>{{ $t('orderDetails.subtotal') }}</p>
          <p>{{ orderDetails.order_total }}<span class="text-primary text-xs">{{ $t('app.SAR') }}</span></p>
        </div>
        <div class="flex justify-between">
          <p>{{ $t('orderDetails.subtotal') }}</p>
          <p>{{ orderDetails.total_shipping_cost }}<span class="text-primary text-xs">{{ $t('app.SAR') }}</span></p>
        </div>
        <div class="flex justify-between">
          <p>{{ $t('orderDetails.vat') }}</p>
          <p> {{ orderDetails.tax_amount }} <span class="text-primary text-xs">{{ $t('app.SAR') }}</span></p>
        </div>
        <div class="flex justify-between border-t border-smooth py-3 my-2">
          <h4 class="font-bold">{{ $t('orderDetails.OrderTotal') }}</h4>
          <h4 class="font-bold">{{ orderDetails.order_total + orderDetails.total_shipping_cost + orderDetails.tax_amount
            }}
            <span class="text-primary text-xs">{{ $t('app.SAR') }}</span>
          </h4>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="relative">
        <div class="p-4 bg-theemlight shodow rounded-lg border border-smooth">
          <h4 class="font-bold text-theem">{{ $t('orderDetails.ShippingAddress') }}</h4>
          <p>{{ orderDetails.shipping_address?.name }}</p>
          <p class="flex items-center gap-4"><img class="h-4 w-4" src="~/assets/icon/phone.svg" alt="">{{
            orderDetails.shipping_address?.address_phone }}</p>
        </div>
      </div>
      <div class="relative">
        <div class="p-4 bg-theemlight shodow rounded-lg border border-smooth">
          <h4 class="font-bold text-theem">{{ $t('orderDetails.BillingAddress') }}</h4>
          <p>{{ orderDetails.billing_address?.name }}</p>
          <p class="flex items-center gap-4"><img class="h-4 w-4" src="~/assets/icon/phone.svg" alt="">{{
            orderDetails.billing_address?.address_phone }}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-col-4 p-4 my-4 gap-4">
      <div class="col-span-4 w-full">
        <h4 class="font-bold">Payment Summery</h4>
      </div>
      <div class="col-span-3 px-4 flex justify-between w-full">
        <div>
          <p>Method</p>
          <p>Credit/Debit Card</p>
          <p class="pt-4">Name On Card </p>
          <p>Mohammed Abdullah</p>
        </div>
        <div>
          <p>Pay Date</p>
          <p>30/12/2024</p>
          <p class="pt-4">Pay Attachment</p>
          <p><img class="h-4 w-4" src="~/assets/icon/file.svg" alt=""></p>
        </div>
        <div class="text-center">
          <p>Payed Amount</p>
          <p>4000 <span class="text-primary text-xs">sar</span></p>
          <p class="pt-4">remaining Amount</p>
          <p>4000 <span class="text-primary text-xs">sar</span></p>
        </div>
      </div>
      <div class="text-center">
        <p class="my-1">Action</p>
        <p class="my-1">
          <button class="border-2 border-primary text-primary font-bold" @click="bankModalFun">Accept</button>
        </p>
        <p class="my-1">
          <button class="border-0 font-bold">Reject</button>
        </p>
      </div>
    </div>
    <div class="border border-smooth rounded-lg">
      <h4 class="font-bold p-4"> {{ $t('orderDetails.timeline') }}</h4>
      <table>
        <tr class="bg-lightdeep">
          <td class="w-[200px]">{{ $t('orderDetails.user') }}</td>
          <td>{{ $t('orderDetails.action') }}</td>
          <td class="text-end">{{ $t('orderDetails.date') }}</td>
        </tr>
        <tr class="bg-light deep" v-for="(timeline, index) in orderDetails.timeline" :key="index">
          <td class="w-[200px]">{{ timeline.user }}</td>
          <td>{{ timeline.action }}</td>
          <td class="text-end">{{ timeline.date }}</td>
        </tr>
        <div class="mt-4 mb-4 text-center" v-if="orderDetails.timeline?.length < 1">{{ $t('app.tableEmptyData') }}</div>
      </table>
    </div>

    <div class="flex justify-between my-4 p-4">
      <div>
        <a class="flex items-center gap-2" href="">
          <svg class="w-5 h-5 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m15 19-7-7 7-7" />
          </svg>
          Back</a>
      </div>
      <div>
        <button class="font-bold border-0">Reject</button>
        <button class="font-bold border-2 text-primary">Accept</button>
      </div>
    </div>
    <div v-if="bankModal"
      class="fixed bg-modal border border-gray-200 shadow-md  inset-0 z-50 flex items-center justify-center rounded-lg">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="z-50 bg-white p-6 relative rounded-md shadow w-full md:w-1/3 lg:w-1/3 xl:w-2/5">
       <img  @click="bankModalFun" src="~/assets/images/close.svg" alt="close"     class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]" />
        <h4 class="mb-2 text-lg font-semibold text-gray-900">{{$t('order.enterTotAmPay')}} </h4>
        <ValidationObserver tag="div"  v-slot="{ invalid }">
        <div class="mb-4">
          <div class="max-w-sm ">
            <form  @submit.prevent="acceptPayment">
              <ValidationProvider name="total_amount" tag="div"
               class="w-full" rules="required" v-slot="{ errors }" 
               :custom-messages="{ required: $t('order.isRequired', { type: $t('order.total_amount') }) }"
            >
              <input type="number"
                v-model="acceptPaymentBank.total_amount"
                class="form-input w-full p-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="100">
                <span  class="error mt-2 mr-1 ml-1">{{ errors[0] }}</span>

                </ValidationProvider>
            </form>
          </div>
        </div>
        <div class="flex justify-start gap-3 mt-6">
          <button class="btn-hove border-2  bg-theem text-white font-bold transitio " :disabled="invalid"
            >{{$t('prod.submit')}}</button>
          <button type="button" class="btn-hove cancel-button border-2 text-black font-bold transition"
            @click="bankModalFun">{{$t('app.Cancel')}}</button>
        </div>
      </ValidationObserver>
      </div>
    </div>

  </check-validity>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import LazyImage from "~/components/LazyImage.vue";
import Modal from "~/components/Modal.vue";
import Invoice from './components/Invoice.vue';
import { ValidationProvider, ValidationObserver} from "vee-validate";

export default {
  components: { LazyImage, Invoice, Modal, ValidationProvider, ValidationObserver },
  data() {
    return {
      loading: false,
      orderDetails: "",
      invoices: false,
      bankModal: false,
      acceptPaymentBank :{
        order_id:0,
        amount: 0
      }
    }
  },

  middleware: ['common-middleware', 'auth'],
  computed: {

  },
  methods: {
    ...mapActions('common', ['deleteData', 'getRequestDtails', 'emptyAllList']),
    getTotalSubOrderItemsPrice(subItem) {
      let totalPrice = 0;
      if (subItem && subItem.sub_order_items) {
        subItem.sub_order_items.forEach(item => {
          totalPrice += item.total_price;
        });
      }
      return totalPrice;
    },
    bankModalFun() {
      this.bankModal = !this.bankModal;
    },
    acceptPayment(){
      alert('ddd')
      this.acceptPaymentBank.order_id= this.orderDetails.order_id;
    },
    async fetchingData() {
      try {
        this.loading = true
        this.orderDetails = await this.getRequestDtails({
          params: {
            id: this.$route.params.id,
          },
          api: "mainOrderDetails"
        })
        this.loading = false
      } catch (e) {
        return this.$nuxt.error(e)
      }
    },
  },
  mounted() {
    this.fetchingData();
    let n = this.getTotalSubOrderItemsPrice(this.orderDetails.sub_orders)
    console.log(n);
    // this.getOrderDetails({
    //   id: this.$route.params.id
    // })
  }
}
</script>

<style>
.shodow::before {
  content: '';
  position: absolute;
  left: 0px;
  top: 28px;
  /* width: calc(20% - 25px); */
  height: calc(20% - 10px);
  border-top: 5px solid #27436f;
  border-left: 5px solid #27436f;
}
</style>
