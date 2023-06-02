import {Link} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import apiCalls from '../api';

/**
 * Returns component for navigation
 * @returns Creates link to navigate to routes
 */
const Links = () => {

    const userStatus = sessionStorage.getItem("userStatus");

    const [unreadFeedbackCount, setUnreadFeedbackCount] = useState(0);
   
    useEffect(() => {
        console.log(unreadFeedbackCount, "count"); // Log the initial state value
    
        apiCalls.getFeedbackCount()
            .then((res) => {
                const count = res.data.count;
                console.log(count, "count"); // Log the fetched count
                setUnreadFeedbackCount(count); // Update the state with the fetched count
            })
            .catch(console.error);
    }, []);
    
      
    return(
        <>
            <Link className="navbar-brand" to="/plant/list">Stories of the Land App</Link>
            <div className = 'navbar-nav me-auto'>
                <Link className="nav-link" to="/plant/list">Specimens</Link>
                <Link className="nav-link" to="/feedback/list">
        Feedback {unreadFeedbackCount > 0 && <span className="badge bg-danger">{unreadFeedbackCount}</span>}
      </Link>
                {(userStatus === "master") && <Link className="nav-link" to="/usermanagement">User Management</Link>}
            </div>
        </>
    );
};

export default Links;
