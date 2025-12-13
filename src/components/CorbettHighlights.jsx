import { useEffect, useRef } from 'react';
import './CorbettHighlights.css';

const CorbettHighlights = () => {
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

        const cards = sectionRef.current?.querySelectorAll('.highlight-card');
        cards?.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    const highlights = [
        {
            icon: '🐅',
            title: 'Jeep Safari',
            description: 'Experience thrilling jungle safaris with expert guides to spot tigers, elephants, and diverse wildlife in their natural habitat.'
        },
        {
            icon: '🏡',
            title: 'Forest Stay',
            description: 'Stay in comfortable jungle resorts and lodges surrounded by nature, offering authentic wilderness experience.'
        },
        {
            icon: '🌊',
            title: 'Riverside Walk',
            description: 'Enjoy peaceful walks along the Ramganga River, bird watching, and connecting with pristine nature.'
        },
        {
            icon: '🔭',
            title: 'Wildlife Experience',
            description: 'Discover diverse flora and fauna, including 600+ bird species, making it a paradise for nature enthusiasts.'
        }
    ];

    return (
        <section className="section corbett-highlights" ref={sectionRef}>
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="text-gradient">Jim Corbett National Park</h2>
                    <p className="section-subtitle">
                        India's oldest national park offering unforgettable wildlife adventures
                    </p>
                </div>

                <div className="highlights-grid grid grid-4">
                    {highlights.map((highlight, index) => (
                        <div
                            key={index}
                            className="highlight-card card scroll-reveal"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="highlight-icon">{highlight.icon}</div>
                            <h4>{highlight.title}</h4>
                            <p>{highlight.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CorbettHighlights;
