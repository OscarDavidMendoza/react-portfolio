import React from "react";
import { useParams } from "react-router-dom";
import projectsData from "../Assets/data/projects";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const project = projectsData.find(
    (project) => project.id === parseInt(projectId)
  );

  return (
    <section className="project-details">
      {project ? (
        <h2>{project.title}</h2>
      ) : (
        <p>Project not found!</p>
      )}
    </section>
  );
};

export default ProjectDetails;
