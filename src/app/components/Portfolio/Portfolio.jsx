import "./Portfolio.css";
import { useContext } from "react";
import { SiteContext } from "../../utils/SiteContext";

const PortfolioCard = ({ image, title, github, live_link }) => (
  <article className="portfolio__item">
    <div className="portfolio__item-image">
      <img src={image} alt="" />
    </div>
    <h3>{title}</h3>
    <div className="portfolio__cta">
      <a href={github} className="btn" target="_blank">
        Github
      </a>
      <a href={live_link} className="btn btn-primary" target="_blank">
        Live Demo
      </a>
    </div>
  </article>
);

const Portfolio = () => {
  const {
    data: { projects_detail },
  } = useContext(SiteContext);
  return (
    <section id="portfolio">
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>

      <div className="container portfolio__container">
        {projects_detail.map((item, index) => (
          <PortfolioCard
            key={index}
            title={item.title}
            image={item.photo}
            github={item.github_repo}
            live_link={item.live_link}
          />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
