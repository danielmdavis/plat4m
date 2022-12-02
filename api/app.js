const express = require('express');
// const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

const middleware = require('./middleware');
const data = require('./data');
const router = require('./router');

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
    const prop = await middleware.oneGetter(parseInt(req.params.id))
    return res.send(prop) 
}
const upvoteOne = async function (req, res) {
    console.log('foo')
    // console.log(req.params)
    const prop = await middleware.oneUpvoter(parseInt(req.params.id))
    return res.send(prop) 
}

app.use(express.json())

// app.use('/:id', upvoteOne)
app.post('/:id', async function(req, res) {
    if (req.body.vote === 'up') {
        res.send(await middleware.oneUpvoter(parseInt(req.params.id)))
    }
    // middleware.poster(req.body)
    res.end()
    // getData()
  })

app.use('/:id', getOne)


// app.use('/', router)

app.post('/', function(req, res) {
    middleware.poster(req.body)
    res.end()
    // getData()
  })

app.use('/', getData)

app.listen(3001, () => { })


