import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faQrcode } from '@fortawesome/free-solid-svg-icons';


const SpecimenContainer = styled.div.attrs({
    className: 'card',
})`
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    justify-self: center;
    align-self: center;
`;

const SpecimenBody = styled.div.attrs({
    className: 'card-body'
})`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SpecimenImg = styled.img.attrs({
    className: 'card-img-top'
})`
    width: 80%;
    max-width: 200px;
`;

const SpecimenTitle = styled.h5.attrs({
    className: 'card-title'
})``;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const QRButton = styled.button.attrs({
    className: 'btn btn-primary'
})``;

const EditButton = styled.button.attrs({
    className: 'btn btn-primary'
})``;

const DeleteButton = styled.button.attrs({
    className: 'btn btn-danger'
})``;

function Specimen({title, url}){
    return(
        <SpecimenContainer>
            <SpecimenImg src={url}/>
            <SpecimenBody>
                <SpecimenTitle>{title}</SpecimenTitle>
                <ButtonGroup>
                    <QRButton><FontAwesomeIcon icon={faQrcode} /></QRButton>
                    <EditButton><FontAwesomeIcon icon={faEdit} /></EditButton>
                    <DeleteButton><FontAwesomeIcon icon={faTrash} /></DeleteButton>
                </ButtonGroup>
            </SpecimenBody>
        </SpecimenContainer>
    );
}

export default Specimen;