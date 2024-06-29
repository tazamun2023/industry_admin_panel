<template>
    <div class="p-4 card lg:h-[371px]">
        <div class="flex justify-between">
            <h4 class="text-[20px] font-semibold">{{ $t('Dashboard.My Products') }}</h4>
            <NuxtLink :to="`/products`" class="flex gap-4 items-center">{{ $t('Dashboard.More') }} <img class="w-5 h-5  rtl:rotate-180" src="~/assets/icon/next-g.svg" alt=""></NuxtLink>
        </div>
        <div>
            <div class="grid grid-cols-2 my-4 gap-4">
                <NuxtLink :to="`/products`" class="border h-[80px]  border-cardb lg:px-4 px-2 pb-3 pt-2 rounded-[12px]">
                    <p class="lg:text-14px text-[13px]">{{ $t('Dashboard.All Products') }}</p>
                    <p class="text-semibold text-[24px] leading-4 pt-[15px]">{{ my_products?.all_products }}</p>
                </NuxtLink>
                <NuxtLink  :to="`/products/pending-approval`" class="border h-[80px] border-orange border-[#c4cdd5] px-4 pb-3 pt-2 rounded-[12px]">
                    <p class="lg:text-14px text-[13px] text-orange">{{ $t('Dashboard.Waiting Acceptance') }}</p>
                    <p class="text-semibold text-[24px] leading-4 pt-[15px]">{{ my_products?.waiting_acceptance }}</p>
                </NuxtLink>
                <NuxtLink  :to="`/products/approved`" class="border h-[80px] border-primary border-[#c4cdd5] px-4 pb-3 pt-2 rounded-[12px]">
                    <p class="lg:text-14px text-[13px] text-primary">{{ $t('Dashboard.Accepted') }}</p>
                    <p class="text-semibold text-[24px] leading-4 pt-[15px]">{{ my_products?.accepted }}</p>
                </NuxtLink>
                <NuxtLink  :to="`/products/rejected`" class="border h-[80px] border-prograss border-[#c4cdd5] px-4 pb-3 pt-2 rounded-[12px]">
                    <p class="lg:text-14px text-[13px] text-prograss">{{ $t('Dashboard.Rejected') }}</p>
                    <p class="text-semibold text-[24px] leading-4 pt-[15px]">{{ my_products?.rejected }}</p>
                </NuxtLink>
                <NuxtLink  :to="`/products/draft`" class="border h-[80px] border-[#c4cdd5]  border-reject px-4 pb-3 pt-2 rounded-[12px]">
                    <p class="lg:text-14px text-[13px] text-reject">{{ $t('Dashboard.Drafted') }}</p>
                    <p class="text-semibold text-[24px] leading-4 pt-[15px]">{{ my_products?.drafted }}</p>
                </NuxtLink>
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
