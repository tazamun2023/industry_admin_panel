<template>
      <div class="p-4">
        <div class="flex justify-between">
            <h4 class="text-[20px] font-semibold">Traffic</h4>
            <NuxtLink :to="`/brands`" class="flex gap-4 text-[14px] font-semibold items-center">More <img class="w-5 h-5  rtl:rotate-180" src="~/assets/icon/next-g.svg" alt=""></NuxtLink>
        </div>
        <div class="grid py-2 grid-cols-2 gap-4">
          <div class="border-cardb h-[96px] border rounded-[12px] p-4">
            <div class="flex justify-between items-baseline">
              <div>
                <p class="text-[14px] text-theem">Store Visists</p>
                <p class="text-[24px] font-semibold">$7,825</p>
              </div>
              <div>
                <p class="text-[14px] text-primary font-bold">+ 22%</p>
              </div>
            </div>
          </div>
          <div class="border-cardb h-[96px] border rounded-[12px] p-4">
            <div class="flex justify-between items-baseline">
              <div>
                <p class="text-[14px] text-theem">Vistors</p>
                <p class="text-[24px] font-semibold">$7,825</p>
              </div>
              <div>
                <p class="text-[14px] text-theem font-bold">+ 22%</p>
              </div>
            </div>

          </div>
        </div>
        <div>
              <traffic-chart label="Traffic"/>
        </div>
      </div>
</template>
<script>
import TrafficChart from './TrafficChart.vue';
export default {
  components: {TrafficChart},
  data() {
    return {}
  }
}
</script>
