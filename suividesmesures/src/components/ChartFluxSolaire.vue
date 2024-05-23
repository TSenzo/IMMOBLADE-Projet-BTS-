
<template>
    <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
    <div></div>
</template>

<script>
/* eslint-disable */
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js'
import { mapActions, mapGetters } from 'vuex'

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
    name: 'LineChart',
    components: { Line },
    computed: {
        chartData() {
            return {
        labels: [1, 2, 3, 4, 5],
        datasets: [
          {
            label: 'Data One', 
            backgroundColor: 'blue',
            data: this.TemoinTemperatures
          },
          {
            label: 'Data Two', 
            backgroundColor: 'red',
            data: this.EquipeTemperatures
          }
        ]
      }
        },
        chartOptions() { 
            return {

            }
        },
        ...mapGetters([
          'temperatures'
      ])
    },
    mounted () {
      console.log(this.temperatures)
    }
}
</script>
