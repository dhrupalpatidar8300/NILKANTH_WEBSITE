import React from 'react';
import styles from './Navbar.module.css';

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <a href="/" className={styles.brand}>Nilakanth ATM Services</a>
            <ul className={styles.navList}>
                <li><a href="/" className={styles.navLink}>Home</a></li>
                <li><a href="/services" className={styles.navLink}>Our Services</a></li>
                <li><a href="/about" className={styles.navLink}>About</a></li>
                <li><a href="/contact" className={styles.navLink}>Contact</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
