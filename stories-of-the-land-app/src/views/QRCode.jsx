import 'bootstrap/dist/css/bootstrap.min.css';
import QRCode from 'qrcode';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./QRCode.module.css";
import { NavBar } from '../components';
import apiCalls from '../api';

const backendURL = process.env.REACT_APP_BACKEND_IP || 'localhost';
/**
 * QRGeneration page
 * @returns  {React.Component}
 */
const QRGenerate = () => {
    const {SpecimenID} = useParams();
    const [specimenName,setSpecimenName] = useState('');
    const URL = useRef();
    const url = `http://${backendURL}:3000/plant/`;
	  const [qr, setQr] = useState('');
    const calledAPI = useRef(false);
    URL.current = url + SpecimenID;

    useEffect( ()=> {
      if(!calledAPI.current) {           
        calledAPI.current = true;
        /* Get Specimen name */
        apiCalls.getPlantById(SpecimenID)
                .then((res) => {
                  setSpecimenName(res.data.data.plantName);
                })
                .catch(console.error);
        /* QR GENERATION API CALL */
        QRCode.toDataURL(URL.current, {
            height: 400,
            width: 400,
            margin: 2,
            color: {
            dark: '#000000',
            light: '#EEEEEEFF'
          }
        }, (err, url) => {
          if (err) 
            return alert("QR couldn't be generated");
          setQr(url);
        });
      }
    }, [SpecimenID]);
    
    /**
     * Print page
     */
    function printQR(){
      window.print();
    }
    
    return(

      <div className={styles.qrBackground}>
        <NavBar />
        <div className={styles.qrContainer}>
        {qr && (
          <div>
            <h1 style={{'textAlign': 'center'}}>{specimenName}</h1>
            <img className={styles.qrImage} src={qr} alt="QR Code" />
            <span className={`${styles.qrButtonContainer} d-print-none`}>
              <a
                className={`${styles.qrButton} btn btn-lg btn-radius btn-outline-dark`}
                href={qr}
                download={`${specimenName}.png`}
              >
                Download
              </a>
              <button
                onClick={printQR}
                className={`${styles.qrButton} btn btn-lg btn-radius btn-outline-dark`}
              >
                Print
              </button>
            </span>
          </div>
        )}
      </div>
      </div>
  );
}

export default QRGenerate;
