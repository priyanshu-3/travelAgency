import { useState, useEffect } from 'react';
import EnquiryForm from './EnquiryForm';
import './Hero.css';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const slides = [
        {
            image: '/images/corbett1.png',
            title: 'Experience Wildlife at Jim Corbett',
            subtitle: 'Witness majestic tigers in their natural habitat'
        },
        {
            image: '/images/corbett2.png',
            title: 'Explore Dense Jungle Trails',
            subtitle: 'Adventure through pristine forests and rivers'
        },
        {
            image: '/images/nainital1.png',
            title: 'Discover Nainital\'s Serene Beauty',
            subtitle: 'Peaceful lakes surrounded by mountain peaks'
        },
        {
            image: '/images/nainital2.png',
            title: 'Breathtaking Mountain Views',
            subtitle: 'Panoramic vistas of the Himalayas'
        },
        {
            image: '/images/corbett3.png',
            title: 'Thrilling Jeep Safari Adventures',
            subtitle: 'Expert-guided wildlife expeditions'
        }
    ];

    useEffect(() => {
        setIsVisible(true);

        // Auto-advance slideshow
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const scrollToForm = () => {
        const formElement = document.getElementById('enquiry-form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section className="hero">
            {/* Slideshow Background */}
            <div className="hero-slideshow">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${slide.image})` }}
                    >
                        <div className="hero-overlay"></div>
                    </div>
                ))}
            </div>

            {/* Main Content with Form */}
            <div className="hero-content-wrapper">
                <div className="hero-container">
                    <div className={`hero-text ${isVisible ? 'fade-in' : ''}`}>
                        <h1>Jim Corbett & Nainital Tour Packages</h1>
                        <p className="hero-subtitle">
                            {slides[currentSlide].subtitle}
                        </p>
                        <button className="btn btn-secondary-light btn-large" onClick={scrollToForm}>
                            View Packages
                        </button>
                    </div>

                    {/* Form on the right side */}
                    <div className="hero-form">
                        <EnquiryForm />
                    </div>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="hero-indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            {/* Scroll Indicator */}
            <div className="scroll-indicator">
                <div className="scroll-arrow"></div>
            </div>
        </section>
    );
};

export default Hero;
