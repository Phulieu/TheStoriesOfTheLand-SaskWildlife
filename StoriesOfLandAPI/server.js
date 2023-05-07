const express = require('express');
const db = require('./db/connect');

const backend = express();

backend.use(express.json());

const router = require('./routes/routes');

backend.use('/api', router);

// index route
backend.get('/', function (request, response) {
    response.redirect('/api/plant');
});

// listen for connections (on port 3001)
backend.listen(3001, function () {
    // send message that we are listening
    console.log("server started");
});


