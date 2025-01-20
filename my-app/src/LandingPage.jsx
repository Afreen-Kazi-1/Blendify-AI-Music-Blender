import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import Layout from './Layout';

const LandingPage = () => {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
    <div className="body">
      {showHeader && (
        <div className="fixed-header">
          <div className="header-content">
            <h1 className="header-title">Blendify</h1>
            <Link to="/login" className="header-login-button">Login</Link>
          </div>
        </div>
      )}
      <div className="main-content">
        <div className="container">
          <div className="ring"></div>
          <div className="text-container">
            <h1 className="title">Blendify</h1>
            <p className="subtitle">Blend, Mash, Love, Share!</p>
            <div className="button-container">
              <div className="primary-buttons">
                <Link to="/signup" className="button">Sign Up</Link>
                <Link to="/login" className="button">Login</Link>
              </div>
            </div>
          </div>
          <div className="google-signin-section">
            <div className="signin-text">Sign in with:</div>
            <a href="/auth/google" className="google-button">
              <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path fill="#fff" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
              </svg>
              Google
            </a>
          </div>
        </div>
      </div>
      <div className="white-section"> 
        <div className="content-section">
          <h2 className="section-heading">What is <span>Blendify</span>?</h2>
          <p className="section-text">
            Blendify is your ultimate music mashup companion. It's a platform where creativity meets technology, allowing you to seamlessly blend your favorite songs into unique mashups. Whether you upload your own tracks or import them directly from YouTube, Blendify's advanced algorithm crafts a perfect harmony that suits your style. 
            <br /><br />
            Discover, create, and share your music like never before—because with Blendify, every beat is yours to remix.
          </p>
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

export default LandingPage;