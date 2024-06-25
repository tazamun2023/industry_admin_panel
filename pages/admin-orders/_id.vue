<template>
  <check-validity :gate="'view_main_orders'">
    <div class="flex justify-between border-b border-smooth pb-3">
      <div class="flex items-center gap-4">
        <h3 class="font-bold">Order <span>{{ orderDetails.order_id }}</span></h3>
        <!-- <span class="bg-primarylight text-primary px-2 rounded-3xl font-bold text-[13px]"> {{
          $t(`status.${orderDetails?.status}`)
          }}</span> -->
        <ind-status :color="orderDetails.status_data?.color"
                    :background-color="orderDetails.status_data?.background_color"
                    :text="orderDetails.status_data?.name"/>
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

          <payment-method :payment_method="orderDetails?.payment_method"></payment-method>
        </div>
        <div>
          <p class="text-smoothlight">{{ $t('order.payment') }}</p>
          <!-- <p class="text-theem">
            <span class="bg-theemlight  text-[14px]  px-2 rounded-3xl"><strong class="text-theem">
                {{ $t(`status.${orderDetails?.payment_status}`) }}</strong></span>
              </p> -->
          <ind-status :color="orderDetails.payment_status_data?.color"
                      :background-color="orderDetails.payment_status_data?.background_color"
                      :text="orderDetails.payment_status_data?.name"/>
        </div>
      </div>
      <div>
        <div class="text-end">
          <p class="text-smoothlight">{{ $t('order.total') }}</p>
          <price-with-curency-format :price="orderDetails?.order_total " ></price-with-curency-format>

          <a class="border-b border-smooth" href="">Show breakdown</a>
        </div>
      </div>
    </div>

    <div class="bg-obg p-4 rounded-3xl">
      <div class="card my-4 p-4 rounded-3xl" v-for="(subItem, index) in orderDetails.sub_orders" :key="index">
        <div class="border-b border-smooth pb-2">
          <p><strong>{{ subItem.order_id }}</strong></p>
          <span>{{ $t('orderDetails.Shipment') }} {{ index + 1 }}
            {{ $t('app.of') }}
            {{ orderDetails.sub_orders.length }} </span>
        </div>
        <div class="lg:flex justify-between py-3 border-b border-smooth">
          <div class="flex gap-4">
            <p>{{ $t('orderDetails.messageOne') }}<br>
              {{ $t('orderDetails.messageTow') }}</p>

            <div>
              <p>{{ $t('orderDetails.ShipmentMethod') }}</p>
              <p>{{ orderDetails.payment_method }}</p>
            </div>
            <div>
              <p>{{ $t('orderDetails.ShipmentCost') }} </p>
              <price-with-curency-format :price="subItem.shipping_cost  " ></price-with-curency-format>
            </div>
            <div v-if="subItem.status_data !== null">
              <p>{{ $t('global.status') }}</p>
              <p>
                <ind-status :color="subItem.status_data?.color"
                            :background-color="subItem.status_data?.background_color"
                            :text="subItem.status_data?.name"/>
                <!-- <span class="bg-primarylight text-primary px-2 rounded-3xl font-bold text-[13px]">
                  {{ $t(`status.${subItem?.status}`) }}
                </span> -->
              </p>
            </div>
          </div>
          <div>
            <div class="text-end">
              <p>{{ $t('order.total') }}</p>
              <price-with-curency-format :price=" getTotalSubOrderItemsPrice(subItem)  " ></price-with-curency-format>
            </div>
          </div>
        </div>

        <div class="flex flex-col my-3">
          <div class="-m-1.5 overflow-x-auto">
            <div class="p-1.5 min-w-full inline-block align-middle">
              <div class="rounded-lg overflow-hidden">
                <table class="min-w-full divide-y orderdetails divide-smooth">
                  <thead>
                  <tr>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium bg-none  uppercase">
                      {{ $t('orderDetails.product') }}
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium  bg-none uppercase">
                      {{ $t('orderDetails.quantity') }}
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium bg-none  uppercase">
                      {{ $t('orderDetails.ItemPrice') }}
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium  bg-none uppercase">
                      {{ $t('orderDetails.ItemStatus') }}
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium bg-none uppercase">{{ $t('prod.sku') }}
                    </th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium  bg-none uppercase"></th>
                  </tr>
                  </thead>
                  <tbody class="divide-y divide-smooth">
                  <tr v-for="(item, index) in subItem.sub_order_items" :key="index">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-smooth">
                      <div class="flex gap-4 items-center">
                        <LazyImage :data-src="item.product.image" :title="item.product.title"
                                   :alt="item.product.title" class="w-10 h-10"/>
                        <a class="text-primary underline" href="">{{ item.product.title.slice(0, 30) }} ...</a>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">{{ item.quantity }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <price-with-curency-format :price="item.price" ></price-with-curency-format>

                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm"><span
                      class="bg-theemlight text-theem px-2 rounded-3xl">{{ $t(`status.${item.status}`) }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">{{ $t('prod.sku') }}:{{ item.product.sku }}</td>
                    <td class="px-6 py-4 whitespace-nowrap ltr:text-end rtl:text-start text-sm">
                      <price-with-curency-format :price="item.total_price" ></price-with-curency-format>
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

    <div class="grid md:grid-cols-2 p-4 gap-4">
      <div></div>
      <div>
        <div class="flex justify-between">
          <p>{{ $t('orderDetails.subtotal') }}</p>
          <price-with-curency-format :price="orderDetails.order_total" ></price-with-curency-format>
        </div>
        <div class="flex justify-between">
          <p>{{ $t('orderDetails.subtotal') }}</p>
          <price-with-curency-format :price="orderDetails?.total_shipping_cost " ></price-with-curency-format>
        </div>
        <div class="flex justify-between">
          <p>{{ $t('orderDetails.vat') }}</p>
          <price-with-curency-format :price="orderDetails?.tax_amount " ></price-with-curency-format>
        </div>
        <div class="flex justify-between py-3 my-2">
          <h4 class="font-bold">{{ $t('orderDetails.OrderTotal') }}</h4>
          <h4 class="font-bold w-50 ltr:text-end rtl:text-start  border-t border-smooth">
            <price-with-curency-format :price="( orderDetails?.order_total + orderDetails?.total_shipping_cost + orderDetails?.tax_amount) " ></price-with-curency-format>

          </h4>
        </div>
      </div>
    </div>

<show-address :order-details="orderDetails"></show-address>

<!--    <div class="grid grid-col-4 p-4 my-4 gap-4">-->
<!--      <div class="col-span-4 w-full">-->
<!--        <h4 class="font-bold">{{ $t('orderDetails.PaymentSummery') }}</h4>-->
<!--      </div>-->
<!--      <div class="col-span-4 flex flex-col w-full" v-for="sub in  payment">-->
<!--        <div v-if="sub.payment_method == 'card'" class=" flex flex-row justify-between">-->

<!--          <div>-->
<!--            <p>{{ $t('orderDetails.Method') }}</p>-->
<!--            <p>{{ sub.payment_method }}</p>-->
<!--            <p class="pt-4">{{ $t('orderDetails.CardNumber') }} </p>-->
<!--            <p>{{ sub?.payment_details?.card?.paymentInfo }}</p>-->

<!--          </div>-->

<!--          <div>-->
<!--            <p>{{ $t('orderDetails.PayDate') }}</p>-->
<!--            <p>{{ sub?.created_at }}</p>-->
<!--            <p class="pt-4">{{ $t('orderDetails.CardType') }}</p>-->
<!--            <p>{{ sub?.payment_details?.card?.brand }}</p>-->
<!--          </div>-->
<!--          <div class="text-center">-->
<!--            <p>{{ $t('orderDetails.PayedAmount') }}</p>-->
<!--            <p>{{ sub?.amount }} <span class="text-primary text-xs">{{ $t('app.SAR') }}</span></p>-->
<!--            <p class="pt-4">{{ $t('orderDetails.remainingAmount') }}</p>-->
<!--            <p>{{ orderDetails.order_total - sub?.amount }} <span-->
<!--              class="text-primary text-xs">{{ $t('app.SAR') }}</span>-->
<!--            </p>-->
<!--          </div>-->
<!--          <div></div>-->
<!--        </div>-->

<!--        <div v-else class=" flex flex-row justify-between">-->

<!--          <div>-->
<!--            <p>{{ $t('orderDetails.Method') }}</p>-->
<!--            <p>{{ sub.payment_method }}</p>-->
<!--            <p class="pt-4" v-if="orderDetails.payment_method == 'bank'">{{ $t('orderDetails.reference_number') }}</p>-->
<!--            <p>{{ sub?.payment_details?.reference_number }}-->
<!--            </p>-->
<!--          </div>-->

<!--          <div>-->
<!--            <p>{{ $t('orderDetails.PayDate') }}</p>-->
<!--            <p>{{ sub?.created_at }}</p>-->
<!--            <p class="pt-4">{{ $t('orderDetails.PayAttachment') }}</p>-->
<!--            <p v-if="sub?.recept">-->
<!--              <a target="_blank" :href="sub.recept">-->
<!--                <img class="h-4 w-4" src="~/assets/icon/file.svg" alt="">-->
<!--              </a>-->
<!--            </p>-->
<!--          </div>-->
<!--          <div class="text-center">-->
<!--            <p>{{ $t('orderDetails.PayedAmount') }}</p>-->
<!--            <p>{{ sub?.amount }} <span class="text-primary text-xs">{{ $t('app.SAR') }}</span></p>-->
<!--            <p class="pt-4">{{ $t('orderDetails.remainingAmount') }}</p>-->
<!--            <p>{{ orderDetails.order_total - sub?.amount }} <span-->
<!--              class="text-primary text-xs">{{ $t('app.SAR') }}</span>-->
<!--            </p>-->
<!--          </div>-->
<!--          <div v-if="sub.status=='pending'" class="text-center">-->
<!--            <p class="my-1">{{ $t('app.Actions') }}</p>-->
<!--            <p class="my-1">-->
<!--              <button class="border-2 border-primary text-primary font-bold"-->
<!--                      @click="()=>{bankModal = true;acceptPaymentBank.payment_id=sub.id }">{{-->
<!--                  $t('orderDetails.Accept')-->
<!--                }}-->
<!--              </button>-->
<!--            </p>-->
<!--            <p class="my-1">-->
<!--              <button class="border-0 font-bold" @click="()=>{acceptPaymentBank.payment_id=sub.id ;rejectMoalFun()}">-->
<!--                {{ $t('orderDetails.Reject') }}-->
<!--              </button>-->
<!--            </p>-->
<!--          </div>-->
<!--          <div v-else class="text-center">-->
<!--            <p class="my-1">{{ $t('global.status') }}</p>-->
<!--            <p class="my-1">-->

<!--              <ind-status :color="sub.status_data.color"-->
<!--                          :background-color="sub.status_data.background_color"-->
<!--                          :text="sub.status_data.name"/>-->
<!--            </p>-->

<!--          </div>-->

<!--        </div>-->
<!--      </div>-->

<!--    </div>-->

    <div class="bg-white my-2 border border-smooth rounded-lg p-4">
      <div>
        <p class="font-bold">{{ $t('orderDetails.PaymentSummery') }}</p>
      </div>
      <div>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 ">
          <div class="min-w-full rounded-lg overflow-x-auto">
            <table class="min-w-full leading-normal">
              <thead>
              <tr>
                <td class="px-5 py-3 text-darksmooth capitalize tracking-wider">{{ $t('orderDetails.Method') }}</td>
                <td class="px-5 py-3 min-w-[170px] capitalize text-darksmooth tracking-wider">{{ $t('orderDetails.reference_number') }}</td>
                <td class="px-5 py-3 min-w-[170px] capitalize  text-darksmooth tracking-wider">{{ $t('orderDetails.PayDate') }}</td>
                <td class="px-5 py-3 text-darksmooth capitalize tracking-wider">{{ $t('index.amount') }}</td>
                <td class="px-5 py-3 text-darksmooth  capitalize tracking-wider">{{ $t('app.Actions') }}</td>
                <!--                <td class="px-5 py-3 text-darksmooth tracking-wider">{{ $t('detailOrder.sku') }}</td>-->
                <td class="px-5 py-3 text-darksmooth capitalize tracking-wider"></td>
              </tr>
              </thead>
              <tbody>
              <tr class="border border-smooth  py-2" v-for="(sub, index) in   payment"
                  :key="index">
                <td class="px-5 py-2 capitalize  text-sm">
                  <payment-method :payment_method="sub?.payment_method"
                                  :reference_number="sub?.payment_details?.reference_number??sub?.payment_details?.card?.brand "></payment-method>

                </td>
                <td class="px-5 capitalize py-2 text-sm">
                  <p v-if="sub?.payment_method=='bank'">
                    <a v-if="sub?.recept" target="_blank" :href="sub.recept" class="flex items-center justify-start flex-row" >
                      <img class="h-4 w-4" src="~/assets/icon/file.svg" alt="">
                     <span> تحميل ايصال الدفع</span>
                    </a>

                  </p>
                  <p v-else>
                    {{ sub?.payment_details?.card?.paymentInfo}}
                  </p>
                </td>
                <td class="px-5 py-2 capitalize text-sm">
                  <p class="text-gray-900 text-nowrap">{{ sub?.created_at }}</p>
                </td>
                <td class="px-5 capitalize py-2 text-sm">

                  <price-with-curency-format :class="[sub.status_data.class]" :price="sub?.amount "></price-with-curency-format>

                </td>
                <td class="px-5 capitalize py-2 text-sm">
                  <div v-if="sub.status=='pending'&& sub?.payment_method=='bank'"  class="flex flex-row flex-nowrap">
                    <p class="my-1">
                      <button class="border-2 border-primary rounded-[10px] px-4 text-primary font-bold"
                              @click="()=>{bankModal = true;acceptPaymentBank.payment_id=sub.id }">{{
                          $t('orderDetails.Accept')
                        }}
                      </button>
                    </p>
                    <p class="my-1">
                      <button class="border-2 font-bold  rounded-[10px] px-4  border-red text-error" @click="()=>{acceptPaymentBank.payment_id=sub.id ;rejectMoalFun()}">
                        {{ $t('orderDetails.Reject') }}
                      </button>
                    </p>
                  </div>
                  <div v-else  ><span class="bg-darklight pz-2 rounded px-2" :class="[sub.status_data.class]">{{ sub.status_data.name}}</span></div>
                </td>

              </tr>
              <tr>
                <td colspan="2">
                </td>
                <td >
                    <p>{{ $t('orderDetails.PayedAmount') }}</p>
                </td>
                <td colspan="3">
                  <price-with-curency-format class="text-primary" :price="orderDetails?.total_pay "></price-with-curency-format>
                </td>
              </tr>
              <tr>
                <td colspan="2">

                </td>
                <td class="capitalize">
                    <p>{{ $t('orderDetails.remainingAmount') }}</p>
                </td>
                <td colspan="3">
                  <price-with-curency-format class="text-warning capitalize" :price="orderDetails?.total_due "></price-with-curency-format>
                </td>
              </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="border border-smooth rounded-lg">
      <h4 class="font-bold p-4"> {{ $t('orderDetails.timeline') }}</h4>
      <div class="overflow-x-auto">
      <table class="min-w-full leading-normal">
        <tr class="bg-lightdeep">
          <td class="w-[200px]">{{ $t('orderDetails.user') }}</td>
          <td>{{ $t('orderDetails.action') }}</td>
          <td class="text-end">{{ $t('orderDetails.date') }}</td>
        </tr>
        <tr class="bg-light deep" v-for="(timeline, index) in orderDetails.timeline" :key="index">
          <td class="w-[200px]">{{ timeline.user ?? $t('orderDetails.nameEmpty') }}</td>
          <td>{{ timeline.action }}</td>
          <td class="text-end">{{ timeline.date }}</td>
        </tr>
        <div class="mt-4 mb-4 text-center" v-if="orderDetails.timeline?.length < 1">{{ $t('app.tableEmptyData') }}</div>
      </table>
    </div>
    </div>

    <div class="flex justify-between my-4 p-4">
      <div>
        <nuxt-link tag="a" class="flex items-center gap-2" to="/admin-orders">
          <svg class="w-5 h-5 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m15 19-7-7 7-7"/>
          </svg>
          {{ $t('approveModal.back') }}
        </nuxt-link>
      </div>
      <div>
        <button class="font-bold  h-[35px] rounded-[10px] px-4 border-0" @click="rejectModal = !rejectModal">{{ $t('orderDetails.Reject') }}</button>
        <button class="font-bold leading-3  border-2  border-primary h-[35px] rounded-[10px] px-4 text-primary"
                @click="bankModal = !bankModal">{{ $t('orderDetails.Accept') }}
        </button>
      </div>
    </div>
    <div v-if="bankModal"
         class="fixed bg-modal border border-gray-200 shadow-md  inset-0 z-50 flex items-center justify-center rounded-lg">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="z-50 bg-white p-6 relative rounded-md shadow  md:w-15/12 lg:w-15/12 ">
        <img @click="bankModalFun" src="~/assets/images/close.svg" alt="close"
             class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]"/>
        <h4 class="mb-2 text-lg font-semibold text-gray-900">{{ $t('order.enterTotAmPay') }} </h4>
        <ValidationObserver tag="div" class=" flex flex-col justify-items-center " v-slot="{ invalid }">
          <div class="mb-4">
            <div class="max-w-sm ">
              <form @submit.prevent="acceptPayment">
                <ValidationProvider name="amount" tag="div" class="w-full" rules="required" v-slot="{ errors }"
                                    :custom-messages="{ required: $t('order.isRequired', { type: $t('order.total_amount') }) }">
                  <input type="number" v-model="acceptPaymentBank.amount"
                         class="form-input w-full p-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                         placeholder="100">
                  <span class="error mt-2 mr-1 ml-1">{{ errors[0] }}</span>

                </ValidationProvider>
              </form>
            </div>
          </div>
          <div class="flex justify-start gap-3 mt-6">
            <!-- <button class="btn-hove border-2  bg-theem text-white font-bold transitio " :disabled="invalid"
              @click="acceptPayment">{{ $t('prod.submit') }}</button> -->
            <ajax-button
              class="btn-hove border-2  bg-theem text-white font-bold transitio "
              :class="`${btnType}-btn`"
              type="button"
              color="primary"
              :text="$t('prod.submit')"
              :disabled="invalid"
              :fetching-data="loading"
              @clicked="acceptPayment"
            />
            <button type="button" class="btn-hove cancel-button border-2 text-black font-bold transition"
                    @click="bankModalFun">{{ $t('app.Cancel') }}
            </button>
          </div>
        </ValidationObserver>
      </div>
    </div>

    <reject-reason
      v-if="rejectModal"
      :show-modal="rejectModal"
      :get-api="'RejectReasonsProduct'"
      :has_others="false"
      :is-radio="false"
      :is-select="true"
      :groups="0"
      :params="acceptPaymentBank"
      :title="$t('prod.Rejected')"
      :sub_title="$t('orderReject.confirmation') "
      :set-api="'changePaymentStatus'"
      :set-id="parseInt(acceptPaymentBank.order_id)"
      type="CancelOrders"
      @update="updateReject"
      @close="rejectMoalFun"
    ></reject-reason>

