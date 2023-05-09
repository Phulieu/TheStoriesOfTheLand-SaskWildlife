import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faQrcode } from '@fortawesome/free-solid-svg-icons';

function Specimen({ title, url, onClick }) {
  return (
    <div className="card" style={{ width: '100%', height: '400px' }}>
      <img
        className="card-img-top"
        src={url}
        alt="Specimen"
        style={{ objectFit: 'cover', height: '60%', cursor: 'pointer' }}
        onClick={onClick}
      />
      <div className="card-body">
        <h5
          className="card-title text-center mt-3"
          style={{ cursor: 'pointer' }}
          onClick={onClick}
        >
          {title}
        </h5>
        <div className="d-flex justify-content-center mt-auto">
          <button className="btn btn-primary mr-2">
            <FontAwesomeIcon icon={faQrcode} />
          </button>
          <button className="btn btn-primary mr-2">
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-danger">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Specimen;
