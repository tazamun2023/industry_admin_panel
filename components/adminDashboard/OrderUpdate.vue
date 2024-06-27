
<template>
  <div class="order-chart card mtb-20 mtb-sm-15">
    <div class="flex justify-between pb-[50px]">
          <h4 class="text-[14px] font-medium flex gap-3 items-center"><img class="w-2 h-2" src="~/assets/icon/live.svg" alt="">Orders Update</h4>
          <NuxtLink :to="`/orders`" class="flex gap-4 text-[14px] font-semibold items-center">View Details <img class="w-5 h-5 rtl:rotate-180" src="~/assets/icon/next-g.svg" alt=""></NuxtLink>
      </div>
    <order-update-chart/>
  </div>
</template>
<script>
import OrderUpdateChart from './OrderUpdateChart.vue';
export default {
  components: {OrderUpdateChart},
  data() {
    return {}
  }
}
</script>



