// imports the Express framework. 
const express = require('express');

// imports the passport framework. 
const passport = require('passport');

//import multer library
//Multer is a middleware that helps handle multipart/form-data
const multer = require('multer');

//imports the 'controller' module from the '../controllers' directory.
const plantController = require('../controllers/controller');

//imports the 'authController' module from the '../controllers' directory.
const authController = require('../controllers/authController');
//imports the 'auth' module
const auth = require('../auth');
//import the 'adminController' module from the '../controllers' directory.
const adminController = require('../controllers/adminController');

//creates instance of the Express application.
const router = express();

// Set storage for uploaded files 

const storage = multer.diskStorage({
    //'destination' function determines the destination folder based on the fieldname of the uploaded file.
    destination: (req, file, cb) => {  

    //If the fieldname is 'image', the file will be stored in the 'Images/' folder.
    //If the fieldname is 'audio', the file will be stored in the 'audios/' folder.
        if (file.fieldname === 'image') {
            cb(null, 'Images/');
        } else if (file.fieldname === 'audio') {
            cb(null, 'audios/');

        //If the fieldname does not match any of the specified conditions, 
        // an error will be passed to the callback.
        } else {
            cb(new Error('Invalid fieldname'));
        }
    },

    //filename' function sets the filename of the uploaded file as its original name
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    }
});



//create an instance of the 'multer' middleware with a specific storage configuration
const upload = multer({ storage });

/**
 * defines a route that handles POST requests to the '/register' URL.
 * When a POST request is received at this URL,the register function from the 'authController' module is called.
 */
router.post('/register', auth.verifyUser, authController.register);


/**
 * defines a route that handles POST requests to the '/login' URL.
 * When a POST request is received at this URL,the login function from the 'authController' module is called.
 */
router.post('/login', authController.login);

/**
 * defines a route that handles POST requests to the '/logout' URL.
 * When a POST request is received at this URL,the logout function from the 'authController' module is called.
 */
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
router.put('/plant/:id', upload.fields([{ name: 'image' }, { name: 'audio' }]), plantController.updatePlant);

/**
 * defines a route that handles DELETE requests to the '/plant/:id' URL.
 * When a DELETE request is received at this URL,
 * the 'deletePlant' function from the 'plantController' module is called.
 */
router.delete('/plant/:id', plantController.deletePlant);

/**
 * defines a route that handles GET requests to the '/userManagement' URL.
 * When a GET request is received at this URL,
 * the 'getAllUserAccount' function from the 'adminController' module is called.
 */
router.get('/userManagement', auth.verifyUser, adminController.getAllUserAccount);

/**
 * defines a route that handles DELETE requests to the '/userManagement/:id' URL.
 * When a DELETE request is received at this URL,
 * the 'deleteUserAccount' function from the 'adminController' module is called.
 */
router.delete('/userManagement/:id', auth.verifyUser, adminController.deleteUserAccount);

/**
 * defines a route that handles PUT requests to the '/userManagement/:id' URL.
 * When a PUT request is received at this URL,
 * the 'updateUserAccount' function from the 'adminController' module is called.
 */
router.put('/userManagement/:id', auth.verifyUser, adminController.updateUserAccount);

/**
 * defines a route that handles GET requests to the '/plant/search/:name' URL.
 * When a GET request is received at this URL, 
 * the 'getPlantByName' function from the 'plantController' module is called.
 */
router.get('/plant/search/:name', plantController.getPlantByName);

//exports the 'router' constant so that it can be used by other modules in the application
module.exports = router;