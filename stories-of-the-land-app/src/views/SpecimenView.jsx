import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./SpecimenView.module.css";
import apiCalls from "../api";
import volume from "../volume-up.svg";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const backendURL = process.env.REACT_APP_BACKEND_IP || "localhost";

/**
This component displays a specimen's details and allows the user to toggle between English and French language.
@returns {React.Component}
*/


const SpecimenView = () => {
  const { id } = useParams();
  const [specimen, setSpecimen] = useState({});
  const [language, setLanguage] = useState("en"); 

  const calledAPI = useRef();

  /**
  This function translates text from English to French using a third-party API.
  @param {string} item - The text to be translated
  @returns {string} - the translated text in French
  */
  async function translateToFrench(item) {
    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', 'en');
    encodedParams.set('target_language', 'fr');
    encodedParams.set('text', item);

    const options = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'b978f12daemsh570a9b1df250e56p1966efjsnbd0b15550eee',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      return response.data.data.translatedText;
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (!calledAPI.current) {
      calledAPI.current = true;
      apiCalls
        .getPlantById(id)
        .then((res) => {
          setSpecimen(res.data.data);
        })
        .catch(console.error);
    }

  }, [id]);

  /**
    This function plays the audio file associated with the specimen.
  */
  function audioPlay() {
    new Audio(`http://${backendURL}:3001`+specimen.audio).play();
  }

  /**
    This function toggles the language between English and French for the specimen's details.
  */
  async function handleLanguageToggle() {
    if (language === "en") {
      // Translate to French
      const fStory = await translateToFrench(specimen.story);
      const fName = await translateToFrench(specimen.plantName);
      const fSpecimen = { ...specimen, plantName: fName, story: fStory };
      setSpecimen(fSpecimen);
      setLanguage("fr");
    } else {
      // Revert to English
      apiCalls
      .getPlantById(id)
      .then((res) => {
      setSpecimen(res.data.data);
      })
      .catch(console.error);
      setLanguage("en");
      }
    }

  
  return (
    <div className={`${styles.card} card`}>
      <img src={`http://${backendURL}:3001`+specimen.image} alt="Tree" className={`${styles.image}`} />
      <div className={`${styles.buttonContainer} card-body`}>
        <div >
          <input type="checkbox" className={styles.toggleButton} id="french" onClick={handleLanguageToggle} />
          <label className={styles.frenchLabel} htmlFor="french">{language === "en" ? "French" : "Français"}</label>
        </div>
      </div>
      <div className={`${styles.info} card-body`}>
        <h1 className={`${styles.title} card-title`}>{specimen.plantName}</h1>
        <div className={styles.audioContainer}>
          <span className={styles.label}>{language === "en" ? "Cree Pronunciation" : "Prononciation Cree" }</span>
          <button className={`btn ${styles.audioButton}`} onClick={audioPlay}>
            <img src={volume} alt="Volume icon" className={styles.volume} />
          </button>
        </div>
        <p className={`${styles.story} card-text`}>{ specimen.story}</p> 
      </div>
    </div>
  );
};

export default SpecimenView;
