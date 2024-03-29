import { useEffect, useState, useRef } from "react";
import { Specimen } from "../components";
import { Link, useLocation } from "react-router-dom";
import { NavBar } from "../components";
import apiCalls from "../api";
import styles from "./SpecimenList.module.css";

const backendURL = process.env.REACT_APP_BACKEND_IP || "localhost";

/**
 * View all specimen page
 * @returns  {React.Component}
 */
const SpecimenList = () => {
  const [specimens, setSpecimens] = useState([]);
  const [selectedSpecimen, setSelectedSpecimen] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const listRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    apiCalls
      .getAllPlants()
      .then((res) => {
        setSpecimens(res.data.data);

        // Check for query parameter "scrollToBottom"
        const queryParams = new URLSearchParams(location.search);
        const scrollToBottom = queryParams.get("scrollToBottom");

        if (scrollToBottom === "true") {
          listRef.current.scrollIntoView({ behavior: "smooth" });
        }
      })
      .catch(console.error);
  }, [location]);
  /**
   * Handles the click event of a specimen.
   * @param {Object} specimen - The clicked specimen object.
   */
  const handleSpecimenClick = (specimen) => {
    setSelectedSpecimen(specimen);
  };
  /**
   * Handles the closing of the modal.
   */
  const handleCloseModal = () => {
    setSelectedSpecimen(null);
  };

  // Filter specimens based on the search term
  const filteredSpecimens = specimens.filter((specimen) =>
    specimen.plantName.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className={styles.viewContainer}>
      <NavBar />
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col text-end">
            <Link to="/add-specimen" className="btn btn-primary mb-3">
              + Add Specimen
            </Link>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filteredSpecimens.map((specimen) => (
            <div key={specimen._id} className="col">
              <Specimen
                id={specimen._id}
                title={specimen.plantName}
                url={`http://${backendURL}:3001` + specimen.image}
                onClick={() => handleSpecimenClick(specimen)}
              />
            </div>
          ))}
          <div ref={listRef} />
        </div>
        {/* Modal view */}
        {selectedSpecimen && (
          <div
            className={`${styles.modal} modal fade show`}
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content" style={{ backgroundColor: "#edf5e0" }}>
                <div className="modal-header" style={{ backgroundColor: "#edf5e0" }}>
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
                  <audio controls src={`http://${backendURL}:3001` + selectedSpecimen.audio} className="mb-3" />
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
