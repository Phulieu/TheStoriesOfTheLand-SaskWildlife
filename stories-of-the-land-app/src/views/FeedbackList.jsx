import React, { useState ,useEffect } from 'react';
import apiCalls from "../api";
import { useNavigate } from 'react-router-dom';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([
    
  ]);


  const navigate = useNavigate();
  
  useEffect(() => {
    apiCalls
      .getAllFeedback()
      .then((res) => {
        setFeedbacks(res.data.data);        
      })
      .catch(console.error);
  }, []);
  



  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this feedback?')) {
      
        apiCalls.deleteFeedBack(id).then( () => {
          
           window.location.reload();
  
        }).catch( (err) => {
            console.log(err);
        });
        navigate("/feedback/list");
    }
  };


  return (
    <div>
      <h2>Feedback List</h2>
      {feedbacks.map((feedback) => (
        <div key={feedback._id}>         
          <p>Author: {feedback.name}</p>
          <p>Email: {feedback.email}</p>
          <p>{feedback.feedback}</p>
        
          <button onClick={() => handleDelete(feedback._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
