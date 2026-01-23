const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 🔹 Serve frontend files (HTML, CSS, JS)
app.use(express.static(__dirname));

// 🔹 Open index.html in browser
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 🔹 Backend API
app.post("/contact", (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({
      reply: "Please fill all fields"
    });
  }

  res.json({
    reply: "Message sent successfully ✅"
  });
});

// 🔹 Start server (required for pipeline)
app.listen(PORT, () => {
  console.log("SkillBridge app running");
});
