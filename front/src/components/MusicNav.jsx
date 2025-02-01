import React from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

const MusicNav = () => {
  // Define the navigation items and their corresponding paths
  const navItems = [
    { name: 'Blend', path: '/blend' },
    { name: 'Import Media', path: '/importmedia' },
    { name: 'Demo Blend', path: '/demo-blend' },
  ];

  return (
    <nav className="music-nav">
      <div className="nav-container">
        {navItems.map((item, index) => (
          <React.Fragment key={item.name}>
            <Link to={item.path} className="nav-item">
              <div className="nav-content">
                <div className="equalizer">
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                </div>
                <span className="nav-text">{item.name}</span>
              </div>
            </Link>
            {index < navItems.length - 1 && <div className="divider" />}
          </React.Fragment>
        ))}
        <Link to="/settings" className="nav-item">
          <div className="nav-content settings-content">
            <Settings className="settings-icon" size={20} />
            <span className="nav-text">Settings</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default MusicNav;
