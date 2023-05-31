  import { useEffect, useRef, useState } from "react";
  import { useParams } from "react-router-dom";
  import styles from "./SpecimenView.module.css";
  import apiCalls from "../api";
  import volume from "../volume-up.svg";
  import axios from "axios";
  import "bootstrap/dist/css/bootstrap.min.css";
  import SaskPolyLogo from "../assets/logos/Saskatchewan_Polytechnic.png"
  import SWFLogo from "../assets/logos/SWF-Logo.png"

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
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container">
            <a className="navbar-brand" href="#"><img src={SaskPolyLogo} alt="Logo 1" style={{maxHeight: '40px'}}/></a>
            <a className="navbar-brand" href="#"><img src={SWFLogo} alt="Logo 2" style={{maxHeight: '40px'}}/></a>
          </div>
        </nav>
        <div class="container">
          <div class="row">
            <div class="col">
              <img src="path/to/image.jpg" alt="Specimen Image" class="img-fluid"/>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col">
              <h2>Specimen Information</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default SpecimenView;
