import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import CorbettHighlights from '../components/CorbettHighlights';
import NainitalHighlights from '../components/NainitalHighlights';
import WhyBookWithUs from '../components/WhyBookWithUs';
import WhatsAppButton from '../components/WhatsAppButton';
import Footer from '../components/Footer';
import './HomePage.css';

function HomePage() {
    useEffect(() => {
        // Scroll reveal animation
        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        const elements = document.querySelectorAll('.scroll-reveal');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const scrollToForm = () => {
        const formElement = document.getElementById('enquiry-form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Header Navigation */}
            <header className="page-header">
                <div className="container">
                    <div className="header-content">
                        <Link to="/" className="logo">
                            <h2>Corbett & Nainital Tours</h2>
                        </Link>
                        <nav className="main-nav">
                            <Link to="/" className="nav-link active">Home</Link>
                            <Link to="/packages" className="nav-link">Packages</Link>
                            <Link to="/itinerary" className="nav-link">Itinerary</Link>
                            <Link to="/safari-booking" className="nav-link">Safari Booking</Link>
                            <button onClick={scrollToForm} className="btn btn-primary">Book Now</button>
                        </nav>
                    </div>
                </div>
            </header>

            <Hero />

            <div className="main-content">
                <div className="content-wrapper">
                    <CorbettHighlights />
                    <NainitalHighlights />
                    <WhyBookWithUs />
                </div>
            </div>

            <WhatsAppButton />

            <Footer />
        </>
    );
}

export default HomePage;
