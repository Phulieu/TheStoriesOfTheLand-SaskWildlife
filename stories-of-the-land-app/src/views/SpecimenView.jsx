import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./SpecimenView.module.css";
import apiCalls from "../api";
import volume from "../volume-up.svg";

const SpecimenView = () => {
  const specimenID = useParams();
  const [specimen, setSpecimen] = useState({});
  const calledAPI = useRef();

  useEffect(() => {
    if (!calledAPI.current) {
      calledAPI.current = true;
      apiCalls
        .getPlantById(specimenID.id)
        .then((res) => {
          setSpecimen(res.data.data);
        })
        .catch(console.error);
    }
  }, []);

  function audioPlay() {
    new Audio(specimen.audio).play();
  }

  return (
    <div className={styles.card}>
      <img src={specimen.image} alt="Tree" className={styles.image} />
      <div className={styles.info}>
        <h1 className={styles.title}>{specimen.plantName}</h1>
        <div className={styles.audioContainer}>
          <span className={styles.label}>Cree Pronunciation</span>
          <button className={styles.audioButton} onClick={audioPlay}>
            <img src={volume} alt="Volume icon" className={styles.volume} />
          </button>
        </div>
        <p className={styles.story}>{specimen.story}</p>
        <p className={styles.lorem}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
          provident alias maxime dolorum laudantium voluptatum optio molestiae
          unde natus, accusantium saepe. Pariatur, laborum in facere veniam
          suscipit qui molestias modi!
        </p>
      </div>
    </div>
  );
};

export default SpecimenView;
