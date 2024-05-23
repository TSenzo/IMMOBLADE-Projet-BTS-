<template>
  <div>
    <div class="campagne-selection">
      <h2>Choisissez une campagne :</h2>
      <button @click="selectionnerCampagne('Campagne 1')">Campagne 1</button>
      <button @click="selectionnerCampagne('Campagne 2')">Campagne 2</button>
      <button @click="selectionnerCampagne('Campagne 3')">Campagne 3</button>
      <button @click="selectionnerCampagne('Campagne 4')">Campagne 4</button>
      <button @click="selectionnerCampagne('Campagne 5')">Campagne 5</button>
    </div>
    <div v-if="campagneSelectionnee === 'Campagne 1'">
      <div class="container">
        <div class="table-container">
          <h2 class="title">Historique</h2>
          <div class="form">
            <label for="dateDebut">Date de début:</label>
            <input type="date" id="dateDebut" v-model="dateDebut">
            <label for="dateFin">Date de fin:</label>
            <input type="date" id="dateFin" v-model="dateFin">
            <label for="capteur">Capteur:</label>
            <select id="capteur" v-model="capteurId">
              <option value="6495c384cc48a32f8ad0d3ca">Salle témoin - luminosité</option>
              <option value="6495c354cc48a32f8ad0d3c9">Salle équipée - luminosité</option>
              <option value="6495c3dccc48a32f8ad0d3cc">Salle témoin - température</option>
              <option value="65f05a4c41ab4ce08585ed68">Salle équipée - température</option>
            </select>
            <button @click="ajouterCapteur">Ajouter</button>
            <button @click="resetChart">Réinitialiser</button>
            <p>Tableau:</p>
          </div>
          <table v-if="mesures.length > 0">
            <thead>
              <tr>
                <th>Date</th>
                <th>{{ capteurType }}</th>
                <th>Batterie</th>
                <th>RSSI</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="mesure in mesures" :key="mesure._id">
                <td>{{ formatDate(mesure.date) }}</td>
                <td>{{ mesure.payload }}</td>
                <td>{{ mesure.batterie }}%</td>
                <td>{{ mesure.rssi }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="chart-container">
          <canvas id="myChart" width="400" height="400"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Chart from 'chart.js/auto'

export default {
  name: 'Historique',
  data () {
    return {
      campagneSelectionnee: null,
      mesures: [],
      dateDebut: '',
      dateFin: '',
      capteurId: '6495c384cc48a32f8ad0d3ca',
      myChart: null,
      capteursSelectionnes: [],
      allMesures: []
    }
  },
  computed: {
    capteurSelectionne () {
      switch (this.capteurId) {
        case '6495c384cc48a32f8ad0d3ca':
          return 'Luminosité'
        case '6495c354cc48a32f8ad0d3c9':
          return 'Luminosité'
        case '6495c3dccc48a32f8ad0d3cc':
        case '65f05a4c41ab4ce08585ed68':
          return 'Température'
        default:
          return 'Capteur inconnu'
      }
    },
    capteurType () {
      switch (this.capteurId) {
        case '6495c384cc48a32f8ad0d3ca':
        case '6495c354cc48a32f8ad0d3c9':
          return 'Payload'
        case '6495c3dccc48a32f8ad0d3cc':
        case '65f05a4c41ab4ce08585ed68':
          return 'Température'
        default:
          return 'Type inconnu'
      }
    }
  },
  methods: {
    async chargerDonnees () {
      try {
        const response = await axios.get(`http://10.126.7.220:3000/historiqueCap/${this.dateDebut}/${this.dateFin}/${this.capteurId}`)
        const mesures = response.data.mesures
        this.mesures = mesures
        this.allMesures.push({ capteurId: this.capteurId, mesures })
        this.updateChart()
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error)
      }
    },
    ajouterCapteur () {
      this.chargerDonnees()
    },
    resetChart () {
      this.mesures = []
      this.allMesures = []
      if (this.myChart) {
        this.myChart.destroy()
      }
      this.myChart = null
    },
    formatDate (date) {
      return new Date(date).toLocaleString()
    },
    updateChart () {
      if (this.myChart) {
        this.myChart.destroy()
      }
      const datasets = this.allMesures.map(({ capteurId, mesures }, index) => {
        const data = mesures.map(mesure => mesure.payload)
        const color = index % 2 === 0 ? 'blue' : 'orange'
        return {
          label: this.getCapteurLabel(capteurId),
          data: data,
          borderColor: color,
          borderWidth: 1
        }
      })

      const labels = this.getAllLabels()
      const ctx = document.getElementById('myChart').getContext('2d')
      this.myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Graphique:'
            }
          }
        }
      })
    },
    getAllLabels () {
      const labelsSet = new Set()
      this.allMesures.forEach(({ mesures }) => {
        mesures.forEach(mesure => {
          labelsSet.add(this.formatDate(mesure.date))
        })
      })
      return Array.from(labelsSet).sort((a, b) => new Date(a) - new Date(b))
    },
    getCapteurLabel (capteurId) {
      switch (capteurId) {
        case '6495c384cc48a32f8ad0d3ca':
          return 'Salle témoin - luminosité'
        case '6495c354cc48a32f8ad0d3c9':
          return 'Salle équipée - luminosité'
        case '6495c3dccc48a32f8ad0d3cc':
          return 'Salle témoin - température'
        case '65f05a4c41ab4ce08585ed68':
          return 'Salle équipée - température'
        default:
          return 'Capteur inconnu'
      }
    },
    selectionnerCampagne (campagne) {
      this.campagneSelectionnee = campagne
    }
  }
}
</script>

<style>
.campagne-selection {
  text-align: center;
  margin-top: 3cm; /* Abaisse le titre de 3 cm */
}

.container {
  display: flex;
}

.table-container {
  flex: 1;
  margin-left: 0.50cm;
}

.chart-container {
  flex: 1;
  margin-top: 6cm; /* Abaisse le graphique de 3 cm */
  margin-left: -22cm; /* Décale le graphique vers la gauche de 1 cm */
  margin-right: 0.50cm; /* Ajoute 1 cm de marge à droite du graphique */
}

.chart-title {
  margin-top: 0;
  font-size: large; /* Taille de police plus petite */
  color: black; /* Couleur du texte plus foncée */
  font-weight: normal; /* Police moins gras */
}
</style>
