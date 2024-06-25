<template>
  <div class="px-1 pt-[40px]">
    <p class="text-[#8E95A9] text-[14px] flex justify-between">Jan 16 - Jan 30 store visits chart
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-primary rtl:rotate-180"><path d="M8.75 13.75L12.5 10L8.75 6.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    </p>
    <canvas ref="lineChart"></canvas>
  </div>
</template>

<script>
import { Line } from 'chart.js';

export default {
  name: 'LineChart',
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
      const ctx = this.$refs.lineChart.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
      gradient.addColorStop(0, '#F5F2FF');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      new Line(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: this.label,
              backgroundColor: gradient,
              borderColor: '#27436F',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: true,
            },
          ],
        },
        options: {
			responsive: true,
			scales: {
				xAxes: [{
					display: true,
          scaleLabel: {
            display: false,
            labelString: 'Date'
          },
          ticks: {
                display: true, // Hide y-axis labels
              },
              grid: {
                display: true, // Hide y-axis grid lines
              },
				}],
				yAxes: [{
					display: false,
          scaleLabel: {
							display: true,
							labelString: 'Index Returns'
						},
            ticks: {
                display: true, // Hide y-axis labels
              },
              grid: {
                display: true, // Hide y-axis grid lines
              },
				}]
			}
		},
    plugins: {
            legend: {
              display: false, // Display legend
              labels: {
                    color: this.color
                },

            },
            title: {
              display: true,
            },
          },
      });
    },
  },
};
</script>

<style scoped>
canvas{
  height: 294px !important;
}
</style>
