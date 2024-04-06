var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hola Mundo',
nomb: ':Jean David', 
apel: ':Torres Arteaga',
id: ':31562484',
secc: '2',});
});

module.exports = router;
