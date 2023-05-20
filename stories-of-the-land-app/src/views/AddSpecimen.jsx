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

  const handleAudioChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const modifiedFileName = Date.now() + '-' + newFile.name;
      const modifiedFile = new File([newFile], modifiedFileName, { type: newFile.type });
      setAudio(modifiedFile);
      console.log(modifiedFile);
    }
  };

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
    } catch (error){
      console.log("Este error:")
      console.error(error);
    }
  };

  const onDragEnter = () => wrapperRef.current.classList.add('dragover');

  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

  const onDrop = () => wrapperRef.current.classList.remove('dragover');

  const onImageDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const modifiedFileName = Date.now() + '-' + newFile.name;
      const modifiedFile = new File([newFile], modifiedFileName, { type: newFile.type });
      setImage(modifiedFile);
      console.log(modifiedFile);
    }
  };

  const imageRemove = () => {
    setImage(null);
  };

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <h2 className="text-center">Add New Specimen</h2>
        <form onSubmit={(e) => handleFormSubmit(e)}>
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
            <div className="d-flex flex-column align-items-center">
              <input
                type="file"
                className="form-control"
                accept="audio/*"
                onChange={handleAudioChange}
                required
              />
              {audio && (
                <div className="mt-3">
                  <audio id="audioPlayer" src={audio} controls />
                </div>
              )}
            </div>
          </div>
          <button type="submit" className={styles.addSpecimenButton}>
            Add Specimen
          </button>
        </form>
      </div>
    </>
  );
  
  

}
export default AddSpecimen;