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
      <div class="temp-page">
        <h2 class="title">Les données de "Lycée Victor Hugo"</h2>
        <div class="container-temp">
          <table id="tableau-temperature" :class="{ 'missing-data': TableauTemperatures.length === 0 }">
            <caption align="top">Températures</caption>
            <thead>
              <tr>
                <th>Date</th>
                <th>Salle Témoin Température</th>
                <th>Salle Équipée Température</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="TableauTemperatures.length === 0">
                <td colspan="3" class="missing-data-cell">
                  <div class="missing-data-animation"></div>
                </td>
              </tr>
              <tr v-for="item in TableauTemperatures" :key="item.id">
                <td>{{ item.date }}</td>
                <td v-if="item.idCapteur === 'temoin'">{{ item.payload }}°C</td>
                <td v-else>-</td>
                <td v-if="item.idCapteur === 'equipe'">{{ item.payload }}°C</td>
                <td v-else>-</td>
              </tr>
            </tbody>
          </table>
          <div class="container-canvas">
            <ChartTemperature />
          </div>
        </div>

        <div class="container-lum">
          <table id="tableau-luminosite" :class="{ 'missing-data': TableauLuminosites.length === 0 }">
            <caption align="top">Luminosité</caption>
            <thead>
              <tr>
                <th>Date</th>
                <th>Salle Témoin Luminosité</th>
                <th>Salle Équipée Luminosité</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="TableauLuminosites.length === 0">
                <td colspan="3" class="missing-data-cell">
                  <div class="missing-data-animation"></div>
                </td>
              </tr>
              <tr v-for="item in TableauLuminosites" :key="item.id">
                <td>{{ item.date }}</td>
                <td v-if="item.idCapteur === 'temoin'">{{ item.payload }} lux</td>
                <td v-else>-</td>
                <td v-if="item.idCapteur === 'equipe'">{{ item.payload }} lux</td>
                <td v-else>-</td>
              </tr>
            </tbody>
          </table>
          <div class="container-canvas">
            <ChartLuminosite />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChartTemperature from '@/components/ChartTemperature.vue'
import ChartLuminosite from '@/components/ChartLuminosite.vue'

export default {
  name: 'MesuresPage',
  components: {
    ChartTemperature,
    ChartLuminosite
  },
  data: () => ({
    campagneSelectionnee: null,
    popupTimeout: null
  }),
  computed: {
    ...mapGetters([
      'TableauTemperatures',
      'TableauLuminosites',
      'showPopup',
      'popupMessage'
    ])
  },
  methods: {
    selectionnerCampagne (campagne) {
      this.campagneSelectionnee = campagne
    }
  }
}
</script>

<style scoped>
/* Styles for campaign selection section */
.campagne-selection {
  text-align: center;
  margin-top: 3cm; /* 3cm from top */
}

/* Styles for the rest of the page */
.temp-page {
  display: flex;
  flex-direction: column;
}

caption {
  font-weight: bold;
  font-size: 25px;
}

/* CSS données */
.container-temp,
.container-lum {
  margin-top: 5em;
  display: flex;
  width: 100%;
  height: 40em;
  border: 2px black;
  position: relative;
  border-radius: 10px; /* Ajout des bordures arrondies */
  overflow: hidden; /* Pour masquer les coins des tableaux */
}

.container-canvas {
  width: 100%;
  height: 100%;
}

#tableau-temperature,
#tableau-luminosite {
  border-radius: 10px; /* Ajout des bordures arrondies */
  margin-left: 1cm; /* Ajout de la marge de 1cm */
}

/* Animation pour les tableaux sans données */
.missing-data {
  position: relative;
}

.missing-data-cell {
  text-align: center;
}

.missing-data-animation {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 4px solid rgba(75, 75, 75, 0.2);
  border-top: 4px solid #000000;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
