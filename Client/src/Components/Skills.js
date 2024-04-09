import React from "react";
import skillSet from "../Assets/data/Skills";
import SkillCard from "./SkillCard";
import "../styles/Skills.css";

export default function Skills() {
  return (
    <div className="skill-container">
      <h2 className="section-title">Skills</h2>
      <div className="skills">
        {skillSet.map((skill) => {
          return (
            <div key={skill.id}>
              <a
                href={skill.urlLink}
                className="skill-card">
                <SkillCard
                  name={skill.name}
                  img={skill.img}
                  experience={skill.experience}
                  className="skill-item"
                />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
