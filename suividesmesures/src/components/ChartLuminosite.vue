<template>
  <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
/* eslint-disable */
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js'
import 'chartjs-adapter-date-fns';
import { mapGetters } from 'vuex'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'ChartLuminosite',
  components: { Line },
  computed: {
    chartData() {
      return {
        labels: this.dateLum,
        datasets: [
          {
            label: 'Zone témoin',
            backgroundColor: 'blue',
            data: this.TemoinLuminosite,
            fill: false,
            borderColor: 'blue',
            borderWidth: 2,
            tension: 0.3
          },
          {
            label: 'Zone équipée',
            backgroundColor: 'red',
            data: this.EquipeLuminosite,
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
      'dateLum',
      'TemoinLuminosite',
      'EquipeLuminosite'
    ])
  }
}
</script>