import { useSpring, animated } from "@react-spring/web";
import React from "react";
import heart from "../Assets/images/heart.png";
import "../styles/About.css";

const About = () => {
  const contentAnimation = useSpring({
    from: { opacity: 0, transform: "translateX(-20px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    delay: 700,
  });

  return (
    <section className="about">
      <h2>Welcome to my Portfolio</h2>
      <animated.div style={contentAnimation}>
        <p>
          I'm a creative and empathetic individual who
          values honesty, courage, and continuous learning
          in all aspects of life. As a responsible team
          player, I am committed to delivering service
          excellence and maintaining high ethical standards
          in my professional endeavors. In my free time, I
          enjoy working out, building custom mechanical
          keyboards, exploring new breakfast spots, and
          watching movies. Traveling is one of my favorite
          activities, as it allows me to experience new
          cultures and broaden my horizons. Above all, my
          number one motivation is my{" "}
          <span className="family">
            family{" "}
            <img
              src={heart}
              alt="heart"
              className="heart"
            />
          </span>
          , and they inspire me to be the best version of
          myself every day. My ultimate goal is to become a
          well-known engineer and share my knowledge by
          speaking at different schools. I believe that
          every child deserves an opportunity to pursue
          their dreams, and I want to show them that their
          future is in their hands. With a strong work
          ethic, commitment to quality, and respect for
          work-life balance, I'm excited to see where my
          career and personal growth take me.
        </p>
        {/* <button onClick={() => console.log("connect")}>
                            Let's Connect <ArrowRightCircle size={25} />
                        </button> */}
      </animated.div>
    </section>
  );
};

export default About;
