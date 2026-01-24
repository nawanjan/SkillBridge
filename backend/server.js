const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory database (replace with MongoDB/PostgreSQL in production)
let jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Colombo",
    type: "Full-time",
    salary: "LKR 80,000 - 120,000",
    description: "We are looking for a skilled Frontend Developer with experience in React.js",
    requirements: {
      experience: "2-3 years",
      education: "Bachelor's in Computer Science or related field",
      skills: ["React", "JavaScript", "HTML", "CSS", "Git"],
      languages: ["English"]
    },
    posted: "2025-01-20"
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Innovation Labs",
    location: "Kandy",
    type: "Full-time",
    salary: "LKR 100,000 - 150,000",
    description: "Seeking an experienced Backend Developer proficient in Node.js and databases",
    requirements: {
      experience: "3-5 years",
      education: "Bachelor's in Computer Science",
      skills: ["Node.js", "Express", "MongoDB", "REST API", "Git"],
      languages: ["English"]
    },
    posted: "2025-01-18"
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "Analytics Pro",
    location: "Galle",
    type: "Contract",
    salary: "LKR 70,000 - 90,000",
    description: "Looking for a Data Analyst to interpret complex datasets",
    requirements: {
      experience: "1-2 years",
      education: "Bachelor's in Statistics or Mathematics",
      skills: ["Python", "SQL", "Excel", "Data Visualization", "Statistics"],
      languages: ["English", "Sinhala"]
    },
    posted: "2025-01-15"
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Colombo",
    type: "Full-time",
    salary: "LKR 60,000 - 90,000",
    description: "Creative UI/UX Designer needed for innovative projects",
    requirements: {
      experience: "2-4 years",
      education: "Bachelor's in Design or related field",
      skills: ["Figma", "Adobe XD", "Photoshop", "User Research", "Wireframing"],
      languages: ["English"]
    },
    posted: "2025-01-22"
  },
  {
    id: 5,
    title: "Marketing Manager",
    company: "Brand Builders",
    location: "Negombo",
    type: "Full-time",
    salary: "LKR 90,000 - 130,000",
    description: "Experienced Marketing Manager to lead our marketing team",
    requirements: {
      experience: "4-6 years",
      education: "MBA or Bachelor's in Marketing",
      skills: ["Digital Marketing", "SEO", "Content Strategy", "Social Media", "Analytics"],
      languages: ["English", "Sinhala"]
    },
    posted: "2025-01-10"
  },
  {
    id: 6,
    title: "Junior Software Engineer",
    company: "StartUp Hub",
    location: "Colombo",
    type: "Full-time",
    salary: "LKR 50,000 - 70,000",
    description: "Entry-level position for fresh graduates passionate about coding",
    requirements: {
      experience: "0-1 years",
      education: "Bachelor's in Computer Science",
      skills: ["Java", "Python", "Problem Solving", "Git"],
      languages: ["English"]
    },
    posted: "2025-01-23"
  }
];

let jobSeekers = [];
let applications = [];

// Routes

// Get all jobs
app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

// Get job by ID
app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.find(j => j.id === parseInt(req.params.id));
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }
  res.json(job);
});

// Match jobs based on job seeker requirements
app.post('/api/jobs/match', (req, res) => {
  const { skills, experience, education, location, languages } = req.body;
  
  const matchedJobs = jobs.map(job => {
    let matchScore = 0;
    let matchDetails = {
      skillsMatch: 0,
      locationMatch: false,
      experienceMatch: false,
      educationMatch: false,
      languagesMatch: 0
    };
    
    // Skills matching (40% weight)
    if (skills && skills.length > 0 && job.requirements.skills) {
      const matchingSkills = skills.filter(skill => 
        job.requirements.skills.some(reqSkill => 
          reqSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(reqSkill.toLowerCase())
        )
      );
      matchDetails.skillsMatch = (matchingSkills.length / job.requirements.skills.length) * 100;
      matchScore += (matchingSkills.length / job.requirements.skills.length) * 40;
    }
    
    // Location matching (20% weight)
    if (location && job.location) {
      if (job.location.toLowerCase().includes(location.toLowerCase()) ||
          location.toLowerCase().includes(job.location.toLowerCase())) {
        matchDetails.locationMatch = true;
        matchScore += 20;
      }
    }
    
    // Experience matching (20% weight)
    if (experience && job.requirements.experience) {
      const expYears = parseInt(experience);
      const reqExpRange = job.requirements.experience.match(/(\d+)/g);
      if (reqExpRange) {
        const minExp = parseInt(reqExpRange[0]);
        const maxExp = reqExpRange[1] ? parseInt(reqExpRange[1]) : minExp + 2;
        if (expYears >= minExp && expYears <= maxExp) {
          matchDetails.experienceMatch = true;
          matchScore += 20;
        } else if (expYears >= minExp - 1) {
          matchScore += 10; // Partial match
        }
      }
    }
    
    // Education matching (10% weight)
    if (education && job.requirements.education) {
      if (job.requirements.education.toLowerCase().includes(education.toLowerCase()) ||
          education.toLowerCase().includes('bachelor') || 
          education.toLowerCase().includes('master')) {
        matchDetails.educationMatch = true;
        matchScore += 10;
      }
    }
    
    // Language matching (10% weight)
    if (languages && languages.length > 0 && job.requirements.languages) {
      const matchingLanguages = languages.filter(lang =>
        job.requirements.languages.some(reqLang =>
          reqLang.toLowerCase() === lang.toLowerCase()
        )
      );
      matchDetails.languagesMatch = (matchingLanguages.length / job.requirements.languages.length) * 100;
      matchScore += (matchingLanguages.length / job.requirements.languages.length) * 10;
    }
    
    return {
      ...job,
      matchScore: Math.round(matchScore),
      matchDetails
    };
  });
  
  // Sort by match score
  const sortedJobs = matchedJobs.sort((a, b) => b.matchScore - a.matchScore);
  
  res.json(sortedJobs);
});

// Create job seeker profile
app.post('/api/jobseekers', (req, res) => {
  const jobSeeker = {
    id: jobSeekers.length + 1,
    ...req.body,
    createdAt: new Date()
  };
  jobSeekers.push(jobSeeker);
  res.status(201).json(jobSeeker);
});

// Get all job seekers
app.get('/api/jobseekers', (req, res) => {
  res.json(jobSeekers);
});

// Create job application
app.post('/api/applications', (req, res) => {
  const application = {
    id: applications.length + 1,
    ...req.body,
    status: 'pending',
    appliedAt: new Date()
  };
  applications.push(application);
  res.status(201).json(application);
});

// Get applications for a job seeker
app.get('/api/applications/jobseeker/:jobSeekerId', (req, res) => {
  const seekerApplications = applications.filter(
    app => app.jobSeekerId === parseInt(req.params.jobSeekerId)
  );
  res.json(seekerApplications);
});

// Add a new job (for employers)
app.post('/api/jobs', (req, res) => {
  const newJob = {
    id: jobs.length + 1,
    ...req.body,
    posted: new Date().toISOString().split('T')[0]
  };
  jobs.push(newJob);
  res.status(201).json(newJob);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
