import React, { useState, useRef, useEffect } from 'react';
import { Settings, PlayCircle, PauseCircle, Scissors, Save, Trash2, RefreshCw, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import './DemoBlend.css';

const DemoBlend = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [showDiscardMessage, setShowDiscardMessage] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const audioRef = useRef(null);
  const dropdownRef = useRef(null);

  // Sample constituent songs
  const constituentSongs = [
    { name: "Song 1", duration: "3:45", color: "#4A90E2" },
    { name: "Song 2", duration: "4:12", color: "#45B7D1" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 0);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    audioRef.current.currentTime = time;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSave = () => {
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 2000);
  };

  const handleDiscard = () => {
    setShowDiscardMessage(true);
    setTimeout(() => setShowDiscardMessage(false), 2000);
  };

  const handleRetry = () => {
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
  };

  return (
    <Layout>
      <div className="demo-blend-body">
        {showHeader && (
          <div className="import-fixed-header">
            <div className="import-header-content">
              <h1 className="header-title">Blendify</h1>
              <Link to="/settings" className="settings-button">
                <Settings size={24} />
              </Link>
            </div>
          </div>
        )}

        <div className="demo-blend-main-content">
          <div className="demo-blend-container">
            <div className="import-ring"></div>
            <div className="demo-blend-text-container">
              <h1 className="demo-blend-title">Your Blend is Ready!</h1>
            </div>

            <div className="music-player">
              <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                src="/path-to-your-audio.mp3"
              />
              
              <div className="player-controls">
                <button className="control-button play" onClick={togglePlay}>
                  {isPlaying ? 
                    <PauseCircle size={40} strokeWidth={1.5} /> : 
                    <PlayCircle size={40} strokeWidth={1.5} />
                  }
                </button>
                
                <div className="time-control">
                  <span className="time-display">{formatTime(currentTime)}</span>
                  <div className="slider-container" ref={dropdownRef}>
                    <div className="slider-with-dropdown">
                      <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={handleSliderChange}
                        className="time-slider"
                      />
                      <button 
                        className="dropdown-toggle"
                        onClick={() => setShowDropdown(!showDropdown)}
                      >
                        <ChevronDown size={16} />
                      </button>
                    </div>
                    
                    {showDropdown && (
                      <div className="songs-dropdown">
                        <div className="dropdown-header">Constituent Songs</div>
                        {constituentSongs.map((song, index) => (
                          <div 
                            key={index} 
                            className="song-item"
                            style={{ borderLeft: `4px solid ${song.color}` }}
                          >
                            <span>{song.name}</span>
                            <span>{song.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="time-display">{formatTime(duration)}</span>
                </div>

                <button className="control-button trim">
                  <Scissors size={28} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="action-button save" onClick={handleSave}>
                <Save size={20} />
                Save
              </button>
              <button className="action-button retry" onClick={handleRetry}>
                <RefreshCw size={20} />
                Retry
              </button>
              <button className="action-button discard" onClick={handleDiscard}>
                <Trash2 size={20} />
                Discard
              </button>
            </div>

            {showSaveMessage && (
              <div className="status-message save">Song Saved</div>
            )}
            {showDiscardMessage && (
              <div className="status-message discard">Song Discarded</div>
            )}
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
      </div>
    </Layout>
  );
};

export default DemoBlend;
