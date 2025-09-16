import React from 'react';

// Import common components
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

// Import home page specific components
import HeroSection from '../components/home/HeroSection';
import ServicesPreview from '../components/home/ServicesPreview';
import WhyChooseUs from '../components/home/WhyChooseUs';

function HomePage() {
    return (
        <div>
            <Navbar />
            <main>
                <HeroSection />
                <ServicesPreview />
                <WhyChooseUs />
            </main>
            <Footer />
        </div>
    );
}

export default HomePage;