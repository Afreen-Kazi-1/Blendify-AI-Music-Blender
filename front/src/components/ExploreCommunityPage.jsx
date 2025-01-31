import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Play, Pause, X, ChevronDown, ChevronUp } from 'lucide-react';
import Layout from './Layout';
import './ExploreCommunityPage.css';

const API_BASE_URL = 'https://your-backend-api.com';

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

const ProjectItem = ({ project, projectId, songs }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(180);

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects/${projectId}/likes`)
      .then(response => response.json())
      .then(data => {
        setLikeCount(data.likeCount);
        setIsLiked(data.userLiked);
      });

    fetch(`${API_BASE_URL}/projects/${projectId}/comments`)
      .then(response => response.json())
      .then(data => setComments(data.comments));
  }, [projectId]);

  const handleLike = () => {
    fetch(`${API_BASE_URL}/projects/${projectId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ like: !isLiked })
    })
      .then(response => response.json())
      .then(data => {
        setIsLiked(data.userLiked);
        setLikeCount(data.likeCount);
      });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      fetch(`${API_BASE_URL}/projects/${projectId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: comment })
      })
        .then(response => response.json())
        .then(data => {
          setComments(prevComments => [...prevComments, data.comment]);
          setComment('');
        });
    }
  };

  return (
    <div className="explore-project-expanded">
      <div className="explore-project-controls">
        <button onClick={() => setIsPlaying(!isPlaying)} className="explore-control-button">
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <div className="explore-project-info" onClick={() => setIsExpanded(!isExpanded)}>
          <span className="explore-project-name">{project}</span>
          <button className="explore-expand-button">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
        <div className="explore-project-actions">
          <button onClick={handleLike} className={`explore-control-button ${isLiked ? 'liked' : ''}`}>
            <Heart size={20} />
          </button>
          <span className="explore-count">{likeCount}</span>
          <button onClick={() => setShowCommentBox(!showCommentBox)} className="explore-control-button">
            <MessageCircle size={20} />
          </button>
          <span className="explore-count">{comments.length}</span>
        </div>
      </div>
      {showCommentBox && (
        <form onSubmit={handleCommentSubmit} className="explore-comment-form">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="explore-comment-input"
          />
          <button type="submit" className="explore-comment-submit">Post</button>
        </form>
      )}
    </div>
  );
};

const ExploreCommunityPage = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch(`${API_BASE_URL}/projects/trending`)
      .then(response => response.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <Layout>
      <div className="explore-body">
        <h1 className="explore-trending-title">Trending</h1>
        <div className="explore-grid">
          {projects.map(project => (
            <ProjectItem key={project.id} projectId={project.id} project={project.name} songs={project.songs} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ExploreCommunityPage;
