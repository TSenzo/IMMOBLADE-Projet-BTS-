const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000
const { MongoClient } = require("mongodb");
const { Dispatcher } = require("./dispatcher");
const entrepriseControlleur = require('./Controlleur/entrepriseControlleur');

const uri = "mongodb://127.0.0.1:27017/FluxSolaire";
//const uri = "mongodb://127.0.0.1:27017/TU_FluxSolaire";

// Utilisation de cors et de body parser
app.use(cors());
app.use(bodyParser.json());

// Chargement de la partie static du site
app.use(express.static("../public"))

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(__dirname + "index.html"))

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connexion à MongoDB établie...'))
  .catch(erreur => console.error('Impossible de se connecter à MongoDB...', erreur));

app.post('/entreprises', async (req, res) => {
  const entreprises = await entrepriseControlleur.create(req.body);
  console.log('entreprise enregistrer');
  res.send(entreprises);
});

app.get('/entreprises', async (req, res) => {
  const entreprises = await entrepriseControlleur.readAll();
  res.send(entreprises);
});

app.listen(port, () => console.log(`Notre application Node est démarée sur : http://localhost:${port}/ `))
