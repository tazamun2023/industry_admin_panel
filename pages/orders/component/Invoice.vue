<template>
  <div>
    <client-only>
      <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="false"
                    :paginate-elements-by-height="1400" :filename="`Invoice-${order.order_id}`" :pdf-quality="3"
                    :manual-pagination="false" pdf-format="a4" pdf-orientation="portrait" ref="html2Pdf">
        <div slot="pdf-content">
          <div class="flex justify-between py-2  px-3">
            <div>
              <h3 class="text-[32px] font-bold py-2 px-2">{{ $t('invoice.invoice') }}</h3>
              <table>
                <tr>
                  <td class="text-intext text-[16px] px-2 py-1">{{ $t('invoice.invoiceNo') }}:</td>
                  <td class="px-2 py-1 font-bold text-[16px]">#{{ order?.order_id }}</td>
                </tr>
                <tr>
                  <td class="text-intext text-[16px]  px-2 py-1">{{ $t('invoice.invoiceDate') }} :</td>
                  <td class="px-2 py-1 font-bold text-[16px]">{{ order.invoice_date }}</td>
                </tr>
                <tr>
                  <td class="text-intext text-[16px]  px-2 py-1">{{ $t('invoice.dueDate') }} :</td>
                  <td class="px-2 py-1 font-bold text-[16px]">{{ order.due_date }}</td>
                </tr>
              </table>
            </div>
            <div>
              <img src="~/assets/images/ar_logo_admin1.svg" alt="">
            </div>
          </div>


          <div class="grid grid-cols-2 rounded my-1 py-1 px-4 bg-inbg gap-4">
            <div>
              <p class="font-bold text-[16px] text-theem py-1">{{ $t('invoice.billedBy') }} </p>
              <p class="font-bold text-[18px]  py-1">
                {{ order.shipping_address?.user_name }}
              </p>
              <p class="font-bold  py-1">{{ order.shipping_address?.name }}</p>
              <p class="flex gap-2  py-1">
                <!-- <img class="w-5 h-5" src="~/assets/icon/sms-g.svg" alt=""> -->
                {{ order.shipping_address?.email }}
              </p>
              <p class="flex gap-2  py-1">
                <!-- <img class="w-5 h-5" src="~/assets/icon/call-g.svg" alt="">  -->
                {{ order.shipping_address?.phone }}
              </p>
            </div>
            <div>
              <p class="font-bold text-[16px] text-theem  py-1">{{ $t('invoice.billedTo') }}</p>
              <p class="font-bold  text-[18px]  py-1">
                {{ order.billing_address?.user_name }}
              </p>
              <p class="font-bold  py-1">{{ order.billing_address?.name }}</p>
              <p class="flex gap-2  py-1">
                <img class="w-5 h-5" src="~/assets/icon/sms.svg" alt="">
                {{ order.billing_address?.email }}
              </p>
              <p class="flex gap-2  py-1">
                <!-- <img class="w-5 h-5" src="~/assets/icon/call.svg" alt=""> -->
                {{ order.billing_address?.phone }}
              </p>
            </div>
          </div>
          <div class="p-1">
            <!-- component -->
            <!-- This is an example component -->
            <div class='w-full  from-purple-200 via-purple-300 to-purple-500 bg-gradient-to-br'>
              <div class="w-full">
                <div class="overflow-x-auto relative shadow sm:rounded-lg">
                  <div class="overflow-x-auto relative shadow sm:rounded-lg">
                    <order-items :order="order" :show_taxes="false"></order-items>

                  </div>
                </div>

              </div>
            </div>

          </div>

          <order-summary :order="order"></order-summary>

          <!-- <div class="footer flex justify-between bg-theem p-2">
          <div>
            <p class="flex gap-4 text-white"><img class="w-4 h-4" src="~/assets/icon/sms.svg" alt="">info@example.com</p>
          </div>
          <div>
            <p class="flex gap-4 text-white"><img class="w-4 h-4" src="~/assets/icon/call.svg" alt="">+966 0545464257</p>
          </div>
        </div> -->
        </div>
      </vue-html2pdf>
    </client-only>
    <div class="dply-felx j-right mt-20 mt-sm-15">
      <button @click.prevent="generatingPdf"> {{ $t('setting.pi') }}</button>
    </div>
  </div>
</template>
<script>
import VueHtml2pdf from 'vue-html2pdf'
import PriceWithCurencyFormat from "../../../components/priceWithCurencyFormat.vue";
import OrderSummary from "./OrderSummary.vue";
import OrderItems from "./OrderItems.vue";

export default {
  props: ['order'],
  components: {OrderItems, OrderSummary, PriceWithCurencyFormat, VueHtml2pdf},
  methods: {
    generatingPdf() {
      this.$nextTick(() => {
        this.$refs.html2Pdf.generatePdf()
      })
    },
  }
}
</script>
<style>
table td {
  border-bottom: 0px !important;
}

.px-2 {
  padding-left: 0.5rem !important;
  padding-right: 0.5rem;
}
</style>
