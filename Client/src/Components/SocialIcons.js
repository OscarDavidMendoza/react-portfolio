import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import socialLinks from "../Assets/data/socials";
import "../styles/SocialIcons.css";

const SocialIcon = (socialLinks) => (
  <a
    href={socialLinks.link}
    target="_blank"
    rel="noreferrer">
    <div className="social-icon-container">
      <FontAwesomeIcon
        icon={socialLinks.icon}
        className="icon"
      />
      <span className="icon-text">{socialLinks.text}</span>
    </div>
  </a>
);

export default function SocialIcons() {
  return (
    <div className="contact-icons">
      {socialLinks.map((socialLink) => (
        <SocialIcon key={socialLink.link} {...socialLink} />
      ))}
    </div>
  );
}
