import { Line, mixins } from 'vue-chartjs'
const { reactiveData } = mixins

export default {
  extends: Line,
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
        title: {
          display: true,
          text: 'Probability Over Time'
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Probability'
              }
            }
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Experiment'
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
      handler: function(newData) {
        this.chartData = {
          labels: newData.map(d => d.x),
          datasets: [
            {
              label: 'Something',
              data: newData
            }
          ]
        }
      }
    }
  }
}
