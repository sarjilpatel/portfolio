import { FaFacebook } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { IoLogoTwitter } from "react-icons/io";
import "./Footer.css";
import { useContext } from "react";
import { SiteContext } from "../../utils/SiteContext";

const Footer = () => {
  const {
    data: { name, facebook, instagram, linkedin },
  } = useContext(SiteContext);
  return (
    <footer>
      <a href="#" className="footer__logo">
        {name}
      </a>

      <ul className="permalinks">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#experience">Experience</a>
        </li>
        <li>
          <a href="#servies">Services</a>
        </li>
        <li>
          <a href="#portfolio">Portfolio</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>

      <div className="footer__socials">
        <a href={facebook}>
          <FaFacebook />
        </a>
        <a href={instagram}>
          <FiInstagram />
        </a>
        <a href={linkedin}>
          <IoLogoTwitter />
        </a>
      </div>

      <div className="footer__copyright">
        <small>&copy; {name}. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
