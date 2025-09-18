import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.brand}>Nilakanth ATM Services</Link>
            <ul className={styles.navList}>
                <li><Link to="/" className={styles.navLink}>Home</Link></li>
                <li><Link to="/services" className={styles.navLink}>Our Services</Link></li>
                <li><Link to="/about" className={styles.navLink}>About</Link></li>
                <li><Link to="/contact" className={styles.navLink}>Contact</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
