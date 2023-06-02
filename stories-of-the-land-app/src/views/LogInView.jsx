import { useState } from "react";
import { UserInput } from "../components";
import { useNavigate } from "react-router-dom";
import styles from "./LogInView.module.css";
import apiCalls from "../api";

/**
 * Login page
 * @returns  {React.Component}
 */
function LogInView() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    /**
     * Logs in the user by making an API call to authenticate the provided username and password.
     * @param {string} username - The username to be used for login.
     * @param {string} password - The password to be used for login.
     */

    const loginUser = async (username, password) => {
        apiCalls
            .login({ username, password })
            .then((res) => {
                navigate("/plant/list");
                console.log(res.data.status);
                sessionStorage.setItem("userStatus",res.data.status);
            })
            .catch((err) => {
                setErrorMessage("Invalid username or password");
                console.log(err);
            });
    };

    /**
     * Handles key press events, specifically the Enter key.
     * @param {Object} event - The key press event object.
     */
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            loginUser(username, password);
        }
    };
     /**
     * Handles the change event for the username input field.
     * @param {Object} event - The change event object.
     */
    const handleUsernameChange = (event) => {
        setUsername(event);
        setErrorMessage("");
    };

    
    /**
     * Handles the change event for the password input field.
     * @param {Object} event - The change event object.
     */
    const handlePasswordChange = (event) => {
        setPassword(event);
        setErrorMessage("");
    };

    return (
        <div className={`${styles.loginBackground} w-100`}>
            <div className={styles.loginContainer}>
                <h2 className={styles.loginTitle}>User Login</h2>
                <div className={styles.loginForm}>
                    <label className={styles.loginLabel}>Username:</label>
                    <UserInput
                        setValue={handleUsernameChange}
                        initialValue=""
                        className={styles.loginInput}
                        onKeyPress={handleKeyPress}
                    />
                    <label className={styles.loginLabel}>Password:</label>
                    <UserInput
                        setValue={handlePasswordChange}
                        initialValue=""
                        type="password"
                        className={styles.loginInput}
                    />
                    <div className={styles.errorMessage}>{`${errorMessage} \u00A0`}</div>
                    <button
                        className={styles.loginButton}
                        onClick={() => {
                            loginUser(username, password);
                        }}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LogInView;
