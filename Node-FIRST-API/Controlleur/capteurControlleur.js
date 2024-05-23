const Capteur = require('../Modeles/capteur');

// Ajout d’un capteur dans la Collection capteur à partir des données envoyée par Ruben au format JSON.
exports.create = async (capteurData) => {
    const capteur = new Capteur(capteurData);
    await capteur.save();
    return capteur;
};

// Récupérer un capteur par ID
exports.read = async (capteurId) => {
    const capteur = await Capteur.findById(capteurId);
    return capteur;
}

// Récupérer tous les capteurs
exports.readAll = async () => {
    const capteurs = await Capteur.find().select('idCapteur nom type unite');
    return capteurs;
}

exports.readAllFull = async () => {
    const capteursFull = await Capteur.find().populate('mesures');
    return capteursFull;
};

exports.findIdByCapteurId = async (idCapteur) => {
    const capteur = await Capteur.findOne({ idCapteur: idCapteur }).select('idCapteur nom type unite');
    if (!capteur) {
        throw new Error('Aucun capteur trouvé avec cet idCapteur');
    }
    return capteur;
};

// Mettre à jour un capteur par ID
exports.update = async (capteurId, capteurData) => {
    const capteur = await Capteur.findByIdAndUpdate(capteurId, capteurData,{ new: true });
    return capteur;
};

//exports.addMesure = await Capteur.

// Supprimer un capteur par ID
exports.delete = async (capteurId) => {
    await Capteur.findByIdAndRemove(capteurId);
};