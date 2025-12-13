import { useState } from 'react';
import { supabase } from '../lib/supabase';
import './EnquiryForm.css';

const EnquiryForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        countryCode: '+91',
        phone: '',
        travelDates: '',
        guests: '2',
        packageChoice: 'corbett-nainital',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const countryCodes = [
        { code: '+91', country: 'India' },
        { code: '+1', country: 'USA/Canada' },
        { code: '+44', country: 'UK' },
        { code: '+971', country: 'UAE' },
        { code: '+65', country: 'Singapore' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Phone number must be 10 digits';
        }

        if (!formData.travelDates) {
            newErrors.travelDates = 'Travel dates are required';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);

            try {
                // Save to Supabase
                const { data, error } = await supabase
                    .from('enquiry_forms')
                    .insert([
                        {
                            full_name: formData.fullName,
                            email: formData.email,
                            phone: formData.phone,
                            country_code: formData.countryCode,
                            travel_dates: formData.travelDates || null,
                            num_guests: parseInt(formData.guests),
                            package_choice: formData.packageChoice,
                            message: formData.message
                        }
                    ]);

                if (error) {
                    console.error('Supabase error:', error);
                    alert('Error submitting form. Please try again.');
                    setIsSubmitting(false);
                    return;
                }

                // Form is valid and saved
                console.log('Form submitted successfully:', data);
                setIsSubmitted(true);

                // Reset form after 3 seconds
                setTimeout(() => {
                    setFormData({
                        fullName: '',
                        email: '',
                        countryCode: '+91',
                        phone: '',
                        travelDates: '',
                        guests: '2',
                        packageChoice: 'corbett-nainital',
                        message: ''
                    });
                    setIsSubmitted(false);
                    setIsSubmitting(false);
                }, 3000);
            } catch (error) {
                console.error('Error:', error);
                alert('Error submitting form. Please try again.');
                setIsSubmitting(false);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="enquiry-form-wrapper" id="enquiry-form">
            <div className="enquiry-form-container">
                <div className="form-header">
                    <h3>Plan Your Adventure</h3>
                    <p>Fill in your details and our travel expert will call you within 24 hours</p>
                </div>

                {isSubmitted ? (
                    <div className="success-message">
                        <div className="success-icon">✓</div>
                        <h4>Enquiry Submitted Successfully!</h4>
                        <p>Our team will contact you within 24 hours.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="enquiry-form">
                        <div className="form-group">
                            <label htmlFor="fullName" className="form-label">Full Name *</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={`form-input ${errors.fullName ? 'error' : ''}`}
                                placeholder="Enter your full name"
                            />
                            {errors.fullName && <span className="form-error">{errors.fullName}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`form-input ${errors.email ? 'error' : ''}`}
                                placeholder="your.email@example.com"
                            />
                            {errors.email && <span className="form-error">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone" className="form-label">Phone Number *</label>
                            <div className="phone-input-group">
                                <select
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                    className="form-select country-code"
                                >
                                    {countryCodes.map(({ code, country }) => (
                                        <option key={code} value={code}>
                                            {code} ({country})
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`form-input phone-number ${errors.phone ? 'error' : ''}`}
                                    placeholder="1234567890"
                                />
                            </div>
                            {errors.phone && <span className="form-error">{errors.phone}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="travelDates" className="form-label">Preferred Travel Dates *</label>
                            <input
                                type="date"
                                id="travelDates"
                                name="travelDates"
                                value={formData.travelDates}
                                onChange={handleChange}
                                className={`form-input ${errors.travelDates ? 'error' : ''}`}
                                min={new Date().toISOString().split('T')[0]}
                            />
                            {errors.travelDates && <span className="form-error">{errors.travelDates}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="guests" className="form-label">Number of Guests</label>
                                <input
                                    type="number"
                                    id="guests"
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                    className="form-input"
                                    min="1"
                                    max="100000"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="packageChoice" className="form-label">Package Choice</label>
                                <select
                                    id="packageChoice"
                                    name="packageChoice"
                                    value={formData.packageChoice}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value="corbett-only">Corbett Only</option>
                                    <option value="nainital-only">Nainital Only</option>
                                    <option value="corbett-nainital">Corbett + Nainital</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message" className="form-label">Inquiry Message (Optional)</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="form-textarea"
                                placeholder="Tell us about your preferences, special requirements, or any questions..."
                                maxLength="500"
                            ></textarea>
                            <div className="char-count">{formData.message.length}/500</div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-large submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Send Enquiry'}
                        </button>

                        <p className="form-note">
                            🕐 Our travel expert will call you within 24 hours
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EnquiryForm;
