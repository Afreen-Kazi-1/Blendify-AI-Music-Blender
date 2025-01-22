import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from './Layout';
import './BlendPage.css';
import { apiClient } from '../services/api';
import { API_ENDPOINTS } from '../config/api';

const BlendPage = () => {
  const navigate = useNavigate();
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blendName = e.target.elements[0].value;
    
    try {
      await apiClient.request(API_ENDPOINTS.blend.create, {
        method: 'POST',
        body: JSON.stringify({ name: blendName })
      });
      navigate('/importmedia');
    } catch (error) {
      console.error('Failed to create blend:', error);
    }
  };

  return (
    <Layout>
      <div className="blend-body">
        {showHeader && (
          <div className="blend-fixed-header">
            <div className="blend-header-content">
              <Link to="/explore" className="blend-explore-button">
                Explore Community
              </Link>
              <Link to="/profile" className="blend-profile-button">
                My Profile
              </Link>
            </div>
          </div>
        )}

        <div className="blend-main-content">
          <div className="blend-container">
            <div className="blend-ring"></div>
            <div className="blend-text-container">
              <h1 className="blend-title">Create Blend</h1>
            </div>
            <form className="blend-form" onSubmit={handleSubmit}>
              <div className="blend-form-group">
                <input type="text" placeholder="Blend Name" required />
              </div>
              <button type="submit" className="blend-button">Blend</button>
            </form>
          </div>
        </div>

        <footer className="blend-footer">
          <div className="blend-footer-content">
            <div className="blend-footer-section">
              <h3 className="blend-footer-heading">Blendify</h3>
              <Link to="/" className="blend-footer-link">Home</Link>
              <Link to="/login" className="blend-footer-link">Login</Link>
            </div>
            
            <div className="blend-footer-section">
              <h3 className="blend-footer-heading">Help</h3>
              <Link to="/faq" className="blend-footer-link">FAQ</Link>
              <Link to="/contact" className="blend-footer-link">Contact us</Link>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default BlendPage;