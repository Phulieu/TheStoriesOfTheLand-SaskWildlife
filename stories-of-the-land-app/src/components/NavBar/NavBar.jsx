
import Links from '../Links';
import Logo from './Logo';
import styles from './NavBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import apiCalls from '../../api';
import { useNavigate } from 'react-router-dom';

/**
 * Navigation bar component for the admin
 * @returns navigation bar
 */
const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    apiCalls
      .logout()
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };



  return (
    <div className={styles.container}>
      <nav className={`navbar navbar-expand-lg navbar-dark ${styles.navbar}`}>
        <Logo />
        <Links />
        <div className={`${styles.logout}`} onClick={handleLogout}>
          <span className={styles.logoutTitle}>Log out</span>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className={styles.logoutIcon}
          />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
