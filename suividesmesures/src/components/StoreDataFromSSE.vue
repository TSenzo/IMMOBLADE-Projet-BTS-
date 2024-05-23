<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'StoreDataFromSSE',
  methods: {
    ...mapActions([
      'shiftTableauTemperatures',
      'shiftTableauLuminosites',
      'shiftTableauFluxSolaires',
      'addTableauFluxSolaires',
      'addTableauLuminosites',
      'addTableauTemperatures',
      'addTemoinTemperatures',
      'addEquipeTemperatures',
      'addTemoinLuminosite',
      'addEquipeLuminosite',
      'addTemoinFluxSolaire',
      'addEquipeFluxSolaire',
      'addDateTemp',
      'addDateLum',
      'setPopUpSeuil',
      'setShowPopup',
      'setPopupMessage',
      'ajouterAlerte'
    ]),
    checkExceeded (type, value) {
      //  let message = ''
      if (isNaN(value)) {
        console.error('La valeur n\'est pas un nombre valide:', value)
        return
      }
      // Réinitialiser le message de la popup si le type de capteur a changé
      if (this.popupType !== type) {
        this.popupMessage = ''
        this.popupType = type
      }
      if (type === 'luminosite' && (parseFloat(value) > 1400)) {
      //  message = 'Attention : Une des valeurs dépasse les seuils de luminosité (±2000 lux) dans une des salles !'
        return true
      }
      if (type === 'temperature' && (parseFloat(value) > 32)) {
      //  message += '\nAttention : Une des valeurs dépasse les seuils de température (±28°C) dans une des salles !'
        return true
      }
      // if (message !== '') {
      // this.popupMessage = message
      // this.setShowPopup(true)
      // this.popupTimeout = setTimeout(() => {
      // this.setShowPopup(false)
      // }, 3000)
      // }else {
      // this.setShowPopup(false)
      // clearTimeout(this.popupTimeout)
      // }
      return false
    }
  },
  computed: {
    ...mapGetters([
      'lengthTableauLuminosites',
      'lengthTableauTemperatures',
      'TableauTemperatures',
      'TableauLuminosites',
      'TableauFluxSolaires',
      'TemoinTemperatures',
      'popUpSeuil',
      'showPopup',
      'popupMessage'
    ])
  },
  mounted () {
    const self = this
    const sse = new EventSource('http://10.126.7.220:3000/events')
    let lastTemoinTemp
    let lastEquipeTemp
    let lastTemoinLum
    let lastEquipeLum
    //  let luminosityReceived = false
    //  let temperatureReceived = false

    sse.addEventListener('message', function (e) {
      const json = JSON.parse(e.data)
      if (json.idCapteur === 15645776 || json.idCapteur === 12929984) {
        json.idCapteur = 'temoin'
      }
      if (json.idCapteur === 9227036 || json.idCapteur === 10382588) {
        json.idCapteur = 'equipe'
      }
      if (json.type === 84) {
        json.date = new Date(json.date).toLocaleString()
        json.date = json.date.substring(0, 22)
        self.addDateTemp(json.date)
        self.addTableauTemperatures(json)
        if (self.lengthTableauTemperatures > 10) {
          self.shiftTableauTemperatures()
        }
        if (self.checkExceeded('temperature', json.payload)) {
          const alerte = {
            message: 'Attention : La température dépasse le seuil !',
            jour: new Date().toLocaleDateString(), // Ajout du jour
            heure: new Date().toLocaleTimeString()
          }
          self.ajouterAlerte(alerte)
        }
        if (self.checkExceeded('temperature', json.payload)) {
          alert('Attention : La temperature dépasse le seuil !')
          self.setShowPopup(true)
        } else {
          self.setShowPopup(false)
        }
        if (json.idCapteur === 'temoin') {
          self.addTemoinTemperatures(json.payload)
          self.addEquipeTemperatures(lastEquipeTemp)
          lastTemoinTemp = json.payload
        //    temperatureReceived = true
        }
        if (json.idCapteur === 'equipe') {
          self.addEquipeTemperatures(json.payload)
          self.addTemoinTemperatures(lastTemoinTemp)
          lastEquipeTemp = json.payload
        //  temperatureReceived = true
        }
      }

      if (json.type === 76) {
        json.date = new Date(json.date).toLocaleString()
        json.date = json.date.substring(0, 22)
        self.addDateLum(json.date)
        self.addTableauLuminosites(json)
        if (self.lengthTableauLuminosites > 10) {
          self.shiftTableauLuminosites()
        }
        if (self.checkExceeded('luminosite', json.payload)) {
          const alerte = {
            message: 'Attention : La luminosité dépasse le seuil !',
            jour: new Date().toLocaleDateString(), // Ajout du jour
            heure: new Date().toLocaleTimeString() // Ajouter l'heure de l'alerte
          }
          self.ajouterAlerte(alerte) // Appel à l'action Vuex pour ajouter l'alerte
        }
        if (self.checkExceeded('luminosite', json.payload)) {
          console.log('Depassement')
          alert('Attention : La luminosité dépasse le seuil !')
          self.setShowPopup(true)
        } else {
          console.log('PasDepassement')
          self.setShowPopup(false)
        }
        if (json.idCapteur === 'temoin') {
          self.addTemoinLuminosite(json.payload)
          self.addEquipeLuminosite(lastEquipeLum)
          lastTemoinLum = json.payload
        //  luminosityReceived = true
        }
        if (json.idCapteur === 'equipe') {
          self.addEquipeLuminosite(json.payload)
          self.addTemoinLuminosite(lastTemoinLum)
          lastEquipeLum = json.payload
        //  luminosityReceived = true
        }
      }

      if (json.type === 83) {
        self.addTableauTemperatures(json)
        if (self.lengthTableauTemperatures >= 10) {
          self.shiftTableauFluxSolaires()
        }
        if (json.idCapteur === 'temoin') {
          self.addTemoinFluxSolaire(json.payload)
        }
        if (json.idCapteur === 'equipe') {
          self.addEquipeFluxSolaire(json.payload)
        }
      }

      // Si aucune valeur n'a été reçue pour la luminosité et la température, affichez le message 'aucune valeur n'a été reçue'
      //      if (temperatureReceived === false && luminosityReceived === false) {
      //        self.setPopupMessage('aucune valeur n'a été reçue')
      //        self.setShowPopup(true)
      //      } else {
      //        self.setShowPopup(true)
      //      }
    })
  }

}
</script>
