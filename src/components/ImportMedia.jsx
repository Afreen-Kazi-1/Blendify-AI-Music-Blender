import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import './ImportMedia.css';


const NUMBER_OF_BARS = 15; 

const LoadingAnimation = () => {
  return (
    <div className="loading-screen">
      <div className="loading-bars">
        {[...Array(NUMBER_OF_BARS)].map((_, index) => (
          <div 
            key={index} 
            className="loading-bar"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
};

const ImportMedia = () => {
  const navigate = useNavigate();
  const [showHeader, setShowHeader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [ytLink, setYtLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log("File dropped:", e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      navigate('/demo-blend');
    }, 5000);
  };

  return (
    <div className="import-body">
      {(showHeader || isLoading) && (
        <div className="import-fixed-header">
          <div className="import-header-content">
            <h1 className="header-title">Blendify</h1>
            <Link to="/settings" className="settings-button">
              <Settings size={24} />
            </Link>
          </div>
        </div>
      )}

      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <div className="import-main-content">
            <div className="import-container">
              <div className="import-ring"></div>
              <div className="import-text-container">
                <h1 className="import-title">Import your songs</h1>
              </div>
              <form className="import-form" onSubmit={handleSubmit}>
                <div 
                  className={`drag-drop-box ${dragActive ? "drag-active" : ""}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <p>Drag and drop your songs here</p>
                  <p className="or-divider">or</p>
                  <input 
                    type="text" 
                    placeholder="Paste YouTube link here"
                    value={ytLink}
                    onChange={(e) => setYtLink(e.target.value)}
                    className="yt-link-input"
                  />
                </div>
                <button type="submit" className="lets-go-button">Let's Go!</button>
              </form>
            </div>
          </div>

          <footer className="import-footer">
            <div className="import-footer-content">
              <div className="import-footer-section">
                <h3 className="import-footer-heading">Blendify</h3>
                <Link to="/" className="import-footer-link">Home</Link>
                <Link to="/login" className="import-footer-link">Login</Link>
              </div>
              
              <div className="import-footer-section">
                <h3 className="import-footer-heading">Help</h3>
                <Link to="/faq" className="import-footer-link">FAQ</Link>
                <Link to="/contact" className="import-footer-link">Contact us</Link>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default ImportMedia;