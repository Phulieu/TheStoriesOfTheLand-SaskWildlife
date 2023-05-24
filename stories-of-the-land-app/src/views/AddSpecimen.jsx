  import React, { useState, useRef } from "react";
  import { useNavigate } from "react-router-dom";
  import { NavBar } from "../components";
  import apiCalls from "../api";
  import styles from "./AddSpecimen.module.css"
  import uploadImg from '../assets/cloud-upload-regular-240.png'

  /**
   * This component displays the Add Specimen form that allows the user to create a new specimen into the database
   * @returns {React.Component}
   */

  const AddSpecimen = () => {
    const [name, setName] = useState("");
    const [story, setStory] = useState("");
    const [image, setImage] = useState(null);
    const [audio, setAudio] = useState(null);
    const wrapperRef = useRef(null);
    const navigate = useNavigate();

    /**
     * This function handles the changes in the name input and set the value into the name state.
     * @param {event} e 
     */
    const handleNameChange = (e) => {
      setName(e.target.value);
    };

    /**
     * This function handles the changes in the story input and set the value into the story state.
     * @param {event} e 
     */
    const handleStoryChange = (e) => {
      setStory(e.target.value);
    };

    /**
     * This function handles the form submission, creates a payload with the name, story, image and audio values and makes the api call to create a specimen.
     * @param {event} e 
     */
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      try {
        const payload = {
          plantName: name,
          story: story,
          image: image,
          audio: audio
        };
        const response = await apiCalls.createPlant(payload);
        console.log('Upload success:', response);

        // Show alert
        alert("Specimen added successfully!");

        // Redirect to "/"
        navigate("/plant/list?scrollToBottom=true");
      } catch (error){
        console.error(error);
      }
    };
    
    /**
     * Handles on drag enter event
     * @returns {wrapperRef}
     */
    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    
    /**
     * Handles on drag leave event
     * @returns {wrapperRef}
     */
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    /**
     * Handles on drop event
     * @returns {wrapperRef}
     */
    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    /**
     * This function handles the image on drop event and sets the value into the image state, a new file is created.
     * @param {event} e 
     */
    const onImageDrop = (e) => {
      const newFile = e.target.files[0];
      if (newFile) {
        const modifiedFileName = Date.now() + '-' + newFile.name;
        const modifiedFile = new File([newFile], modifiedFileName, { type: newFile.type });
        setImage(modifiedFile);
        console.log(modifiedFile);
      }
    };

    /**
     * Set images state back to null.
     */
    const imageRemove = () => {
      setImage(null);
    };

    /**
     * This functions handles the audio changes, creates a new audio file and sets the value into the audio state.
     * @param {event} e 
     */
    const handleAudioDrop = (e) => {
      const newFile = e.target.files[0];
      if (newFile) {
        const modifiedFileName = Date.now() + "-" + newFile.name;
        const modifiedFile = new File([newFile], modifiedFileName, {
          type: newFile.type,
        });
        setAudio(modifiedFile);
        console.log(modifiedFile);
      }
    };

    /**
     * Set audio state back to null.
     */
    const audioRemove = () => {
      setAudio(null);
    };

    return (
      <>
        <NavBar />
        <div className="container mt-4">
          <h2 className="text-center">Add New Specimen</h2>
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
            {/* Story Label Input */}
            <div className="mb-3">
              <label htmlFor="story" className="form-label">
                Story
              </label>
              <textarea
                className="form-control"
                id="story"
                rows="3"
                value={story}
                onChange={handleStoryChange}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              {/* Image drop container */}
              <div
                ref={wrapperRef}
                className={`${styles.dropFileInput} ${
                  image ? styles.withPreview : ""
                }`}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              >
                {/* Image preview */}
                {image ? (
                  <div className={styles.imagePreview}>
                    <img src={URL.createObjectURL(image)} alt="Preview" />
                    <div className={styles.deleteButton} onClick={imageRemove}>
                      <i className="fas fa-times"></i>
                    </div>
                  </div>
                ) : (
                  <div className={styles.dropFileInputLabel}>
                    <img src={uploadImg} alt="" />
                    <p>Drag & Drop your image here or Click to browse files</p>
                  </div>
                )}
                <input 
                  type="file"
                  accept="image/*"
                  onChange={onImageDrop}
                  required
                  />
              </div>
            </div>
            <div className="mb-3">
            <label htmlFor="audio" className="form-label">
              Audio
            </label>
            {/* Audio drop container */}
            <div
              className={`${styles.dropFileInput} ${
                audio ? styles.withPreview : ""
              }`}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              {/* Audio preview */}
              {audio ? (
                <div className={styles.audioPreview}>
                  <audio src={URL.createObjectURL(audio)} controls />
                  <div className={styles.deleteButton} onClick={audioRemove}>
                    <i className="fas fa-times"></i>
                  </div>
                </div>
              ) : (
                <div className={styles.dropFileInputLabel}>
                  <img src={uploadImg} alt="" />
                  <p>Drag & Drop your audio here or Click to browse files</p>
                </div>
              )}
              <input
                type="file"
                accept="audio/*"
                onChange={handleAudioDrop}
                required
              />
            </div>
          </div>
          {/* Add Specimen Button */}
          <div className={styles.buttonsContainer}> 
            <button type="submit" className={styles.addSpecimenButton}>
              Add Specimen
            </button>
            <button className={styles.cancelButton} onClick={()=> {
              alert("Are you sure you want to cancel creation of specimen?");
              navigate("/plant/list");
            }}>Cancel</button>
          </div>
           
          </form>
        </div>
      </>
    );
    
    

  }
  export default AddSpecimen;