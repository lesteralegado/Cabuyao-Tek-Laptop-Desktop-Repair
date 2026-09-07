import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Networking from '../components/Networking';
import Brands from '../components/Brands';
import HowItWorks from '../components/HowItWorks';
import ServiceOptions from '../components/ServiceOptions';
import WhyChooseUs from '../components/WhyChooseUs';
import ContactSection from '../components/ContactSection';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Networking />
        <Brands />
        <HowItWorks />
        <ServiceOptions />
        <WhyChooseUs />
        <ContactSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
