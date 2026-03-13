const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static("public"));

// Contact route

 app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  console.log(req.body); // 👈 see form data

  try {
    let transporter = nodemailer.createTransport({

      auth: {
        user: "YOUR_EMAIL@gmail.com",
        pass: "YOUR_APP_PASSWORD"
      }
    });

    let mailOptions = {
      from: `"${name}" <${email}>`,
      to: "YOUR_EMAIL@gmail.com",
      subject: `New Contact Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `
    };

    await transporter.sendMail(mailOptions);

    res.send("Message sent successfully");

  } catch (err) {
    console.error("EMAIL ERROR 👉", err); // 👈 SHOW REAL ERROR
    res.status(500).send("error");
  }
});

