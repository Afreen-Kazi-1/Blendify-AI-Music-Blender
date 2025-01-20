import React, { useState, useRef, useEffect } from 'react';
import { Settings, Play, Pause, Scissors, Save, Trash2 } from 'lucide-react';
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
  const audioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
              <button className="play-button" onClick={togglePlay}>
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              
              <div className="time-control">
                <span className="time-display">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleSliderChange}
                  className="time-slider"
                />
                <span className="time-display">{formatTime(duration)}</span>
              </div>

              <button className="trim-button">
                <Scissors size={20} />
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="save-button" onClick={handleSave}>
              <Save size={20} />
              Save
            </button>
            <button className="discard-button" onClick={handleDiscard}>
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