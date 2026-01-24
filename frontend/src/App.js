import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobMatchingPage from './pages/JobMatchingPage';
import JobDetailsPage from './pages/JobDetailsPage';
import AllJobsPage from './pages/AllJobsPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              <span className="logo-icon">💼</span>
              JobMatch Sri Lanka
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/find-jobs" className="nav-link">Find Jobs</Link>
              </li>
              <li className="nav-item">
                <Link to="/all-jobs" className="nav-link">All Jobs</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/find-jobs" element={<JobMatchingPage />} />
          <Route path="/job/:id" element={<JobDetailsPage />} />
          <Route path="/all-jobs" element={<AllJobsPage />} />
        </Routes>

        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2025 JobMatch Sri Lanka. All rights reserved.</p>
            <p>Connecting talent with opportunity across Sri Lanka</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
