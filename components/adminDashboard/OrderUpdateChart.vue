<template>
  <div>
    <canvas class="lg:h-[510px]" ref="orderLineChart"></canvas>
  </div>
</template>
<script>
import Chart from 'chart.js';

export default {
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.orderLineChart.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
      gradient.addColorStop(0, '#F5F2FF');
      gradient.addColorStop(1, '#01A78105');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
          datasets: [{
            label: 'Store Visits',
            data: [12, 19, 3, 5, 2, 3, 9, 6, 5, 8, 3, 7, 4, 6, 10],
            borderColor: '#01A781',
            backgroundColor:gradient,
            borderWidth: 3
          }]
        },
        options: {
          responsive:true,
          scales: {
            yAxes: [{
              display: true,
              gridLines: {
                display: true,
                drawBorder: true,
                borderDash: [5, 5]
              }
            }],
            xAxes: [{
              gridLines: {
                display: false,
                drawBorder: true,
                borderDash: [5, 5]
              }
            }]
          }
        }
      });
    }
  }
}
</script>

<style scoped>
canvas{
  max-height: 600px;
}
</style>
