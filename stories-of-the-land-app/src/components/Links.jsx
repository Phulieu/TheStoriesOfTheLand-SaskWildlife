import {Link} from 'react-router-dom';
import styled from 'styled-components';

const List = styled.div.attrs({
    className: 'navbar-nav me-auto'
})``;

/**
 * Returns component for navigation
 * @returns Creates link to navigate to routes
 */
const Links = () => {
    return(
        <>
            <Link className="navbar-brand" to="/">Stories of the Land App</Link>
            <List>
                <Link className="nav-link" to="/plant/list">Specimens</Link>
            </List>
        </>
    );
};

export default Links;
