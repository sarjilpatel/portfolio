import { BiCheck } from "react-icons/bi";
import "./Services.css";
import { useContext } from "react";
import { SiteContext } from "../../utils/SiteContext";

const ServiceSection = ({ title, data }) => (
  <article className="service">
    <div className="service__head">
      <h3>{title}</h3>
    </div>
    <ul className="service__list">
      {data.map((item, index) => (
        <li key={index}>
          <BiCheck className="service__list-icon" />
          <p>{item.title}</p>
        </li>
      ))}
    </ul>
  </article>
);

const Services = () => {
  const {
    data: { services },
  } = useContext(SiteContext);
  return (
    <section id="services">
      <h5>What I Offer</h5>
      <h2>Services</h2>

      <div className="container services__container">
        {services.map((item, index) => <ServiceSection title={item.title} data={item.services} key={index}/>)}
      </div>
    </section>
  );
};

export default Services;
