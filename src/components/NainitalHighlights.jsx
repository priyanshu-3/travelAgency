import { useEffect, useRef } from 'react';
import './NainitalHighlights.css';

const NainitalHighlights = () => {
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
            icon: '⛵',
            title: 'Naini Lake Boating',
            description: 'Enjoy serene boat rides on the beautiful Naini Lake surrounded by hills, the heart of Nainital.'
        },
        {
            icon: '🛍️',
            title: 'Mall Road Shopping',
            description: 'Explore the vibrant Mall Road with local shops, cafes, and stunning views of the valley.'
        },
        {
            icon: '🚡',
            title: 'Snow View Point',
            description: 'Take the ropeway to Snow View Point for breathtaking panoramic views of Himalayan peaks.'
        },
        {
            icon: '🥾',
            title: 'Tiffin Top Trek',
            description: 'Trek to Tiffin Top for spectacular 360-degree views and peaceful forest trails.'
        },
        {
            icon: '🏪',
            title: 'Local Markets',
            description: 'Discover authentic handicrafts, woolens, and local delicacies at bustling bazaars.'
        }
    ];

    return (
        <section className="section section-alt nainital-highlights" ref={sectionRef}>
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="text-gradient">Nainital Hill Station</h2>
                    <p className="section-subtitle">
                        The "Lake District of India" offering scenic beauty and mountain charm
                    </p>
                </div>

                <div className="highlights-grid grid grid-3">
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

export default NainitalHighlights;
