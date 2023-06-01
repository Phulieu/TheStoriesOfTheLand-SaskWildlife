const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    status:{ type: String, required: false },
    password: { type: String, required: false }
});


adminSchema.plugin(passportLocalMongoose);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;