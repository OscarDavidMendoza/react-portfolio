import React, { useEffect, useState } from "react";
import { animated } from "@react-spring/web";
import portfolioPic from "../Assets/images/portfolioPic.webp";
import "../styles/Hero.css";

const Hero = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = [
    "A CX Champion",
    "A Front-End Developer",
    "A Custom Keyboard enthusiast",
    "Learning the Cloud",
  ];
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(
    300 - Math.random() * 100
  );
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);
    return () => {
      clearInterval(ticker);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 1.5);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  return (
    <section className="hero">
      <div className="text-animation">
        <animated.h1>
          Hello! I'm Oscar <br /> and I'm:
        </animated.h1>
        <span
          className="txt-rotate"
          dataperiod="1000"
          data-rotate='["WebDev", "CX Champion"]'>
          <span className="wrap">{text}</span>
        </span>
      </div>
      <div className="image-container">
        <img
          className="portfolioImage"
          src={portfolioPic}
          alt="A portfolio pic of myself"
        />
      </div>
    </section>
  );
};

export default Hero;
