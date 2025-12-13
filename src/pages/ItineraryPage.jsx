import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Itinerary from '../components/Itinerary';
import Footer from '../components/Footer';
import './ItineraryPage.css';

function ItineraryPage() {
    useEffect(() => {
        // Scroll to top when page loads
        window.scrollTo(0, 0);

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

    return (
        <div className="itinerary-page">
            {/* Header Navigation */}
            <header className="page-header">
                <div className="container">
                    <div className="header-content">
                        <Link to="/" className="logo">
                            <h2>Corbett & Nainital Tours</h2>
                        </Link>
                        <nav className="main-nav">
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/itinerary" className="nav-link active">Itinerary</Link>
                            <Link to="/safari-booking" className="nav-link">Safari Booking</Link>
                            <a href="/#enquiry-form" className="btn btn-primary">Book Now</a>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Page Hero */}
            <section className="page-hero">
                <div className="page-hero-overlay"></div>
                <div className="container">
                    <div className="page-hero-content">
                        <h1>Tour Itinerary</h1>
                        <p>Detailed day-by-day breakdown of your adventure</p>
                    </div>
                </div>
            </section>

            {/* Itinerary Content */}
            <Itinerary />

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Book Your Adventure?</h2>
                        <p>Contact us today to customize this itinerary to your preferences</p>
                        <div className="cta-buttons">
                            <Link to="/#enquiry-form" className="btn btn-primary btn-large">
                                Request a Quote
                            </Link>
                            <Link to="/" className="btn btn-secondary btn-large">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default ItineraryPage;
