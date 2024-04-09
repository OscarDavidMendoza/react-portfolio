import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import projects from "../Assets/data/projects";
import { IconButton } from "@mui/material";
import "../styles/ProjectsPage.css";

export default function ProjectsPage() {
  return (
    <div className="projects-container">
      <h2>My Projects</h2>
      <p>
        Here you'll find a list of the different projects
        I've worked on. Feel free to click on any image and
        it will take you to the github repo. | Have any
        questions about these projects? Feel free to reach
        out!
      </p>
      <ImageList gap={10} cols={4}>
        {projects.map((project) => (
          <a
            href={project.siteName}
            target="_blank"
            rel="noreferrer">
            <ImageListItem key={project.image} cols={4}>
              <img
                src={project.image}
                srcSet={project.image}
                alt={project.alt}
                loading="lazy"
              />
              <ImageListItemBar
                title={project.title}
                subtitle={project.summary}
                actionIcon={
                  <IconButton
                    sx={{
                      color: "rgba(255, 255, 255, 0.54)",
                    }}
                    aria-label={`info about ${project.title}`}
                  />
                }
              />
            </ImageListItem>
          </a>
        ))}
      </ImageList>
    </div>
  );
}
