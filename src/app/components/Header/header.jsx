import { BsLinkedin } from "react-icons/bs";
import { FaGithub, FaInstagram } from "react-icons/fa";
import CV from "../../assets/cv.pdf";
import ME from "../../assets/me.png";
import "./header.css";
import { useContext } from "react";
import { SiteContext } from "../../utils/SiteContext";

export const HeaderWrapper = ({ children }) => {
  return <div className="container header__container">{children}</div>;
};

export const HeaderUpperSection = () => {
  const {
    data: { name, des = [] },
  } = useContext(SiteContext);
  return (
    <>
      <h5>Hello I'm</h5>
      <h1>{name}</h1>
      <h5 className="text-light">
        {des.map((item, index) => (
          <span key={index}>
            {item.post}
            {index == des.length - 1 ? "" : ", "}{" "}
          </span>
        ))}
      </h5>
    </>
  );
};

export const CTA = ({ children }) => {
  const {
    data: { resume },
  } = useContext(SiteContext);
  return (
    <div className="cta">
      <a href={resume} className="btn" download>
        Download CV
      </a>
      <a href="#contsct" className="btn btn-primary">
        Let's Talk
      </a>
    </div>
  );
};

export const MeImage = () => {
  const {
    data: { profile_1 },
  } = useContext(SiteContext);
  return (
    <div className="me">
      <img src={profile_1} alt="Profile Photo" />
    </div>
  );
};

export const HeaderSocials = () => {
  const {
    data: { linkedin, github, instagram },
  } = useContext(SiteContext);
  return (
    <div className="header__socials">
      <a href={linkedin} target="_blank">
        <BsLinkedin />
      </a>
      <a href={github} target="_blank">
        <FaGithub />
      </a>
      <a href={instagram} target="_blank">
        <FaInstagram />
      </a>
    </div>
  );
};

export const ScrollDown = () => {
  return (
    <a href="#contact" className="scroll__down">
      Scroll Down
    </a>
  );
};
