import styled from "styled-components";

const SpecimenContainer = styled.div.attrs({
    className: 'card',
})``;

const SpecimenBody = styled.div.attrs({
    className: 'card-body'
})``;

const SpecimenImg = styled.img.attrs({
    className: 'card-img-top'
})``;

const SpecimenTitle = styled.h5.attrs({
    className: 'card-title'
})``;

const EditButton = styled.button.attrs({
    className: 'btn btn-primary'
})``;

function Specimen(){
    return(
        <SpecimenContainer>
            <SpecimenImg/>
            <SpecimenBody>
                <SpecimenTitle>Specimen Test</SpecimenTitle>
                <EditButton>Edit</EditButton>
            </SpecimenBody>
        </SpecimenContainer>
    );
}

export default Specimen;