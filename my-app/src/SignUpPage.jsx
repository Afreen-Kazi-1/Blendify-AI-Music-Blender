import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUpPage.css';
import Layout from './Layout';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Layout>
    <div className="body">
      <div className="fixed-header">
        <div className="header-content">
          <h1 className="header-title">Blendify</h1>
        </div>
      </div>

      <div className="signup-main-content">
        <div className="signup-container">
          <div className="signup-ring"></div>
          <div className="signup-form-content">
            <h1 className="signup-title">Create Account</h1>
            <p className="signup-subtitle">Blend, Mash, Love, Share!</p>
            
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-grid">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="button">Sign up</button>
            </form>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-heading">Blendify</h3>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/login" className="footer-link">Login</Link>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-heading">Help</h3>
            <Link to="/faq" className="footer-link">FAQ</Link>
            <Link to="/contact" className="footer-link">Contact us</Link>
          </div>
        </div>
      </footer>
    </div>
    </Layout>
  );
};

export default SignUpPage;