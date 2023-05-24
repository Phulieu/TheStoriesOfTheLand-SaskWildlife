import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiCalls from '../api';
import { NavBar } from '../components';
import styles from "./UpdatePlantForm.module.css";

const UpdatePlantForm = () => {
 // const { id } = useParams();
  const SpecimenID = useParams();
  console.log(SpecimenID.SpecimenID);
  const apiCalled = useRef(false);
  const [oldPlantName, setPlantName] = useState('');
  const [oldStory, setStory] = useState('');
  const [oldImage, setImage] = useState(null);
  const [oldAudio, setAudio] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [newAudio, setNewAudio] = useState(null);

  const wrapperRef = useRef(null);
  const backendURL = process.env.REACT_APP_BACKEND_IP || 'localhost';

  const handlePlantNameChange = (event) => {
    setPlantName(event.target.value);

  };

  const handleStoryChange = (event) => {
    setStory(event.target.value);
  };

  const handleImageFileChange = (event) => {

    const newFile = event.target.files[0];
    if (newFile) {
      const modifiedFileName = Date.now() + '-' + newFile.name;
      const modifiedFile = new File([newFile], modifiedFileName, { type: newFile.type });
      setNewImage(modifiedFile);
      console.log("updated file of image:"+modifiedFile.name);
    }    
  };

  const handleAudioFileChange = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      const modifiedFileName = Date.now() + '-' + newFile.name;
      const modifiedFile = new File([newFile], modifiedFileName, { type: newFile.type });
      setNewAudio(modifiedFile);
      console.log(modifiedFile);
    }

   
  };

  const navigate = useNavigate();

 
  useEffect(() => {
    if (!apiCalled.current) {
      apiCalled.current = true;
      apiCalls.getPlantById(SpecimenID.SpecimenID)
        .then((res) => {
          console.log("old values of image: " + res.data.data.image);
          console.log("old values of audio: " + res.data.data.audio);
  
          setPlantName(res.data.data.plantName);
          setStory(res.data.data.story);
  
          // Fetch the image file
          const fetchImage = async () => {
            try {
              const imageResponse = await fetch(`http://${backendURL}:3001${res.data.data.image}`);
              const imageBlob = await imageResponse.blob();
              const imageURL = URL.createObjectURL(imageBlob);
              const imageFile = new File([imageBlob], res.data.data.image);
              setImage({ file: imageFile, url: imageURL });
              console.log("existing image file: " + res.data.data.image);
            } catch (error) {
              console.log('Error fetching image:', error);
            }
          };
  
          // Fetch the audio file
          const fetchAudio = async () => {
            try {
              const audioResponse = await fetch(`http://${backendURL}:3001${res.data.data.audio}`);
              const audioBlob = await audioResponse.blob();
              const audioURL = URL.createObjectURL(audioBlob);
              const audioFile = new File([audioBlob], res.data.data.audio);
              setAudio({ file: audioFile, url: audioURL });
              console.log("existing audio file: " + res.data.data.audio);
            } catch (error) {
              console.log('Error fetching audio:', error);
            }
          };
  
          fetchImage();
          fetchAudio();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [SpecimenID.SpecimenID]); 
  
  
  

  

  const updateHandler = async (e) => {
    e.preventDefault();
      console.log("image before calling api"+oldImage);
    try {
      let updatedImage = oldImage.file;
      let updatedAudio = oldAudio.file;
  
      // Check if new image file is selected
      if (newImage) {
        updatedImage = newImage;
      }
  
      // Check if new audio file is selected
      if (newAudio) {
        updatedAudio = newAudio;
      }
      const payload = {
        plantName: oldPlantName,
        story: oldStory,
        image: updatedImage,
        audio: updatedAudio
      };
      console.log("calling api");
      const response = await apiCalls.updatePlant(payload,SpecimenID.SpecimenID);
      console.log('Update success:', response);
      // Show alert
      alert("Specimen updated successfully!");

      // Redirect to "/"
      navigate("/plant/list?scrollToBottom=true");
    } catch (error){
      console.log("Este error:")
      console.error(error);
    }
  };

  const onDragEnter = () => wrapperRef.current.classList.add('dragover');
  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
  const onDrop = () => wrapperRef.current.classList.remove('dragover');

  const imageRemove = () => {
    setImage(null);
  };

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <h2 className="text-center">Update Specimen</h2>
        <form onSubmit={updateHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={oldPlantName}
              onChange={handlePlantNameChange}
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
              value={oldStory}
              onChange={handleStoryChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <div
              ref={wrapperRef}
              className={`${styles.dropFileInput} ${oldImage ? styles.withPreview : ''}`}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
            {oldImage && !newImage ? (
      <div className={styles.imagePreview}>
        <img src={oldImage instanceof File ? URL.createObjectURL(oldImage) : oldImage.url} alt="Preview" />   
        <div className={styles.deleteButton} onClick={imageRemove}>
          <i className="fas fa-times"></i>
        </div>
      </div>
    ) : newImage ? (
      <div className={styles.imagePreview}>
        <img src={URL.createObjectURL(newImage)} alt="Preview" />
      </div>
    ) : (
      <div className={styles.dropFileInputLabel}>
        <img src={oldImage} alt="Placeholder" />
        <p>Drag & Drop your image here or Click to browse files</p>
      </div>
    )}
    <input type="file" onChange={handleImageFileChange} />
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
                onChange={handleAudioFileChange}
              />
            {oldAudio && (
  <div className="mt-3">
    <audio id="audioPlayer" src={newAudio ? URL.createObjectURL(newAudio) : oldAudio.url} controls />
  </div>
)}
            </div>
          </div>

          <div className={styles.buttonsContainer}> 
            <button type="submit" className={styles.addSpecimenButton}>
              Update Specimen
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
};

export default UpdatePlantForm;
