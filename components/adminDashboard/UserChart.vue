<template>
  <div class="relative">
    <div class="absolute w-full h-[106%] text-center flex justify-center items-center">
      <div>
        <p class="lg:text-[24px] text-[18px] capitalize text-[#8E95A9] lg:leading-[40px] leading-[20px]">{{
            titleLegend
          }} </p>
        <p class="lg:text-[24px] text-[18px] uppercase text-[#FF8901] lg:leading-[40px] leading-[20px]">{{
            totalValue
          }}</p>
      </div>
    </div>
    <canvas ref="paiChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js"
import Ar from "vue2-datepicker/locale/es/ar";

export default {
  name: 'paiChart',
  props: {
    chartLabel: {},
    chartColor: {},
    titleLegend: {
      type: String,
      default: ''
    },
    totalValue: {
      type: Number,
      default: 0
    },
    vendorChart: {}
  },
  data(){
    return{
      approved: 0,
      unapproved: 0,
      pending: 0,
    }
  },
  mounted() {
    if (this.vendorChart){
      this.approved = this.vendorChart?.approved
      this.unapproved = this.vendorChart?.unapproved
      this.pending = this.vendorChart?.pending

      this.renderChart();
    }
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.paiChart.getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.chartLabel.labelsItem,
          datasets: [{
            label: 'My First Dataset',
            data: [this.approved, this.unapproved, this.pending],
            backgroundColor: this.chartColor.colors,
            hoverOffset: 4
          }]
        },

      });
    },
  },
};
</script>

<style scoped>
/* canvas {
  width: 100% !important;
  height: auto !important;
  overflow: hidden;
} */
</style>