<!--    <div v-if="rejectModal" class="fixed bg-modal  inset-0 z-50 flex items-center justify-center">-->
<!--      <div class="absolute inset-0 bg-black opacity-50"></div>-->
<!--      <div class="z-50 bg-white p-6 relative rounded-md shadow w-2/6">-->
<!--        <svg class="w-4 h-4 text-gray-800 absolute ltr:right-3  rtl:left-3 cursor-pointer mt-[-10px]" aria-hidden="true"-->
<!--             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">-->
<!--          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
<!--                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>-->
<!--        </svg>-->
<!--        <div class="p-2">-->
<!--          <p class="text-xs">{{ $t('orderReject.confirmation') }}</p>-->
<!--        </div>-->
<!--        <div class="card p-4">-->
<!--          <div class="py-4">-->
<!--            <label class="block py-2" for="">{{ $t('orderReject.selectRejectionReason') }}</label>-->
<!--            <select class="p-4 w-full border border-smooth rounded" v-model="acceptPaymentBank.reject_reasons">-->
<!--              <option :value="item.id" v-for="(item, index) in reasonsRejection?.data" :key="index">-->
<!--                {{ item.description }}-->
<!--              </option>-->
<!--            </select>-->
<!--          </div>-->
<!--          <div class="w-full px-2 py-4 ">-->
<!--            <div class="items-end p-1 text-end  ltr:right-[40px] rtl:left-[40px]">-->
<!--              <button @click="rejectMoalFun" class="bg-smooth px-4 w-[100px] text-error p-3 rounded leading-3">{{-->
<!--                  $t('orderReject.cancel')-->
<!--                }}-->
<!--              </button>-->
<!--              <button @click="rejectPayment" class="bg-primary px-4 w-[100px] text-white p-3 rounded leading-3">{{-->
<!--                  $t('orderReject.save')-->
<!--                }}-->
<!--              </button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

  </check-validity>
