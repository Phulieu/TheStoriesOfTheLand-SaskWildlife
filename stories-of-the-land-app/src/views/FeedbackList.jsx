import React, { useState ,useEffect } from 'react';
import apiCalls from "../api";
import { useNavigate } from 'react-router-dom';



import styles from "./FeedbackList.module.css";
import { NavBar } from '../components';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    apiCalls
      .getAllFeedback()
      .then((res) => {
        setFeedbacks(res.data.data);
      })
      .catch(console.error);
  }, []);
  
  const handleClick = (feedback) => {
    setModalState(true);
    setSelectedFeedback(feedback);
    apiCalls.readFeedBack(feedback._id).then((res)=>{

    }).catch(console.error);

  };
  /**
   * Handles the closing of the modal.
   */
  const handleCloseModal = () => {
    setModalState(false);
    setSelectedFeedback(null);
  };

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
      <NavBar/>
      <div className='container py-4'>
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {feedbacks.map((feedback, index) => (
  <tr key={feedback._id}>
    <td>{feedbacks[feedbacks.length - index - 1].name}</td>
    <td>{feedbacks[feedbacks.length - index - 1].email}</td>
    <td>
      <button className={styles.viewButton} style={{ backgroundColor: '#1a3c34' }} onClick={() => handleClick(feedbacks[feedbacks.length - index - 1])}>
        View Feedback
      </button>
      <button className={styles.deleteButton} onClick={() => handleDelete(feedbacks[feedbacks.length - index - 1]._id)}>
        Delete
      </button>
    </td>
  </tr>
))}

            </tbody>
          </table>
        </div>
      </div>
      {modalState && (
        <div
        className={`${styles.modal} modal fade show`}
        tabIndex="-1"
        role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document" >
            <div className="modal-content" style={{backgroundColor: "#edf5e0"}}>
              <div className="modal-header" style={{backgroundColor: "#edf5e0"}}>
                <button
                  type="button"
                  className="btn-close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal}
                />
              </div>
              <div className="modal-body d-flex justify-content-center align-items-center flex-column">
                <p>Author: {selectedFeedback.name}</p>
                <p>Email: {selectedFeedback.email}</p>
                <p>Feedback: {selectedFeedback.feedback}</p>
              </div>
            </div>
          </div>
        </div>
        // <div className={styles.modal}>
        //     <div className={styles.modalContent}>
              // <p>Author: {feedback.name}</p>
              // <p>Email: {feedback.email}</p>
              // <p>{feedback.feedback}</p>
        //         <button className={`${styles.cancelButton} cancel-button`} onClick={() => setModalState(false)}>Cancel</button>
        //     </div>
        // </div>
      )}
    </div>
        
    // <div>

    //   <h2>Feedback List</h2>
    //   {feedbacks.map((feedback) => (
    //     <div key={feedback._id}>         
    //       <p>Author: {feedback.name}</p>
    //       <p>Email: {feedback.email}</p>
    //       <p>{feedback.feedback}</p>
        
    //       <button onClick={() => handleDelete(feedback._id)}>Delete</button>
    //     </div>
    //   ))}
    // </div>
  );
};
export default FeedbackList;