import React, { useState } from 'react';
import Links from '../Links';
import Logo from './Logo';
import styles from './NavBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import apiCalls from '../../api';
import { useNavigate } from 'react-router-dom';

/**
 * Navigation bar component for the admin
 * @returns navigation bar
 */
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.container}>
      <nav className={`navbar navbar-expand-lg navbar-dark ${styles.navbar}`}>
        <Logo />
        <Links />
        <div className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
          <ul className={styles.menuList}>
            <li>Feedback</li>
            <li onClick={handleLogout}>Log out</li>
          </ul>
        </div>
        <button className={styles.menuButton} onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </nav>
    </div>
  );
};

export default NavBar;
