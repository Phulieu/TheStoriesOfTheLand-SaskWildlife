import { useState } from "react";
import { UserInput } from "../components";
import { useNavigate } from "react-router-dom";
import styles from "./LogInView.module.css";
import apiCalls from "../api";

function LogInView() {

    
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();


    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        apiCalls.login({username,password}).then(() => {
            navigate('/plant/list')
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <div className={`${styles.loginBackground} w-100`}>
            <div className={styles.loginContainer}>
            <h2 className={styles.loginTitle}>User Login</h2>
                    <div className={styles.loginForm}>
                        <label className={styles.loginLabel}>Username:</label>
                        <UserInput
                            setValue = {setUsername}
                            initialValue =""
                            className ={styles.loginInput}
                        />
                        <label className={styles.loginLabel}>Password:</label>
                        <UserInput
                            setValue = {setPassword}
                            initialValue =""
                            type = "password"
                            className ={styles.loginInput}
                        />
                        <button className={styles.loginButton} onClick = {() => {
                            loginUser(username,password);
                        }}>Login</button>
                    </div>
            </div>
        </div>
      );
}

export default LogInView;