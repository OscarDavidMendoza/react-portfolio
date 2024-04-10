import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const ResumeButton = () => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = "http://localhost:5001/download/resume";
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
