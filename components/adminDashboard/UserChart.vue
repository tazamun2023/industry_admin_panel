<template>
  <div class="relative">
    <div class="absolute w-full h-[106%] text-center flex justify-center items-center">
            <div>
              <p class="lg:text-[24px] text-[18px] capitalize text-[#8E95A9] lg:leading-[40px] leading-[20px]">{{ titleLegend }} </p>
              <p class="lg:text-[24px] text-[18px] uppercase text-[#FF8901] lg:leading-[40px] leading-[20px]">{{ totalValue }}</p>
            </div>
          </div>
    <canvas ref="paiChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js"

export default {
  name: 'paiChart',
  props:{
    chartLabel:{
      type:Array,
      default:'Label'
    },
    chartColor:{
       type:Array,
      default:'#01A781'
    },
    titleLegend:{
      type:String,
      default:''
    },
    totalValue:{
      type:Number,
      default:0
    }
  },
  mounted() {
    this.renderChart();
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
          data: [30, 550, 1050],
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

