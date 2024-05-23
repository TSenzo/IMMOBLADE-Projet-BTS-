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

function formatDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getTimezoneOffset() > 0 ? '-' : '+'}${Math.abs(date.getTimezoneOffset() / 60).toString().padStart(2, '0')}${(date.getTimezoneOffset() % 60).toString().padStart(2, '0')}`;
    return formattedDate;
}

app.get('/events', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    function generateAndSendEvent(type, idCapteur, payload) {
        const date = new Date();
        const maDate = formatDate(date);
        const rssi = getRandomIntInclusive(-100, 0); // Ajout du rssi avec une valeur aléatoire entre -100 et 0
        const batterie = getRandomIntInclusive(0, 100); // Ajout du niveau de batterie avec une valeur aléatoire entre 0 et 100
        const eventData = { batterie, date: maDate, idCapteur, payload, rssi, type }; // Changement de l'ordre des propriétés
        res.write(`data: ${JSON.stringify(eventData)}\n\n`);
    }

    function sendEventsOneByOne() {
        generateAndSendEvent(76, '10000', getRandomIntInclusive(800, 1500));
        setTimeout(() => {
            generateAndSendEvent(84, '80000', getRandomIntInclusive(26, 33));
            setTimeout(() => {
                generateAndSendEvent(76, '11111', getRandomIntInclusive(800, 1500));
                setTimeout(() => {
                    generateAndSendEvent(84, '88888', getRandomIntInclusive(26, 33));
                    // Réappeler cette fonction pour envoyer l'événement suivant après dix secondes
                    setTimeout(sendEventsOneByOne, 10000);
                }, 1000);
            }, 1000);
        }, 1000);
    }

    // Commencer l'envoi des événements un par un
    sendEventsOneByOne();
});

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}/ `));

