import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faQrcode } from '@fortawesome/free-solid-svg-icons';


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

const QRButton = styled.button.attrs({
    className: 'btn btn-primary'
})``;

const EditButton = styled.button.attrs({
    className: 'btn btn-primary'
})``;

const DeleteButton = styled.button.attrs({
    className: 'btn btn-danger'
})``;

function Specimen(){
    return(
        <SpecimenContainer>
            <SpecimenImg/>
            <SpecimenBody>
                <SpecimenTitle>Specimen Test</SpecimenTitle>
                <QRButton><FontAwesomeIcon icon={faQrcode} /></QRButton>
                <EditButton><FontAwesomeIcon icon={faEdit} /></EditButton>
                <DeleteButton><FontAwesomeIcon icon={faTrash} /></DeleteButton>
            </SpecimenBody>
        </SpecimenContainer>
    );
}

export default Specimen;