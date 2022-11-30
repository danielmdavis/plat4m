var express = require('express');
var router = express.Router();
var update = require('./update');

router.use(express.json())

router.get('/', (req, res) => {
    res.render('index', { title: 'Express' })
})

router.post('/', function(req, res) {
    update.poster(req.body)
    res.end()
  })

module.exports = router;
