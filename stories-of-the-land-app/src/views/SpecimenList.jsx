import { useEffect, useState } from "react";
import { Specimen } from "../components";
import apiCalls from "../api";

const SpecimenList = () => {
  const [specimens, setSpecimens] = useState([]);
  const [selectedSpecimen, setSelectedSpecimen] = useState(null);

  useEffect(() => {
    apiCalls
      .getAllPlants()
      .then((res) => {
        setSpecimens(res.data.data);
      })
      .catch(console.error);
  }, []);

  const handleSpecimenClick = (specimen) => {
    setSelectedSpecimen(specimen);
  };
  const handleCloseModal = () => {
    setSelectedSpecimen(null);
  };

  return (
    <div className="container py-5">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {specimens.map((specimen) => (
          <div
            key={specimen._id}
            className="col"
            onClick={() => handleSpecimenClick(specimen)}
          >
            <Specimen
              title={specimen.plantName}
              url={"http://localhost:3001" + specimen.image}
            />
          </div>
        ))}
      </div>
      {selectedSpecimen && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
          onClick={handleCloseModal}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedSpecimen.plantName}</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <img
                  src={"http://localhost:3001" + selectedSpecimen.image}
                  alt="the specimen"
                  className="img-fluid mb-3"
                />
                <p>Story of the land: {selectedSpecimen.story}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecimenList;
