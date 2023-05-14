// imports the Express framework. 
const express = require('express');
// imports the passport framework. 
const passport = require('passport');

//imports the 'controller' module from the '../controllers' directory.
const plantController = require('../controllers/controller');

//imports the 'authController' module from the '../controllers' directory.
const authController = require('../controllers/authController');
//imports the 'auth' module
const auth = require('../auth');

//creates instance of the Express application.
const router = express();

// auth
router.post('/login', passport.authenticate('local', { session: false }), authController.login);
/**
 * defines a route that handles GET requests to the '/plant' URL.
 * When a GET request is received at this URL, the 'getAllPlant' function from the 'plantController' module is called.
 */
router.get('/plant', auth.verifyUser, plantController.getAllPlant);

/**
 * defines a route that handles GET requests to the '/plant/:id' URL.
 * When a GET request is received at this URL, 
 * the 'getPlantById' function from the 'plantController' module is called.
 */
router.get('/plant/:id', plantController.getPlantById);

/**
 * defines a route that handles POST requests to the '/plant' URL.
 * When a POST request is received at this URL,
 * the 'createPlant' function from the 'plantController' module is called.
 */
router.post('/plant', auth.verifyUser, plantController.createPlant);

/**
 * defines a route that handles PUT requests to the '/plant/:id' URL.
 * When a PUT request is received at this URL,
 * the 'updatePlant' function from the 'plantController' module is called.
 */
router.put('/plant/:id', auth.verifyUser, plantController.updatePlant);

/**
 * defines a route that handles DELETE requests to the '/plant/:id' URL.
 * When a DELETE request is received at this URL,
 * the 'deletePlant' function from the 'plantController' module is called.
 */
router.delete('/plant/:id', auth.verifyUser, plantController.deletePlant);

//exports the 'router' constant so that it can be used by other modules in the application
module.exports = router;