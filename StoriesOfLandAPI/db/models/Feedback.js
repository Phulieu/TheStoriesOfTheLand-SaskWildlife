const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: false },
    email: { type: String, required: true },
    feedback: { type: String, required: true },
    read:{ type: String, required: true }

});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;