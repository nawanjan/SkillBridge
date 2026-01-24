import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { matchJobs } from '../services/api';
import JobCard from '../components/JobCard';
import '../styles/JobMatchingPage.css';

function JobMatchingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    skills: '',
    experience: '',
    education: '',
    location: '',
    languages: ''
  });
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);

    try {
      const requirements = {
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
        experience: formData.experience,
        education: formData.education,
        location: formData.location,
        languages: formData.languages.split(',').map(l => l.trim()).filter(l => l)
      };

      const jobs = await matchJobs(requirements);
      setMatchedJobs(jobs);
    } catch (error) {
      console.error('Error matching jobs:', error);
      alert('Failed to find matching jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getMatchColor = (score) => {
    if (score >= 70) return 'high-match';
    if (score >= 40) return 'medium-match';
    return 'low-match';
  };

  return (
    <div className="job-matching-page">
      <div className="matching-container">
        <div className="form-section">
          <h1>Find Your Perfect Job</h1>
          <p className="form-description">
            Enter your requirements and we'll find the best matching jobs for you
          </p>

          <form onSubmit={handleSubmit} className="matching-form">
            <div className="form-group">
              <label htmlFor="skills">
                <span className="label-icon">🛠️</span>
                Skills (comma-separated)
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="e.g., React, JavaScript, Node.js"
                required
              />
              <small>Enter your technical or professional skills</small>
            </div>

            <div className="form-group">
              <label htmlFor="experience">
                <span className="label-icon">📊</span>
                Years of Experience
              </label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="e.g., 3"
                min="0"
                max="50"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="education">
                <span className="label-icon">🎓</span>
                Education Level
              </label>
              <select
                id="education"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your education level</option>
                <option value="High School">High School</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor's Degree</option>
                <option value="Master">Master's Degree</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location">
                <span className="label-icon">📍</span>
                Preferred Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Colombo"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="languages">
                <span className="label-icon">🗣️</span>
                Languages (comma-separated)
              </label>
              <input
                type="text"
                id="languages"
                name="languages"
                value={formData.languages}
                onChange={handleInputChange}
                placeholder="e.g., English, Sinhala, Tamil"
                required
              />
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Finding Jobs...' : 'Find Matching Jobs'}
            </button>
          </form>
        </div>

        <div className="results-section">
          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Finding the best jobs for you...</p>
            </div>
          )}

          {!loading && searched && matchedJobs.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No jobs found</h3>
              <p>Try adjusting your requirements or check back later for new opportunities</p>
            </div>
          )}

          {!loading && matchedJobs.length > 0 && (
            <div className="results-container">
              <h2>
                Found {matchedJobs.length} matching job{matchedJobs.length !== 1 ? 's' : ''}
              </h2>
              <p className="results-subtitle">
                Jobs are sorted by match score - higher is better!
              </p>
              
              <div className="jobs-list">
                {matchedJobs.map((job) => (
                  <div key={job.id} className="job-match-card">
                    <div className={`match-badge ${getMatchColor(job.matchScore)}`}>
                      {job.matchScore}% Match
                    </div>
                    <JobCard 
                      job={job} 
                      onClick={() => navigate(`/job/${job.id}`)}
                    />
                    <div className="match-details">
                      <h4>Match Breakdown:</h4>
                      <div className="match-stats">
                        <div className="match-stat">
                          <span className="stat-label">Skills:</span>
                          <span className="stat-value">
                            {Math.round(job.matchDetails.skillsMatch)}%
                          </span>
                        </div>
                        <div className="match-stat">
                          <span className="stat-label">Location:</span>
                          <span className="stat-value">
                            {job.matchDetails.locationMatch ? '✓' : '✗'}
                          </span>
                        </div>
                        <div className="match-stat">
                          <span className="stat-label">Experience:</span>
                          <span className="stat-value">
                            {job.matchDetails.experienceMatch ? '✓' : '✗'}
                          </span>
                        </div>
                        <div className="match-stat">
                          <span className="stat-label">Education:</span>
                          <span className="stat-value">
                            {job.matchDetails.educationMatch ? '✓' : '✗'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!searched && (
            <div className="empty-state">
              <div className="empty-icon">💼</div>
              <h3>Ready to find your dream job?</h3>
              <p>Fill in your requirements on the left to get personalized job matches</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobMatchingPage;
