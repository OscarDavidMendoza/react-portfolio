const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const winston = require("winston");
const { Logtail } = require("@logtail/node");
const { LogtailTransport } = require("@logtail/winston");
const validator = require("validator");
const helmet = require("helmet");
const escape = require("escape-html");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// Load email credentials from environment variables
const emailUser = process.env.NODEMAILER_ENV_USER;
const emailPass = process.env.NODEMAILER_ENV_PASS;
const PORT = process.env.PORT || 5001;
const LOGTAIL_SOURCE_TOKEN =
  process.env.LOGTAIL_SOURCE_TOKEN;

const app = express();
const { combine, timestamp, json } = winston.format;
const logtail = new Logtail(LOGTAIL_SOURCE_TOKEN);

const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD hh:mm:ss A" }),
    json()
  ),
  transports: [new LogtailTransport(logtail)], // logging to Logtail.com
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3001" }));
app.use(helmet());

// Function to validate email format
function isValidEmail(email) {
  return validator.isEmail(email);
}

// Rate limiter - Limits to 5 requests within a 15 minute window
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message:
    "Too many requests from this IP, please try again later.",
});

const resumeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2,
  message:
    "Too many requests from this IP, please try again later.",
});

// Content Security Policy
app.use((req, res, next) => {
  const cspString = `
  default-src 'self' https://*.oscarcodes.dev;
  script-src 'self' https://cdnjs.cloudflare.com/ajax/libs/react-hook-form/7.31.4/react-hook-form.min.js;
  img-src 'self' https://*.oscarcodes.dev data:;
  style-src 'self' https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css;
`.replace(/\n/g, ""); // Remove line breaks for testing

  res.setHeader(
    "Content-Security-Policy",
    encodeURIComponent(cspString)
  );
  next();
});

// POST route to handle form submission
app.post("/send-email", limiter, (req, res) => {
  const { name, email, message } = req.body;

  // Log request body
  logger.info("Email submission request:", req.body);

  // Validate Request body
  if (!name || !email || !message) {
    logger.error("Missing required fields:", {
      name,
      email,
      message,
    });
    return res
      .status(400)
      .send(
        "Missing required fields: name, email, message"
      );
  }

  if (!isValidEmail(email)) {
    logger.error("Invalid email format:", email);
    return res.status(400).send("Invalid email format");
  }

  // Sanitization
  const sanitizedName = escape(req.body.name);
  const sanitizedEmail = escape(req.body.email);
  const sanitizedMessage = escape(req.body.message);

  // Nodemailer configuration
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: "587",
    secure: true,
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  // Email options
  const mailOptions = {
    from: sanitizedEmail,
    to: "molar_fumbles_0a@icloud.com",
    subject: "Contact For Submission - Portfolio",
    text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\nMessage: ${sanitizedMessage}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
      logger.error("Error sending email", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

// Serve static files including resume PDF
app.use(
  express.static(path.join(__dirname, "../Client"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith("resume.pdf")) {
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=resume.pdf"
        );
      }
    },
  })
);

// Serve the resume PDF
app.get("/download/resume", resumeLimiter, (req, res) => {
  const resumePath = path.join(
    __dirname,
    "../Client/src/Assets/data/resume/resume.pdf"
  );
  console.log("Resume path:", resumePath);

  // Validate file path
  fs.access(resumePath, fs.constants.F_OK, (err) => {
    if (err) {
      logger.error("Resume not found", {
        filePath: resumePath,
      });
      return res.status(404).send("Resume not found");
    }
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=resume.pdf"
    );
    res.sendFile(resumePath);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
