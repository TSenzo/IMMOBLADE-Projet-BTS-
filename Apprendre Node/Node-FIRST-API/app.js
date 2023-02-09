const express = require('express')
const {success} = require('./helper.js')
const app= express()
let datas = require('./mock-data');
const port = 3000

app.get('/', (req,res)=> res.send('Home Page'))

app.get('/api/data', (req, res) => {
    const leMessage = `Il y a ${datas.length} mesures au total sont bien trouvées`
    res.json(success(leMessage, datas))
})

app.get('/api/data/:id', (req,res)=> {
    const id = parseInt(req.params.id)
    const data = datas.find(data => data.id === id)
    const message = "Les données ont bien été trouvées"
    res.json(success(message, data))
})

app.listen(port, ()=> console.log(`Notre application Node est démarée sur : http://localhost:${port}/ `))

