const Zone = require('../Modeles/zone')
//const Capteur = require('../Modeles/capteur')
//const Mesure = require('../Modeles/mesure')

// Ajout d’une zone dans la Collection zone à partir des donnéesenvoyée par Ruben au format JSON. Il faut
exports.create = async (zoneData) => {
    const zone = new Zone(zoneData);
    await zone.save();
    return zone;
};

// Récupérer un zone par ID
exports.read = async (zoneId) => {
    const zone = await Zone.findById(zoneId);
    return zone;
};

// Récupérer tous les zones
exports.readAll = async () => {
    const zones = await Zone.find().populate('capteurs');
    return zones;
};

exports.readAllFull = async () => {
    const zonesFull = await Zone.find().populate({
        path: 'capteurs',
        populate: {
            path: 'mesures',
            model: 'Mesure'
        }
    });
    return zonesFull;
    //return zonesFull;
};


exports.addSensor = async (zoneId, idCapteur) => {
    const zone = await Zone.findByIdAndUpdate({ _id: zoneId },
        { $push: { capteurs: idCapteur } });
    return zone;
}

// Mettre à jour un zone par ID
exports.update = async (zoneId, zoneData) => {
    const zone = await Zone.findByIdAndUpdate(zoneId, zoneData, { new: true });
    return zone;
};

// Supprimer un zone par ID
exports.delete = async (zoneId) => {
    await Zone.findByIdAndRemove(zoneId);
};