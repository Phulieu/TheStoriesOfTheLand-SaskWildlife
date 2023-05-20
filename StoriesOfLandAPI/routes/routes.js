// imports the Express framework. 
const express = require('express');
// imports the passport framework. 
const passport = require('passport');
const multer = require('multer');

//imports the 'controller' module from the '../controllers' directory.
const plantController = require('../controllers/controller');

//imports the 'authController' module from the '../controllers' directory.
const authController = require('../controllers/authController');
//imports the 'auth' module
const auth = require('../auth');

//creates instance of the Express application.
const router = express();

// Set storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'image') {
            cb(null, 'Images/');
        } else if (file.fieldname === 'audio') {
            cb(null, 'audios/');
        } else {
            cb(new Error('Invalid fieldname'));
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});

// Create multer upload instance
const upload = multer({ storage });


// auth
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
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
router.post('/plant', upload.fields([{ name: 'image' }, { name: 'audio' }]), plantController.createPlant);

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