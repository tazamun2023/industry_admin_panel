<template>
  <div class="p-4 card lg:h-[371px]">
      <div class="flex justify-between">
          <h4 class="text-[20px] font-medium">{{ $t('Dashboard.Bestsellers') }}</h4>
          <a href="" class="flex gap-4 items-center">{{ $t('Dashboard.More') }} <img class="w-5 h-5" src="~/assets/icon/next-g.svg" alt=""></a>
      </div>
      <div class="overflow-x-auto h-[240px] my-4 scroolbar">
          <table>
              <thead>
                  <tr>
                      <th class="text-[14px] capitalize">{{ $t('Dashboard.Product') }}</th>
                      <th class="text-[14px] capitalize"><span class="flex gap-2 items-center">{{ $t('Dashboard.Price') }} <img class="w-2" src="~/assets/icon/dscdown.svg" alt=""></span></th>
                      <th class="text-[14px] capitalize"><span class="flex gap-2 items-center">{{ $t('Dashboard.Sold') }}  <img class="w-2" src="~/assets/icon/dscdown.svg" alt=""></span></th>
                      <th class="text-[14px] capitalize"><span class="flex gap-2 items-center">{{ $t('Dashboard.Profit') }} <img class="w-2" src="~/assets/icon/dscdown.svg" alt=""></span></th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(data, index) in bestSelling" :key="data.product_id">
                      <td  class="text-[13px] capitalize">
                      <div class="flex items-center gap-4">
                          <img class="w-[36px] h-[36px] rounded-full" src="~/assets/icon/pimage.svg" alt="">
                         <p>{{ data.product?.name }}</p>
                      </div>
                  </td>
                  <td  class="text-[13px] capitalize">
                      <price-format :price="Number(data.total_price)" />
                  </td>
                  <td  class="text-[13px] capitalize">
                    {{ data.total_sold }}
                  </td>
                  <td  class="text-[13px] capitalize">
                      <price-format :price="Number(data.company_interest_after_tax_amount)" />
                  </td>
                  </tr>
              </tbody>
          </table>
      </div>
      <div>
          <NuxtLink :to="`/products`"><button class="flex gap-2 items-center justify-center text-white bg-theem h-[42px] text-[13px]"><img class="w-[11px] h-[11px]" src="~/assets/icon/reload.svg" alt="">
            {{ $t('Dashboard.Add New Product') }}</button></NuxtLink>
      </div>
  </div>
</template>
<script>
import PriceFormat from "../partials/PriceFormat.vue";

export default {
name: "AdminBestSeller.vue",
components: {PriceFormat},
props:['bestSelling'],

data(){
  return{

  }
}
}
</script>
