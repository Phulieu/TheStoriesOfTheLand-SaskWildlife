

 // imports the Express framework. 
const express = require('express');

//imports the 'controller' module from the '../controllers' directory.
const plantController = require('../controllers/controller');

//creates instance of the Express application.
const router = express();

/**
 * defines a route that handles GET requests to the '/plant' URL.
 * When a GET request is received at this URL, the 'getAllPlant' function from the 'plantController' module is called.
 */
router.get('/plant', plantController.getAllPlant);

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
router.post('/plant', plantController.createPlant);


//exports the 'router' constant so that it can be used by other modules in the application
module.exports = router;