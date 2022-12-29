// for db
const { Client } = require("pg");
require('dotenv').config();
const middleware = require('./middleware');

// for api
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })
app.use(cors())



// const getAllProps = async function () {
//   const clientResult = await middleware.getAllProps()
//   console.log(clientResult.rows)
// }

// const getOneProp = async function (id) {
//   const clientResult = await middleware.getOneProp(id)
//   console.log(clientResult.rows)
// }

// const getAddenda = async function () {
//   const clientResult = await middleware.getAddenda()
//   console.log(clientResult.rows)
// }

const getOnePropWithChildren = async function (id) {
  const clientResult = await middleware.getOnePropWithChildren(id)
  const data = await Object.assign(clientResult[0].rows, { 'addenda': clientResult[1].rows })
  console.log(data)
  return data
}

const assembleAll = async function () {
    let rows = await middleware.getCount()
    rows = rows.rows[0].count
    let payload = []
    for (let i = 1; i <= rows; i++) {
        payload.push(getOnePropWithChildren(i))
        if (i == rows) {
            console.log('foo')
            return payload
        }
    }
}

const getData = async function () {
    const data = await assembleAll()
    return data
}

getOnePropWithChildren(1)