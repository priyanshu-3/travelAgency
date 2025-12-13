import './SafariPricing.css';

const SafariPricing = () => {
    const jeepSafariZones = [
        {
            zone: 'Bijrani',
            priceIndian: '₹7,500',
            priceForeigner: '$150',
            timings: 'Morning: 6:00 AM - 9:30 AM | Evening: 2:30 PM - 5:30 PM',
            inclusions: 'Jeep, Driver, Permit, Guide & Taxes'
        },
        {
            zone: 'Jhirna',
            priceIndian: '₹6,500',
            priceForeigner: '$130',
            timings: 'Morning: 6:00 AM - 9:30 AM | Evening: 2:30 PM - 5:30 PM',
            inclusions: 'Jeep, Driver, Permit, Guide & Taxes'
        },
        {
            zone: 'Dhela',
            priceIndian: '₹6,000',
            priceForeigner: '$120',
            timings: 'Morning: 6:00 AM - 9:30 AM | Evening: 2:30 PM - 5:30 PM',
            inclusions: 'Jeep, Driver, Permit, Guide & Taxes'
        },
        {
            zone: 'Durgadevi',
            priceIndian: '₹6,500',
            priceForeigner: '$130',
            timings: 'Morning: 6:00 AM - 9:30 AM | Evening: 2:30 PM - 5:30 PM',
            inclusions: 'Jeep, Driver, Permit, Guide & Taxes'
        }
    ];

    const canterSafari = {
        zone: 'Dhikala',
        priceIndian: '₹2,500',
        priceForeigner: '$50',
        timings: 'Morning: 6:00 AM - 11:30 AM | Evening: 12:30 PM - 5:30 PM',
        inclusions: 'Canter (16 Seats), Driver, Permit & Taxes',
        note: 'ONE Canter has 16 Seats'
    };

    return (
        <section className="safari-pricing section">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Safari Pricing & Zones</h2>
                    <p className="section-subtitle">
                        Choose from our various safari zones across Jim Corbett National Park
                    </p>
                </div>

                {/* Jeep Safari Pricing */}
                <div className="pricing-category">
                    <h3 className="pricing-title">Jeep Safari Zones (Max 6 Persons)</h3>
                    <div className="pricing-grid">
                        {jeepSafariZones.map((safari, index) => (
                            <div key={index} className="pricing-card">
                                <div className="pricing-header">
                                    <h4>{safari.zone}</h4>
                                    <span className="safari-type">Jeep Safari</span>
                                </div>
                                <div className="pricing-body">
                                    <div className="price-row">
                                        <span className="price-label">Indian Nationals:</span>
                                        <span className="price">{safari.priceIndian}</span>
                                    </div>
                                    <div className="price-row">
                                        <span className="price-label">Foreign Nationals:</span>
                                        <span className="price">{safari.priceForeigner}</span>
                                    </div>
                                    <div className="timings">
                                        <strong>Timings:</strong>
                                        <p>{safari.timings}</p>
                                    </div>
                                    <div className="inclusions">
                                        <strong>Inclusions:</strong>
                                        <p>{safari.inclusions}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Canter Safari Pricing */}
                <div className="pricing-category">
                    <h3 className="pricing-title">Canter Safari (Per Person)</h3>
                    <div className="pricing-grid single">
                        <div className="pricing-card featured">
                            <div className="pricing-header">
                                <h4>{canterSafari.zone}</h4>
                                <span className="safari-type">Canter Safari</span>
                            </div>
                            <div className="pricing-body">
                                <div className="price-row">
                                    <span className="price-label">Indian Nationals:</span>
                                    <span className="price">{canterSafari.priceIndian}</span>
                                </div>
                                <div className="price-row">
                                    <span className="price-label">Foreign Nationals:</span>
                                    <span className="price">{canterSafari.priceForeigner}</span>
                                </div>
                                <div className="timings">
                                    <strong>Timings:</strong>
                                    <p>{canterSafari.timings}</p>
                                </div>
                                <div className="inclusions">
                                    <strong>Inclusions:</strong>
                                    <p>{canterSafari.inclusions}</p>
                                </div>
                                <div className="note">
                                    <strong>Note:</strong> {canterSafari.note}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SafariPricing;
