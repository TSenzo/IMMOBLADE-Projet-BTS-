<template>
  <div>
    <!-- Campaign Selection Section -->
    <div class="campagne-selection">
      <h2>Choisissez une campagne :</h2>
      <button @click="selectionnerCampagne('Campagne 1')">Campagne 1</button>
      <button @click="selectionnerCampagne('Campagne 2')">Campagne 2</button>
      <button @click="selectionnerCampagne('Campagne 3')">Campagne 3</button>
      <button @click="selectionnerCampagne('Campagne 4')">Campagne 4</button>
      <button @click="selectionnerCampagne('Campagne 5')">Campagne 5</button>
      <!-- Add as many buttons as necessary for each campaign -->
    </div>

    <!-- Render the rest of the page only if the first campaign is selected -->
    <div v-if="campagneSelectionnee === 'Campagne 1'">
      <!-- Existing Component Structure -->
      <div class="alertes-container">
        <table class="alertes-table">
          <thead>
            <tr>
              <th>Alerte</th>
              <th>Jour</th>
              <th>Heure</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="alerte in alertes" :key="alerte.heure" :class="{ 'even-row': $index % 2 === 0, 'odd-row': $index % 2 !== 0 }">
              <td>{{ alerte.message }}</td>
              <td>{{ alerte.jour }}</td>
              <td>{{ alerte.heure }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['alertes'])
  },
  data () {
    return {
      campagneSelectionnee: null // Variable to store the selected campaign
    }
  },
  methods: {
    // Function to select a campaign
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

/* Styles for the rest of the page can remain the same */
.alertes-container {
  margin: 5cm auto 0; /* 5cm from top */
  max-width: 800px;
}

.alertes-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.alertes-table th,
.alertes-table td {
  border: 1px solid #ddd;
  padding: 12px;
}

.alertes-table th {
  background-color: #f2f2f2;
  text-align: left;
  font-weight: bold;
}

.alertes-table tbody .even-row {
  background-color: #f9f9f9;
}

.alertes-table tbody .odd-row {
  background-color: #ffffff;
}

.alertes-table tbody tr:hover {
  background-color: #f5f5f5;
}
</style>
