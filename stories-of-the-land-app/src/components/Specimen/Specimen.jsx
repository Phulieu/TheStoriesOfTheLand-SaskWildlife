import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faQrcode } from '@fortawesome/free-solid-svg-icons';
import styles from "./Specimen.module.css";

function Specimen({ title, url, onClick }) {
  return (
    <div className={`card ${styles.card}`}>
      <img
        className="card-img-top"
        src={url}
        alt="Specimen"
        style={{ objectFit: 'cover', height: '60%', cursor: 'pointer' }}
        onClick={onClick}
      />
      <div className={`card-body ${styles.cardBody}`}>
        <h5
          className={`card-title text-center mt-3 ${styles.title}`}
          style={{ cursor: 'pointer' }}
          onClick={onClick}
        >
          {title}
        </h5>
        <div className={`d-flex justify-content-center mt-auto ${styles.buttons}`}>
          <button className={`btn btn-primary mr-2 ${styles.button} ${styles.buttonNormal}`}>
            <FontAwesomeIcon icon={faQrcode} />
          </button>
          <button className={`btn btn-primary mr-2 ${styles.button} ${styles.buttonNormal}`}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className={`btn btn-danger ${styles.button} ${styles.buttonDelete}`}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Specimen;
