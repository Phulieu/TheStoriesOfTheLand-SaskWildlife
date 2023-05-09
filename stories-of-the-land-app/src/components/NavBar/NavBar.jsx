import Links from "../Links";
import Logo from "./Logo";
import styles from "./NavBar.module.css";

/**
 * Navigation bar component for the admin
 * @returns navigation bar
 */
const NavBar = () => {
    return(
        <div className={styles.container}>
            <nav className={`navbar navbar-expand-lg navbar-dark ${styles.navbar}`}>
                <Logo/>
                <Links/>
            </nav>
        </div>
    );
};

export default NavBar;
