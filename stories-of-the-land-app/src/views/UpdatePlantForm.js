import React, { useState } from 'react';

const UpdatePlantForm = ({ onSubmit }) => {
  const [plantName, setPlantName] = useState('');
  const [story, setStory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const handlePlantNameChange = (event) => {
    setPlantName(event.target.value);
  };

  const handleStoryChange = (event) => {
    setStory(event.target.value);
  };

  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleAudioFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Pass the form data to the onSubmit callback function
    onSubmit({ plantName, story, imageFile, audioFile });
    // Reset the form fields
    setPlantName('');
    setStory('');
    setImageFile(null);
    setAudioFile(null);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Update Plant</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Plant Name:</label>
            <input type="text" value={plantName} onChange={handlePlantNameChange} />
          </div>
          <div>
            <label>Story:</label>
            <textarea value={story} onChange={handleStoryChange} />
          </div>
          <div>
            <label>Image File:</label>
            <input type="file" onChange={handleImageFileChange} />
          </div>
          <div>
            <label>Audio File:</label>
            <input type="file" onChange={handleAudioFileChange} />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePlantForm;
