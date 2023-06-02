const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: false },
    email: { type: String, required: true },
    feedback: { type: String, required: true }

});


feedbackSchema.plugin(passportLocalMongoose);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;