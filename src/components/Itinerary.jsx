import { useEffect, useRef } from 'react';
import './Itinerary.css';

const Itinerary = () => {
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

        const items = sectionRef.current?.querySelectorAll('.itinerary-item');
        items?.forEach((item) => observer.observe(item));

        return () => observer.disconnect();
    }, []);

    const itinerary = [
        {
            day: 'Day 1',
            title: 'Arrival at Jim Corbett',
            activities: [
                'Pick up from Ramnagar Railway Station / Pantnagar Airport',
                'Check-in at jungle resort',
                'Evening jeep safari in Corbett National Park',
                'Dinner and overnight stay at resort'
            ],
            icon: '🚗'
        },
        {
            day: 'Day 2',
            title: 'Corbett Safari & Transfer',
            activities: [
                'Early morning jungle safari (best time for wildlife spotting)',
                'Breakfast at resort',
                'Riverside nature walk and bird watching',
                'Lunch and check-out',
                'Scenic drive to Nainital (approx. 3 hours)',
                'Check-in at Nainital hotel, evening at leisure'
            ],
            icon: '🐅'
        },
        {
            day: 'Day 3',
            title: 'Nainital Sightseeing',
            activities: [
                'Breakfast at hotel',
                'Boating at Naini Lake',
                'Ropeway ride to Snow View Point',
                'Visit Tiffin Top for panoramic views',
                'Explore Mall Road and local markets',
                'Dinner and overnight stay'
            ],
            icon: '⛰️'
        },
        {
            day: 'Day 4',
            title: 'Departure',
            activities: [
                'Breakfast at hotel',
                'Visit local attractions (Naina Devi Temple, Cave Garden)',
                'Last-minute shopping',
                'Check-out and drop at Kathgodam Railway Station / Pantnagar Airport',
                'Journey back home with wonderful memories'
            ],
            icon: '🏠'
        }
    ];

    return (
        <section className="section itinerary-section" ref={sectionRef}>
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="text-gradient">Sample 3N/4D Itinerary</h2>
                    <p className="section-subtitle">
                        A perfect blend of wildlife adventure and hill station relaxation
                    </p>
                </div>

                <div className="itinerary-timeline">
                    {itinerary.map((item, index) => (
                        <div
                            key={index}
                            className="itinerary-item scroll-reveal"
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <div className="itinerary-marker">
                                <div className="marker-icon">{item.icon}</div>
                                <div className="marker-line"></div>
                            </div>
                            <div className="itinerary-content card">
                                <div className="itinerary-header">
                                    <span className="day-badge">{item.day}</span>
                                    <h3>{item.title}</h3>
                                </div>
                                <ul className="itinerary-activities">
                                    {item.activities.map((activity, idx) => (
                                        <li key={idx}>{activity}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="itinerary-note">
                    <p>
                        <strong>Note:</strong> This is a sample itinerary. We customize packages based on your preferences,
                        budget, and travel dates. Contact us for a personalized quote!
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Itinerary;
