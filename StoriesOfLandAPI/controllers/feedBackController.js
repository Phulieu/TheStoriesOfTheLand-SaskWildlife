const Feedback = require('../db/models/Feedback');


const createFeedback = async (req, res) => {

    try {
      // Extract the necessary data from the request body
      const { name, email ,feedback} = req.body;
        
   
       // Create a new instance of the feedback model with the extracted data
    const feed_back = new Feedback({
        name,email,feedback,
        read: "no"
        
      });

      // Save the plant object to MongoDB
      await feed_back.save();
      
      return res.status(200).json({ success: true, message: 'Feedback submitted' });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  const getFeedbackCount  = async (req, res) => {
    try {
      // Find the count of feedback where read = "no"
      const count = await Feedback.countDocuments({ read: "no" });
  
      return res.status(200).json({ success: true, count });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  };

  const getAllFeedback = async (req, res) => {
    try {
      const feedback = await Feedback.find();
  
      if (!feedback.length) {
        return res.status(404).json({ success: false, error: "No Feedback found." });
      }
  
      // Update the read field of each feedback to "yes"
      for (const feedbackItem of feedback) {
        feedbackItem.read = "yes";
        await feedbackItem.save();
      }
  
      return res.status(200).json({ success: true, data: feedback });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
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
   deleteFeedBack,
   getFeedbackCount


};
  
  
  