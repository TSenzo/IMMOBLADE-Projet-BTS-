const mongoose = require('mongoose');

const entreprisesSchema = new mongoose.Schema({
    nom: String,
    adresse: {
      numero: String,
      rue: String,
      complement: String,
      codePostal: String,
      ville: String
    },
    responsable: {
      nom: String,
      prenom: String,
      tel: String,
      mail: String
    }
  });

  const Entreprise = mongoose.model('Entreprise', entreprisesSchema);

  module.exports = Entreprise;