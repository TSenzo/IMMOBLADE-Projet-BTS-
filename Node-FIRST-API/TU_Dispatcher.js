const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000
const { Dispatcher } = require("./dispatcher");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let monDispatcher = new Dispatcher();

app.post('/mesures', async (req, res) => {
    // const mesures = await mesureControlleur.create(req.body);
    // console.log('mesure enregistrée');
    monDispatcher.addFact(req.body);
    res.send('OK');
});

app.get('/events', (req, res) => {
    monDispatcher.eventsHandler(req, res);
});

app.listen(port, () => console.log(`Notre application Node est démarée sur : http://localhost:${port}/ `))

app.disable('etag');