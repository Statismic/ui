import { Bar, mixins } from 'vue-chartjs'
const { reactiveData } = mixins

export default {
  extends: Bar,
  mixins: [reactiveData],
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Experiment(s)'
              }
            }
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Ratio'
              }
            }
          ]
        }
      }
    }
  },
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler: function(newData) {
        // // eslint-disable-next-line
        // console.log(newData.map(d => d.y))
        this.chartData = {
          labels: newData.map(d => d.x),
          datasets: [
            {
              label: 'Something',
              data: newData.map(d => d.y)
            }
          ]
        }
      }
    }
  }
}
