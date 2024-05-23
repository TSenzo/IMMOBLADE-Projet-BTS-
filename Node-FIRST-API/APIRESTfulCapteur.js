const express = require('express');
const mongoose = require('mongoose');
const capteurController = require('./capteurControlleur');
const app = express();
app.use(express.json());

//nom de la BDD à vérfier...
mongoose.connect('mongodb://localhost/FluxSolaire', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
});

//Pour Ruben (Ajouter un capteur)
app.post('/capteurs', async (req, res) => {
    const capteur = await capteurController.create(req.body);
    res.send(capteur);
});

// Pour retrouver un capteur par son identifiant (_id créé par mongoose)
app.get('/capteurs/:id', async (req, res) => {
    const capteur = await capteurController.read(req.params.id);
    res.send(capteur);
});

//Pour celui qui doit afficher tous les capteurs
app.get('/capteurs', async (req, res) => {
    const capteurs = await capteurController.readAll();
    res.send(capteurs);
});

//mise à jour
app.put('/capteurs/:id', async (req, res) => {
    const capteur = await capteurController.update(req.params.id,req.body);
    res.send(capteur);
});

//Suppression
app.delete('/capteurs/:id', async (req, res) => {
    await capteurController.delete(req.params.id);
    res.send({ message: 'Capteur supprimé avec succès' });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`);
});