<template>
  <check-validity :gate="'view_main_orders'" >
    <div class="flex justify-between border-b border-smooth pb-3">
      <div class="flex items-center gap-4">
        <h3 class="font-bold">Order <span>{{ orderDetails.order_id }}</span></h3>
        <span class="bg-primarylight text-primary px-2 rounded-3xl font-bold text-[13px]"> {{
          $t(`status.${orderDetails?.status}`)
        }}</span>
      </div>
      <div>
        <invoice  :order="order" />
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
          <button class="border-2 border-primary text-primary font-bold">Accept</button>
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
        <div class="mt-4 mb-4 text-center" v-if="orderDetails.timeline?.length < 1">{{ $t('app.tableEmptyData')}}</div>
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
  </check-validity>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import LazyImage from "~/components/LazyImage.vue";
import Invoice from './components/Invoice.vue';

export default {
  components: { LazyImage, Invoice },
  data() {
    return {
      loading: false,
      orderDetails: "",
      invoices: false,
      order: {
        order_id: 9729387893,
        created: "2024/2/12",
        user: {
          email: "test@mail.com",
          name: "aseel adnan ahmed"
        },
        address: {
          name: " yemen taiz 2024",
          phone: 777124565,
          date: "2024/2/12"
        },
        order_method: "bank",
        ordered_products: [

          {
            id: 1,
            product: {
              title: "product title",
            },
            shipping_price: 100,
              quantity: 3,
              selling: 5.00,
            updated_inventory: {
              sku: 7868,
              inventory_attributes: [
                {
                  id: 1,
                  attribute_value: {
                    attribute: {
                      id: 1,
                      title: "title one"
                    }
                  }
                },
                {
                  id: 2,
                  attribute_value: {
                    attribute: {
                      id: 1,
                      title: "title 2"
                    }
                  }
                }
              ],
             
            }
          }
        ],
        calculated: {
          total_price: 2000.00,
          voucher_price: 100.00,
          bundle_offer: 0,
          shipping_price: 1200.0,
          tax: 10,
          subtotal: 100,
        }
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
