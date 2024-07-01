<template>
  <div>
      <div class="grid lg:grid-cols-4 grid-cols-2 gap-4">
        <div class="border-cardb my-2 lg:h-[108px] border rounded-[12px] lg:p-4 p-2">
          <div class="flex justify-between gap-4 items-center" v-if="productLabelsAndData">
             <div>
              <p class="lg:text-[14px] text-[12px] font-medium text-theem">Products</p>
              <p class="lg:text-[24px] text-[20px] font-semibold">{{ productLabelsAndData?.total_products }}</p>
             </div>
             <div>
               <short-chart :label="productLabelsAndData ? productLabelsAndData.currentMonthPercentage + '%' : ''" color="#FF8901" :productLabelsAndData="productLabelsAndData"/>

             </div>
          </div>

        </div>

        <div class="border-cardb my-2 lg:h-[108px] border rounded-[12px] lg:p-4 p-2" v-if="orderLabelsAndData">
          <div class="flex justify-between gap-4 items-center">
              <div>
                <p class="lg:text-[14px] text-[12px] font-medium text-theem">Orders</p>
                <p class="lg:text-[24px] text-[20px] font-semibold">{{ orderLabelsAndData?.total_orders }}</p>
              </div>
              <div>
                <short-chart :label="orderLabelsAndData ? orderLabelsAndData.currentMonthPercentage + '%' : ''" color="#FF392B" :orderLabelsAndData="orderLabelsAndData"/>
              </div>
          </div>
        </div>

        <div class="border-cardb my-2 lg:h-[108px] border rounded-[12px] lg:p-4 p-2" v-if="customerLabelsAndData">
          <div class="flex justify-between gap-4 items-center">
              <div>
                <p class="lg:text-[14px] text-[12px] font-medium text-theem">Customers</p>
                <p class="lg:text-[24px] text-[20px] font-semibold">{{ customerLabelsAndData?.total_customers }}</p>
              </div>
              <div>
                <short-chart :label="customerLabelsAndData ? customerLabelsAndData.currentMonthPercentage + '%' : ''" color="#279F51" :customerLabelsAndData="customerLabelsAndData"/>
              </div>
          </div>
        </div>

        <div class="border-cardb my-2 lg:h-[108px] border rounded-[12px] lg:p-4 p-2" v-if="rfqLabelsAndData">
          <div class="flex justify-between gap-4 items-center">
              <div>
                <p class="lg:text-[14px] text-[12px] font-medium text-theem">RFQs</p>
                <p class="lg:text-[24px] text-[20px] font-semibold">{{rfqLabelsAndData?.total_rfqs }}</p>
              </div>
              <div>
                <short-chart :label="rfqLabelsAndData ? rfqLabelsAndData.currentMonthPercentage + '%' : ''" color="#27436F" :rfqLabelsAndData="rfqLabelsAndData"/>
              </div>
          </div>
        </div>

      </div>
  </div>
</template>
<script>
import ShortChart from './shortChart.vue';

export default {
  name: "AdminShortStatics",
  components: {
    ShortChart,
  },
  props:['productLabelsAndData', 'orderLabelsAndData', 'customerLabelsAndData', 'rfqLabelsAndData']
};
</script>
