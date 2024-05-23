const mongoose = require('mongoose');
const { Schema } = mongoose;


const zoneSchema = new mongoose.Schema({
    batiment: String,
    etage: String,
    salle: String,
    surnom: String,
    equipee: Boolean,
    coordonneesGPS: {
        longitude: String,
        latitude: String
    },
    capteurs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Capteur'
    }]
});


const Zone = mongoose.model('Zone', zoneSchema);

module.exports = Zone;
