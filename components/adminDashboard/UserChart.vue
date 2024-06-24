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
    label:{
      type:String,
      default:'Label'
    },
    color:{
       type:String,
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
          labels: ['Admin', 'Vendors', 'Customer'],
          datasets: [{
          label: 'My First Dataset',
          data: [30, 550, 1050],
          backgroundColor: [
            '#FF392B',
            '#2F80ED',
            '#FF8901'
          ],
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
  width: 100%;
  height: 80px;
  overflow: hidden;
} */
</style>

