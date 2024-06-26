<template>
  <div>
    <div class="p-4">
        <div class="flex justify-between">
<<<<<<< Updated upstream
            <h4 class="text-[20px] font-medium">Customer</h4>
            <a href="" class="flex gap-4 text-[14px] font-semibold items-center">{{ $t('Dashboard.More') }} <img class="w-5 h-5" src="~/assets/icon/next-g.svg" alt=""></a>
=======
            <h4 class="text-[20px] font-semibold">Customer</h4>
            <a href="" class="flex gap-4 text-[14px] font-semibold items-center">{{ $t('Dashboard.More') }} <img class="w-5 h-5  rtl:rotate-180" src="~/assets/icon/next-g.svg" alt=""></a>
>>>>>>> Stashed changes
        </div>
        <div class="my-2 chart">
          <user-chart total-value="580" title-legend="Customers" :chart-label="{labelsItem}" :chart-color="{colors}"/>
        </div>
        <div class="lg:grid w-[250px] lg:w-full  mx-auto lg:grid-cols-2 py-3  gap-4">
            <div class="lg:border-r border-offwhite lg:px-4">
                <p class="flex  justify-between lg:pb-2 gap-4 items-center hover:text-primary cursor-pointer">
                  <span class="text-[14px] flex gap-4 w-[115px] items-center text-primary"><img class="w-[8px] h-[8px]" src="~/assets/icon/live.svg" alt=""> Approve</span>
                <span class="text-[14px] font-bold text-primary">30</span>
                <span class="text-[14px] text-[#8E95A9] hover:text-primary">15.3%</span>
                </p>
                <p class="flex lg:pt-2 justify-between gap-4 items-center hover:text-orangeDeep  cursor-pointer">
                  <span class="flex gap-4 text-[#8E95A9] w-[115px] hover:text-orangeDeep items-center text-orangeDeep"><img class="w-[8px] h-[8px]" src="~/assets/icon/adminelips.svg" alt=""> Un-Approve</span>
                  <span class="text-[14px] font-bold text-orangeDeep">100</span>
                  <span class="text-[14px] text-[#8E95A9] hover:text-orangeDeep">30.7%</span>
                </p>
            </div>
            <div class="lg:px-2">
              <p class="flex  justify-between pb-2 gap-4 items-center hover:text-orangeLight cursor-pointer">
                  <span class="text-[14px] flex gap-4 w-[115px] items-center text-[#8E95A9] hover:text-orangeLight text-orangeLight"><img class="w-[8px] h-[8px]" src="~/assets/icon/orangeelips.svg" alt=""> Pending</span>
                <span class="text-[14px] font-bold text-orangeLight">450</span>
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
  data(){
    return{
      labelsItem: ['Approve', 'Un-Approve', 'Pending'],
      colors: ['#01A781','#FF392B','#FF8901'],
    }
  }
};
</script>
<style scoped>
  /* .chart >>> canvas{
    width: 650px !important;
    height: 320px !important;
  } */
</style>
