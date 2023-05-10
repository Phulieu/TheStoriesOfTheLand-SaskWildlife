import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./SpecimenView.module.css";
import apiCalls from "../api";
import volume from "../volume-up.svg";
import axios from "axios";

const SpecimenView = () => {
  const { id } = useParams();
  const [specimen, setSpecimen] = useState({});
  const [language, setLanguage] = useState("en"); 

  const calledAPI = useRef();

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

  function audioPlay() {
    new Audio(specimen.audio).play();
  }

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
    <div className={styles.card}>
      <img src={specimen.image} alt="Tree" className={styles.image} />
      <div className={styles.buttonContainer}>
          <input type="checkbox" name="french" id="french" className={styles.toggleButton} onClick={handleLanguageToggle} />
          <label htmlFor="french" className={styles.frenchLabel}>French</label>
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{specimen.plantName}</h1>
        <div className={styles.audioContainer}>
          <span className={styles.label}>{language === "en" ? "Cree Pronunciation" : "Prononciation Cree" }</span>
          <button className={styles.audioButton} onClick={audioPlay}>
            <img src={volume} alt="Volume icon" className={styles.volume} />
          </button>
        </div>
        <p className={styles.story}>{ specimen.story}</p> 
      </div>
    </div>
  );
};

export default SpecimenView;
