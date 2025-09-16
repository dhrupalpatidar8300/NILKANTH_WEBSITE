import React from 'react';
import styles from './HeroSection.module.css';
import logo from '../../assets/nilkanth enterprises.png'; // Make sure this path is correct

function HeroSection() {
    return (
        <section className={styles.heroContainer}>
            {/* Column 1: Text Content */}
            <div className={styles.textContent}>
                <p className={styles.preTitle}>NILAKANTH ATM SERVICES</p>
                <h1>Creative & Reliable Solutions</h1>
                <p>
                    Discover innovative strategies for impactful ATM solutions. We transform
                    ideas into compelling realities, ensuring your brand stands out in a
                    crowded marketplace.
                </p>
                <button className={styles.ctaButton}>Explore Services →</button>
            </div>

            {/* Column 2: Logo */}
            <div className={styles.logoContainer}>
                <img src={logo} alt="Nilakanth Service Glowing Logo" className={styles.glowingLogo} />
            </div>
        </section>
    );
}

export default HeroSection;