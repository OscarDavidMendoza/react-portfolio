import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import Projects from "./Pages/ProjectsPage";
import ProjectDetailsPage from "./Pages/ProjectDetailsPage";
import AboutPage from "./Pages/AboutPage";
import Resume from "./Pages/Resume";
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
          <Route path="/resume" element={<Resume />} />
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
