const express = require('express');
const app = express();
const cors = require('cors');
const update = require('./update');
const data = require('./data');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
app.use(cors());


console.log(update.getter())

app.get('/', (req, res) => {
    res.send(update.getter())
})


app.listen(3001, () => {

})


