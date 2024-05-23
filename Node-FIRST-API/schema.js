var mongoose = require('mongoose');

class BDDSchema {
  constructor() {

    /*this.temperatureSchema = new mongoose.Schema({
      date: Date,
      temperature: Number
    });

    this.luminositeSchema = new mongoose.Schema({
      date: Date,
      luminosite: Number
    });

    this.capteurSchema = new mongoose.Schema({
      ident: String,
      type: String,
      batterie: [{
        date: Date,
        valeur: String
      }],
      RSSI: [{
        date: Date,
        valeur: String
      }],
    });*/

    this.mesuresSchema = new mongoose.Schema({
      te: String,
      payload: Number,
      unite: String,
      date: Date,
      id_capteur_MAC: String,
      id_capteur: String,
    });

    this.entreprisesSchema = new mongoose.Schema({
      nom: String,
      adresse: {
        numero: String,
        rue: String,
        complement: String,
        codePostal: String,
        ville: String,
      },
      responsable: {
        nom: String,
        prenom: String,
        tel: String,
        mail: String,
      },
    });

    this.batimentSchema = new mongoose.Schema({
      nom: String,
      adresse: {
        numero: String,
        rue: String,
        complement: String,
        codePostal: String,
        ville: String,
      },
      salle: [{
        idSalle: String,
        nom: String,
        surnom: String,
        equipee_immo: {
          type: Boolean,
          default: false
        },
        pos_GPS: {
          type: {
            type: String,
            enum: ['Point'],
            required: true
          },
          coordonnees: {
            type: [Number],
            required: true
          }
        },
        capteur: {
          date_installation: String,
          date_retrait: String,
          id_capteur: String,
        },
      }],
      id_entreprise: mongoose.Schema.ObjectId,
    });
  }
}

class ajouterCapteur {
  constructor(){
  const capteurSchema = new mongoose.Schema({
    idMAC: String,
    type: String,
    batterie: [{
      date: Date,
      valeur: String
    }],
    RSSI: [{
      date: Date,
      valeur: String
    }],
  });
  
  capteurSchema.methods.findSimilarType = function findSimilarType (find) {
    return this.model('Capteur').find({ type: this.type }, find);
  };
  var capteur = mongoose.model('Capteur', capteurSchema);
  var temperature = new capteur({ident: 'ident0',type: 'type0'});
  var luminosite = new capteur({ident: 'ident1',type: 'type1'});
  var fluxsolaire = new capteur({ident: 'ident2',type: 'type2'});

  temperature.findSimilarType(function (err, temperature) {
    if (err) return type
    temperatures.forEach(temperature);
  })
  luminosite.findSimilarType(function (err, luminosite) {
    if (err) return type
    luminosites.forEach(luminosite);
  })
  fluxsolaire.findSimilarType(function (err, fluxsolaire) {
    if (err) return type
    fluxsolaires.forEach(fluxsolaire);
  })
  capteurSchema.statics.search = function search (ident, find) {
    return this.where('ident', new RegExp(ident, 'i')).exec(find);
  }
  capteur.search('ident0', function (err) {
    if (err) return ident
  })
  capteur.search('ident1', function (err) {
    if (err) return ident
  })
  capteur.search('ident2', function (err) {
    if (err) return ident
  })
  } 
}

module.exports.ajouterCapteur = ajouterCapteur;