<template>
  <div>
      <div class="grid grid-cols-4 gap-4">
        <div class="border-cardb h-[108px] border rounded-[12px] p-4">
          <div class="flex justify-between items-center">
             <div>
              <p class="text-[14px] text-theem">Products</p>
              <p class="text-[24px] font-semibold">$7,825</p>
             </div>
             <div>
               <short-chart label="+22%" color="#FF8901"/>
              </div>
          </div>

        </div>

        <div class="border-cardb h-[108px] border rounded-[12px] p-4">
          <div class="flex justify-between items-center">
              <div>
                <p class="text-[14px] text-theem">Orders</p>
                <p class="text-[24px] font-semibold">920</p>
              </div>
              <div>
                <short-chart label="-25%" color="#FF392B"/>
              </div>
          </div>
        </div>

        <div class="border-cardb h-[108px] border rounded-[12px] p-4">
          <div class="flex justify-between items-center">
              <div>
                <p class="text-[14px] text-theem">Customers</p>
                <p class="text-[24px] font-semibold">15.5K</p>
              </div>
              <div>
                <short-chart label="+49%" color="#279F51"/>
              </div>
          </div>
        </div>

        <div class="border-cardb h-[108px] border rounded-[12px] p-4">
          <div class="flex justify-between items-center">
              <div>
                <p class="text-[14px] text-theem">RFQs</p>
                <p class="text-[24px] font-semibold">28%</p>
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
