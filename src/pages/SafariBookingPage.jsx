import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import SafariCalendar from '../components/SafariCalendar';
import SafariPricing from '../components/SafariPricing';
import Footer from '../components/Footer';
import './SafariBookingPage.css';

function SafariBookingPage() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        zone: '',
        timing: 'morning',
        persons: 1,
        name: '',
        email: '',
        phone: '',
        idType: 'aadhaar',
        idNumber: '',
        message: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedDate) {
            alert('Please select a safari date');
            return;
        }

        setIsSubmitting(true);

        try {
            const { data, error } = await supabase
                .from('safari_bookings')
                .insert([
                    {
                        safari_zone: formData.zone,
                        safari_timing: formData.timing,
                        safari_date: selectedDate.toISOString().split('T')[0],
                        num_persons: formData.persons,
                        full_name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        id_proof_type: formData.idType,
                        id_proof_number: formData.idNumber,
                        special_requirements: formData.message
                    }
                ]);

            if (error) {
                console.error('Supabase error:', error);
                alert('Error submitting booking. Please try again.');
                setIsSubmitting(false);
                return;
            }

            alert('Safari booking request submitted successfully! We will contact you within 24 hours.');

            // Reset form
            setSelectedDate(null);
            setFormData({
                zone: '',
                timing: 'morning',
                persons: 1,
                name: '',
                email: '',
                phone: '',
                idType: 'aadhaar',
                idNumber: '',
                message: ''
            });
            setIsSubmitting(false);
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting booking. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="safari-booking-page">
            {/* Header Navigation */}
            <header className="page-header">
                <div className="container">
                    <div className="header-content">
                        <Link to="/" className="logo">
                            <h2>Corbett & Nainital Tours</h2>
                        </Link>
                        <nav className="main-nav">
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/packages" className="nav-link">Packages</Link>
                            <Link to="/itinerary" className="nav-link">Itinerary</Link>
                            <Link to="/safari-booking" className="nav-link active">Safari Booking</Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Page Hero */}
            <section className="page-hero safari-hero">
                <div className="page-hero-overlay"></div>
                <div className="container">
                    <div className="page-hero-content">
                        <h1>Book Your Corbett Safari</h1>
                        <p>Experience thrilling wildlife adventures in Jim Corbett National Park</p>
                    </div>
                </div>
            </section>

            {/* Booking Section */}
            <section className="booking-section section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Make Your Booking</h2>
                        <p className="section-subtitle">Select your preferred date and fill in the details</p>
                    </div>

                    <div className="booking-container">
                        <div className="booking-calendar">
                            <h3>Select Safari Date</h3>
                            <SafariCalendar
                                selectedDate={selectedDate}
                                onDateSelect={handleDateSelect}
                            />
                        </div>

                        <div className="booking-form-container">
                            <h3>Booking Details</h3>
                            <form className="safari-booking-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Safari Zone *</label>
                                    <select
                                        name="zone"
                                        className="form-select"
                                        value={formData.zone}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Zone</option>
                                        <option value="bijrani">Bijrani (Jeep Safari)</option>
                                        <option value="jhirna">Jhirna (Jeep Safari)</option>
                                        <option value="dhikala">Dhikala (Canter Safari)</option>
                                        <option value="dhela">Dhela (Jeep Safari)</option>
                                        <option value="durgadevi">Durgadevi (Jeep Safari)</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Safari Timing *</label>
                                    <div className="radio-group">
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="timing"
                                                value="morning"
                                                checked={formData.timing === 'morning'}
                                                onChange={handleInputChange}
                                            />
                                            <span>Morning (6:00 AM - 9:30 AM)</span>
                                        </label>
                                        <label className="radio-label">
                                            <input
                                                type="radio"
                                                name="timing"
                                                value="evening"
                                                checked={formData.timing === 'evening'}
                                                onChange={handleInputChange}
                                            />
                                            <span>Evening (2:30 PM - 5:30 PM)</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Number of Persons *</label>
                                    <input
                                        type="number"
                                        name="persons"
                                        className="form-input"
                                        min="1"
                                        max="16"
                                        value={formData.persons}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-input"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-input"
                                            placeholder="your.email@example.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Phone *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="form-input"
                                            placeholder="1234567890"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">ID Proof Type *</label>
                                        <select
                                            name="idType"
                                            className="form-select"
                                            value={formData.idType}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="aadhaar">Aadhaar Card</option>
                                            <option value="pan">PAN Card</option>
                                            <option value="driving">Driving License</option>
                                            <option value="passport">Passport</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">ID Number *</label>
                                        <input
                                            type="text"
                                            name="idNumber"
                                            className="form-input"
                                            placeholder="Enter ID number"
                                            value={formData.idNumber}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Special Requirements (Optional)</label>
                                    <textarea
                                        name="message"
                                        className="form-textarea"
                                        placeholder="Any special requirements or questions..."
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows="3"
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary btn-large submit-btn" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                                </button>

                                <p className="form-note">
                                    * Our team will contact you within 24 hours to confirm your booking
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Safari Information */}
            <section className="safari-info-section section">
                <div className="container">
                    <div className="info-intro">
                        <h2>Safari Booking & Tariff Jim Corbett National Park</h2>
                        <p>
                            Welcome to Jeep Safari Booking portal of Jim Corbett National Park. Visitors can book online Jeep Safari or Canter Safari for six different zones of the park namely, Bijrani, Jhirna, Dhikala, Dhela, and Durgadevi. All the procedures of Safari Booking at Corbett are managed by the forest officials as per India's forest department guidelines. Please note that we cannot influence the safari zone, safari driver, and the naturalist guide as it is not in our hands. It is solely decided by the forest officials. Though all the zones have a healthy population of tigers and wildlife sightings are reported more or less the same. These all aspects are supervised by the automated computerized system to ensure the equal distribution of safari vehicles in respective zones.
                        </p>
                    </div>

                    <div className="info-sections">
                        {/* Advance Booking Procedure */}
                        <div className="info-block">
                            <h3>Advance Booking Procedure</h3>
                            <p className="info-subtitle">For booking request please provide us the following details:</p>
                            <ul className="info-list">
                                <li>The full name, age, and sex of each visitor as printed same on the identity cards to be provided along with the confirmatory amount</li>
                                <li>Preferred traveling date & Safari timing (Morning/Afternoon)</li>
                                <li>Specific ID card number of your (Pan Card, Aadhaar No., Driving license No, etc.)</li>
                                <li>Safari Entry fee paid in advance</li>
                                <li>Jeep Safari & Canter Safari amounts are non-refundable</li>
                                <li>Please carry the same ID card submitted during the online booking</li>
                                <li>Please intimate us 45 days in advance (for Indian nationals)</li>
                                <li>Foreign nationals can ask for booking 90 days in advance</li>
                                <li>Passport details are mandatory for making reservations for foreign tourists</li>
                                <li>Safari permit is issued on a first come first serve basis (subject to availability)</li>
                                <li>In case your safari is not booked due to reasons like technical error or non-availability of the seat, we will refund the whole amount in your given bank account. The same would be communicated accordingly.</li>
                            </ul>
                        </div>

                        {/* Important Information */}
                        <div className="info-block">
                            <h3>Jim Corbett Safari Important Information</h3>
                            <ul className="info-list">
                                <li>Visitors are required to obtain entry permits that are being issued online (by producing above mentioned documents)</li>
                                <li>It should be noted that the entry permit to the Corbett National Park is provisional and can be changed or cancelled without any prior intimation</li>
                                <li>The order of the Corbett Tiger Reserve Director will be final in this regard; we are governed by the rules made under the guidelines</li>
                                <li>Entry permit belonging to you is not transferrable</li>
                                <li>Only officially registered guides can join your excursions, please do not try to change the guide or naturalist</li>
                                <li>Entry to the National Park is strictly prohibited after sunset</li>
                                <li>Day visit to Dhikala Tourism Zone is not permitted except for the tourists staying inside the forest lodges</li>
                                <li>While doing jeep safari do not get down from the vehicle, it is strictly not allowed</li>
                                <li>Avoid carrying pets while you are on a holiday tour as no pets can be taken inside the CTR</li>
                                <li>All visitors to the Corbett Tiger Reserve abide by the rules and regulations of the wildlife protection act. So please co-operate</li>
                            </ul>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="info-block">
                            <h3>Terms & Conditions for Online Jeep Safari Booking at Corbett National Park</h3>
                            <ul className="info-list">
                                <li>Jeep and Canter safari at Corbett is conducted only in two shifts – Morning and Evening daily</li>
                                <li>Morning safari is conducted from 06:30 AM to 09:30 AM and afternoon safari time is from 02:30 PM to 05:30 PM</li>
                                <li>Visitors are required to send their passport-size photograph needed for permit registration</li>
                                <li>The number of visitors going on safari vehicles should not exceed the limit as they will be stopped at the entry gate</li>
                                <li>The tourists are held responsible for their own luggage during the safari, no safari driver or guide is liable for the same</li>
                                <li>Please read all the instructions before you plunge into the enthralling Jeep safari at Corbett National Park</li>
                            </ul>
                            <div className="info-note">
                                <strong>Note:</strong> We are merely acting as a travel agent in booking your safari at the national park and will not be responsible for any accident, injury, theft, and death during the safari excursion.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default SafariBookingPage;
