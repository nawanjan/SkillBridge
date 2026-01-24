import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Job APIs
export const getAllJobs = async () => {
  const response = await api.get('/jobs');
  return response.data;
};

export const getJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

export const matchJobs = async (requirements) => {
  const response = await api.post('/jobs/match', requirements);
  return response.data;
};

export const createJob = async (jobData) => {
  const response = await api.post('/jobs', jobData);
  return response.data;
};

// Job Seeker APIs
export const createJobSeeker = async (seekerData) => {
  const response = await api.post('/jobseekers', seekerData);
  return response.data;
};

export const getAllJobSeekers = async () => {
  const response = await api.get('/jobseekers');
  return response.data;
};

// Application APIs
export const createApplication = async (applicationData) => {
  const response = await api.post('/applications', applicationData);
  return response.data;
};

export const getApplicationsByJobSeeker = async (jobSeekerId) => {
  const response = await api.get(`/applications/jobseeker/${jobSeekerId}`);
  return response.data;
};

export default api;
