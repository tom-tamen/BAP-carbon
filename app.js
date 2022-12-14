const cards = require('./card.json')
const events = require('./event.json')
const express = require('express')
const app = express()
const port = 3000


// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())
app.use(express.static(__dirname+'/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/front.js', (req, res) => {
    res.sendFile(__dirname + '/front.js')
})


app.get('/card/all', (req, res) => {
    res.send(cards)
})

app.get('/card/:ID', (req, res) => {
    res.send(cards[req.params.ID-1])
})

// app.get('/card/:userID/:ID', (req, res) => {
//     res.send(cards[req.params.userID.params.ID])
// })


app.get('/event/all', (req, res) => {
    res.send(events)
})

app.get('/event/:ID', (req, res) => {
    res.send(events[req.params.ID-1])
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

