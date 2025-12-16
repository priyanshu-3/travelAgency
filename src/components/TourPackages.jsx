import { Link } from 'react-router-dom';
import './TourPackages.css';

const TourPackages = () => {
    const packages = [
        {
            id: 1,
            name: 'Corbett Jeep Safari',
            price: 6999,
            duration: '1 Day',
            image: '/images/corbett1.png',
            highlights: ['Jeep Safari', 'Wildlife Spotting', 'Expert Guide', 'Lunch Included'],
            route: '/corbett-detail'
        },
        {
            id: 2,
            name: 'Nainital Lake Tour',
            price: 5999,
            duration: '1 Day',
            image: '/images/nainital1.png',
            highlights: ['Naini Lake', 'Boat Ride', 'Mall Road', 'Viewpoints'],
            route: '/nainital-detail'
        },
        {
            id: 3,
            name: 'Corbett + Nainital Combo',
            price: 11999,
            duration: '3N/4D',
            image: '/images/corbett2.png',
            highlights: ['Safari + Lakes', 'Hotels Included', 'All Meals', 'Transport'],
            route: '/combo-package'
        },
        {
            id: 4,
            name: 'Corbett Wildlife Package',
            price: 8999,
            duration: '2N/3D',
            image: '/images/corbett3.png',
            highlights: ['2 Safaris', 'Forest Lodge', 'Bird Watching', 'Nature Walk'],
            route: '/corbett-detail'
        },
        {
            id: 5,
            name: 'Nainital Hill Station',
            price: 7499,
            duration: '2N/3D',
            image: '/images/nainital2.png',
            highlights: ['Lake View Hotel', 'Cable Car', 'Snow View', 'Shopping'],
            route: '/nainital-detail'
        },
        {
            id: 6,
            name: 'Premium 3N/4D Combo',
            price: 14999,
            duration: '3N/4D',
            image: '/images/corbett1.png',
            highlights: ['Luxury Hotels', '3 Safaris', 'All Inclusive', 'Private Car'],
            route: '/combo-package'
        }
    ];

    const scrollToEnquiry = () => {
        const formElement = document.getElementById('enquiry-form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="tour-packages" id="packages">
            <div className="container">
                <div className="section-header">
                    <h2>Popular Tour Packages</h2>
                    <p className="section-subtitle">
                        Choose from our carefully curated packages for an unforgettable experience
                    </p>
                </div>

                <div className="packages-grid">
                    {packages.map((pkg) => (
                        <div key={pkg.id} className="package-card">
                            <div className="package-image">
                                <img src={pkg.image} alt={pkg.name} />
                                <div className="package-badge">{pkg.duration}</div>
                            </div>
                            <div className="package-content">
                                <h3>{pkg.name}</h3>
                                <div className="package-price">
                                    <span className="price-amount">₹{pkg.price.toLocaleString()}</span>
                                    <span className="price-per">/person</span>
                                </div>
                                <ul className="package-highlights">
                                    {pkg.highlights.map((highlight, index) => (
                                        <li key={index}>
                                            <span className="highlight-icon">✓</span>
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                                <div className="package-actions">
                                    <Link to={pkg.route} className="btn btn-outline">
                                        View Details
                                    </Link>
                                    <button onClick={scrollToEnquiry} className="btn btn-primary">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TourPackages;
