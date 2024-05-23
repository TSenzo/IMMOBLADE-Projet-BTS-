const Mesure = require('../Modeles/mesure')
const Capteur = require('../Modeles/capteur')
const CapteurControl = require('./capteurControlleur')

// Ajout d’une mesure dans la Collection mesure à partir des donnéesenvoyée par Ruben au format JSON. Il faut
exports.create = async (mesureData) => {
    const mesure = new Mesure(mesureData);
    await mesure.save();
    const _idCapteur = await CapteurControl.findIdByCapteurId(mesure.idCapteur);
    console.log("id capteur retrouvé : "+_idCapteur+" / id de la mesure : "+mesure._id);
    await Capteur.findByIdAndUpdate({"_id":_idCapteur._id},{ $push: { mesures: mesure._id } });
    return mesure;
};

// Récupérer un mesure par ID
exports.read = async (mesureId) => {
    const mesure = await Mesure.findById(mesureId);
    return mesure;
};

// Récupérer tous les mesures
exports.readAll = async () => {
    const mesures = await Mesure.find({});
    return mesures;
};

// Mettre à jour un mesure par ID
exports.update = async (mesureId, mesureData) => {
    const mesure = await Mesure.findByIdAndUpdate(mesureId, mesureData,{ new: true });
    return mesure;
};

// Supprimer un mesure par ID
exports.delete = async (mesureId) => {
    await Mesure.findByIdAndRemove(mesureId);
};
