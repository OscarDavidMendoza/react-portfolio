import React from "react";
import GitHubCalendar from "react-github-calendar";
import "../styles/AboutPage.css";
import SocialIcons from "../Components/SocialIcons";
import ResumeButton from "../Components/ResumeButton";

export default function AboutPage() {
  return (
    <div className="aboutPage-container">
      <h2>More About Me </h2>
      <p>
        I am an experienced Application Support Manager with
        a proven track record of driving results and
        optimizing processes in a SaaS industry. Skilled in
        people and team management, troubleshooting, and
        investigation. Highly motivated and results-driven,
        always going above and beyond to ensure customer
        satisfaction. Created and implemented innovative
        shift-left based metrics, resulting in a 10%
        reduction in incoming service requests and increased
        focus on self-service. Developed reports that
        provided essential visibility for effective
        decision-making around hiring. Looking to expand
        skills and knowledge by becoming OCI certified and
        transitioning into a cloud-oriented role as a devops
        engineer. I am passionate about continuous learning
        and driving innovation to deliver optimal results.
      </p>
      <hr className="horizontal-line" />
      <ResumeButton />
      <hr className="horizontal-line" />
      <SocialIcons className="aboutPage-social" />
      <GitHubCalendar username="OscarDavidMendoza" />
    </div>
  );
}
