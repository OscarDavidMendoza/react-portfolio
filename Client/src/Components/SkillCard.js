import React from "react";

export default function SkillCard({
  img,
  name,
  experience,
}) {
  return (
    <div className="item">
      <img src={img} alt="skill" />
      <h5 className="skill-title">{name}</h5>
      <p className="skill-experience">{experience}</p>
    </div>
  );
}
