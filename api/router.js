let express = require('express');
let router = express.Router();
let middleware = require('./middleware');

router.use(express.json())

router.get('/', (req, res) => {
    res.render('index', { title: 'Express' })
})
// router.get('/:id', (req, res) => {
//   for (let item in propositions) {
//     if (item.id === req.params.id) {
//         res.json(item);
//         return;
//     }
// }
//   res.render('', { title: 'Express' })
// })

router.post('/', function(req, res) {
    console.log(req.body)
    middleware.poster(req.body)
    res.end()
  })

// router.put('/', function(req, res) {
//     console.log('foo')
//     middleware.oneUpvoter(req.body.id)
//     res.end()
//   })

module.exports = router;