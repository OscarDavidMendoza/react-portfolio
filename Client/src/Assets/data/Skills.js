import html from "../images/Skills/html.svg";
import css from "../images/Skills/css.svg";
import react from "../images/Skills/reactIcon.png";
import aws from "../images/Skills/awsIcon.png";
import ociFoundations from "../images/Skills/OCIF2023CA.png";

function calculateExperienceTime(startDate, currentDate) {
  const startDateObject = new Date(startDate);
  const currentDateObject = new Date(currentDate);
  const diffInMonths =
    (currentDateObject.getFullYear() -
      startDateObject.getFullYear()) *
      12 +
    (currentDateObject.getMonth() -
      startDateObject.getMonth());

  const experienceTime =
    diffInMonths >= 12
      ? `<${Math.floor(diffInMonths / 12)} year />`
      : `<${diffInMonths} months />`;

  return experienceTime;
}

const startDates = {
  1: "2023-09-13",
  2: "2019-05-01",
  3: "2019-05-15",
  4: "2020-01-13",
  5: "2023-08-01",
};

// Icon size is 140/144

const skillSet = [
  {
    id: 1,
    name: "OCI Associate",
    startDate: startDates[1],
    img: ociFoundations,
    urlLink:
      "https://catalog-education.oracle.com/pls/certview/sharebadge?id=FE27CC3760027A29A6F0EDACA3D0A93FE2783892A964F97DA8A35E855607107A",
  },
  {
    id: 2,
    name: "HTML",
    startDate: startDates[2],
    img: html,
  },
  {
    id: 3,
    name: "CSS",
    startDate: startDates[3],
    img: css,
  },
  {
    id: 4,
    name: "React",
    startDate: startDates[4],
    img: react,
  },
  {
    id: 5,
    name: "AWS Practicioner",
    startDate: startDates[5],
    img: aws,
  },
];

const currentDate = new Date();
skillSet.forEach((skill) => {
  skill.experience = calculateExperienceTime(
    skill.startDate,
    currentDate
  );
});

export default skillSet;
