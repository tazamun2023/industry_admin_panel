<template>
  <div>
    <div class="p-4 card lg:h-[471px]">
        <div class="flex justify-between">
            <h4 class="text-[20px] font-medium">Customer</h4>
            <a href="" class="flex gap-4 items-center">{{ $t('Dashboard.More') }} <img class="w-5 h-5" src="~/assets/icon/next-g.svg" alt=""></a>
        </div>
        <div class="my-2 chart">
          <user-chart/>
        </div>
        <div class="grid grid-cols-2 py-3  gap-4">
            <div class="border-r border-offwhite px-4">
                <p class="flex  justify-between pb-2 gap-4 items-center hover:text-primary cursor-pointer">
                  <span class="text-[14px] flex gap-4 items-center"><img class="w-[8px] h-[8px]" src="~/assets/icon/live.svg" alt=""> Approve</span>
                <span class="text-[14px] font-bold">30</span>
                <span class="text-[14px] text-[#8E95A9] hover:text-primary">15.3%</span>
                </p>
                <p class="flex pt-2 justify-between gap-4 items-center hover:text-orangeDeep  cursor-pointer">
                  <span class="flex gap-4 text-[#8E95A9] hover:text-orangeDeep items-center"><img class="w-[8px] h-[8px]" src="~/assets/icon/adminelips.svg" alt=""> Un-Approve</span>
                  <span class="text-[14px] font-bold">100</span>
                  <span class="text-[14px] text-[#8E95A9] hover:text-orangeDeep">30.7%</span>
                </p>
            </div>
            <div class="px-2">
              <p class="flex  justify-between pb-2 gap-4 items-center hover:text-orangeLight cursor-pointer">
                  <span class="text-[14px] flex gap-4 items-center text-[#8E95A9] hover:text-orangeLight"><img class="w-[8px] h-[8px]" src="~/assets/icon/orangeelips.svg" alt=""> Pending</span>
                <span class="text-[14px] font-bold">450</span>
                <span class="text-[14px] text-[#8E95A9] hover:text-orangeLight">54%</span>
                </p>
            </div>
        </div>
    </div>

  </div>
</template>
<script>
import UserChart from './UserChart.vue';

export default {
  components: {
    UserChart,
  },
};
</script>
<style scoped>
  .chart >>> canvas{
    width: 650px !important;
    height: 320px !important;
  }
</style>
