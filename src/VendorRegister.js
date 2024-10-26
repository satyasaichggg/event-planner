import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './VendorRegister.css'; // Import CSS for styling

const VendorRegister = () => {
    const [vendor_email, setVendorEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false); // New state for registration status

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/vendorauth/register', {
                vendor_email,
                password,
                name,
                phone
            });
            setMessage(response.data.msg); // Assuming your backend returns a message
            setIsRegistered(true); // Set registration status to true
        } catch (error) {
            setMessage(error.response.data.msg || 'An error occurred');
            setIsRegistered(false); // Reset registration status on error
        }
    };

    return (
        <div className="vendor-register-container">
            <div className="left-side">
                <h2>Vendor Sign Up</h2>
                <br />
                {isRegistered && <p className="success-message">Registration successful!</p>} {/* Success message */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Enter email address"
                            value={vendor_email}
                            onChange={(e) => setVendorEmail(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Enter vendor name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="input-field"
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
                        />
                    </div>
                    <button type="submit" className="submit-button">Sign Up</button>
                </form>
                {message && <p className="message">{message}</p>}
                <br />
                <p>
                    Already have an account? <Link to="/vendor-login">Login</Link>
                </p>
            </div>
            <div className="right-side">
                <img src="https://i.ibb.co/LCvDyFr/wedding-couple.png" alt="Landscape" className="landscape-image" />
            </div>
        </div>
    );
};

export default VendorRegister;
