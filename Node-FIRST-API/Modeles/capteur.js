const mongoose = require('mongoose');
const { Schema } = mongoose;

const capteurSchema = new mongoose.Schema({
    idCapteur: {
        type: Number,
        unique: true,  // Assurez-vous que les idCapteur sont uniques
    },
    nom: String,
    type: String,
    unite: String,
    mesures: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mesure'
    }]
});


const Capteur = mongoose.model('Capteur', capteurSchema);

module.exports = Capteur;