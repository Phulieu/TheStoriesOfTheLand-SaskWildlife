  import { useEffect, useRef, useState } from "react";
  import { useParams } from "react-router-dom";
  import { useNavigate } from "react-router-dom";
  import apiCalls from "../api";
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
    const [isToggled, setIsToggled] = useState(false);
    const navigate = useNavigate();

    async function handleClick (){
      setIsToggled(!isToggled);
      // handleLanguageToggle();
    };
  
    const buttonStyle = {
      display: 'inline-block',
      width: '52px',
      height: '26px',
      backgroundColor: isToggled ? '#702082' : '#a7a8aa',
      border: 'none',
      borderRadius: '13px',
      cursor: 'pointer',
    };
  
    const spanStyle = {
      display: 'inline-block',
      width: '50%',
      height: '100%',
      backgroundColor: 'white',
      borderRadius: '50%',
      transition: 'margin-left 0.3s',
      marginLeft: isToggled ? '60%' : '-15%',
      marginRight: isToggled ? '0%' : '100%',
      marginBottom: '10%',
    };

    const containerStyle = {
      display: 'flex',
      alignItems: 'center',
      marginRight: '20px',
    };

    const labelStyle = {
      marginRight: '5px',
    };

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

    /** This function redirects to the feedback form */
    function handleFeedbackClick() {
      navigate(`/plant/${id}/feedback`);
    }

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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container d-flex justify-content-center">
          <a className="navbar-brand d-flex align-items-center justify-content-center" href="https://saskpolytech.ca/" style={{marginRight: '-10px'}}>
            <img src={SaskPolyLogo} alt="Logo 1" style={{ maxHeight: "40px", margin: "0px -20px 0px 20px" }} />
          </a>
          <a className="navbar-brand d-flex align-items-center justify-content-center" href="https://swf.sk.ca/" style={{marginLeft: '50px'}}>
            <img src={SWFLogo} alt="Logo 2" style={{ maxHeight: "40px", margin: "0 auto" }} />
          </a>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col p-0 text-center" style={{ backgroundColor: "#a7a8aa"}}>
            <img
              src={`http://${backendURL}:3001` + specimen.image}
              alt="Specimen"
              className="img-fluid"
            />
            <div
              className="position-absolute w-150"
              style={{ marginTop: "-10px", backgroundColor: "white", borderRadius: "10px" }}
            >
              <div className="container">
                <div className="row">
                <div className="col">
                <h2 className="mt-4 fw-bold" style={{ textAlign: "center", marginBottom: "20px", marginTop: "20px", fontSize: "2.5rem" }}>{specimen.plantName}</h2>

                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-primary me-2"
                    onClick={()=>{audioPlay()}}
                    style={{
                      backgroundColor: "#702082",
                      color: "white",
                      borderRadius: "4px",
                      padding: "5px 10px",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "16px",
                      margin: "0px 0px 0px 20px"
                    }}
                  >
                    <i className="fas fa-play me-2"></i>
                    Cree Pronunciation
                  </button>

            <div style={containerStyle}>
            <span style={labelStyle}>French</span>
              <button style={buttonStyle} onClick={handleClick}>
                <span style={spanStyle}></span>
              </button>
              
            </div>
          </div>
          <div
              style={{
                height: "35vh",
                overflow: "auto",
                margin: "50px 20px 0px 20px",
              }}
            >
                    <p style={{
                margin: "0px 20px 20px 20px",
              }}>{specimen.story}</p>
                    </div>
                    <div className="text-center mt-4">
        <button className="btn btn-primary mb-42" style={{backgroundColor: '#702082'}} onClick={handleFeedbackClick}>Give us some feedback</button>
      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  };

  export default SpecimenView;
