import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Settings as SettingsIcon } from 'lucide-react';
import Layout from './Layout';
import './Settings.css';

const Settings = () => {
  const navigate = useNavigate();
  const [showHeader, setShowHeader] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate('/profile'); 
  };

  return (
    <Layout>
      <div className="settings-body">
        {showHeader && (
          <div className="settings-fixed-header">
            <div className="settings-header-content">
              <h1 className="header-title">Blendify</h1>
              <Link to="/settings" className="settings-button">
                <SettingsIcon size={24} />
              </Link>
            </div>
          </div>
        )}

        <div className="settings-main-content">
          <div className="settings-container">
            <div className="settings-ring"></div>
            <div className="settings-content">
              <form className="settings-form" onSubmit={handleSubmit}>
                <div className="password-section">
                  <h2 className="settings-section-title">Change Password</h2>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="password-input"
                  />
                </div>

                <div className="privacy-section">
                  <h2 className="settings-section-title">Privacy Settings</h2>
                  <div className="privacy-toggle">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={isPublic}
                        onChange={() => setIsPublic(!isPublic)}
                      />
                      <span className="slider round"></span>
                    </label>
                    <span className="privacy-label">
                      {isPublic ? 'Public Profile' : 'Private Profile'}
                    </span>
                  </div>
                </div>

                <button type="submit" className="done-button">
                  Done
                </button>
              </form>
            </div>
          </div>
        </div>

        <footer className="settings-footer">
          <div className="settings-footer-content">
            <div className="settings-footer-section">
              <h3 className="settings-footer-heading">Blendify</h3>
              <Link to="/" className="settings-footer-link">Home</Link>
              <Link to="/login" className="settings-footer-link">Login</Link>
            </div>
            
            <div className="settings-footer-section">
              <h3 className="settings-footer-heading">Help</h3>
              <Link to="/faq" className="settings-footer-link">FAQ</Link>
              <Link to="/contact" className="settings-footer-link">Contact us</Link>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default Settings;