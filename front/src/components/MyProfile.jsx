import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Settings, User, Play, Pause } from 'lucide-react';
import Layout from './Layout';
import './MyProfile.css';

const MyProfile = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [playingStates, setPlayingStates] = useState({});

  const projects = [
    { id: 1, name: "Project 1", duration: "3:45" },
    { id: 2, name: "Project 2", duration: "4:20" },
    { id: 3, name: "Project 3", duration: "3:15" },
    { id: 4, name: "Project 4", duration: "5:00" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePlay = (projectId) => {
    setPlayingStates(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  return (
    <Layout>
      <div className="profile-body">
        {showHeader && (
          <div className="profile-fixed-header">
            <div className="profile-header-content">
              <h1 className="header-title">Blendify</h1>
              <Link to="/settings" className="settings-button">
                <Settings size={24} />
              </Link>
            </div>
          </div>
        )}

        <div className="profile-main-content">
          <div className="profile-container">
            <div className="profile-ring"></div>
            <div className="profile-content">
              <div className="profile-image-container">
                <label htmlFor="profile-upload" className="profile-upload-label">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="profile-image" />
                  ) : (
                    <User size={120} color="#ffffff" />
                  )}
                </label>
                <input
                  type="file"
                  id="profile-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="profile-upload-input"
                />
              </div>
              <h2 className="profile-username">@username</h2>
            </div>
          </div>

          <div className="projects-container">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-info">
                  <h3 className="project-name">{project.name}</h3>
                  <span className="project-duration">{project.duration}</span>
                </div>
                <button 
                  className="play-button"
                  onClick={() => togglePlay(project.id)}
                >
                  {playingStates[project.id] ? (
                    <Pause size={24} />
                  ) : (
                    <Play size={24} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        <footer className="profile-footer">
          <div className="profile-footer-content">
            <div className="profile-footer-section">
              <h3 className="profile-footer-heading">Blendify</h3>
              <Link to="/" className="profile-footer-link">Home</Link>
              <Link to="/login" className="profile-footer-link">Login</Link>
            </div>
            
            <div className="profile-footer-section">
              <h3 className="profile-footer-heading">Help</h3>
              <Link to="/faq" className="profile-footer-link">FAQ</Link>
              <Link to="/contact" className="profile-footer-link">Contact us</Link>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default MyProfile;