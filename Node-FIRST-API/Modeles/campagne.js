const mongoose = require('mongoose');
const { Schema } = mongoose;


const campagneSchema = new mongoose.Schema({
    dateDebut: Date,
    dateFin: Date,
    entreprise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entreprise'
    },
    zones: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zone'
    }]
});


const Campagne = mongoose.model('Campagne', campagneSchema);

module.exports = Campagne;
