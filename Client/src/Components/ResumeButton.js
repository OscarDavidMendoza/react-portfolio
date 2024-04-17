import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ResumeButton = () => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = `${BACKEND_URL}/download/resume`;
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    setDownloading(false);
  };

  return (
    <div className="resume-button-container">
      <p>Looking for my resume?</p>
      {downloading ? (
        <div>Downloading resume...</div>
      ) : (
        <Button variant="dark" onClick={handleDownload}>
          Click here to download!
        </Button>
      )}
    </div>
  );
};

export default ResumeButton;
