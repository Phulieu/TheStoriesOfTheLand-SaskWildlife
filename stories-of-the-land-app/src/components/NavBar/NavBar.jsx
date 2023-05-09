import Links from "../Links";
import Logo from "./Logo";
import styles from "./NavBar.module.css";

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
