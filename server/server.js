const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();

const app = express();

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (html, css, js, images)
app.use(express.static(path.join(__dirname, "..")));

// Contact route
const contactRoute = require("./routes/contact");
app.use("/contact", contactRoute);

// Default page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
