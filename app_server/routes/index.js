var express = require('express');
var router = express.Router();
const crtlMain = require('../controllers/main');

/* GET home page with either blank or index */
router.get('/', function(req, res) {
  res.redirect('/index');
});

router.get('/index', function(req, res) {
  res.render('index');
});

module.exports = router;

