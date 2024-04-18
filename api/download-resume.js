const path = require("path");
const fs = require("fs");

module.exports = async (req, res) => {
  const resumePath = path.join(
    __dirname,
    "../client/src/Assets/data/resume/resume.pdf"
  );

  // Validate file path
  fs.access(resumePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("Resume not found:", resumePath);
      return res
        .status(404)
        .json({ error: "Resume not found" });
    }
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=resume.pdf"
    );
    res.sendFile(resumePath);
  });
};
