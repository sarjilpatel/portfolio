import { BsPatchCheckFill } from "react-icons/bs";
import "./experience.css";
import { useContext } from "react";
import { SiteContext } from "../../utils/SiteContext";

const prof_dict = {
  B: "Beginner",
  I: "Intermidiate",
  A: "Advanced",
};

const Skill = ({ skill, proficiency }) => (
  <article className="experience__details">
    <BsPatchCheckFill className="experience__details-icon" />
    <div>
      <h4>{skill}</h4>
      <small className="text-light">{prof_dict[proficiency]}</small>
    </div>
  </article>
);

const SkillSection = ({ title, data = [] }) => (
  <div className="experience_frontend">
    <h3>{title}</h3>
    <div className="experience__content">
      {data.map((item, index) => (
        <Skill
          skill={item.skill_name}
          proficiency={item.proficiency}
          key={index}
        />
      ))}
    </div>
  </div>
);

const Experience = () => {
  const {
    data: { skills = [] },
  } = useContext(SiteContext);
  return (
    <section id="experience">
      <h5>What skills i have </h5>
      <h2>My Experience</h2>

      <div className="container experience__container">
        {skills.map((item, index) => (
          <SkillSection title={item.title} data={item.skills} key={index} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
