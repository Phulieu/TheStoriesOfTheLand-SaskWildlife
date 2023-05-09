
/**
 *  This line imports the Mongoose library.
 *  which interacts with MongoDB databases.
 */
const mongoose = require('mongoose');

/**
 * set 'strictQuery' option to true for the Mongoose library.
 * so Mongoose will throw an error if a query contains unknown keys.
 */
mongoose.set('strictQuery', true);


/**
 *constant stores credentials and  the URI needed to connect to the MongoDB database using the Mongoose library.
 */

const username = 'nayana-harish';
const password = 'Adwaith-2017';
const dbname = "story_of_land_app"
const uri = `mongodb+srv://${username}:${password}@cluster0.qsvvngd.mongodb.net/${dbname}?retryWrites=true&w=majority`;



//connects to the MongoDB database using the Mongoose library and the URI stored in the 'uri' constant.
mongoose.connect(uri).

//on successful connection then block will be executed.
then(

    (con)=>{
        console.log("Connected to MongoDB");
    }
).
//on error catch block will be executed.
catch(
    (error)=>{
        console.log("Got error: " + error);
    }
);

//creates a reference to the default Mongoose connection object.
const db = mongoose.connection;

//exports the 'db' constant so that it can be used by other modules in the application
module.exports = db;