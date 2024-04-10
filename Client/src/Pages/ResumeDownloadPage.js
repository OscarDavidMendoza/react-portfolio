import React, { useEffect } from "react";

export default function ResumeDownloadPage() {
  useEffect(() => {
    window.location.href =
      "http://localhost:5001/download/resume";
  });
  return (
    <div>
      <p>ResumeDownloadPage...</p>
    </div>
  );
}
