var express = require('express');
var router = express.Router();
var update = require('../update');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res) {

  console.log(req.body);
  update.run(JSON.stringify(req.body))
  res.end();
})
module.exports = router;
