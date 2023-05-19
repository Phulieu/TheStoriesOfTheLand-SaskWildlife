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
            <Link className="navbar-brand" >Stories of the Land App</Link>
            <List>
                <Link className="nav-link" to="/plant/list">Specimens</Link>
                <Link className="nav-link" to="/add-specimen">Create</Link>
                <Link className="nav-link">Update</Link>
            </List>
        </>
    );
};

export default Links;
