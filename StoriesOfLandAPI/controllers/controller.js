const fs = require('fs');
const serverPath = 'E:/sdc2023-proj602-group1/StoriesOfLandAPI';
// import Plants 
const Plant = require('../db/models/Plants');

/**
 * This function handles the GET request to retrieve all plant records from the database.
 * @param {object} req 
 * @param {object} res 
 */
const getAllPlant = async (req, res) => {

    //call find method to return all plants
    Plant.find().
        //on success call lambda function.
        then((plants) => {

            //check each plant object's length to make sure the content is there.
            if (!plants.length) {
                //if length zero means ,no data response return as json and error message 404
                return res.status(404).json({ success: false, error: "No plants found." });
            }
            //if length is greater than zero means data is present and it displays data with status code 200.
            return res.status(200).json({ success: true, data: plants });
        }).
        //on error catch block will be executed with anonymous lambda function and returns status code 400 with error message.
        catch((err) => {
            return res.status(400).json({ success: false, error: err });
        });
};

/**
 * This function retrieves information about a plant with the specified ID.
 * @param {object} req 
 * @param {object} res 
 */
const getPlantById = async (req, res) => {
    Plant.
        //get data by id     
        findById(req.params.id).
        //on success data returns with status code 200
        then((plant) => {
            return res.status(200).json({ success: true, data: plant });
        }).
        //on error catch block will excute and returns status code 400 with error message
        catch((err) => {
            return res.status(400).json({ success: false, error: err });
        });
};



/**
 * This function creates a new plant object on the API with the specified data.
 * @param {object} req 
 * @param {object} res 
 * @returns create a new plant object.
 */
const createPlant = async (req, res) => {
    try {
      // Extract the necessary data from the request body
      const { plantName, story } = req.body;
    
      // Access the uploaded image and audio files using Multer
      const imageFile = req.files['image'][0];
      const audioFile = req.files['audio'][0];
      // Get the filenames
    const imageFilename = "/Images/"+imageFile.originalname;
    const audioFilename = "/audios/"+audioFile.originalname;
    console.log("image"+imageFilename);
    console.log("aud"+audioFilename);
       // Create a new instance of the Plant model with the extracted data
    const plant = new Plant({
        plantName,
        image: imageFilename,
        story,
        audio: audioFilename,
      });
  console.log(plant);
      // Save the plant object to MongoDB
      await plant.save();
      
      return res.status(200).json({ success: true, message: 'Plant created' });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  };
  

/**
 * This function updates a plant object on the API with the specified data.
 * @param {object} req 
 * @param {object} res 
 * @returns update a plant object.
 */
const updatePlant = async (req, res) => {
    try {
        // stored request id to a constant
        const id = req.params.id;
        // stored request body to a constant
        const body = req.body;
        // Extract the necessary data from the request body
        const { plantName, story } = body;

        // Access the uploaded image and audio files using Multer
        const imageFile = req.files['image'][0];
        const audioFile = req.files['audio'][0];
        // Get the filenames
        const imageFilename = "/Images/" + imageFile.originalname;
        const audioFilename = "/audios/" + audioFile.originalname;

        // The code is checking to see if the information sent in the body is an object,
        // and if so, checking to see if there are keys. If there are no keys, then the object is empty.
        if (body.constructor === Object && Object.keys(body).length === 0) {
            return res.status(400).json({ success: false, error: "You must provide Plant information" });
        }

        // find the document that needs to be updated
        Plant.findById(id).then((plant) => {
            // update plant object using the body
            plant.plantName = plantName;
            plant.image = imageFilename;
            plant.story = story;
            plant.audio = audioFilename;

            plant.save().then(() => {
                // on success
                return res.status(200).json({
                    success: true,
                    id: plant['_id'],
                    message: "Plant updated"
                });
            }).
                // on error
                catch((err) => {
                    return res.status(400).json({ success: false, error: err });
                });
        }).
            // callback function contains an error, a respond with status 400 and the error message
            catch((err) => {
                return res.status(400).json({ success: false, error: err });
            });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

/**
 * This function deletes a plant object on the API.
 * @param {object} req 
 * @param {object} res 
 */
const deletePlant = async (req, res) => {
    // delete the document
    Plant.findByIdAndRemove(req.params.id).then((plant) => {
        // on success
        fs.unlink(serverPath + plant.image,function(err){
            if(err) return res.status(400).json({ success: false, message: err });
        });
        fs.unlink(serverPath + plant.audio,function(err){
            if(err) return res.status(400).json({ success: false, message: err });
        });
        return res.status(200).json({ success: true, message: "Plant deleted", data: plant });
    }).
        // on error
        catch((err) => {
            return res.status(400).json({ sucess: false, error: err });
        });
};

/**
 *  export getAllPlant, getPlantById, createPlant, updatePlant and deletePlant.
 */
module.exports = {
    getAllPlant,
    getPlantById,
    createPlant,
    updatePlant,
    deletePlant
};
