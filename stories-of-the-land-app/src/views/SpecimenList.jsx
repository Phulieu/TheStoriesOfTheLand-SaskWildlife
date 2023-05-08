import { useEffect, useState } from "react";
import { Specimen } from "../components";
import styled from "styled-components";
import apiCalls from "../api";

const SpecimenListContainer = styled.div`
    display: grid;
    min-height: 100vh;
    grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
    gap: 0 16px;
    align-items: center;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalContent = styled.div`
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  max-height: 80%;
  width: 400px;
  height: 350px;
  overflow-y: auto;
`;
const CloseButton = styled.span`
  position: absolute;
  top: -2px;
  right: 12px;
  font-size: 30px;
  cursor: pointer
`;
const SpecimenList = () => {
    const [specimens, setSpecimens] = useState();

    useEffect(()=>{
        apiCalls.getAllPlants().then(
            (res)=>{
                setSpecimens(res.data.data);
            }
        ).catch(console.error);
    }, []);
    const [selectedSpecimen,setSelectedSpecimen] = useState(null);
    
    const handleSpecimenClick = (specimen) => {
        setSelectedSpecimen(specimen);
    }
    const handleCloseModal = () => {
      setSelectedSpecimen(null);
    }

    return (
      
        <SpecimenListContainer>
            {
                  specimens && specimens.map(specimen =>
                    <div onClick={() => handleSpecimenClick(specimen)}>
                        <Specimen
                        key={specimen.id}
                        title={specimen.name}
                        url={specimen.imageUrl}/>
                    </div>
                    )
            }
            {selectedSpecimen && (
              <ModalContainer>
                <ModalContent>
                  <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
                  <h2>{selectedSpecimen.name}</h2>
                  <img src={selectedSpecimen.imageUrl} alt="the specimen" />
                  <p>Story of the specimen: Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore magni, nobis eveniet consequatur exercitationem recusandae in, magnam mollitia facilis hic voluptas numquam distinctio deserunt tempora fugit omnis, modi rem iusto.</p>
                </ModalContent>
              </ModalContainer>
            )}
        </SpecimenListContainer>
    );
};
export default SpecimenList; 