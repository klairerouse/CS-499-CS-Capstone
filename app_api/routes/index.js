const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens

const aacController = require("../controllers/aac_animals");
const authController = require('../controllers/authentication');

// Method to authenticate our JWT (mirroring from previous project in classes)
function authenticateJWT(req, res, next) {
    // console.log('In Middleware');
    const authHeader = req.headers['authorization'];
    // console.log('Auth Header: ' + authHeader);
    if(authHeader == null)
    {
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401);
    }

    let headers = authHeader.split(' ');
    if(headers.length < 1)
    {
        console.log('Not enough tokens in Auth Header: ' +
        headers.length);
        return res.sendStatus(501);
    }
    
    const token = authHeader.split(' ')[1];
    // console.log('Token: ' + token);
    if(token == null)
    {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }
    // console.log(process.env.JWT_SECRET);
    // console.log(jwt.decode(token));
    
    const verified = jwt.verify(token, process.env.JWT_SECRET, (err,
    verified) => {
        if(err)
        {
            return res.sendStatus(401).json('Token Validation Error!');
        }
        req.auth = verified; // Set the auth paramto the decoded object
    });
    next(); // We need to continue or this will hang forever
}

//define route for the registration endpoint
router 
    .route('/register')
    .post(authController.register);

//define the route for user login
router
    .route('/login')
    .post(authController.login);

//define route for our animal endpoint
router
    .route('/aac_animals')
    .get(aacController.aacList)
    .post(authenticateJWT, aacController.aac_animalsAddAnimal); //POST Method Adds a animal

//get method routes animalFindByCode - requires parameter
router
    .route('/aac_animals/:animalCode')
    .get(aacController.animalFindByCode)
    .put(authenticateJWT, aacController.aac_animalsUpdateAnimal);

router
    .route('/aac_animals/:animalId')
    .delete(authenticateJWT, aacController.deleteAnimal);

module.exports = router;