import { useEffect, useState } from "react";
import { Specimen } from "../components";
import { Link } from "react-router-dom";
import {NavBar} from "../components";
import apiCalls from "../api";
import styles from "./SpecimenList.module.css";

const backendURL = process.env.REACT_APP_BACKEND_IP || 'localhost';
/**
 * Component to generate Admin view of the specimen database
 * @returns Admin view for the database
 */
const SpecimenList = () => {
  const [specimens, setSpecimens] = useState([]);
  const [selectedSpecimen, setSelectedSpecimen] = useState(null);

  /**
   * API call to get all plants
   */
  useEffect(() => {
    apiCalls
      .getAllPlants()
      .then((res) => {
        setSpecimens(res.data.data);
      })
      .catch(console.error);
  }, []);

  // Functiont to view specimen modal
  const handleSpecimenClick = (specimen) => {
    setSelectedSpecimen(specimen);
  };

  // function to close modal
  const handleCloseModal = () => {
    setSelectedSpecimen(null);
  };


  return (
    <div className={styles.viewContainer}>
    <NavBar/>
    <div className="container py-5">
      <div className="row">
          <div className="col text-end">
            <Link to="/add-specimen" className="btn btn-primary mb-3">
              + Add Specimen
            </Link>
          </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {/* Map through the database */}
        {specimens.map((specimen) => (
          <div key={specimen._id} className="col" >
              <Specimen
                title={specimen.plantName}
                url={`http://${backendURL}:3001` + specimen.image}
                onClick={() => handleSpecimenClick(specimen)}
              />
          </div>
        ))}
      </div>
      {/* Modal view */}
      {selectedSpecimen && (
        <div
          className={`${styles.modal} modal fade show`}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document" >
            <div className="modal-content" style={{backgroundColor: "#edf5e0"}}>
              <div className="modal-header" style={{backgroundColor: "#edf5e0"}}>
                <h5 className="modal-title text-center w-100">{selectedSpecimen.plantName}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal}
                />
              </div>
              <div className="modal-body d-flex justify-content-center align-items-center flex-column">
                <img
                  src={`http://${backendURL}:3001` + selectedSpecimen.image}
                  alt="the specimen"
                  className="img-fluid mb-3"
                  style={{ maxWidth: "100%" }}
                />
                <p className="text-center">{selectedSpecimen.story}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default SpecimenList;
