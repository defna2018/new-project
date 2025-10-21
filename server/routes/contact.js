const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// When form is submitted (POST request to /contact)
router.post("/", (req, res) => {
  const { name, email, message } = req.body; // <-- Capture form input

  console.log("📩 New Contact Form Submission:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  // 1. Create transporter
  let transporter = nodemailer.createTransport({
    service: "gmail", // change if needed
    auth: {
      user: process.env.EMAIL, // stored in .env
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Mail options
  let mailOptions = {
    from: email,
    to: process.env.RECIPIENT_EMAIL,
    subject: `New contact form submission from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };
  console.log(mailOptions)

  // 3. Send email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("❌ Error sending email:", err);
      return res.status(500).send("Error sending message.");
    }
    console.log("✅ Email sent:", info.response);
    res.redirect("/thankyou.html");
  });
});

module.exports = router;
