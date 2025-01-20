import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';
import Layout from './Layout';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/blend');
  };

  return (
    <Layout>
    <div className="login-body">
      {showHeader && (
        <div className="fixed-header">
          <div className="header-content">
            <h1 className="header-title">Blendify</h1>
            <Link to="/login" className="header-login-button">Login</Link>
          </div>
        </div>
      )}
     
      
      <div className="login-main-content">
        <div className="login-container">
          <div className="login-ring"></div>
          <div className="login-text-container">
            <h1 className="login-title">Blendify</h1>
            <p className="login-subtitle">Blend, Mash, Love, Share!</p>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form-group">
              <input type="text" placeholder="Username" required />
            </div>
            <div className="login-form-group">
              <input type="password" placeholder="Password" required />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
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

export default LoginPage;