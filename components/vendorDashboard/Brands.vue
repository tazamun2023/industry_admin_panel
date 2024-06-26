<template>
    <div class="p-4 card lg:h-[371px]">
        <div class="flex justify-between">
            <h4 class="text-[20px] font-medium">Brands</h4>
            <NuxtLink :to="`/brands`" class="flex gap-4 items-center">More <img class="w-5 h-5" src="~/assets/icon/next-g.svg" alt=""></NuxtLink>
        </div>
        <div>
            <div class="grid grid-cols-2 my-4 gap-4">
                <NuxtLink :to="`/brands`" class="border h-[90px] border-cardb px-4 pb-3 pt-2 rounded-[12px]">
                    <p class="text-14px">All Brands</p>
                    <p class="text-semibold text-[24px] leading-4 pt-[15px]">{{ brands?.all_brand }}</p>
                </NuxtLink>
                <NuxtLink :to="`/brands/pending`" class="border h-[90px] border-orange border-[#c4cdd5] px-4 pb-3 pt-2 rounded-[12px]">
                    <p class="text-14px text-orange">Waiting Acceptance</p>
                    <p class="text-semibold text-[24px] leading-4 pt-[15px]">{{ brands?.waiting_acceptance }}</p>
                </NuxtLink>
                <NuxtLink :to="`/brands/approved`" class="border h-[90px] border-primary border-[#c4cdd5] px-4 pb-3 pt-2 rounded-[12px]">
                    <p class="text-14px text-primary">Accepted</p>
                    <p class="text-semibold text-[24px] leading-4 pt-[15px]">{{ brands?.accepted_brand }}</p>
                </NuxtLink>
                <NuxtLink :to="`/brands/reject`" class="border h-[90px] border-prograss border-[#c4cdd5] px-4 pb-3 pt-2 rounded-[12px]">
                    <p class="text-14px text-prograss">Rejected</p>
                    <p class="text-semibold text-[24px] leading-4 pt-[15px]">{{ brands?.rejected_brand }}</p>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
<script>

import LazyImage from "../LazyImage.vue";

export default {
  name: "Brands",
  components: {LazyImage},
  props: ['brands'],

  data() {
    return {}
  }
}
</script>
