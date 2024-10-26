import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './VendorRegister.css'; // Reuse the same CSS for styling

const VendorLogin = () => {
    const [vendor_email, setVendorEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/vendorauth/login', {
                vendor_email,
                password,
            });

            setMessage(data.message); // Assuming your backend returns a message

            // Store vendor data in localStorage (or cookies) to maintain the session
            localStorage.setItem('vendor', JSON.stringify(data.vendor)); // Save vendor details (vendor_email, token, etc.)

            // Redirect to vendor dashboard or home page after successful login
            navigate('/vendor-dashboard');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Invalid email or password');
        }
    };

    return (
        <div className="vendor-register-container"> {/* Reusing the same container styles */}
            <div className="left-side">
                <h2>Vendor Login</h2> {/* Changed to Vendor Login */}
                <i>Welcome back to Event Planner</i>
                <br />
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Enter vendor email address"
                            value={vendor_email}
                            onChange={(e) => setVendorEmail(e.target.value)}
                            required
                            className="input-field"
                            aria-label="Vendor Email"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input-field"
                            aria-label="Password"
                        />
                    </div>
                    <button type="submit" className="submit-button">Login</button> {/* Button text */}
                </form>
                {message && <p className="message">{message}</p>}
                <br />
                <p>
                    Don't have an account? <Link to="/vendor-register">Sign Up</Link> {/* Changed to vendor sign-up link */}
                </p>

                <p>
                    Are you a <Link to= "/login">Customer</Link> ?
                </p>
            </div>
            <div className="right-side">
                <img src="https://i.pinimg.com/564x/99/9b/19/999b1906c651c56fc5dffd1bef58f8b2.jpg" alt="Vendor login" className="landscape-image" />
            </div>
        </div>
    );
};

export default VendorLogin;
