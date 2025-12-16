import { useState, useEffect } from 'react';
import './StickyBookNow.css';

const StickyBookNow = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show button when scrolling up, hide when scrolling down
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const scrollToEnquiry = () => {
        const formElement = document.getElementById('enquiry-form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <button
            className={`sticky-book-now ${isVisible ? 'visible' : 'hidden'}`}
            onClick={scrollToEnquiry}
            aria-label="Book Now"
        >
            <span className="btn-icon">📅</span>
            <span className="btn-text">Book Now</span>
        </button>
    );
};

export default StickyBookNow;
