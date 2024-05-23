const Entreprise = require('../Modeles/entreprise');

// Ajout d’un entreprise dans la Collection entreprise à partir des données envoyée par Ruben au format JSON. Il faut
exports.create = async (entrepriseData) => {
    const entreprise = new Entreprise(entrepriseData);
    await entreprise.save();
    return entreprise;
};

// Récupérer un entreprise par ID
exports.read = async (entrepriseId) => {
    const entreprise = await Entreprise.findById(entrepriseId);
    return entreprise;
};

// Récupérer tous les entreprises
exports.readAll = async () => {
    const entreprises = await Entreprise.find();
    return entreprises;
};

// Mettre à jour un entreprise par ID
exports.update = async (entrepriseId, entrepriseData) => {
    const entreprise = await Entreprise.findByIdAndUpdate(entrepriseId, entrepriseData, { new: true });
    return entreprise;
};

// Supprimer un entreprise par ID
exports.delete = async (entrepriseId) => {
    await Entreprise.findByIdAndRemove(entrepriseId);
};