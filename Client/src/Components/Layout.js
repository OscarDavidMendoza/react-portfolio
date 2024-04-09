import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout" id="outer-container">
      <NavBar />
      <main id="page-wrap" className="layout-page">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
