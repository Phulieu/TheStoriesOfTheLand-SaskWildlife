const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    plantName: {type: String, required: true},
    image: {type: String, required: false},
    story: {type: String, required: false},
    audio: {type: String, required: false}
});

const Plant = mongoose.model("Plants", plantSchema);

module.exports = Plant;