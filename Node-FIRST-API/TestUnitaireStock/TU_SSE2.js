const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.get('/events', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    function generateAndSendEvent(type, idCapteur, payload) {
        const maDate = new Date().toUTCString();
        const eventData = { date: maDate, idCapteur, type, payload };
        res.write(`data: ${JSON.stringify(eventData)}\n\n`);
    }

    function sendEventsOneByOne() {
        generateAndSendEvent(76, 'temoin', getRandomIntInclusive(800, 1500));
        setTimeout(() => {
            generateAndSendEvent(84, 'equipe', getRandomIntInclusive(26, 33));
            setTimeout(() => {
                generateAndSendEvent(76, 'equipe', getRandomIntInclusive(800, 1500));
                setTimeout(() => {
                    generateAndSendEvent(84, 'temoin', getRandomIntInclusive(26, 33));
                    // Réappeler cette fonction pour envoyer l'événement suivant après dix seconde
                    setTimeout(sendEventsOneByOne, 10000);
                }, 1000);
            }, 1000);
        }, 1000);
    }

    // Commencer l'envoi des événements un par un
    sendEventsOneByOne();
});

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}/ `));
