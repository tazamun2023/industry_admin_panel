<template>
  <div class="p-4">
      <div class="flex justify-between">
          <h4 class="text-[20px] font-semibold">{{ $t('Dashboard.Brands')}}</h4>
          <NuxtLink :to="`/brands`" class="flex gap-4 text-[14px] font-semibold items-center">More <img class="w-5 h-5  rtl:rotate-180" src="~/assets/icon/next-g.svg" alt=""></NuxtLink>
      </div>
      <div>
          <div class="grid grid-cols-2 my-4 gap-4">
              <NuxtLink :to="`/brands`" class="border h-[90px] border-cardb px-4 pb-3 pt-2 rounded-[12px]">
                  <p class="text-14px">{{ $t('Dashboard.All Brands')}}</p>
                  <p class="text-semibold text-[24px] leading-4 pt-[10px]">{{ brands?.all_brand }}</p>
              </NuxtLink>
              <NuxtLink :to="`/brands/pending`" class="border h-[90px] border-orange border-[#c4cdd5] px-4 pb-3 pt-2 rounded-[12px]">
                  <p class="text-14px text-orange">{{ $t('Dashboard.Waiting Acceptance')}}</p>
                  <p class="text-semibold text-[24px] leading-4 pt-[10px]">{{ brands?.waiting_acceptance }}</p>
              </NuxtLink>
              <NuxtLink :to="`/brands/approved`" class="border h-[90px] border-primary border-[#c4cdd5] px-4 pb-3 pt-2 rounded-[12px]">
                  <p class="text-14px text-primary">{{ $t('Dashboard.Accepted')}}</p>
                  <p class="text-semibold text-[24px] leading-4 pt-[10px]">{{ brands?.accepted_brand }}</p>
              </NuxtLink>
              <NuxtLink :to="`/brands/reject`" class="border h-[90px] border-prograss border-[#c4cdd5] px-4 pb-3 pt-2 rounded-[12px]">
                  <p class="text-14px text-prograss">{{ $t('Dashboard.Rejected')}}</p>
                  <p class="text-semibold text-[24px] leading-4 pt-[10px]">{{ brands?.rejected_brand }}</p>
              </NuxtLink>
          </div>
      </div>
  </div>
</template>
<script>

import LazyImage from "../LazyImage.vue";

export default {
name: "AdminBrands",
components: {LazyImage},
props: ['brands'],

data() {
  return {}
}
}
</script>
