<template>
  <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
/* eslint-disable */
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Legend, PointElement, LineElement, CategoryScale, TimeScale } from 'chart.js'
import 'chartjs-adapter-date-fns';
import { mapGetters } from 'vuex'

ChartJS.register(
  CategoryScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Legend
)

export default {
  name: 'ChartTemperature',
  components: { Line },
  computed: {
    chartData() {
      return {
        labels: this.dateTemp,  
        datasets: [ 
          {
            label: 'Zone témoin',
            backgroundColor: 'blue',
            data: this.TemoinTemperature,
            fill: false,
            borderColor: 'blue',
            borderWidth: 2,
            tension: 0.3
          },
          {
            label: 'Zone équipée',
            backgroundColor: 'red',
            data: this.EquipeTemperature,
            fill: false,
            borderColor: 'red',
            borderWidth: 2,
            tension: 0.3
          }
        ]
      }
    },
    chartOptions() {
      scales: {
        x: {
          type: 'time'/*,
            time: {
            unit: 'month'
          } */
        }
      }

    },
    ...mapGetters([
      'dateTemp',
      'TemoinTemperature',
      'EquipeTemperature'
    ])
  }
}
</script>
