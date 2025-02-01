import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showHeader, setShowHeader] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Add scroll event listener for header visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        credentials,
      );

      if (response.data.accesstoken && response.data.refreshtoken) {
        // Store tokens and username
        localStorage.setItem("accessToken", response.data.accesstoken);
        localStorage.setItem("refreshToken", response.data.refreshtoken);
        localStorage.setItem("username", credentials.username); // Store username

        // Navigate to blend page on successful login
        navigate("/blend");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.error?.message ||
          err.response?.data?.error ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="login-body">
        {/* Conditionally render the header based on showHeader state */}
        {showHeader && (
          <div className="fixed-header">
            <div className="header-content">
              <h1 className="header-title">Blendify</h1>
            </div>
          </div>
        )}

        <div className="login-main-content">
          <div className="login-container">
            <div className="login-ring"></div>
            <div className="login-text-container">
              <h1 className="login-title">Blendify</h1>
              <p className="login-subtitle">Blend, Mash, Love, Share!</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-form-group">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="login-form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <button
                type="submit"
                className={`login-button ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {/* Google Login Option */}
              <div className="google-login">
                <a href="/auth/google" className="google-button">
                  <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path fill="#fff" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
                  </svg>
                  Google
                </a>
              </div>
            </form>
          </div>
        </div>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-heading">Blendify</h3>
              <Link to="/" className="footer-link">
                Home
              </Link>
              <Link to="/login" className="footer-link">
                Login
              </Link>
            </div>

            <div className="footer-section">
              <h3 className="footer-heading">Help</h3>
              <Link to="/faq" className="footer-link">
                FAQ
              </Link>
              <Link to="/contact" className="footer-link">
                Contact us
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default LoginPage;
