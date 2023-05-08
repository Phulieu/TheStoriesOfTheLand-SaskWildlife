import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import apiCalls from "../api";
import volume from "../volume-up.svg";
const INFO = styled.div.attrs({
    
})`
        
    border-radius: 50px,
    margin: auto,
    background-color: beige solid;
        
    `;
        
const AudioPlay = styled.button.attrs({
    className: 'btn btn-secondary'
})`width: 15px,
height: 15px,
border-radius: 50px`
;

const Div = styled.div.attrs({
    className: 'card p-3 mb-2 bg-light position-absolute bottom-25'
})`width: 480px`;

const Card = styled.div.attrs({
    className: 'container'
})`width: 480px
position: relative
`;

const Img = styled.img.attrs({
    
})`width: 480px,
position: relative
`;

const Volume = styled.img.attrs({
    
})``;

const SpecimenView = () => {

    const specimenID = useParams();
    const [specimen,setSpecimen] = useState({});
    const calledAPI = useRef();

    useEffect( ()=> {
        if(!calledAPI.current) {
            calledAPI.current = true;
            apiCalls.getPlantById(specimenID.id).then(
                (res) => {
                    setSpecimen(res.data.data);
                }
            ).catch(console.error);
        } 
    }, []);

    function audioPlay() {
        new Audio(specimen.audio).play();
    }
    
    return (
        <Card class = "container">
            <Img src =  {specimen.image} alt="Tree"/>
            <Div>
                <INFO>
                    
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item bg-light">
                            <h1 class = "card-title">{specimen.plantName}</h1> 
                        </li>
                        <li class="list-group-item bg-light">Cree &nbsp;&nbsp;&nbsp;
                            <AudioPlay onClick={audioPlay}>
                                <Volume src = {volume} />
                            </AudioPlay>
                        </li>
                        <li class="list-group-item bg-light"><p>{specimen.story}</p></li>
                    </ul>

                </INFO>
            </Div>
        </Card>
    );
};

export default SpecimenView; 