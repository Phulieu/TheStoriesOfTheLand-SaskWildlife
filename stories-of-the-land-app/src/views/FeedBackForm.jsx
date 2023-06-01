import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiCalls from "../api";
import styles from "./FeedBackForm.module.css";

const FeedBackForm = (SpecimenID) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState("");
    const navigate = useNavigate();

    /**
     * Handle Name Change
     * @param {e} event 
     */
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    /**
     * Handle Email Change
     * @param {e} event 
     */
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    /**
     * Handle Feedback Change
     * @param {e} event 
     */
    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    /**
     * Create Feedback and send to the server.
     * @param {e} event
     */
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
          const payload = {
            name: name,
            email: email,
            feedback: feedback
          };
          
          const response = await apiCalls.createFeedback(payload);
          console.log('Upload success:', response);
  
          // Show alert for feedback success
          alert("Thank You! Your feedback is appreciated.");
  
          // Redirect to "/"
          navigate(`/plant/${SpecimenID}`);
        } catch (error){
            // Show alert for feedback failure
            alert("Sorry! Couldn't save your feedback.");
        }
      };

    return(
        <>
            <div className="container mt-4">
                <h2 className="text-center">Feedback Form</h2>
                <form onSubmit={(e) => handleFormSubmit(e)}>
                    {/* Name Label Input */}
                    <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                    </div>
                    {/* Email Label Input */}
                    <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="name"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    </div>
                    {/* Feedback Label Input */}
                    <div className="mb-3">
                    <label htmlFor="story" className="form-label">
                    Feedback
                    </label>
                    <textarea
                        className="form-control"
                        id="story"
                        rows="3"
                        value={feedback}
                        onChange={handleFeedbackChange}
                        required
                    ></textarea>
                    </div>
                    <div className={styles.buttonsContainer}> 
                        <button type="submit" className={styles.addButton}>
                        Submit
                        </button>
                        <button className={styles.cancelButton} onClick={()=> {
                            alert("Are you sure you don't what to share your feedback?");
                            navigate(`/plant/${SpecimenID}`);
                            }}>Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default FeedBackForm;