const express = require('express');
// const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

const update = require('./update');
const data = require('./data');
const router = require('./routes/router');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
app.use(cors());

let payload = []
const getData = async function () {
    payload = await update.getter()
}
getData()

// move to router (index.js)
app.use(express.json())
app.get('/', (req, res) => {
    res.send(payload) 
})
app.post('/', function(req, res) {
    update.poster(req.body)
    res.end()
    getData()
  })

// const getData = async function (request, response) {
//     // let data = getJsonData(basePathToData, 'data.json');
//     const data = await update.fetch()
//     return response.send(data)
//   }
//   const getOne = async function (request, response) {
//     // let data = getJsonData(basePathToData, 'data.json');
//     const data = await update.fetchOne(id)
//     return response.send(data)
//   }
  
//   app.get('/props', getData)


// app.get('/', dbdata)
// app.use('/', router)


app.listen(3001, () => { })


