/**
 *  This line imports the Mongoose library.
 *  which interacts with MongoDB databases.
 */
const mongoose = require('mongoose');

/**
 * define a new Mongoose schema for the 'plant' collection in the MongoDB database.
 */

const plantSchema = new mongoose.Schema({
    plantName: {type: String, required: true},
    image: {type: String, required: false},
    story: {type: String, required: false},
    audio: {type: String, required: false}
});

/**
 * creates a new Mongoose model for the 'plants' collection in the MongoDB database.
 */
const Plant = mongoose.model("Plants", plantSchema);

//exports the 'Plant' constant so that it can be used by other modules in the application
module.exports = Plant;