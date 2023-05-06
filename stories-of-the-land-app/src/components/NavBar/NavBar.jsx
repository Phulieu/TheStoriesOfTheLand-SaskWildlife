import Links from "../Links";
import Logo from "./Logo";
import styled from 'styled-components';

const Container = styled.div.attrs({
    className: 'container'
})``;

const Nav = styled.div.attrs({
    className: 'navbar navbar-expand-lg navbar-dark'
})`margin-bottom: 20px; background-color: #4506af`;

const NavBar = () => {
    return(
        <Container>
            <Nav>
                <Logo/>
                <Links/>
            </Nav>
        </Container>
    );
};

export default NavBar;
