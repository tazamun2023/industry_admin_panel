<template>
  <div>
      <div class="grid lg:grid-cols-4 grid-cols-2 gap-4">
        <div class="border-cardb my-2 lg:h-[108px] border rounded-[12px] lg:p-4 p-2">
          <div class="flex justify-between items-center">
             <div>
              <p class="lg:text-[14px] text-[12px] font-medium text-theem">Products</p>
              <p class="lg:text-[24px] text-[20px] font-semibold">$7,825</p>
             </div>
             <div>
               <short-chart label="+22%" color="#FF8901"/>
              </div>
          </div>

        </div>

        <div class="border-cardb my-2 lg:h-[108px] border rounded-[12px] lg:p-4 p-2">
          <div class="flex justify-between items-center">
              <div>
                <p class="lg:text-[14px] text-[12px] font-medium text-theem">Orders</p>
                <p class="lg:text-[24px] text-[20px] font-semibold">920</p>
              </div>
              <div>
                <short-chart label="-25%" color="#FF392B"/>
              </div>
          </div>
        </div>

        <div class="border-cardb my-2 lg:h-[108px] border rounded-[12px] lg:p-4 p-2">
          <div class="flex justify-between items-center">
              <div>
                <p class="lg:text-[14px] text-[12px] font-medium text-theem">Customers</p>
                <p class="lg:text-[24px] text-[20px] font-semibold">15.5K</p>
              </div>
              <div>
                <short-chart label="+49%" color="#279F51"/>
              </div>
          </div>
        </div>

        <div class="border-cardb my-2 lg:h-[108px] border rounded-[12px] lg:p-4 p-2">
          <div class="flex justify-between items-center">
              <div>
                <p class="lg:text-[14px] text-[12px] font-medium text-theem">RFQs</p>
                <p class="lg:text-[24px] text-[20px] font-semibold">28%</p>
              </div>
              <div>
                <short-chart label="+1.9%" color="#27436F"/>
              </div>
          </div>
        </div>

      </div>
  </div>
</template>
<script>
import ShortChart from './shortChart.vue';

export default {
  components: {
    ShortChart,
  },
};
</script>
