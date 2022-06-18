import CV from "../../assets/cv.pdf";
import { BsLinkedin } from "react-icons/bs";
import ME from "../../assets/me.png";
import { FaGithub, FaInstagram } from "react-icons/fa";
import "./header.css";

export const HeaderWrapper = ({ children }) => {
  return <div className="container header__container">{children}</div>;
};

export const HeaderUpperSection = () => {
  return (
    <>
      <h5>Hello I'm</h5>
      <h1>Sarjil Patel</h1>
      <h5 className="text-light">Fullstack Developer</h5>
    </>
  );
};

export const CTA = ({ children }) => {
  return (
    <div className="cta">
      <a href={CV} className="btn" download>
        Download CV
      </a>
      <a href="#contsct" className="btn btn-primary">
        Let's Talk
      </a>
    </div>
  );
};

export const MeImage = () => {
  return (
    <div className="me">
      <img src={ME} alt="" />
    </div>
  );
};

export const HeaderSocials = () => {
  return (
    <div className="header__socials">
      <a href="https://linkedin.com" target="_blank">
        <BsLinkedin />
      </a>
      <a href="https://github.com" target="_blank">
        <FaGithub />
      </a>
      <a href="https://instagram.com" target="_blank">
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
