import { useEffect, useState } from "react";
import { Specimen } from "../components";
import {NavBar} from "../components";
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
    <>
    <NavBar/>
    <div className="container py-5">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {specimens.map((specimen) => (
          <div key={specimen._id} className="col">
              <Specimen
                title={specimen.plantName}
                url={"http://localhost:3001" + specimen.image}
                onClick={() => handleSpecimenClick(specimen)}
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
        >
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
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
                  src={"http://localhost:3001" + selectedSpecimen.image}
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
    </>
  );
};

export default SpecimenList;
