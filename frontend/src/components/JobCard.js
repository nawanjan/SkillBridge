import React from 'react';
import '../styles/JobCard.css';

function JobCard({ job, onClick }) {
  return (
    <div className="job-card" onClick={onClick}>
      <div className="job-card-header">
        <h3 className="job-title">{job.title}</h3>
        <span className="job-type-badge">{job.type}</span>
      </div>
      
      <div className="job-company">{job.company}</div>
      
      <div className="job-details">
        <span className="job-detail">
          <span className="detail-icon">📍</span>
          {job.location}
        </span>
        <span className="job-detail">
          <span className="detail-icon">💰</span>
          {job.salary}
        </span>
      </div>
      
      <p className="job-description">{job.description}</p>
      
      <div className="job-skills">
        {job.requirements.skills.slice(0, 3).map((skill, index) => (
          <span key={index} className="skill-badge">{skill}</span>
        ))}
        {job.requirements.skills.length > 3 && (
          <span className="skill-badge more">+{job.requirements.skills.length - 3} more</span>
        )}
      </div>
      
      <div className="job-footer">
        <span className="posted-date">Posted: {job.posted}</span>
        <button className="view-details-btn">View Details →</button>
      </div>
    </div>
  );
}

export default JobCard;
