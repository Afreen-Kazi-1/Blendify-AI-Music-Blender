import React from 'react';
import './MusicBars.css';

const MusicBars = ({ position = 'left' }) => {
  const normalBars = 3;
  
  return (
    <div className={`music-bars-container ${position}`}>
      <div className="music-bars-wrapper">
        {[...Array(normalBars)].map((_, index) => (
          <div 
            key={index} 
            className="music-bar"
            style={{
              animationDelay: `${index * 0.2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MusicBars;