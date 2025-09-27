import React from 'react';
import styles from './HeroSection.module.css';
import logo from '../../assets/nilkanth_enterprises.png'; // Make sure this path is correct
import ceo_img from '../../assets/CEO_Image.png';

function HeroSection() {
    return (
        <section className={styles.heroContainer}>
            <div className={styles.headerContent}>
                <h1 className={styles.heroTitle}>Welcome to Nilakanth Services</h1>
                <h2 className={styles.heroSubtitle}>ATM and Financial Solutions Provider 24/7</h2>
            </div>
            
            <div className={styles.imageColumns}>
                {/* Column 1: CEO Image */}
                <div className={styles.imageColumn}>
                    <img src={ceo_img} alt="Nilakanth Service CEO" className={styles.ceoImage} />
                </div>

                {/* Column 2: Logo */}
                <div className={styles.imageColumn}>
                    <img src={logo} alt="Nilakanth Service Glowing Logo" className={styles.glowingLogo} />
                </div>
            </div>
            
            <div className={styles.footerContent}>
                <p className={styles.description}>Your trusted partner for quality services</p>
                <button className={styles.ctaButton}>Get Started</button>
            </div>
        </section>
    );
}

export default HeroSection;