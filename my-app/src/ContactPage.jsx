import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ContactPage.css';
import Layout from './Layout';

const ContactPage = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [showNames, setShowNames] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    
    const timer = setTimeout(() => {
      setShowNames(true);
    }, 2000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Layout>
    <div className="contact-page">
      {showHeader && (
        <div className="contact-header">
          <div className="contact-header-wrapper">
            <h1 className="contact-header-brand">Blendify</h1>
            <Link to="/login" className="contact-login-btn">Login</Link>
          </div>
        </div>
      )}
      <div className="contact-wrapper">
        <div className="contact-container">
          <div className="contact-ring-wrapper">
            <div className="contact-ring"></div>
            <div className="contact-center-text">
              <p className="contact-page-subtitle">Contact Us @</p>
              <h1 className="contact-page-title">The Coding Tales</h1>
            </div>
          </div>

          <div className={`contact-team-container ${showNames ? 'names-visible' : ''}`}>
            <div className="team-member top-left">Abhiman</div>
            <div className="team-member top-right">Harsh</div>
            <div className="team-member bottom-left">Tisha</div>
            <div className="team-member bottom-right">Afreen</div>
          </div>
        </div>
      </div>
      
      <footer className="contact-footer">
        <div className="contact-footer-content">
          <div className="contact-footer-section">
            <h3 className="contact-footer-heading">Blendify</h3>
            <Link to="/" className="contact-footer-link">Home</Link>
            <Link to="/login" className="contact-footer-link">Login</Link>
          </div>
          
          <div className="contact-footer-section">
            <h3 className="contact-footer-heading">Help</h3>
            <Link to="/faq" className="contact-footer-link">FAQ</Link>
            <Link to="/contact" className="contact-footer-link">Contact us</Link>
          </div>
        </div>
      </footer>
    </div>
    </Layout>
  );
};

export default ContactPage;