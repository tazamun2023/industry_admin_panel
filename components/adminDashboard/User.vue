<template>
  <div>
    <div class="p-4">
        <div class="flex justify-between">
<<<<<<< Updated upstream
            <h4 class="text-[20px] font-medium">Users</h4>
            <a href="" class="flex gap-4 text-[14px] text-[14px] font-semibold font-semibold items-center">{{ $t('Dashboard.More') }} <img class="w-5 h-5" src="~/assets/icon/next-g.svg" alt=""></a>
=======
            <h4 class="text-[20px] font-semibold">Users</h4>
            <a href="" class="flex gap-4 text-[14px] text-[14px] font-semibold font-semibold items-center">{{ $t('Dashboard.More') }} <img class="w-5 h-5  rtl:rotate-180" src="~/assets/icon/next-g.svg" alt=""></a>
>>>>>>> Stashed changes
        </div>
        <div class="my-2">
          <!-- <div class="absolute w-full h-[106%] text-center flex justify-center items-center">
            <div>
              <p class="lg:text-[24px] text-[18px] capitalize text-[#8E95A9] lg:leading-[40px] leading-[20px]">user </p>
              <p class="lg:text-[24px] text-[18px] uppercase text-[#FF8901] lg:leading-[40px] leading-[20px]">340</p>
            </div>
          </div> -->
          <user-chart total-value="580" title-legend="User" :chart-label="{labelsItem}" :chart-color="{colors}"/>
        </div>
        <div class="lg:grid lg:grid-cols-2 mx-auto lg:w-full  w-[250px] gap-4">
            <div class="lg:border-r lg:border-offwhite lg:px-4">
                <p class="flex  justify-between lg:pb-2 gap-4 items-center hover:text-orangeDeep cursor-pointer">
                  <span class="text-[14px] w-[115px] flex gap-4 items-center text-orangeDeep"><img class="w-[8px] h-[8px]" src="~/assets/icon/adminelips.svg" alt=""> Admins</span>
                <span class="text-[14px] font-bold text-orangeDeep">30</span>
                <span class="text-[14px]">15.3%</span>
                </p>
                <p class="flex lg:pt-2 justify-between gap-4 items-center hover:text-blue  cursor-pointer">
                  <span class="flex gap-4 w-[115px] items-center text-blue"><img class="w-[8px] h-[8px]" src="~/assets/icon/blueelips.svg" alt=""> Vendors</span>
                  <span class="text-[14px] font-bold text-blue">100</span>
                  <span class="text-[14px]">30.7%</span>
                </p>
            </div>
            <div class="lg:px-2">
              <p class="flex  justify-between pb-2 gap-4 items-center hover:text-orangeLight cursor-pointer">
                  <span class="text-[14px]  w-[115px]   flex gap-4 items-center text-orangeLight"><img class="w-[8px] h-[8px]" src="~/assets/icon/orangeelips.svg" alt=""> Customers</span>
                <span class="text-[14px] font-bold text-orangeLight">450</span>
                <span class="text-[14px]">54%</span>
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
      labelsItem: ['Admin', 'Vendors', 'Customer'],
      colors: ['#FF392B','#2F80ED','#FF8901'],
    }
  }
};
</script>
