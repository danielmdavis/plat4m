var express = require('express');
var router = express.Router();

/* GET newRout listing. */
router.get('/', function(req, res, next) {
res.send('New route Hello World');
});
module.exports = router;
