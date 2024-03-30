<template>
    <div>
        <div class="flex justify-between py-2  px-3">
          <div>
            <h3 class="text-[32px] font-bold py-2 px-2">{{$t('invoice.invoice')}}</h3>
            <table>
              <tr>
                <td class="text-intext text-[16px] px-2 py-1">{{$t('invoice.invoiceNo')}}: </td>
                <td class="px-2 py-1 font-bold text-[16px]">#{{order?.order_id}}</td>
              </tr>
              <tr>
                <td class="text-intext text-[16px]  px-2 py-1">{{$t('invoice.invoiceDate')}} : </td>
                <td class="px-2 py-1 font-bold text-[16px]">{{ order.order_placed }}</td>
              </tr>
              <tr>
                <td class="text-intext text-[16px]  px-2 py-1">{{$t('invoice.dueDate')}} : </td>
                <td class="px-2 py-1 font-bold text-[16px]">30/12/2023</td>
              </tr>
            </table>
          </div>
          <div>
            <img src="~/assets/images/ar-logo.svg" alt="">
          </div>
        </div>


        <div class="grid grid-cols-2 rounded my-1 py-1 px-4 bg-inbg gap-4">
            <div>
              <p class="font-bold text-[16px] text-theem py-1">{{$t('invoice.billedBy')}} </p>
              <p class="font-bold text-[18px]  py-1">
                Almarai
              </p>
              <p class="font-bold  py-1">305, 3rd Floor Orion mall, Alshifa, Ryadh, Saudi Arabia</p>
              <p class="flex gap-2  py-1"><img class="w-5 h-5" src="~/assets/icon/sms-g.svg" alt=""> almarai@gmail.com</p>
              <p class="flex gap-2  py-1"><img class="w-5 h-5" src="~/assets/icon/call-g.svg" alt=""> +966 555555555</p>
            </div>
            <div>
              <p class="font-bold text-[16px] text-theem  py-1">{{$t('invoice.billedTo')}}</p>
              <p class="font-bold  text-[18px]  py-1">
                Mohammed Alhumaidi
              </p>
              <p class="font-bold  py-1">305, 3rd Floor Orion mall, Alshifa, Ryadh, Saudi Arabia</p>
              <p class="flex gap-2  py-1"><img class="w-5 h-5" src="~/assets/icon/sms-g.svg" alt=""> mohammed@gmail.com</p>
              <p class="flex gap-2  py-1"><img class="w-5 h-5" src="~/assets/icon/call-g.svg" alt=""> +966 555555555</p>
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
                    <th scope="col" class="py-3 px-6">{{ $t('products.products') }}</th>
                    <th scope="col" class="py-3 px-6">{{ $t('products.Qty') }}</th>
                    <th scope="col" class="py-3 px-6">{{ $t('brand.price') }}</th>
                    <th scope="col" class="py-3 px-6">{{ $t('order.total') }}</th>
                </tr>
                </thead>
                <tbody>
                <tr class="bg-white border-b border-smooth ">
                    <td class="py-2 px-6">1</td>
                    <td class="py-2 px-6">Samsung A15 4GB RAM 128GB Black UAE Version</td>
                    <td class="py-2 px-6">1</td>
                    <td class="py-2 px-6"><span class="font-bold">500</span> <span class="text-primary">{{$t('app.SAR')}}</span></td>
                    <td class="py-2 px-6"><span class="font-bold">500</span> <span class="text-primary">{{$t('app.SAR')}}</span></td>
                </tr>
                <tr class="bg-white border-b border-smooth">
                    <td class="py-2 px-6">2</td>
                    <td class="py-2 px-6">Samsung A15 4GB RAM 128GB Black UAE Version</td>
                    <td class="py-2 px-6">1</td>
                    <td class="py-2 px-6"><span class="font-bold">500</span> <span class="text-primary">{{$t('app.SAR')}}</span></td>
                    <td class="py-2 px-6"><span class="font-bold">500</span> <span class="text-primary">{{$t('app.SAR')}}</span></td>
                </tr>
                </tbody>
            </table>
            </div>
    </div>

</div>
</div>

        </div>
        <div class="p-1 grid grid-cols-3 gap-4">
            <div class="col-span-2">
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
                  <h4 class="text-theem font-bold py-2">Terms and Conditions</h4>
                  <p class="py-1 text-[16px]">Please pay within 15 days from the date of invoice, overdue interest @ 14% will be charged on delayed payments.</p>
                  <p class="py-1 text-[16px]">Please quote invoice number when remitting funds.</p>
              </div>
            </div>
            <div class="p-4">
              <div class="flex justify-between">
                <span class="text-intext py-2">{{$t('invoice.subTotal')}}</span>
                <span><span class="font-bold">1500</span> <span class="text-primary">{{$t('app.SAR')}}</span></span>
              </div>
              <div class="flex justify-between">
                <span class="text-intext  py-2">{{$t('invoice.discount')}}(0%)</span>
                <span><span class="font-bold">0</span> <span class="text-primary">{{$t('app.SAR')}}</span></span>
              </div>
              <div class="flex justify-between">
                <span class="text-intext  py-2">{{$t('invoice.shipping')}}</span>
                <span><span class="font-bold">100</span> <span class="text-primary">{{$t('app.SAR')}}</span></span>
              </div>
              <div class="flex justify-between">
                <span class="text-intext  py-2">{{$t('invoice.vat')}}(5%)</span>
                <span><span class="font-bold">200</span> <span class="text-primary">{{$t('app.SAR')}}</span></span>
              </div>
              <div class="flex justify-between border-t border-b  py-2 border-smooth">
                <span class="font-bold text-[18px]">{{$t('invoice.total')}}</span>
                <span><span class="font-bold text-[18px]">1800</span> <span class="text-primary text-[18px]">{{$t('app.SAR')}}</span></span>
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
</template>
<script>
export default {
  props:['order'],
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
