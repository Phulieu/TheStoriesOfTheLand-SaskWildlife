const Feedback = require('../db/models/Feedback');


const createFeedback = async (req, res) => {

    try {
      // Extract the necessary data from the request body
      const { name, email ,feedback} = req.body;
        
   
       // Create a new instance of the feedback model with the extracted data
    const feed_back = new Feedback({
        name,email,feedback
        
      });

      // Save the plant object to MongoDB
      await feed_back.save();
      
      return res.status(200).json({ success: true, message: 'Feedback submitted' });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }



  const getAllFeedback = async (req, res) => {

    //call find method to return all plants
    Feedback.find().
        //on success call lambda function.
        then((feedback) => {

            //check each plant object's length to make sure the content is there.
            if (!feedback.length) {
                //if length zero means ,no data response return as json and error message 404
                return res.status(404).json({ success: false, error: "No Feedback found." });
            }
            //if length is greater than zero means data is present and it displays data with status code 200.
            return res.status(200).json({ success: true, data: feedback });
        }).
        //on error catch block will be executed with anonymous lambda function and returns status code 400 with error message.
        catch((err) => {
            return res.status(400).json({ success: false, error: err });
        });
};




const deleteFeedBack = async (req, res)=>{
  Feedback.findByIdAndRemove(req.params.id).then((feedback)=>{
      return res.status(200).json({success: true, message: "Feedback deleted", data: feedback});
  }).catch((err)=>{
      return res.status(400).json({sucess: false, error: err});
  });
};


  module.exports = {
   createFeedback,
    getAllFeedback,
   deleteFeedBack


};
  
  
  