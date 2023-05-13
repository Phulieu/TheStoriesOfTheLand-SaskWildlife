//import all module required
const express = require('express');
const db = require('./db/connect');
const path = require('path');
const cors = require('cors');
const backend = express();

/**
 * add middleware function 
 * parse any incoming JSON payload in the request body
 */
backend.use(express.json());


/**
 * middleware is configured to only allow requests from http://localhost:3000. 
 */
backend.use(cors({
    origin: '*'
}));


//imports the router object from the routes.js file in the routes folder
const router = require('./routes/routes');

//code sets up the base URL for all API endpoints defined in the router
backend.use('/api', router);

// index route
backend.get('/', function (request, response) {
    response.redirect('/api/plant');
});

/**
 * path.join() construct the absolute path to the Images and audios 
 * directories that are stored in the current directory (__dirname). 
 * backend.use() method is then used to mount the static file-serving 
 * middleware on the /Images and /audios routes respectively.
 */
backend.use('/Images', express.static(path.join(__dirname, 'Images')));
backend.use('/audios', express.static(path.join(__dirname, 'audios')));

// listen for connections (on port 3001)
backend.listen(3001, function () {
    // send message that we are listening
    console.log("server started");
});