</template>
<script>
import {mapGetters, mapActions} from "vuex";
import LazyImage from "~/components/LazyImage.vue";
import Modal from "~/components/Modal.vue";
import Invoice from './components/Invoice.vue';
import {ValidationProvider, ValidationObserver} from "vee-validate";
// import {getters as itemOrder} from "../../../frontend/store/detail";
import PriceWithCurencyFormat from "../../components/priceWithCurencyFormat.vue";
import PaymentMethod from "../../components/paymentMethod.vue";
import ShowAddress from "../../components/showAddress.vue";
import RejectReason from "../../components/RejectReason.vue";

export default {
  components: {
    RejectReason,
    ShowAddress,
    PaymentMethod,
    PriceWithCurencyFormat,
    LazyImage,
    Invoice,
    Modal,
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      loading: false,
      orderDetails: "",
      invoices: false,
      bankModal: false,
      rejectModal: false,
      payment: "",
      acceptPaymentBank: {
        order_id: 0,
        amount: 0,
        // payment_status: '',
        payment_id: '',
        reject_reasons: ''
      }
    }
  },

  middleware: ['common-middleware', 'auth'],
  computed: {
    // itemOrder() {
    //   return itemOrder
    // },
    ...mapGetters('order', ['reasonsRejection'])
  },
  methods: {
    ...mapActions('common', ['deleteData', 'getRequestDtails', 'emptyAllList', 'setRequest']),
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
    rejectMoalFun() {
      this.acceptPaymentBank.payment_status = 'reject';
      this.acceptPaymentBank.order_id = this.orderDetails.order_id;
      this.rejectModal = !this.rejectModal;
    },
    updateReject(data) {
      this.orderDetails=data
      this.payment = this.orderDetails.payment
    },
    async acceptPayment() {
      this.loading = true;
      this.acceptPaymentBank.order_id = this.orderDetails.order_id;
      this.acceptPaymentBank.payment_status = 'approved';
      // this.acceptPaymentBank.payment_id = this.orderDetails.payment[0].id;
      const data = await this.setRequest({
        params: this.acceptPaymentBank,
        api: "changePaymentStatus"
      })
      if (data) {
        this.orderDetails = data;
        this.payment = this.orderDetails.payment
        this.bankModalFun();
      }
      this.loading = false;
    },
    rejectPayment() {
      this.acceptPaymentBank.order_id = this.orderDetails.order_id;

      this.acceptPaymentBank.payment_status = 'reject';
      // this.acceptPaymentBank.payment_id = this.orderDetails.payment[0].id;
      this.setRequest({
        params: this.acceptPaymentBank,
        api: "changePaymentStatus"
      })
      this.rejectMoalFun();
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
        this.payment = this.orderDetails.payment
        this.loading = false
      } catch (e) {
        return this.$nuxt.error(e)
      }
    },
  },
  mounted() {
    this.fetchingData();
    // this.getReasonsRejection();
    let n = this.getTotalSubOrderItemsPrice(this.orderDetails.sub_orders);
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
.orderdetails th{
  background: none !important;
}
</style>
