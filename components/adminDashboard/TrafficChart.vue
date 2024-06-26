<template>
  <div class="px-1 pt-[40px]">
    <p class="text-[#8E95A9] text-[14px] flex justify-between">
      Jan 16 - Jan 30 store visits chart
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-primary rtl:rotate-180">
        <path d="M8.75 13.75L12.5 10L8.75 6.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    </p>
    <canvas ref="lineChart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'LineChart',
  props: {
    label: {
      type: String,
      default: 'Label'
    },
    color: {
      type: String,
      default: '#27436F'
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
      gradient.addColorStop(1, '#ffffff88');

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['16', '18', '20', '22', '24', '26', '28', '30'],
          datasets: [
            {
              label: this.label,
              backgroundColor: gradient,
              borderColor: this.color,
              pointBackgroundColor: this.color,
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: this.color,
              pointHoverBorderColor: '#fff',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: true,
              tension: 0.4 // Smooth curves
            }
          ]
        },
        options: {
          responsive: false,
          scales: {
            xAxes: {
              display: false,
              grid: {
                display: false
              },
              ticks: {
                color: '#27436F'
              }
            },
            yAxes: {
              display: false,
              grid: {
                display: false
              }
            }
          },
          elements: {
            point: {
              radius: 4,
              borderWidth: 2,
              hoverRadius: 6
            },
            line: {
              borderWidth: 2
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: this.color,
              titleColor: '#fff',
              bodyColor: '#fff',
              displayColors: false,
              callbacks: {
                label: function(context) {
                  return `${context.raw}k`; // Add 'k' to tooltip values
                }
              }
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
canvas {
  width: 100% !important;
}
</style>
