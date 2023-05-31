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
  module.exports = {
   createFeedback
};
  
  ;
  