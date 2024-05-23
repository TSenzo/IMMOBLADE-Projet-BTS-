const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000
const { MongoClient } = require("mongodb");
const { Dispatcher } = require("./dispatcher");
//const { ajouterCapteur } = require("./schema");
const capteurControlleur = require('./Controlleur/capteurControlleur');
const mesureControlleur = require('./Controlleur/mesureControlleur');

const uri = "mongodb://127.0.0.1:27017/FluxSolaire";

app.use(cors());
app.use(bodyParser.json());

app.use(express.static("../public"))

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(__dirname + "index.html"))

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB établie...'))
    .catch(erreur => console.error('Impossible de se connecter à MongoDB...', erreur));

app.post('/mesures', async (req, res) => {
    res.send('OK');
    const mesures = await mesureControlleur.create(req.body);
    console.log('mesure enregistrée');
});

app.post('/collectMesure', async (req, res) => {
    res.send('OK');
    const newmesure = req.body.mesure;
    console.log('valeur mesure : ' + newmesure);
});

app.get('/mesures', async (req, res) => {
    const mesures = await mesureControlleur.readAll();
    res.send(mesures);
});

app.get('/mesure/:id', async (req, res) => {
    var id = String(req.params.id);
    const mesure = await mesureControlleur.read(id);
    res.send(mesure);
})

app.listen(port, () => console.log(`Notre application Node est démarée sur : http://localhost:${port}/ `));
