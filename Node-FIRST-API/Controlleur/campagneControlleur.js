const Campagne = require('../Modeles/campagne');

// Ajout d’un campagne dans la Collection campagne à partir des données envoyée par Ruben au format JSON.
exports.create = async (campagneDate) => {
    const campagne = new Campagne(campagneDate);
    await campagne.save();
    return campagne;
};

// Récupérer un campagne par ID
exports.read = async (campagneId) => {
    const campagne = await Campagne.findById(campagneId);
    return campagne;
};

// Récupérer tous les campagnes
exports.readAll = async () => {
    const campagnes = await Campagne.find().populate('entreprise');
    return campagnes;
};

exports.readAllFull = async () => {
    const campagnesFull = await Campagne.find()
    .populate('entreprise')
    .populate({
        path: 'zones', 
        populate: {
            path: 'capteurs',
            populate: {
                path: 'mesures',
                model: 'Mesure'
            }
            
        }
    });
    return campagnesFull;
};


exports.addZone = async (idCampagne, idZone) => {
    const campagne = await Campagne.findByIdAndUpdate({ _id: idCampagne },
        { $push: { zones: idZone } });
    return campagne;
}

// Mettre à jour un campagne par ID
exports.update = async (idCampagne, camapgneData) => {
    const campagne = await Campagne.findByIdAndUpdate(idCampagne, campagneData, { new: true });
    return campagne;
};

// Supprimer une campagne par ID
exports.delete = async (idCampagne) => {
    await Campagne.findByIdAndRemove(idCampagne);
};