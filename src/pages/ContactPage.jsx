import React, { useState } from 'react';
import styles from './ContactPage.module.css';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Card from '../components/common/Card';

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        // You can add email service integration here
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    const contactMethods = [
        {
            icon: '📧',
            title: 'Email Us',
            value: 'nilakanth001@gmail.com',
            description: 'Send us an email anytime',
            action: () => window.open('mailto:nilakanth001@gmail.com', '_blank')
        },
        {
            icon: '📱',
            title: 'WhatsApp',
            value: '+91 9429610405',
            description: 'Chat with us on WhatsApp',
            action: () => window.open('https://wa.me/919429610404', '_blank')
        },
        {
            icon: '📞',
            title: 'Call Us',
            value: '+91 9429610405',
            description: 'Call us for immediate assistance',
            action: () => window.open('tel:+919429610404', '_blank')
        },
        {
            icon: '📍',
            title: 'Visit Us',
            value: 'Vadodara, Gujarat',
            description: 'Come visit our office',
            action: () => window.open('https://maps.google.com/?q=Vadodara,Gujarat,India', '_blank')
        }
    ];

    return (
        <div>
            <Navbar />
            <main className={styles.main}>
                {/* Hero Section */}
                <section className={styles.heroSection}>
                    <div className={styles.heroContent}>
                        <h1>Get In Touch</h1>
                        <p>Ready to enhance your ATM services? Contact us today and let's discuss how we can help your business thrive.</p>
                    </div>
                </section>

                {/* Contact Methods */}
                <section className={styles.contactMethodsSection}>
                    <h2>Contact Us Through</h2>
                    <div className={styles.contactGrid}>
                        {contactMethods.map((method, index) => (
                            <Card key={index}>
                                <div
                                    className={styles.contactCard}
                                    onClick={method.action}
                                    role="button"
                                    tabIndex={0}
                                    onKeyPress={e => {
                                        if (e.key === 'Enter' || e.key === ' ') method.action();
                                    }}
                                >
                                    <div className={styles.contactIcon}>{method.icon}</div>
                                    <h3>{method.title}</h3>
                                    <p className={styles.contactValue}>{method.value}</p>
                                    <p className={styles.contactDescription}>{method.description}</p>
                                    <button
                                        className={styles.contactButton}
                                        type="button"
                                        onClick={e => {
                                            e.stopPropagation();
                                            method.action();
                                        }}
                                    >
                                        Connect Now →
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Contact Form Section */}
                <section className={styles.formSection}>
                    <div className={styles.formContainer}>
                        <div className={styles.formContent}>
                            <h2>Send Us a Message</h2>
                            <p>Fill out the form below and we'll get back to you as soon as possible.</p>

                            <form onSubmit={handleSubmit} className={styles.contactForm}>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="email">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="message">Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={5}
                                        placeholder="Tell us about your ATM service requirements..."
                                    ></textarea>
                                </div>

                                <button type="submit" className={styles.submitButton}>
                                    Send Message →
                                </button>
                            </form>
                        </div>

                        <div className={styles.formImage}>
                            <div className={styles.imageContent}>
                                <h3>Why Choose Nilakanth ATM Services?</h3>
                                <ul className={styles.featureList}>
                                    <li>✓ 24/7 Technical Support</li>
                                    <li>✓ Expert Technicians</li>
                                    <li>✓ Fast Response Time</li>
                                    <li>✓ Secure &amp; Reliable Solutions</li>
                                    <li>✓ Competitive Pricing</li>
                                    <li>✓ Complete ATM Maintenance</li>
                                </ul>
                                <div className={styles.quickContact}>
                                    <p><strong>Need Immediate Help?</strong></p>
                                    <button
                                        className={styles.whatsappButton}
                                        type="button"
                                        onClick={() => window.open('https://wa.me/919429610404', '_blank')}
                                    >
                                        💬 WhatsApp Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map Section */}
                <section className={styles.mapSection}>
                    <h2>Find Us</h2>
                    <div className={styles.mapContainer}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14662.696305051379!2d73.32627291651079!3d23.254944414183008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395dfdc053882413%3A0xbfa010730da20760!2sGabat%2C%20Gujarat%20383335!5e0!3m2!1sen!2sin!4v1758168174303!5m2!1sen!2sin"
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Nilakanth ATM Services Location"
                        ></iframe>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default ContactPage;