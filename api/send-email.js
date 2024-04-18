const nodemailer = require("nodemailer");
const escape = require("escape-html");

module.exports = async (req, res) => {
  const { name, email, message } = req.body;

  // Log your request body if needed
  console.log("Email submission request:", req.body);

  // Your validation logic here...

  // Nodemailer configuration
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: "587",
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_ENV_USER,
      pass: process.env.NODEMAILER_ENV_PASS,
    },
  });

  // Email options
  const mailOptions = {
    from: escape(email),
    to: "molar_fumbles_0a@icloud.com",
    subject: "Contact For Submission - Portfolio",
    text: `Name: ${escape(name)}\nEmail: ${escape(
      email
    )}\nMessage: ${escape(message)}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res
        .status(500)
        .json({ error: "Error sending email" });
    } else {
      console.log("Email sent: " + info.response);
      return res
        .status(200)
        .json({ message: "Email sent successfully" });
    }
  });
};
