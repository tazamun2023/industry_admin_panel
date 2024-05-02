<template>
  <div> <client-only>
      <vue-html2pdf :show-layout="false" :float-layout="true" :enable-download="true" :preview-modal="false"
        :paginate-elements-by-height="1400" :filename="`Invoice-${order.order_id}`" :pdf-quality="3"
        :manual-pagination="false" pdf-format="a4" pdf-orientation="portrait" ref="html2Pdf">
        <div slot="pdf-content">
          <div class="flex justify-between py-2  px-3">
            <div>
              <h3 class="text-[32px] font-bold py-2 px-2">{{ $t('invoice.invoice') }}</h3>
              <table>
                <tr>
                  <td class="text-intext text-[16px] px-2 py-1">{{ $t('invoice.invoiceNo') }}: </td>
                  <td class="px-2 py-1 font-bold text-[16px]">#{{ order?.order_id }}</td>
                </tr>
                <tr>
                  <td class="text-intext text-[16px]  px-2 py-1">{{ $t('invoice.invoiceDate') }} : </td>
                  <td class="px-2 py-1 font-bold text-[16px]">{{ order.invoice_date }}</td>
                </tr>
                <tr>
                  <td class="text-intext text-[16px]  px-2 py-1">{{ $t('invoice.dueDate') }} : </td>
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
                    <table class="w-full text-sm text-left">
                      <thead class="text-xs uppercase bg-primary">
                        <tr>
                          <th scope="col" class="py-3 px-6">#</th>
                          <th scope="col" class="py-3 px-6">{{ $t('products.Products') }}</th>
                          <th scope="col" class="py-3 px-6">{{ $t('products.Quantity') }}</th>
                          <th scope="col" class="py-3 px-6">{{ $t('brand.price') }}</th>
                          <th scope="col" class="py-3 px-6">{{ $t('order.total') }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="bg-white border-b border-smooth " v-for="(item, i) in order.sub_order_items" :key="i">
                          <td class="py-2 px-6">{{ i + 1 }}</td>
                          <td class="py-2 px-6">{{ item.product.title }}</td>
                          <td class="py-2 px-6">{{ item.quantity }}</td>
                          <td class="py-2 px-6"><span class="font-bold">{{ item.price }}</span> <span
                              class="text-primary">{{ $t('app.SAR') }}</span></td>
                          <td class="py-2 px-6"><span class="font-bold">{{ item.total_price }}</span> <span
                              class="text-primary">{{ $t('app.SAR') }}</span></td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>

          </div>
          <div class="p-1 grid grid-cols-3 gap-4">
            <!-- <div class="col-span-2">
              <div class="bg-inbg py-1 px-3 my-1">
                <h4 class="text-theem font-bold py-2">{{$t('invoice.bankAccountDetails')}}</h4>
              <table>
                <tr>
                  <td class="text-intext py-2">{{$t('invoice.bankName')}}</td>
                  <td><span class="font-bold p-2">HDFC Bank</span></td>
                </tr>
                <tr>
                  <td class="text-intext py-2">{{$t('invoice.accountHolderName')}}</td>
                  <td><span class="font-bold px-2">Foobar Labs</span></td>
                </tr>
                <tr>
                  <td class="text-intext py-2">{{$t('invoice.accountNumber')}}</td>
                  <td><span class="font-bold px-2">45366287987</span></td>
                </tr>
                <tr>
                  <td class="text-intext py-2">{{$t('invoice.ifsc')}}</td>
                  <td><span class="font-bold px-2">HDFC0018159</span></td>
                </tr>
                <tr>
                  <td class="text-intext py-2">{{$t('invoice.accountType')}}</td>
                  <td><span class="font-bold px-2">Savings</span></td>
                </tr>
              </table>
              </div>
              <div class="bg-inbg p-1 my-2">
                   <h4 class="text-theem font-bold py-2">{{$t('invoice.terms_and_conditions')}}</h4>
                  <p class="py-1 text-[16px]">{{$t('invoice.pay_within_15_days')}}</p>
                  <p class="py-1 text-[16px]">{{$t('invoice.quote_invoice_number')}}</p>
              </div>
            </div> -->
            <div class="p-4">
              <div class="flex justify-between">
                <span class="text-intext py-2">{{ $t('invoice.subTotal') }}</span>
                <span><span class="font-bold">{{ order.sub_total }}</span> <span
                    class="text-primary">{{ $t('app.SAR') }}</span></span>
              </div>
              <div class="flex justify-between">
                <span class="text-intext  py-2">{{ $t('invoice.discount') }} (0%)</span>
                <span><span class="font-bold">{{ order.discount }}</span> <span
                    class="text-primary">{{ $t('app.SAR') }}</span></span>
              </div>
              <div class="flex justify-between" v-if="order.shipping_cost">
                <span class="text-intext  py-2">{{ $t('invoice.shipping') }}</span>
                <span><span class="font-bold">{{ order.shipping_cost }}</span> <span
                    class="text-primary">{{ $t('app.SAR') }}</span></span>
              </div>
              <div class="flex justify-between">
                <span class="text-intext  py-2">{{ $t('invoice.vat') }}({{ order.commission_on_vat }} %)</span>
                <span><span class="font-bold">{{ order.vat }}</span> <span
                    class="text-primary">{{ $t('app.SAR') }}</span></span>
              </div>
              <div class="flex justify-between border-t border-b  py-2 border-smooth">
                <span class="font-bold text-[18px]">{{ $t('invoice.total') }}</span>
                <span><span class="font-bold text-[18px]">
                  {{
                      order?.seller_payout.toLocaleString($t('app.currency_local'), {
                        style: 'currency',
                        maximumFractionDigits: 2,
                        currency: 'SAR'
                      })
                    }} 
                </span> <span
                    class="text-primary text-[18px]">{{ $t('app.SAR') }}</span></span>
              </div>
            </div>
          </div>
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
export default {
  props: ['order'],
  components: { VueHtml2pdf },
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
