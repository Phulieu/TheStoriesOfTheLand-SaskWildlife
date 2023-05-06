const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const username = 'nayana-harish';
const password = 'Adwaith-2017';
const dbname = "story_of_land_app"
const uri = `mongodb+srv://${username}:${password}@cluster0.qsvvngd.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(uri).then(
    (con)=>{
        console.log("Connected to MongoDB");
    }
).catch(
    (error)=>{
        console.log("Got error: " + error);
    }
);

const db = mongoose.connection;

module.exports = db;