const fs = require('fs');

// import Plants 
const Plant = require('../db/models/Plants');
const path = require('path');

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

    console.log("plant created");
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
      console.log("Update method");
      console.log("update" + req.body.plantName);
      const id = req.params.id;
      console.log(id);
      const body = req.body;

      const { plantName, story } = body;
      console.log("plant Name" + plantName);
  
      const imageFile = req.files['image'][0];
      const audioFile = req.files['audio'][0];
      console.log("image file" + imageFile);
      console.log("audio file" + audioFile);
  
      const imageFilename = "/Images/" + imageFile.originalname;
      const audioFilename = "/audios/" + audioFile.originalname;
  
      Plant.findById(id)
        .then(async (plant) => {
          console.log("inside findById");
  
          // Check if the image file has changed
          if (plant.image !== imageFilename) {
            console.log("checking.....");
            // Delete the old image file from the server
            const oldImageFile = plant.image;
            console.log("old image file:" + oldImageFile);
            console.log("new image file: " + imageFilename);
            await deleteFile(oldImageFile);
          }
  
          // Check if the audio file has changed
          if (plant.audio !== audioFilename) {
            console.log("checking audio");
            // Delete the old audio file from the server
            const oldAudioFile = plant.audio;
            await deleteFile(oldAudioFile);
          }
          console.log("db update");
  
          plant.plantName = plantName;
          plant.image = imageFilename;
          plant.story = story;
          plant.audio = audioFilename;
  
          plant
            .save()
            .then(() => {
              return res.status(200).json({
                success: true,
                id: plant['_id'],
                message: "Plant updated",
              });
            })
            .catch((err) => {
              return res.status(400).json({ success: false, error: err });
            });
        })
        .catch((err) => {
          return res.status(400).json({ success: false, error: err });
        });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  };
  
  const deleteFile = (filePath) => {
    try {
      const absoluteFilePath = path.join(__dirname, '../', filePath);
      fs.unlinkSync(absoluteFilePath);
      console.log('File deleted');
    } catch (err) {
      console.log('Error deleting file:', err);
      throw err;
    }
  };
  
  
/**
 * This function deletes a plant object on the API.
 * @param {object} req 
 * @param {object} res 
 */
const deletePlant = async (req, res) => {

        console.log(req.body);
         const id = req.params.id;
        Plant.findById(id).then(async (plant)=>{

       //   console.log(plant);


        });
    // delete the document
    Plant.findByIdAndRemove(req.params.id).then((plant) => {

          console.log(plant);
          deleteFile(plant.image);
          deleteFile(plant.audio);



      
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
