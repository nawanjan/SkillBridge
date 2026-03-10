<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SkillBridge</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <h1>SkillBridge</h1>
    <p>Connecting Skills to Opportunities</p>
</header>

<nav>
    <a href="#about">About</a>
    <a href="#skills">Skills</a>
    <a href="#contact">Contact</a>
</nav>

<section id="about">
    <h2> Student IDs & Job Roles</h2>
    <p>ITBIN-2313-0094 A.G.N.D.RUPASINGHE - Devops Engineer </p>
    <p>ITBIN-2313-0127 W.M.R.T.NIMSARA - FrontEnd/BackEnd Developer </p>
</section>

<section id="about">
    <h2>About SkillBridge</h2>
    <p>SkillBridge helps students develop real-world technical and professional skills.</p>
</section>

<section id="skills">
    <h2>Skills Offered</h2>
    <ul>
        <li>Web Development</li>
        <li>Programming</li>
        <li>Networking</li>
        <li>Soft Skills</li>
    </ul>
</section>

<section id="contact">
    <h2>Contact Us</h2>
    <button onclick="showMessage()"></button>
    <p id="message"></p>
</section>

<footer>
    <p>© 2026 SkillBridge Project</p>
</footer>

<script src="script.js"></script>
</body>
</html>

## Docker Setup
Prerequisites

Docker installed

## Build Docker Image
docker build -t skillbridge .
## Run the Container
docker run -p 3000:3000 skillbridge
## Access the Application

Open your browser:

http://localhost:3000
Stop the Container

Press:

CTRL + C

