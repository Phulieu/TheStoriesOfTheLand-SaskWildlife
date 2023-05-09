import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faQrcode } from '@fortawesome/free-solid-svg-icons';
import styles from "./Specimen.module.css";

/**
 * Component to render specimen view for Admin
 * @param {title} title for the  specimen
 * @param { url } url for the image
 * @param { onClick } funtion to handle event
 * @returns Specimen view 
 */
function Specimen({ title, url, onClick }) {
  return (
    <div className={`card ${styles.card}`}>
    {/* // Specimen Card */}
      {/* Image element */}
      <img
        className="card-img-top"
        src={url}
        alt="Specimen"
        style={{ objectFit: 'cover', height: '60%', cursor: 'pointer' }}
        onClick={onClick}
      />
      <div className={`card-body ${styles.cardBody}`}>
      {/* Specimen card body with specimn title, audio file, story */}
        <h5
          className={`card-title text-center mt-3 ${styles.title}`}
          style={{ cursor: 'pointer' }}
          onClick={onClick}
        >
          {title}
        </h5>
        {/* Buttons for Delete, Update and Generate QR code */}
        <div className={`d-flex justify-content-center mt-auto ${styles.buttons}`}>
          {/* Button to generate QR code */}
          <button className={`btn btn-primary mr-2 ${styles.button} ${styles.buttonNormal}`}>
            <FontAwesomeIcon icon={faQrcode} />
          </button>
          {/* Button for edit/ update specimen informaton */}
          <button className={`btn btn-primary mr-2 ${styles.button} ${styles.buttonNormal}`}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          {/* Button to delete specimen from database */}
          <button className={`btn btn-danger ${styles.button} ${styles.buttonDelete}`}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Specimen;
