const express = require('express');
const app = express();

const data = require('./data');

app.get('/', (req, res) => {
    res.send(data)
})

app.listen(3001, () => {

})