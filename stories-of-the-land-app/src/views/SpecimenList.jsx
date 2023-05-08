import { useState } from "react";
import { Specimen } from "../components";
import styled from "styled-components";

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
    const [selectedSpecimen,setSelectedSpecimen] = useState(null);
    // Mocked Data
    // Refactor to call API
    const specimens = [
        {
          id: 1,
          name: "SpecimenTest",
          imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
        },
        {
          id: 2,
          name: "SpecimenTest",
          imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
        },
        {
          id: 3,
          name: "SpecimenTest",
          imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
        },
        {
          id: 4,
          name: "SpecimenTest",
          imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
        },
        {
          id: 5,
          name: "SpecimenTest",
          imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
        },
        {
          id: 6,
          name: "SpecimenTest",
          imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
        },
        {
          id: 7,
          name: "SpecimenTest",
          imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
        },
        {
          id: 8,
          name: "SpecimenTest",
          imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png"
        },
        {
          id: 9,
          name: "SpecimenTest",
          imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png"
        },
        {
          id: 10,
          name: "SpecimenTest",
          imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png"
        }
      ];

    const handleSpecimenClick = (specimen) => {
        setSelectedSpecimen(specimen);
    }
    const handleCloseModal = () => {
      setSelectedSpecimen(null);
    }

    return (
      
        <SpecimenListContainer>
            {
                specimens.map(specimen =>
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