const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('foo')
})

app.listen(3001, () => {

})