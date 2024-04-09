import React from "react";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import projects from "../Assets/data/projects.js";
import "../styles/ProjectCarousel.css";

const Projects = () => {
  return (
    <section className="projects">
      <h2>Projects</h2>
      <Carousel animation="slide" data-bs-theme="dark">
        {projects.map((project) => (
          <Carousel.Item key={project.id}>
            <img
              className="d-block w-90"
              src={project.image}
              alt={project.title}
            />
            <Carousel.Caption>
              <Link to={`/projects/${project.id}`}>
                <h3>{project.title}</h3>
              </Link>
              <p>{project.summary}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default Projects;
