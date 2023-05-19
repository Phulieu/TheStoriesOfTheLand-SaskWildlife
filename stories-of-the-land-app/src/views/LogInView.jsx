import { useState } from "react";
import { UserInput } from "../components";
import { useNavigate } from "react-router-dom";
import styles from "./LogInView.module.css";
import apiCalls from "../api";

function LogInView() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        apiCalls
            .login({ username, password })
            .then(() => {
                navigate("/plant/list");
            })
            .catch((err) => {
                setErrorMessage("Invalid username or password");
                console.log(err);
            });
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            loginUser(username, password);
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event);
        setErrorMessage("");
    };

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
