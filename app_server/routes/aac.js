var express = require('express');
var router = express.Router();
//var controller = require('../controllers/aac');
var controller = require('../controllers/filter');

//get austin animals page
router.get('/', function(req,res) {
    res.render('aac');
});

router.get('/aac_animals', controller.getFilteredAnimals);

module.exports = router;
