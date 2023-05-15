import React, { useState, useRef } from "react";
import { NavBar } from "../components";
import apiCalls from "../api";
import styles from "./AddSpecimen.module.css"
import uploadImg from '../assets/cloud-upload-regular-240.png'

const AddSpecimen = () => {
  const [name, setName] = useState("");
  const [story, setStory] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const wrapperRef = useRef(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleStoryChange = (e) => {
    setStory(e.target.value);
  };

  const handleAudioDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setAudio(file);
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    setAudio(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("story", story);
    formData.append("image", image);
    formData.append("audio", audio);

    apiCalls
      .addSpecimen(formData)
      .then((res) => {
        // Handle successful submission
        console.log("Specimen added successfully");
      })
      .catch((error) => {
        // Handle error
        console.error("Error adding specimen:", error);
      });

    // Reset form fields
    setName("");
    setStory("");
    setImage(null);
    setAudio(null);
  };

  const onDragEnter = () => wrapperRef.current.classList.add('dragover');

  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

  const onDrop = () => wrapperRef.current.classList.remove('dragover');

  const onFileDrop = (e) => {
      const newFile = e.target.files[0];
      if (newFile) {
          setImage(newFile);
          console.log(newFile);
          
      }
  };

  const fileRemove = () => {
    setImage(null);
  };

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <h2 className="text-center">Add New Specimen</h2>
        <form onSubmit={handleSubmit}>
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
            />
          </div>
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
            ></textarea>
          </div>
          <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          {/* Image drop container */}
          <div
            ref={wrapperRef}
            className={`${styles.dropFileInput} ${image ? styles.withPreview : ''}`}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            {/* Image preview */}
            {image ? (
              <div className={styles.imagePreview}>
                <img src={URL.createObjectURL(image)} alt="Preview" />
                <div className={styles.deleteButton} onClick={fileRemove}>
                  <i className="fas fa-times"></i>
                </div>
              </div>
            ) : (
              <div className={styles.dropFileInputLabel}>
                <img src={uploadImg} alt="" />
                <p>Drag & Drop your image here or Click to browse files</p>
              </div>
            )}
            <input type="file" value="" onChange={onFileDrop} />
          </div>
        </div>
          <div className="mb-3">
            <label htmlFor="audio" className="form-label">
              Audio
            </label>
            <div className="position-relative">
            <div
              id="audio-dropzone"
              className={`form-control ${styles.dropzone} ${audio ? styles.hasAudio : ""}`}
              onDrop={handleAudioDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {audio ? (
                <div className={`${styles.uploadedAudio} d-flex justify-content-center align-items-center`}>
                  <audio controls>
                    <source src={URL.createObjectURL(audio)} type="audio/*" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ) : (
                <div className={styles.uploadBox}>
                  <span className={styles.uploadIcon}>
                    <i className="fas fa-cloud-upload-alt"></i>
                  </span>
                  <span className={styles.uploadText}>Upload file</span>
                </div>
              )}
            </div>
            <input
              type="file"
              id="audio-input"
              accept="audio/*"
              onChange={handleAudioChange}
              style={{ display: "none" }}
            />
            <div className="text-center mt-2">
              <label htmlFor="audio-input" className="btn btn-primary">
                Browse
              </label>
            </div>
          </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Specimen
          </button>
        </form>
      </div>
    </>
  );
  

}
export default AddSpecimen;