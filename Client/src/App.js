import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Projects from "./Pages/ProjectsPage";
import ProjectDetailsPage from "./Pages/ProjectDetailsPage";
import AboutPage from "./Pages/AboutPage";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes className="layout">
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route
            path="/projects/:projectId"
            element={<ProjectDetailsPage />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
