import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Register.css'; // Import CSS for styling

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false); // New state for registration status

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                email,
                password,
                firstName: "",       // Set default value for firstName
                lastName: "",        // Set default value for lastName
                phoneNumber: "",     // Set default value for phoneNumber
                orderHistory: []     // Set default value for orderHistory
            });
            setMessage(response.data.message); // Assuming your backend returns a message
            setIsRegistered(true); // Set registration status to true
        } catch (error) {
            setMessage(error.response.data.message || 'An error occurred');
            setIsRegistered(false); // Reset registration status on error
        }
    };

    return (
        <div className="register-container">
            <div className="left-side">
                <h2>Sign Up</h2>
                <br />
                {isRegistered && <p className="success-message">Registration successful!</p>} {/* Success message */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Enter email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
            <div className="right-side">
                <img src="https://i.ibb.co/LCvDyFr/wedding-couple.png" alt="Landscape" className="landscape-image" />
            </div>
        </div>
    );
};

export default Register;
