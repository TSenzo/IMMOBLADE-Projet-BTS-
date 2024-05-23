<template>
  <div class="tableaux-cote-a-cote">
    <!-- Utilisez v-for pour répéter le tableau trois fois -->
    <div v-for="index in 3" :key="index" class="home tableau">
      <div class="image-container"></div>
      <!-- Utilisez une variable dynamique pour le titre de la campagne -->
      <h2 class="title">Campagne {{ index }}</h2>
      <div class="container-block">
        <div class="hautgauche">
          <div class="text">
            <span class="adresse">Lycée général et technologique international Victor Hugo</span>
          </div>
          <div>
            <h3>Données utiles :</h3>
            <table>
              <thead>
                <tr>
                  <th>Salle</th>
                  <th>Température</th>
                  <th>Luminosité</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Témoin</td>
                  <td>{{ temperatureTemoin }}</td>
                  <td>{{ luminositeTemoin }}</td>
                </tr>
                <tr>
                  <td>Équipée</td>
                  <td>{{ temperatureEquipe }}</td>
                  <td>{{ luminositeEquipe }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3>État de fonctionnement :</h3>
            <table>
              <thead>
                <tr>
                  <th>Salle</th>
                  <th>RSSI</th>
                  <th>Batterie</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Témoin</td>
                  <td :style="{ backgroundColor: rssiTemoin !== null && rssiTemoin < -102 ? 'red' : 'white' }">{{ rssiTemoin }}</td>
                  <td :style="{ backgroundColor: batterieTemoin !== null && batterieTemoin < 20 ? 'red' : 'white' }">{{ batterieTemoin }}</td>
                </tr>
                <tr>
                  <td>Équipée</td>
                  <td :style="{ backgroundColor: rssiEquipe !== null && rssiEquipe < -102 ? 'red' : 'white' }">{{ rssiEquipe }}</td>
                  <td :style="{ backgroundColor: batterieEquipe !== null && batterieEquipe < 20 ? 'red' : 'white' }">{{ batterieEquipe }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="legend">Légende : Les valeurs de RSSI et de Batterie sont surlignées en rouge si elles sont en dessous des seuils définis.</p>
        </div>
      </div>
      <footer class="pied-page">
        <p>Copyright © 2023 IMMOBLADE</p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      latestEvent: {},
      latestEvents: [],
      maxEventsToShow: 4,
      progress: 0,
      temperatureTemoin: null,
      luminositeTemoin: null,
      rssiTemoin: null,
      batterieTemoin: null,
      temperatureEquipe: null,
      luminositeEquipe: null,
      rssiEquipe: null,
      batterieEquipe: null
    }
  },
  methods: {
    startProgress () {
      setInterval(() => {
        if (this.progress < 100) {
          this.progress++
        }
      }, 100)
    },
    addEvent (event) {
      console.log('Données reçues:', event)
      if (event.type === 84) {
        if (event.idCapteur === 15645776) {
          this.temperatureTemoin = event.payload
        } else if (event.idCapteur === 10382588) {
          this.temperatureEquipe = event.payload
        }
      } else if (event.type === 76) {
        if (event.idCapteur === 12929984) {
          this.luminositeTemoin = event.payload
        } else if (event.idCapteur === 9227036) {
          this.luminositeEquipe = event.payload
        }
      }

      if (event.idCapteur === 15645776 || event.idCapteur === 12929984) {
        this.rssiTemoin = event.rssi
        this.batterieTemoin = event.batterie
      } else if (event.idCapteur === 10382588 || event.idCapteur === 9227036) {
        this.rssiEquipe = event.rssi
        this.batterieEquipe = event.batterie
      }

      this.latestEvent = event
      this.latestEvents.unshift(event)
      if (this.latestEvents.length > this.maxEventsToShow) {
        this.latestEvents.pop()
      }
    }
  },
  mounted () {
    const eventSource = new EventSource('http://10.126.7.220:3000/events')
    eventSource.onmessage = event => {
      const eventData = JSON.parse(event.data)
      this.addEvent(eventData)
    }
    eventSource.onerror = error => {
      console.error('EventSource failed:', error)
    }
    this.startProgress()
  }
}
</script>

<style>
.tableaux-cote-a-cote {
  display: flex;
}

.tableau {
  flex: 1; /* Pour que chaque tableau occupe la même largeur */
  margin-right: 10px; /* Marge entre les tableaux */
}

/* Pour éviter que le dernier tableau ait une marge à droite */
.tableau:last-child {
  margin-right: 0;
}

td {
  padding: 5px;
}

.legend {
  font-style: italic;
  color: #666;
}
</style>
