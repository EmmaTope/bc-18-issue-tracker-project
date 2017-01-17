var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res) {
  res.render('accounts/login');
});

router.get('/register', function(req, res) {
  res.render('accounts/signup');
});

module.exports = router;
