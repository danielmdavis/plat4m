const { Client } = require("pg");
require('dotenv').config();

const middleware = require('./middleware')

const getAllProps = async function () {
  const clientResult = await middleware.getAllProps()
  console.log(clientResult.rows)
}

const getOneProp = async function (id) {
  const clientResult = await middleware.getOneProp(id)
  console.log(clientResult.rows)
}

const getAddenda = async function () {
  const clientResult = await middleware.getAddenda()
  console.log(clientResult.rows)
}

getOneProp(2)