<template>
  <div class="p-4 card lg:h-[371px]">
      <div class="flex justify-between">
          <h4 class="text-[20px] font-medium">My Products</h4>
          <NuxtLink :to="`/products`" class="flex gap-4 text-[14px] font-semibold items-center">More <img class="w-5 h-5" src="~/assets/icon/next-g.svg" alt=""></NuxtLink>
      </div>
      <div>
          <div class="grid grid-cols-2 my-4 gap-4">
              <div class="border h-[80px]  border-cardb px-4 pb-3 pt-2 rounded-[12px]">
                  <p class="text-14px">All Products</p>
                  <p class="text-semibold text-[24px] leading-4 pt-[15px]">{{ my_products?.all_products }}</p>
              </div>
              <div class="border h-[80px]  hover:border-orange border-[#c4cdd5] px-4 pb-3 pt-2 rounded-[12px]">
                  <p class="text-14px text-orange">Waiting Acceptance</p>
                  <p class="text-semibold text-[24px] leading-4 pt-[15px]">{{ my_products?.waiting_acceptance }}</p>
              </div>
              <div class="border h-[80px] hover:border-primary border-[#c4cdd5] px-4 pb-3 pt-2 rounded-[12px]">
                  <p class="text-14px text-primary">Accepted</p>
                  <p class="text-semibold text-[24px] leading-4 pt-[15px]">{{ my_products?.accepted }}</p>
              </div>
              <div class="border h-[80px] hover:border-prograss border-[#c4cdd5] px-4 pb-3 pt-2 rounded-[12px]">
                  <p class="text-14px text-prograss">Rejected</p>
                  <p class="text-semibold text-[24px] leading-4 pt-[15px]">{{ my_products?.rejected }}</p>
              </div>
              <div class="border h-[80px] border-[#c4cdd5]  hover:border-reject px-4 pb-3 pt-2 rounded-[12px]">
                  <p class="text-14px text-reject">Drafted</p>
                  <p class="text-semibold text-[24px] leading-4 pt-[15px]">{{ my_products?.drafted }}</p>
              </div>
          </div>
      </div>
  </div>
</template>


<script>
export default {
name: 'MyProductsData',
props: ['my_products']
}
</script>
