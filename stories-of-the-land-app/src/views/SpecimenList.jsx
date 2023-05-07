import { Specimen } from "../components";
import styled from "styled-components";

const SpecimenListContainer = styled.div`
    display: grid;
    min-height: 100vh;
    grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
    gap: 0 16px;
    align-items: center;
`;

const SpecimenList = () => {
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

    return (
        <SpecimenListContainer>
            {
                specimens.map(specimen =>
                    <Specimen
                        key={specimen.id}
                        title={specimen.name}
                        url={specimen.imageUrl}/>)
            }
        </SpecimenListContainer>
    );
};
export default SpecimenList; 