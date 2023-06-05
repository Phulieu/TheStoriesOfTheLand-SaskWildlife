import { useEffect, useRef, useState } from "react";
import apiCalls from "../api";
import { NavBar } from "../components";
import styles from "./UserManagement.module.css";

/**
 * UserManagement component handles the management of users, including adding, deleting, and resetting passwords.
 */

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const calledAPI = useRef(false);
    const [modalState, setModalState] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (!calledAPI.current) {
            calledAPI.current = true;
            apiCalls
                .getAllUser()
                .then((res) => {
                    setUsers(res.data.data);
                })
                .catch(console.error);
        }
    }, []);


    /**
     * Handles the creation of a new user.
     * @param {string} username - The username of the new user.
     */
    const handleCreateUser = async (username) => {
        const body = {
            username : username,
            status: "common"
        }
        apiCalls.registerUser(body).then( () => {
            alert(`New user is created and send to ${username}`);
            setModalState(false);
            setUsername("");
            window.location.reload();
        }
            
        ).catch(console.error)
    }
  
    /**
     * Handles the deletion of a user.
     * @param {string} id - The ID of the user to be deleted.
     */
    const handleDeleteUser = async (id) => {
        
        if (window.confirm("Are you sure to delete this user?")){
            apiCalls.deleteUser(id).then(() =>{
                window.location.reload();
            }).catch((err) =>{
                console.log(err);
            });
        }
    }

    /**
     * Handles the password reset for a user.
     * @param {string} id - The ID of the user.
     * @param {string} username - The username of the user.
     */
    const handleResetPassword = async (id,username) => {
        const body = {username};
        if (window.confirm("Are you sure to reset password this user?")){
            apiCalls.resetPassword(id,body).then(() =>{
                alert("New password had beeen sent to user email!")
            }).catch((err) =>{
                console.log(err);
            });
        }
    }

    return (
        <div>
            <NavBar />
            <div className="col text-end">
                <button className="btn btn-primary mb-3" style={{"backgroundColor" : "#1a3c34"}} onClick={() => {setModalState(true)}}>
                    + Add User
                </button>
            </div>
            {(sessionStorage.getItem("userStatus") === "master") && (
                <div className={styles.tableContainer}>
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.status}</td>
                                    <td>
                                        <button className={`${styles.resetButton} reset-button`} onClick={() => { handleResetPassword(user._id,user.username)}}>Reset Password</button>
                                        {(user.status !== "master") && <button className={`${styles.deleteButton} delete-button`} onClick={()=> handleDeleteUser(user._id) }>Delete</button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {modalState && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Add User</h3>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button className={`${styles.createButton} create-button`}  onClick={() => handleCreateUser(username)}>Create</button>
                        <button className={`${styles.cancelButton} cancel-button`} onClick={() => setModalState(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
