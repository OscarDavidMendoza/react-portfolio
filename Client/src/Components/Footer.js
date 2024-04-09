import React from "react";
import phone from "../Assets/images/footer-images/phoneIcon.png";
import email from "../Assets/images/footer-images/emailIcon.png";
import location from "../Assets/images/footer-images/locationIcon.png";
import "../styles/Footer.css";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="contact-info">
          <a href="tel:+523326362899">
            <img src={phone} alt="phone icon" />
            (+52)332-636-2899
          </a>
          <a href="https://maps.app.goo.gl/VmUc9gW5xn2RLWXx5">
            <img src={location} alt="location icon" />
            Guadalajara, Jalisco, Mexico
          </a>
          <a href="mailto: molar_fumbles_0a@icloud.com">
            <img src={email} alt="email icon" />
            oscardavid.mendoza@icloud.com
          </a>
        </div>
        <SocialIcons />
      </div>
      <p>
        &copy; Copyright {new Date().getFullYear()} | All
        Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
