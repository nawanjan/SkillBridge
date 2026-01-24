import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Find Your Perfect Job Match
          </h1>
          <p className="hero-subtitle">
            Tell us your skills and requirements, and we'll find the best job opportunities for you in Sri Lanka
          </p>
          <button 
            className="cta-button"
            onClick={() => navigate('/find-jobs')}
          >
            Get Started
          </button>
        </div>
        <div className="hero-image">
          <div className="floating-card card-1">
            <span className="card-icon">🎯</span>
            <span className="card-text">Smart Matching</span>
          </div>
          <div className="floating-card card-2">
            <span className="card-icon">💡</span>
            <span className="card-text">Top Companies</span>
          </div>
          <div className="floating-card card-3">
            <span className="card-icon">🚀</span>
            <span className="card-text">Quick Apply</span>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Enter Your Requirements</h3>
            <p>Tell us about your skills, experience, education, and preferences</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Smart Matching</h3>
            <p>Our algorithm finds jobs that match your profile with accuracy scores</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Apply Instantly</h3>
            <p>Apply to jobs that match your requirements with a single click</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-item">
          <div className="stat-number">500+</div>
          <div className="stat-label">Active Jobs</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">200+</div>
          <div className="stat-label">Companies</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">1000+</div>
          <div className="stat-label">Job Seekers</div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
