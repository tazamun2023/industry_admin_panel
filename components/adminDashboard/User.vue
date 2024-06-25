<template>
  <div>
    <div class="p-4 card lg:h-[530px]">
        <div class="flex justify-between">
            <h4 class="text-[20px] font-medium">Users</h4>
            <a href="" class="flex gap-4 items-center">{{ $t('Dashboard.More') }} <img class="w-5 h-5" src="~/assets/icon/next-g.svg" alt=""></a>
        </div>
        <div class="my-2">
          <user-chart :chart-label="labelsItem" :chart-color="colors"/>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="border-r border-offwhite px-4">
                <p class="flex  justify-between pb-2 gap-4 items-center hover:text-orangeDeep cursor-pointer">
                  <span class="text-[14px] flex gap-4 items-center"><img class="w-[8px] h-[8px]" src="~/assets/icon/adminelips.svg" alt=""> Admins</span>
                <span class="text-[14px] font-bold">30</span>
                <span class="text-[14px]">15.3%</span>
                </p>
                <p class="flex pt-2 justify-between gap-4 items-center hover:text-blue  cursor-pointer">
                  <span class="flex gap-4 items-center"><img class="w-[8px] h-[8px]" src="~/assets/icon/blueelips.svg" alt=""> Vendors</span>
                  <span class="text-[14px] font-bold">100</span>
                  <span class="text-[14px]">30.7%</span>
                </p>
            </div>
            <div class="px-2">
              <p class="flex  justify-between pb-2 gap-4 items-center hover:text-orangeLight cursor-pointer">
                  <span class="text-[14px] flex gap-4 items-center"><img class="w-[8px] h-[8px]" src="~/assets/icon/orangeelips.svg" alt=""> Customers</span>
                <span class="text-[14px] font-bold">450</span>
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
