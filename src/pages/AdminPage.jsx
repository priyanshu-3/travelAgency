import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './AdminPage.css';

const AdminPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('enquiries');
    const [enquiries, setEnquiries] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

    useEffect(() => {
        const auth = sessionStorage.getItem('adminAuth');
        if (auth === 'true') {
            setIsAuthenticated(true);
            fetchData();
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem('adminAuth', 'true');
            setIsAuthenticated(true);
            setError('');
            fetchData();
        } else {
            setError('Invalid password');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('adminAuth');
        setIsAuthenticated(false);
        setPassword('');
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch enquiry forms
            const { data: enquiryData, error: enquiryError } = await supabase
                .from('enquiry_forms')
                .select('*')
                .order('created_at', { ascending: false });

            if (enquiryError) throw enquiryError;
            setEnquiries(enquiryData || []);

            // Fetch safari bookings
            const { data: bookingData, error: bookingError } = await supabase
                .from('safari_bookings')
                .select('*')
                .order('created_at', { ascending: false });

            if (bookingError) throw bookingError;
            setBookings(bookingData || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = (data, filename) => {
        if (data.length === 0) return;

        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(row =>
            Object.values(row).map(val =>
                typeof val === 'string' && val.includes(',') ? `"${val}"` : val
            ).join(',')
        );
        const csv = [headers, ...rows].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const filterData = (data) => {
        if (!searchTerm) return data;
        return data.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-login">
                <div className="login-container">
                    <h1>Admin<br />Dashboard</h1>
                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                autoFocus
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const filteredEnquiries = filterData(enquiries);
    const filteredBookings = filterData(bookings);

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
                <div className="admin-actions">
                    <button onClick={fetchData} className="btn btn-secondary" disabled={loading}>
                        {loading ? 'Refreshing...' : 'Refresh Data'}
                    </button>
                    <button onClick={handleLogout} className="btn btn-outline">
                        Logout
                    </button>
                </div>
            </header>

            <div className="admin-tabs">
                <button
                    className={`tab ${activeTab === 'enquiries' ? 'active' : ''}`}
                    onClick={() => setActiveTab('enquiries')}
                >
                    Enquiry Forms ({enquiries.length})
                </button>
                <button
                    className={`tab ${activeTab === 'bookings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('bookings')}
                >
                    Safari Bookings ({bookings.length})
                </button>
            </div>

            <div className="admin-controls">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button
                    onClick={() => exportToCSV(
                        activeTab === 'enquiries' ? filteredEnquiries : filteredBookings,
                        activeTab === 'enquiries' ? 'enquiry_forms' : 'safari_bookings'
                    )}
                    className="btn btn-primary"
                >
                    Export to CSV
                </button>
            </div>

            <div className="admin-content">
                {activeTab === 'enquiries' && (
                    <div className="data-table-container">
                        <h2>Enquiry Forms ({filteredEnquiries.length})</h2>
                        {filteredEnquiries.length === 0 ? (
                            <p className="no-data">No enquiries found</p>
                        ) : (
                            <div className="table-scroll">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Country Code</th>
                                            <th>Travel Dates</th>
                                            <th>Guests</th>
                                            <th>Package</th>
                                            <th>Message</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredEnquiries.map((enquiry) => (
                                            <tr key={enquiry.id}>
                                                <td>{new Date(enquiry.created_at).toLocaleDateString()}</td>
                                                <td>{enquiry.full_name}</td>
                                                <td>{enquiry.email}</td>
                                                <td>{enquiry.phone}</td>
                                                <td>{enquiry.country_code}</td>
                                                <td>{enquiry.travel_dates || 'N/A'}</td>
                                                <td>{enquiry.num_guests}</td>
                                                <td>{enquiry.package_choice}</td>
                                                <td className="message-cell">{enquiry.message || 'N/A'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'bookings' && (
                    <div className="data-table-container">
                        <h2>Safari Bookings ({filteredBookings.length})</h2>
                        {filteredBookings.length === 0 ? (
                            <p className="no-data">No bookings found</p>
                        ) : (
                            <div className="table-scroll">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Safari Zone</th>
                                            <th>Timing</th>
                                            <th>Safari Date</th>
                                            <th>Persons</th>
                                            <th>ID Type</th>
                                            <th>ID Number</th>
                                            <th>Requirements</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredBookings.map((booking) => (
                                            <tr key={booking.id}>
                                                <td>{new Date(booking.created_at).toLocaleDateString()}</td>
                                                <td>{booking.full_name}</td>
                                                <td>{booking.email}</td>
                                                <td>{booking.phone}</td>
                                                <td>{booking.safari_zone}</td>
                                                <td>{booking.safari_timing}</td>
                                                <td>{booking.safari_date}</td>
                                                <td>{booking.num_persons}</td>
                                                <td>{booking.id_proof_type}</td>
                                                <td>{booking.id_proof_number}</td>
                                                <td className="message-cell">{booking.special_requirements || 'N/A'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
