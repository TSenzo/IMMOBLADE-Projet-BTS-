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
const entrepriseControlleur = require('./Controlleur/entrepriseControlleur');
const zoneControlleur = require('./Controlleur/zoneControlleur');
const campagneControlleur = require('./Controlleur/campagneControlleur');


//const uri = "mongodb://10.10.45.20:27017/FluxSolaire";
//const uri = "mongodb://10.10.33.120:27017/FluxSolaire";
const uri = "mongodb://127.0.0.1:27017/FluxSolaire";

// Utilisation de cors et de body parser
app.use(cors());
app.use(bodyParser.json());

// Chargement de la partie static du site
app.use(express.static("../public"))

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(__dirname + "index.html"))

let monDispatcher = new Dispatcher();
//partie Lusia

// Connexion à la base de donnée FluxSolaire en localhost
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connexion à MongoDB établie...'))
  .catch(erreur => console.error('Impossible de se connecter à MongoDB...', erreur));

//Pour Ruben (Ajouter un capteur)
app.post('/capteurs', async (req, res) => {
  res.send('OK');
  const capteurs = await capteurControlleur.create(req.body);
  console.log('capteur enregistré: ' + capteurs);
});

//Resuête pour enregistrer les nouvelles mesures en provenance du collecteur
app.post('/mesures', async (req, res) => {
  const mesures = await mesureControlleur.create(req.body);
  console.log('mesure enregistrée');
  monDispatcher.addFact(req.body);
  res.send('OK');
});

//Enregistrement d"une nouvelle entreprise
app.post('/entreprises', async (req, res) => {
  res.send('OK');
  const entreprises = await entrepriseControlleur.create(req.body);
  console.log('entreprise enregistrée: ' + entreprises);
});

//Ajout d'un nouvelle campagne
app.post('/campagnes', async (req, res) => {
  res.send('OK');
  const campagnes = await campagneControlleur.create(req.body);
  console.log('campagne enregistrée: ' + campagnes);
});

//Ajout d'une nouvelle zone
app.post('/zones', async (req, res) => {
  res.send('OK');
  const zones = await zoneControlleur.create(req.body);
  console.log('zone enregistrée: ' + zones);
});

//Association d'un capteur à un zone dont on connait l'id
app.post('/zones/addSensor', async (req, res) => {
  res.send('OK');
  const zones = await zoneControlleur.addSensor(req.body.idZone, req.body.idCapteur);
  console.log('zone enregistrée: ' + zones);
});

//Pour celui qui doit afficher tous les informations des capteurs
app.get('/capteurs', async (req, res) => {
  const capteurs = await capteurControlleur.readAll();
  res.send(capteurs);
});

//Pour afficher les informations des capteurs et les mesures qu'ils ont effectuées
app.get('/capteursFull', async (req, res) => {
  const capteurs = await capteurControlleur.readAllFull();
  res.send(capteurs);
});

//Pour afficher le capteur dont on connait l'_id (mongodb)
//Exemple de requete : http://localhost/capteur/647cfadd402528047e73299c
app.get('/capteur/:id', async (req, res) => {
  var id = String(req.params.id);
  const capteur = await capteurControlleur.read(id);
  res.send(capteur);
});

//Pour celui qui doit afficher tous les informations des zones
app.get('/zones', async (req, res) => {
  const zones = await zoneControlleur.readAll()
    .then(zones => res.send(zones))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  //res.send(zones);
});

//Pour afficher les informations des zonees, de leurs capteurs et les mesures qu'ils ont realisées
app.get('/zonesFull', async (req, res) => {
  const zones = await zoneControlleur.readAllFull()
    .then(zones => res.send(zones))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  //res.send(zones);
});

//Pour afficher la zone dont on connait l'_id (mongodb)
//Exemple de requete : http://localhost/zone/647cfadd402528047e73299c
app.get('/zone/:id', async (req, res) => {
  var id = String(req.params.id);
  const zone = await zoneControlleur.read(id);
  res.send(zone);
});

// Gestion des campagnes
//Pour celui qui doit afficher tous les informations des zones
app.get('/campagnes', async (req, res) => {
  const campagnes = await campagneControlleur.readAll()
    .then(campagnes => res.send(campagnes))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  //res.send(zones);
});

//Pour afficher les informations des zonees, de leurs capteurs et les mesures qu'ils ont realisé
app.get('/campagnesFull', async (req, res) => {
  const campagnes = await campagneControlleur.readAllFull()
    .then(campagnes => res.send(campagnes))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  //res.send(zones);
});

//Pour afficher la zone dont on connait l'_id (mongodb)
//Exemple de requete : http://localhost/zone/647cfadd402528047e73299c
app.get('/campagne/:id', async (req, res) => {
  var id = String(req.params.id);
  const campagne = await campagneControlleur.read(id);
  res.send(campagne);
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

//Pour celui qui doit afficher tous les entreprises
app.get('/entreprises', async (req, res) => {
  const entreprises = await entrepriseControlleur.readAll();
  res.send(entreprises);
});

//Pour afficher le entreprise dont on connait l'_id (mongodb)
//Exemple de requete : http://localhost/entreprise/64807784016b5503074bc0f8
app.get('/entreprise/:id', async (req, res) => {
  var id = String(req.params.id);
  const entreprise = await entrepriseControlleur.read(id);
  res.send(entreprise);
});



//mise à jour
// app.put('/capteurs/:id', async (req, res) => {
//   const capteur = await capteurController.update(req.params.id,
//     req.body);
//   res.send(capteur);
// });

//Suppression
// app.delete('/capteurs/:id', async (req, res) => {
//   await capteurController.delete(req.params.id);
//   res.send({ message: 'Capteur supprimé avec succès' });
// });


//fin partie Lusia

// Test unitaire de la route get Mathis Senard

//SSE

// --------------------- Fonctions -------------------------

// ---------------------------Forme Objet--------------------------------

app.get('/events', (req, res) => {
  monDispatcher.eventsHandler(req, res);
});

app.listen(port, () => console.log(`Notre application Node est démarée sur : http://localhost:${port}/ `))

app.disable('etag');
