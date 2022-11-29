const express = require('express');
// const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

const update = require('./update');
const data = require('./data');
const router = require('./routes/index');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
app.use(cors());

let payload = []
const dbdata = async function () {
    payload = await update.getter()
}
dbdata()
console.log(payload)

app.get('/', (req, res) => {
        res.send(payload) 
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


