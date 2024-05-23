const mongoose = require('mongoose');

const mesuresSchema = new mongoose.Schema({
    idCapteur:Number,
    type: String,
    payload: Number,
    batterie:Number,
    rssi:Number,
    date: Date
});

const Mesure = mongoose.model('Mesure', mesuresSchema);

module.exports = Mesure;