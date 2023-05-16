import 'bootstrap/dist/css/bootstrap.min.css';
import QRCode from 'qrcode';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

/**
 * QRGeneration page
 * @returns  Component
 */
const QRGenerate = () => {
    const SpecimenID = useParams();
    const URL = useRef();
    const url = 'http://localhost:3000/plant/';
	  const [qr, setQr] = useState('');
    const calledAPI = useRef(false);
    URL.current = url + SpecimenID.SpecimenID;

    useEffect( ()=> {
      if(!calledAPI.current) {           
                calledAPI.current = true;
                console.log(URL.current);
                /* QR GERRATION API CALL */
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
          })
      }
    }, []);
    
    /**
     * Print page
     */
    function printQR(){
      window.print();
    }
    
    return(
      <div className='d-flex align-items-center justify-content-center'>
        {qr && <div>
          <img className='border-3' src={qr} alt='QR Code' />
          <span className='d-flex align-items-center justify-content-center d-print-none'>
            <a className = "btn btn-light btn-lg btn-radius btn-outline-dark" href={qr} download="qrcode.png">Download</a>
            <button onClick={printQR} className= "btn btn-light btn-lg btn-radius btn-outline-dark">Print</button>
          </span>
        </div>}
      </div>
  );
}

export default QRGenerate;
