import React from 'react';
import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div>
                <h4>Nilakanth ATM Services</h4>
                <p>&copy; 2025. All rights reserved.</p>
            </div>
            <div>
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/services">Our Services</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </div>
            <div>
                <h4>Contact Us</h4>
                <p>Email: `${import.meta.env.VITE_APP_EMAIL_ADDRESS}`</p>
                <p>Phone: `${import.meta.env.VITE_APP_CONTACT_PHONE}`</p>
            </div>
        </footer>
    );
}

export default Footer;