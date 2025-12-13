import { useEffect, useRef } from 'react';
import './WhyBookWithUs.css';

const WhyBookWithUs = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const cards = sectionRef.current?.querySelectorAll('.feature-card');
        cards?.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    const features = [
        {
            icon: '🎖️',
            title: 'Licensed & Expert Guides',
            description: 'Our certified naturalists and local guides have years of experience and deep knowledge of wildlife and local culture.'
        },
        {
            icon: '✨',
            title: 'Fully Customized Packages',
            description: 'Every trip is tailored to your preferences, budget, and schedule. No cookie-cutter tours here!'
        },
        {
            icon: '📞',
            title: '24x7 Customer Support',
            description: 'Round-the-clock assistance before, during, and after your trip. We\'re always here to help.'
        },
        {
            icon: '🚗',
            title: 'Local Transport Included',
            description: 'Comfortable, well-maintained vehicles with experienced drivers for all transfers and sightseeing.'
        }
    ];

    return (
        <section className="section section-alt why-book-section" ref={sectionRef}>
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="text-gradient">Why Book With Us?</h2>
                    <p className="section-subtitle">
                        Your trusted partner for unforgettable Corbett & Nainital experiences
                    </p>
                </div>

                <div className="features-grid grid grid-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="feature-card card scroll-reveal"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="feature-icon-wrapper">
                                <div className="feature-icon">{feature.icon}</div>
                            </div>
                            <h4>{feature.title}</h4>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>

                <div className="trust-badges">
                    <div className="badge-item scroll-reveal" style={{ transitionDelay: '400ms' }}>
                        <div className="badge-number">500+</div>
                        <div className="badge-label">Happy Travelers</div>
                    </div>
                    <div className="badge-item scroll-reveal" style={{ transitionDelay: '500ms' }}>
                        <div className="badge-number">10+</div>
                        <div className="badge-label">Years Experience</div>
                    </div>
                    <div className="badge-item scroll-reveal" style={{ transitionDelay: '600ms' }}>
                        <div className="badge-number">4.8★</div>
                        <div className="badge-label">Average Rating</div>
                    </div>
                    <div className="badge-item scroll-reveal" style={{ transitionDelay: '700ms' }}>
                        <div className="badge-number">100%</div>
                        <div className="badge-label">Satisfaction</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyBookWithUs;
