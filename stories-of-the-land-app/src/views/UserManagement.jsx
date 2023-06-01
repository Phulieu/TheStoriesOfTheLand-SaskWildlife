import { useEffect, useRef, useState } from "react";
import apiCalls from "../api";
import { NavBar } from "../components";
import styles from "./UserManagement.module.css";

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
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.status}</td>
                                    <td>
                                        <button className={`${styles.resetButton} reset-button`}>Reset Password</button>
                                        <button className={`${styles.deleteButton} delete-button`}>Delete</button>
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
                        <button className={`${styles.createButton} create-button`} >Create</button>
                        <button className={`${styles.cancelButton} cancel-button`} onClick={() => setModalState(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
