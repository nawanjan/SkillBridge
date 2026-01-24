import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobById, createApplication } from '../services/api';
import '../styles/JobDetailsPage.css';

function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const data = await getJobById(id);
      setJob(data);
    } catch (error) {
      console.error('Error fetching job details:', error);
      alert('Failed to load job details.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    setApplying(true);
    try {
      // In a real application, you would get the jobSeekerId from authentication
      const applicationData = {
        jobId: job.id,
        jobSeekerId: 1, // Placeholder
        coverLetter: 'I am interested in this position.'
      };
      await createApplication(applicationData);
      setApplied(true);
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error applying to job:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="job-details-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="job-details-page">
        <div className="error-container">
          <h2>Job not found</h2>
          <button onClick={() => navigate('/all-jobs')} className="back-button">
            Back to All Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="job-details-page">
      <div className="details-container">
        <button onClick={() => navigate(-1)} className="back-link">
          ← Back
        </button>

        <div className="job-header">
          <div className="job-title-section">
            <h1>{job.title}</h1>
            <div className="job-meta">
              <span className="company">🏢 {job.company}</span>
              <span className="location">📍 {job.location}</span>
              <span className="type">💼 {job.type}</span>
            </div>
          </div>
          <div className="salary-badge">{job.salary}</div>
        </div>

        <div className="job-content">
          <section className="job-section">
            <h2>Job Description</h2>
            <p>{job.description}</p>
          </section>

          <section className="job-section">
            <h2>Requirements</h2>
            
            <div className="requirement-item">
              <h3>📊 Experience</h3>
              <p>{job.requirements.experience}</p>
            </div>

            <div className="requirement-item">
              <h3>🎓 Education</h3>
              <p>{job.requirements.education}</p>
            </div>

            <div className="requirement-item">
              <h3>🛠️ Skills</h3>
              <div className="skills-list">
                {job.requirements.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="requirement-item">
              <h3>🗣️ Languages</h3>
              <div className="languages-list">
                {job.requirements.languages.map((language, index) => (
                  <span key={index} className="language-tag">{language}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="job-section">
            <h2>Additional Information</h2>
            <p><strong>Posted:</strong> {job.posted}</p>
          </section>
        </div>

        <div className="action-section">
          <button
            onClick={handleApply}
            className="apply-button"
            disabled={applying || applied}
          >
            {applying ? 'Submitting...' : applied ? 'Applied ✓' : 'Apply Now'}
          </button>
          {applied && (
            <p className="success-message">
              Your application has been submitted successfully!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobDetailsPage;
