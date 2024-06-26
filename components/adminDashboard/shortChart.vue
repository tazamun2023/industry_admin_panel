<template>
  <div>
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
      new Line(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: this.label,
              // backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: this.color,
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
            },
          ],
        },
        options: {
			responsive: true,
			scales: {
				xAxes: [{
					display: false,
          scaleLabel: {
            display: false,
            labelString: 'Date'
          },

				}],
				yAxes: [{
					display: false,
          scaleLabel: {
							display: false,
							labelString: 'Index Returns'
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
              display: false,
            },
          },
      });
    },
  },
};
</script>

<style scoped>
  canvas {
  width: 100% !important;
}
@media screen and (min-width: 992px) {
  canvas {
  width: 100%;
  height: 80px;
  overflow: hidden;
}
}

</style>
