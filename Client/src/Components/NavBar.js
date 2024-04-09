import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Divide as Hamburger } from "hamburger-react";
import logo from "../Assets/images/ocVectorNameWhite.png";
import "../styles/NavBar.css";

const NavBar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setOpen(false);
      }
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const handleMenuToggle = (isOpen) => {
    setOpen(isOpen);
  };

  return (
    <header
      className={`header ${isSticky ? "sticky" : ""}`}>
      <div className="header-content">
        <img src={logo} alt="Your Logo" className="logo" />
      </div>
      <Hamburger
        rounded
        easing="ease-in"
        toggled={isOpen}
        toggle={handleMenuToggle}
      />

      <nav className={`nav-links ${isOpen ? "open" : ""}`}>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isActive ? "active" : isPending ? "pending" : ""
          }
          exact="true">
          Home
        </NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/resume">Resume</NavLink>
        {/* <NavLink to="/blog">Blog</NavLink> */}
      </nav>
    </header>
  );
};

export default NavBar;
