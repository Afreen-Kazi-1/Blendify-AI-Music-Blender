import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import './ExploreCommunityPage.css';

const ExploreCommunityPage = () => {
  const [showHeader, setShowHeader] = useState(false);

  const users = [
    {
      id: 1,
      username: "User1",
      profilePic: "/api/placeholder/100/100",
      projects: ["Blend 1", "Blend 2", "Blend 3"]
    },
    {
      id: 2,
      username: "User2",
      profilePic: "/api/placeholder/100/100",
      projects: ["Blend 1", "Blend 2", "Blend 3"]
    },
    {
      id: 3,
      username: "User3",
      profilePic: "/api/placeholder/100/100",
      projects: ["Blend 1", "Blend 2", "Blend 3"]
    },
    {
      id: 4,
      username: "User4",
      profilePic: "/api/placeholder/100/100",
      projects: ["Blend 1", "Blend 2", "Blend 3"]
    },
    {
      id: 5,
      username: "User5",
      profilePic: "/api/placeholder/100/100",
      projects: ["Blend 1", "Blend 2", "Blend 3"]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      <div className="explore-body">
        {showHeader && (
          <div className="explore-fixed-header">
            <div className="explore-header-content">
              <h1 className="explore-rainbow-title">Blendify</h1>
              <Link to="/profile" className="explore-profile-button">
                My Profile
              </Link>
            </div>
          </div>
        )}

        <div className="explore-main-content">
          <div className="explore-grid">
            {users.map(user => (
              <div key={user.id} className="explore-user-card">
                <div className="explore-user-profile">
                  <img 
                    src={user.profilePic} 
                    alt={`${user.username}'s profile`} 
                    className="explore-profile-image"
                  />
                  <h2 className="explore-username">{user.username}</h2>
                </div>
                <div className="explore-projects">
                  <h3 className="explore-projects-title">Past Projects</h3>
                  <ul className="explore-projects-list">
                    {user.projects.map((project, index) => (
                      <li key={index} className="explore-project-item">
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="explore-footer">
          <div className="explore-footer-content">
            <div className="explore-footer-section">
              <h3 className="explore-footer-heading">Blendify</h3>
              <Link to="/" className="explore-footer-link">Home</Link>
              <Link to="/login" className="explore-footer-link">Login</Link>
            </div>
            
            <div className="explore-footer-section">
              <h3 className="explore-footer-heading">Help</h3>
              <Link to="/faq" className="explore-footer-link">FAQ</Link>
              <Link to="/contact" className="explore-footer-link">Contact us</Link>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default ExploreCommunityPage;