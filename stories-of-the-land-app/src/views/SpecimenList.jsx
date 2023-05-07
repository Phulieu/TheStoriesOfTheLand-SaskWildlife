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

const SpecimenList = () => {
    const [specimens, setSpecimens] = useState();

    useEffect(()=>{
        apiCalls.getAllPlant().then(
            (res)=>{
                setSpecimens(res.data.data);
            }
        ).catch(console.error);
    }, []);

    return (
        <SpecimenListContainer>
            {
                specimens && specimens.map(specimen =>
                    <Specimen
                        key={specimen._id}
                        title={specimen.plantName}
                        url={specimen.image}/>)
            }
        </SpecimenListContainer>
    );
};
export default SpecimenList; 