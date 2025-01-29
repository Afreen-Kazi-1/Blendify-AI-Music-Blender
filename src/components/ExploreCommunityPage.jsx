import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Play, Pause, X, ChevronDown, ChevronUp } from 'lucide-react';
import Layout from './Layout';
import './ExploreCommunityPage.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="explore-modal-overlay" onClick={onClose}>
      <div className="explore-modal-content" onClick={e => e.stopPropagation()}>
        <button className="explore-modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

const ProjectItem = ({ project, songs }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(180);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments(prevComments => [...prevComments, comment]);
      setComment('');
      setShowCommentBox(false);
    }
  };

  const handleSliderChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="explore-project-expanded">
      <div className="explore-project-controls">
        <button onClick={handlePlayPause} className="explore-control-button">
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        
        <div className="explore-project-info" onClick={() => setIsExpanded(!isExpanded)}>
          <span className="explore-project-name">{project}</span>
          <button className="explore-expand-button">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        <div className="explore-project-actions">
          <div className="explore-action-with-count">
            <button 
              onClick={handleLike} 
              className={`explore-control-button ${isLiked ? 'liked' : ''}`}
            >
              <Heart size={20} />
            </button>
            <span className="explore-count">{likeCount}</span>
          </div>
          <div className="explore-action-with-count">
            <button 
              onClick={() => setShowCommentBox(!showCommentBox)} 
              className="explore-control-button"
            >
              <MessageCircle size={20} />
            </button>
            <span className="explore-count">{comments.length}</span>
          </div>
        </div>
      </div>

      <div className="explore-audio-progress">
        <span className="explore-time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSliderChange}
          className="explore-progress-slider"
        />
        <span className="explore-time">{formatTime(duration)}</span>
      </div>
      
      {isExpanded && songs && songs.length > 0 && (
        <div className="explore-blend-details">
          <h4 className="explore-blend-details-title">Constituent Songs:</h4>
          <ul className="explore-songs-list">
            {songs.map((song, index) => (
              <li key={index}>{song.title} - {song.artist}</li>
            ))}
          </ul>
        </div>
      )}
      
      {showCommentBox && (
        <form onSubmit={handleCommentSubmit} className="explore-comment-form">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="explore-comment-input"
          />
          <button type="submit" className="explore-comment-submit">
            Post
          </button>
        </form>
      )}

      {comments.length > 0 && (
        <div className="explore-comments-list">
          {comments.map((comment, index) => (
            <div key={index} className="explore-comment">
              {comment}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ExploreCommunityPage = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  // Sample user data
  const mockUsers = [
    {
      id: 1,
      username: "User1",
      profilePic: "/api/placeholder/100/100",
      projects: [
        {
          name: "Summer Vibes Mix",
          songs: [
            { title: "Dreams", artist: "Fleetwood Mac" },
            { title: "Blinding Lights", artist: "The Weeknd" }
          ]
        },
        {
          name: "Chill Evening",
          songs: [
            { title: "Bohemian Rhapsody", artist: "Queen" },
            { title: "Sweet Dreams", artist: "Eurythmics" }
          ]
        }
      ]
    },
    {
      id: 2,
      username: "User2",
      profilePic: "/api/placeholder/100/100",
      projects: [
        {
          name: "Dance Party Mix",
          songs: [
            { title: "Billie Jean", artist: "Michael Jackson" },
            { title: "Stay With Me", artist: "Sam Smith" }
          ]
        }
      ]
    },
    {
      id: 3,
      username: "RhythmRider",
      profilePic: "/api/placeholder/100/100",
      projects: [
        {
          name: "User3",
          songs: [
            { title: "Eye of the Tiger", artist: "Survivor" },
            { title: "Stronger", artist: "Kanye West" }
          ]
        }
      ]
    },
    {
      id: 4,
      username: "User4",
      profilePic: "/api/placeholder/100/100",
      projects: [
        {
          name: "Study Session",
          songs: [
            { title: "Clair de Lune", artist: "Debussy" },
            { title: "River Flows in You", artist: "Yiruma" }
          ]
        }
      ]
    },
    {
      id: 5,
      username: "User5",
      profilePic: "/api/placeholder/100/100",
      projects: [
        {
          name: "Indie Discovery",
          songs: [
            { title: "Mr. Brightside", artist: "The Killers" },
            { title: "Take Me Out", artist: "Franz Ferdinand" }
          ]
        }
      ]
    }
  ];

  const lastUserElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreUsers();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const loadMoreUsers = () => {
    setLoading(true);
    // Simulate API call with setTimeout
    setTimeout(() => {
      const startIndex = (page - 1) * 5;
      const newUsers = mockUsers.slice(startIndex, startIndex + 5);
      
      if (newUsers.length > 0) {
        setUsers(prevUsers => [...prevUsers, ...newUsers]);
        setPage(prevPage => prevPage + 1);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadMoreUsers();
  }, []);

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
          <h1 className="explore-trending-title">Trending</h1>
          <div className="explore-grid">
            {users.map((user, index) => (
              <div 
                key={user.id} 
                ref={index === users.length - 1 ? lastUserElementRef : null}
                className="explore-user-card"
                onClick={() => setSelectedUser(user)}
              >
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
                        {project.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          {loading && <div className="explore-loading">Loading more users...</div>}
          {!hasMore && <div className="explore-no-more">No more users to load</div>}
        </div>

        <Modal 
          isOpen={selectedUser !== null} 
          onClose={() => setSelectedUser(null)}
        >
          {selectedUser && (
            <div className="explore-user-modal">
              <div className="explore-modal-header">
                <img 
                  src={selectedUser.profilePic} 
                  alt={`${selectedUser.username}'s profile`} 
                  className="explore-profile-image-large"
                />
                <h2 className="explore-username-large">{selectedUser.username}</h2>
              </div>
              <div className="explore-modal-projects">
                <h3 className="explore-projects-title">Projects</h3>
                <div className="explore-projects-expanded">
                  {selectedUser.projects.map((project, index) => (
                    <ProjectItem 
                      key={index} 
                      project={project.name}
                      songs={project.songs}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>

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
