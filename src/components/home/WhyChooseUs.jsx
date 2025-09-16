import React from 'react';
import styles from './WhyChooseUs.module.css';

function WhyChooseUs() {
    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Why Nilakanth ATM Services?</h2>
            <div className={styles.cardContainer}>
                <div className={styles.card}>
                    <h4>Expert Technicians</h4>
                    <p>Our team is highly trained and experienced in all aspects of ATM servicing.</p>
                </div>
                <div className={styles.card}>
                    <h4>Fast Response Time</h4>
                    <p>We guarantee prompt service to resolve any issues quickly and efficiently.</p>
                </div>
                <div className={styles.card}>
                    <h4>Secure Transactions</h4>
                    <p>We adhere to the highest security standards to protect you and your customers.</p>
                </div>
            </div>
        </section>
    );
}

export default WhyChooseUs;