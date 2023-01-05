const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express(); 

const middleware = require('./middlewareMongo');
const data = require('./data');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
app.use(cors());


const getData = async function (req, res) {
    const payload = await middleware.getter()
    return res.send(payload)
}
const getOne = async function (req, res) {
    const prop = await middleware.onePropoGetter(parseInt(req.params.id))
    return res.send(prop) 
}

app.use(express.json())
// parses YES || NO propo vote, else, addendum post
app.post('/:id', async function(req, res) {
    if (req.body.vote === 'up') {
        res.send(await middleware.onePropoUpvoter(parseInt(req.params.id)))
    } else if (req.body.vote === 'down') {
        res.send(await middleware.onePropoDownvoter(parseInt(req.params.id)))
    } else {  
        res.send(await middleware.addendumPoster(req.params.id, req.body))
    }
    res.end()
  })
// parses YES || NO addendum vote
app.post('/:id/:id2', async function(req, res) {
    if (req.body.vote === 'up') {
        res.send(await middleware.oneAddendumUpvoter(parseInt(req.params.id), parseInt(req.params.id2)))
    } else if (req.body.vote === 'down') {
        res.send(await middleware.oneAddendumDownvoter(parseInt(req.params.id), parseInt(req.params.id2)))
    }
    res.end()
  })
app.use('/:id/:id2', async function (req, res) {
    const addendum = await middleware.oneAddendumGetter(parseInt(req.params.id), parseInt(req.params.id2))
    return res.send(addendum)
})
app.use('/:id', getOne)
app.post('/', function(req, res) {
    middleware.propoPoster(req.body)
    res.end()
  })
app.use('/', getData)

app.listen(3001, () => { })


