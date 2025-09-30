import React, { useState, useRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import styles from './ContactPage.module.css';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Card from '../components/common/Card';

const RECAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const API_URL = import.meta.env.VITE_API_URL;

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const recaptchaRef = useRef();
    const locationTimeoutRef = useRef();
    const locationInputRef = useRef();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Handle location autocomplete
        if (name === 'location') {
            handleLocationSearch(value);
        }
    };

    const handleLocationSearch = (query) => {
        // Clear previous timeout
        if (locationTimeoutRef.current) {
            clearTimeout(locationTimeoutRef.current);
        }

        if (query.length < 2) {
            setLocationSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        // Debounce the search
        locationTimeoutRef.current = setTimeout(async () => {
            setIsLoadingSuggestions(true);
            
            try {
                // Gujarat viewbox coordinates (roughly): 68.0, 20.0, 75.0, 25.0
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=in&limit=10&addressdetails=1&viewbox=68.0,20.0,75.0,25.0&bounded=0`,
                    {
                        headers: {
                            'User-Agent': 'Nilkanth ATM Services Contact Form'
                        }
                    }
                );
                
                if (response.ok) {
                    const data = await response.json();
                    const suggestions = data.map(item => ({
                        display_name: formatLocationName(item),
                        full_name: item.display_name,
                        is_gujarat: isLocationInGujarat(item)
                    }));
                    
                    // Sort results to prioritize Gujarat locations
                    const sortedSuggestions = suggestions.sort((a, b) => {
                        if (a.is_gujarat && !b.is_gujarat) return -1;
                        if (!a.is_gujarat && b.is_gujarat) return 1;
                        return 0;
                    });
                    
                    setLocationSuggestions(sortedSuggestions);
                    setShowSuggestions(true);
                }
            } catch (error) {
                console.error('Error fetching location suggestions:', error);
                // Silently fail - user can continue with their input
            } finally {
                setIsLoadingSuggestions(false);
            }
        }, 300);
    };

    const formatLocationName = (item) => {
        const address = item.address || {};
        const parts = [];
        
        // Check for village first as it's more specific
        if (address.village) {
            parts.push(address.village);
        } else if (address.town) {
            parts.push(address.town);
        } else if (address.city) {
            parts.push(address.city);
        } else if (address.hamlet) {
            parts.push(address.hamlet);
        } else if (address.locality) {
            parts.push(address.locality);
        }
        
        // Add district for better identification within Gujarat
        if (address.county || address.district) {
            parts.push(address.county || address.district);
        }
        
        if (address.state) {
            parts.push(address.state);
        }
        
        return parts.length > 0 ? parts.join(', ') : item.display_name.split(',')[0];
    };
    
    const isLocationInGujarat = (item) => {
        const address = item.address || {};
        const fullName = item.display_name || '';
        const gujaratKeywords = ['Gujarat', 'Gujrat', 'Vadodara', 'Ahmedabad', 'Surat', 'Rajkot', 'Gandhinagar'];
        
        // Check if state is Gujarat
        if (address.state && address.state.toLowerCase().includes('gujarat')) {
            return true;
        }
        
        // Check if display name contains any Gujarat keywords
        for (const keyword of gujaratKeywords) {
            if (fullName.includes(keyword)) {
                return true;
            }
        }
        
        return false;
    };

    const handleLocationSelect = (suggestion) => {
        setFormData(prev => ({
            ...prev,
            location: suggestion.display_name
        }));
        setShowSuggestions(false);
        setLocationSuggestions([]);
    };

    const handleLocationKeyDown = (e) => {
        if (!showSuggestions || locationSuggestions.length === 0) return;
        
        if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    const handleLocationBlur = () => {
        // Delay hiding suggestions to allow for clicks
        setTimeout(() => {
            setShowSuggestions(false);
        }, 200);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Execute reCAPTCHA v3
            const token = await recaptchaRef.current.executeAsync();
            
            // Send form data to backend
            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    recaptcha_token: token
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert('Thank you for your message! We will get back to you soon.');
                setFormData({ name: '', email: '', phone: '', location: '', message: '' });
            } else {
                alert(data.detail || 'Something went wrong. Please try again.');
            }
            
            // Reset reCAPTCHA
            recaptchaRef.current.reset();
            
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const email = `${import.meta.env.VITE_APP_EMAIL_ADDRESS}`;
    const phone = `${import.meta.env.VITE_APP_CONTACT_PHONE}`;
    const whatsappNumber = phone ? phone.replace(/\D/g, '') : '';
    const contactMethods = [
        {
            icon: '📧',
            title: 'Email Us',
            value: email,
            description: 'Send us an email anytime',
            action: () => window.open(`mailto:${email}`, '_blank')
        },
        {
            icon: '📱',
            title: 'WhatsApp',
            value: phone,
            description: 'Chat with us on WhatsApp',
            action: () => window.open(`https://wa.me/${whatsappNumber}`, '_blank')
        },
        {
            icon: '📞',
            title: 'Call Us',
            value: phone,
            description: 'Call us for immediate assistance',
            action: () => window.open(`tel:${whatsappNumber.startsWith('91') ? '+' + whatsappNumber : whatsappNumber}`, '_blank')
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

                {/* Contact Methods Section */}
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

                                <div className={styles.formRow}>
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
                                        <label htmlFor="location">Location *</label>
                                        <div className={styles.locationContainer}>
                                            <input
                                                ref={locationInputRef}
                                                type="text"
                                                id="location"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                onKeyDown={handleLocationKeyDown}
                                                onBlur={handleLocationBlur}
                                                required
                                                placeholder="Enter your city or location"
                                                autoComplete="off"
                                            />
                                            {isLoadingSuggestions && (
                                                <div className={styles.loadingIndicator}>🔍</div>
                                            )}
                                            {showSuggestions && locationSuggestions.length > 0 && (
                                                <ul className={styles.suggestionsList}>
                                                    {locationSuggestions.map((suggestion, index) => (
                                                        <li
                                                            key={index}
                                                            className={`${styles.suggestionItem} ${suggestion.is_gujarat ? styles.gujaratLocation : ''}`}
                                                            onClick={() => handleLocationSelect(suggestion)}
                                                        >
                                                            {suggestion.is_gujarat ? '🏠' : '📍'} {suggestion.display_name}
                                                            {suggestion.is_gujarat && <span className={styles.gujaratTag}>Gujarat</span>}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
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

                                <ReCAPTCHA
                                    sitekey={RECAPTCHA_KEY}
                                    size="invisible"
                                    ref={recaptchaRef}
                                />
                                <button 
                                    type="submit" 
                                    className={styles.submitButton}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Thank You!" : "Submit Now"}
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
                                        onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')}
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