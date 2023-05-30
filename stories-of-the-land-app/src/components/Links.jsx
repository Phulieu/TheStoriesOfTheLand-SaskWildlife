import {Link} from 'react-router-dom';

/**
 * Returns component for navigation
 * @returns Creates link to navigate to routes
 */
const Links = () => {
    return(
        <>
            <Link className="navbar-brand" to="/plant/list">Stories of the Land App</Link>
            <div className = 'navbar-nav me-auto'>
                <Link className="nav-link" to="/plant/list">Specimens</Link>
                <Link className="nav-link"> Feedback</Link>
            </div>
        </>
    );
};

export default Links;
