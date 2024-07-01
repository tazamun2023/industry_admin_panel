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
    },
    productLabelsAndData:{},
    customerLabelsAndData:{},
    rfqLabelsAndData:{},
    orderLabelsAndData:{}
  },
  data(){
    return{
      labelsMonth: [],
      productCountPerMonth: []
    }

  },
  mounted() {
    if (this.productLabelsAndData){
      this.labelsMonth = this.productLabelsAndData?.labels
      this.productCountPerMonth = this.productLabelsAndData?.productCountPerMonth
    }
    if (this.orderLabelsAndData){
      this.labelsMonth = this.orderLabelsAndData?.labels
      this.productCountPerMonth = this.orderLabelsAndData?.orderCountPerMonth
    }
    if (this.customerLabelsAndData){
      this.labelsMonth = this.customerLabelsAndData?.labels
      this.productCountPerMonth = this.customerLabelsAndData?.customerCountPerMonth
    }
    if (this.rfqLabelsAndData){
      this.labelsMonth = this.rfqLabelsAndData?.labels
      this.productCountPerMonth = this.rfqLabelsAndData?.rfqCountPerMonth
    }
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.lineChart.getContext('2d');
      new Line(ctx, {
        type: 'line',
        data: {
          labels: this.labelsMonth,
          datasets: [
            {
              label: this.label,
              // backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: this.color,
              data: this.productCountPerMonth,
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
