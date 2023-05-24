// import Plants 
const Plant = require('../db/models/Plants');

//import path and fs library
const path = require('path');
const fs = require('fs');

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
   
       // Create a new instance of the Plant model with the extracted data
    const plant = new Plant({
        plantName,
        image: imageFilename,
        story,
        audio: audioFilename,
      });

      // Save the plant object to MongoDB
      await plant.save();
      
      return res.status(200).json({ success: true, message: 'Plant created' });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  };
  

/**
 * This function updates a plant object on the API with the specified data
 * and remove the iamge and audio files it is updated.
 * @param {object} req 
 * @param {object} res 
 * @returns update a plant object.
 */
const updatePlant = async (req, res) => {
    try {      
      const id = req.params.id;      
      const body = req.body;

      const { plantName, story } = body;  
      //store image and audio files to variables. 
      const imageFile = req.files['image'][0];
      const audioFile = req.files['audio'][0];  

      //concatenate the folders names along with the file name before storing to the db.
      const imageFilename = "/Images/" + imageFile.originalname;
      const audioFilename = "/audios/" + audioFile.originalname; 

      //find the specimen information to update the values 
      Plant.findById(id)
        .then(async (plant) => {      
            // Check if the image file has changed
          if (plant.image !== imageFilename) {         
            
            const oldImageFile = plant.image;  
            // Delete the old image file from the server by invoking delete method.         
            await deleteFile(oldImageFile);
          }  
          // Check if the audio file has changed
          if (plant.audio !== audioFilename) {           
           
            const oldAudioFile = plant.audio;
             // Delete the old audio file from the server by invoking delete method.
            await deleteFile(oldAudioFile);
          }        
          
          //assign new values to the plant object.
          plant.plantName = plantName;
          plant.image = imageFilename;
          plant.story = story;
          plant.audio = audioFilename;
          
          //save updated values
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

  /**
   * This function removes the file from the specified path.
   * @param {*} filePath - defines the path of the file to be removed.
   *    */  
  const deleteFile = (filePath) => {
    try {
      const absoluteFilePath = path.join(__dirname, '../', filePath);
      fs.unlinkSync(absoluteFilePath);     
    } catch (err) {
     
      throw err;
    }
  };
  
  
/**
 * This function deletes a plant object on the API and 
 * removes corresponding audio and video files from the server folders.
 * @param {object} req 
 * @param {object} res 
 */
const deletePlant = async (req, res) => {   
     
    // find the id and delete the corrsponding specimen document
    Plant.findByIdAndRemove(req.params.id).then((plant) => {        
      //invoke deleteFile method to remove image and audio.
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
