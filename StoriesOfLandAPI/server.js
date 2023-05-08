const express = require('express');
const db = require('./db/connect');
const path = require('path');
const cors = require('cors');
const backend = express();

backend.use(express.json());
backend.use(cors({
    origin: 'http://localhost:3000'
}));

const router = require('./routes/routes');

backend.use('/api', router);

// index route
backend.get('/', function (request, response) {
    response.redirect('/api/plant');
});
backend.use('/Images', express.static(path.join(__dirname, 'Images')));
backend.use('/audios', express.static(path.join(__dirname, 'audios')));

// listen for connections (on port 3001)
backend.listen(3001, function () {
    // send message that we are listening
    console.log("server started");
});


