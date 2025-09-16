import React, { useState, useEffect } from 'react';
import sanityClient from '../../sanityClient'; // Import the client
import styles from './ServicesPreview.module.css';
import Card from '../common/Card';

function ServicesPreview() {
    const [services, setServices] = useState(null);

    useEffect(() => {
        // This GROQ query fetches all documents with the type "service"
        sanityClient
            .fetch(
                `*[_type == "service"]{
          title,
          description
        }`
            )
            .then((data) => setServices(data))
            .catch(console.error);
    }, []); // The empty array ensures this runs only once

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Core Services</h2>
            <div className={styles.cardContainer}>
                {/* This will show a loading message until the data arrives */}
                {!services && <p>Loading services...</p>}

                {/* Once data arrives, it maps over it and creates a Card for each service */}
                {services && services.map((service, index) => (
                    <Card key={index}>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </Card>
                ))}
            </div>
        </section>
    );
}

export default ServicesPreview;