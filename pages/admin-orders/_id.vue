<template>
  <div>
    <div class="flex justify-between border-b border-smooth pb-3">
      <div class="flex items-center gap-4">
        <h3 class="font-bold">Order <span>{{ orderDetails.order_id }}</span></h3>
        <span
          class="bg-primarylight text-primary px-2 rounded-3xl font-bold text-[13px]"> {{
            $t(`status.${orderDetails?.status}`)
          }}</span>
      </div>
      <div>
        <span class="border-2 border-smooth text-smooth font-bold leading-5 p-2 rounded-lg uppercase"><a href="">Download Invoice</a></span>
      </div>
    </div>
    <div class="flex justify-between py-4">
      <div class="flex gap-4">
        <div>
          <p class="text-smoothlight">Created date</p>
          <p class="text-smoothlight"><strong>28 Feb 2024, 08:28 PM</strong></p>
        </div>
        <div>
          <p class="text-smoothlight">{{ $t('order.paymentMethod') }}</p>
          <p class="flex gap-4 items-center  text-[14px]">
            <img class="h-5 w-5" src="~/assets/icon/bank.svg"> <strong class="text-smoothlight">
            {{ $t(`paymentMethod.${orderDetails?.payment_method}`) }}</strong></p>
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
      <div class="card my-4 p-4 rounded-3xl" v-for="(subItem , index) in orderDetails.sub_order_items" :key="index">
        <div class="border-b border-smooth pb-2">
          <p><strong>{{ subItem.order_id }}</strong></p>
          <span>of {{ index + 1 }}   {{ orderDetails.sub_order_items.length }}</span>
        </div>
        <div class="flex justify-between py-3 border-b border-smooth">
          <div class="flex gap-4">
            <p>Tradeling will update you on the delivery date once the <br>
              payment has been successfully received</p>
            <div>
              <p>Shipment method</p>
              <p>{{ orderDetails.shipping_method_id }}</p>
            </div>
            <div>
              <p>Shipment cost</p>
              <p>{{ orderDetails.shipping_cost }}<span class="text-primary">SAR</span> </p>
            </div>
            <div>
              <p>Status</p>
              <p><span class="bg-primarylight text-primary px-2 rounded-3xl font-bold text-[13px]">
                        {{ $t(`order.${subItem?.status}`) }}
                      </span></p>
            </div>
          </div>
          <div>
            <div class="text-end">
              <p>{{ $t('order.total') }}</p>
              <p>{{ subItem.total_price }} <span class="text-primary">{{ $t('app.SAR') }}</span> </p>
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
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium   uppercase">Product</th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium  uppercase">Quantity</th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium  uppercase">Item Price</th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium  uppercase">Item status</th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium  uppercase">SKU</th>
                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium  uppercase"></th>
                  </tr>
                  </thead>
                  <tbody class="divide-y divide-smooth">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-smooth">
                      <div class="flex gap-4 items-center">
                        <img class="w-10 h-10"
                             src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/5fba0c6142480f001bed85d4/72b3f0be1178aeb107e5d23d8a684d25.jpg"
                             alt="">
                        <a class="text-primary underline" href="">Al Mudhish Tea Milk Catering 410g x 48</a>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">45</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <div class="flex items-center gap-4">
                        <span>S <br> A <br>R</span>
                        <span>824.25 / Piece</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm"><span
                      class="bg-theemlight text-theem px-2 rounded-3xl">Item placed</span></td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">HP-3432</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <div class="flex items-center gap-4">
                        <span>S <br> A <br>R</span>
                        <span>824.25 / Piece</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-smooth">
                      <div class="flex gap-4 items-center">
                        <img class="w-10 h-10"
                             src="https://c8n.tradeling.com/img/plain/pim/rs:auto:800::0/f:webp/q:95/up/5fba0c6142480f001bed85d4/72b3f0be1178aeb107e5d23d8a684d25.jpg"
                             alt="">
                        <a class="text-primary underline" href="">Al Mudhish Tea Milk Catering 410g x 48</a>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">45</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <div class="flex items-center gap-4">
                        <span>S <br> A <br>R</span>
                        <span>824.25 / Piece</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm"><span
                      class="bg-theemlight text-theem px-2 rounded-3xl">Item placed</span></td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">HP-3432</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <div class="flex items-center gap-4">
                        <span>S <br> A <br>R</span>
                        <span>824.25 / Piece</span>
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
          <p>Subtotal</p>
          <p>2,161.40 <span class="text-primary text-xs">SAR</span></p>
        </div>
        <div class="flex justify-between">
          <p>Shipping</p>
          <p>2,161.40 <span class="text-primary text-xs">SAR</span></p>
        </div>
        <div class="flex justify-between">
          <p>VAT</p>
          <p>2,161.40 <span class="text-primary text-xs">SAR</span></p>
        </div>
        <div class="flex justify-between border-t border-smooth py-3 my-2">
          <h4 class="font-bold">Order total</h4>
          <h4 class="font-bold">4,540.61 <span class="text-primary text-xs">SAR</span></h4>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="relative">
        <div class="p-4 bg-theemlight shodow rounded-lg border border-smooth">
          <h4 class="font-bold text-theem">Shipping Address</h4>
          <p>مصر</p>
          <p>53562محطة قطار سيدي جابر- مخزن, محطة قطار سيدي جابر, محطة قطار سيدي جابر,
            Alexandria,Egypt</p>
          <p class="flex items-center gap-4"><img class="h-4 w-4" src="~/assets/icon/phone.svg" alt="">+971504758541</p>
        </div>
      </div>
      <div class="relative">
        <div class="p-4 bg-theemlight shodow rounded-lg border border-smooth">
          <h4 class="font-bold text-theem">Billing Address</h4>
          <p>مصر</p>
          <p>53562محطة قطار سيدي جابر- مخزن, محطة قطار سيدي جابر, محطة قطار سيدي جابر,
            Alexandria,Egypt</p>
          <p class="flex items-center gap-4"><img class="h-4 w-4" src="~/assets/icon/phone.svg" alt="">+971504758541</p>
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
      <h4 class="font-bold p-4"> Timeline</h4>
      <table>
        <tr class="bg-lightdeep">
          <td class="w-[200px]">User</td>
          <td>Action</td>
          <td class="text-end">Date</td>
        </tr>
        <tr>
          <td class="w-[200px]">Buyer</td>
          <td>Order initiated</td>
          <td class="text-end">28 Feb 2024</td>
        </tr>
        <tr>
          <td class="w-[200px]">System</td>
          <td>Order payment status changed to pending verification</td>
          <td class="text-end">28 Feb 2024</td>
        </tr>
      </table>
    </div>

    <div class="flex justify-between my-4 p-4">
      <div>
        <a class="flex items-center gap-2" href="">
          <svg class="w-5 h-5 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m15 19-7-7 7-7"/>
          </svg>
          Back</a>
      </div>
      <div>
        <button class="font-bold border-0">Reject</button>
        <button class="font-bold border-2 text-primary">Accept</button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from "vuex";
import LazyImage from "../../components/LazyImage.vue";

export default {
  components: {LazyImage},
  computed: {
    ...mapGetters('order', ['orderDetails'])
  },
  middleware: ['common-middleware', 'auth'],
  methods: {
    ...mapActions('order', ['getOrderDetails']),
  },
  mounted() {
    this.getOrderDetails({
      id: this.$route.params.id
    })
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
