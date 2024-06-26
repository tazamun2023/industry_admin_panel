<template>
  <div>
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

