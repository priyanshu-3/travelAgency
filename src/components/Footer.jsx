import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>Corbett & Nainital Tours</h4>
                        <p>Your trusted partner for unforgettable wildlife and hill station experiences in Uttarakhand.</p>
                        <div className="social-links">
                            <a href="#" aria-label="Facebook" className="social-link">📘</a>
                            <a href="#" aria-label="Instagram" className="social-link">📷</a>
                            <a href="#" aria-label="Twitter" className="social-link">🐦</a>
                            <a href="#" aria-label="WhatsApp" className="social-link">💬</a>
                        </div>
                    </div>

                    <div className="footer-column">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/itinerary">Itinerary</Link></li>
                            <li><Link to="/safari-booking">Safari Booking</Link></li>
                            <li><a href="#highlights">Highlights</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Popular Packages</h4>
                        <ul className="footer-links">
                            <li><a href="/#enquiry-form">Corbett Safari Only</a></li>
                            <li><a href="/#enquiry-form">Nainital Sightseeing</a></li>
                            <li><a href="/#enquiry-form">Corbett + Nainital Combo</a></li>
                            <li><a href="/#enquiry-form">Custom Packages</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Contact Us</h4>
                        <ul className="footer-contact">
                            <li>📧 info@corbettnainital.com</li>
                            <li>📞 +91 98765 43210</li>
                            <li>📍 Ramnagar, Uttarakhand</li>
                            <li>🕐 24x7 Support Available</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Corbett & Nainital Tours. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <span>•</span>
                        <a href="#">Terms of Service</a>
                        <span>•</span>
                        <a href="#">Cancellation Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
