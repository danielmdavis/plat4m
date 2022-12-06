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

const getOnePropWithChildren = async function (id) {
  const clientResult = await middleware.getOnePropWithChildren(id)
//   console.log(clientResult[0].rows)
//   console.log(clientResult[1].rows)
  let data = Object.assign(clientResult[0].rows, { 'addenda': clientResult[1].rows })
  console.log(data)
}

const getAddenda = async function () {
  const clientResult = await middleware.getAddenda()
  console.log(clientResult.rows)
}

getOnePropWithChildren(1)