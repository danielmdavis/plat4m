const express = require('express');
// const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

const update = require('./update');
const data = require('./data');
const router = require('./router');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
app.use(cors());

const getData = async function (req, res) {
   const payload = await update.getter()
    return res.send(payload)
}
const getOne = async function (req, res) {
    const data = await update.getOne(18)
    return res.send(data)
  }




app.use(express.json())
app.use('/:id', getOne)
app.use('/', getData)
app.use('/', router)




app.listen(3001, () => { })


