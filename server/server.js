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
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();

// Load email credentials from environment variables
const emailUser = process.env.NODEMAILER_ENV_USER;
const emailPass = process.env.NODEMAILER_ENV_PASS;
const PORT = process.env.PORT;
const LOGTAIL_SOURCE_TOKEN =
  process.env.LOGTAIL_SOURCE_TOKEN;
const siteCaller = process.env.SITE_CALLER;

const app = express();
app.set("trust proxy", 1);

//Logtail instructor
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
app.use(cors({ origin: siteCaller }));
app.use(helmet());
app.use(passport.initialize());

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
app.post("/api/send-email", limiter, (req, res) => {
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
  "api/",
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
app.get(
  "/api/download/resume",
  resumeLimiter,
  (req, res) => {
    const resumePath = path.join(
      __dirname,
      "../Client/src/Assets/data/resume/resume.pdf"
    );

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
  }
);

// Blog Data Starts Here

// User Registration Endpoint
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      where: { email },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Registration failed" });
  }
});

// Login Endpoint with JWT Tokens
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ where: { username } })
      .then((user) => {
        if (!user) {
          return done(null, false);
        }
        bcrypt.compare(
          password,
          user.password,
          (err, result) => {
            if (err) {
              return done(err);
            }
            if (result) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          }
        );
      })
      .catch((err) => done(err));
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.post(
  "/login",
  passport.authenticate("local"),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(
      { userId: user._id },
      "yourSecretKey"
    );
    res.json({ message: "Login successful" });
  }
);

module.exports = app;
