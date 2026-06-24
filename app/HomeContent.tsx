import ScrollProgress from "@/components/ScrollProgress";
import ScrollSpine from "@/components/ScrollSpine";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import CodingStats from "@/sections/CodingStats";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Education from "@/sections/Education";
import Certifications from "@/sections/Certifications";
import Contact from "@/sections/Contact";
import { PortfolioData } from "@/lib/types";

export default function HomeContent({ data }: { data: PortfolioData }) {
  return (
    <main className="relative">
      <ScrollProgress />

      {/* Serpentine spine sits behind the content (z-0); content rides above (z-10) */}
      {/* <ScrollSpine /> */}

      <div className="relative z-10 flex flex-col">
        <Hero profileData={data.profile} />
        <About profileData={data.profile} experienceData={data.experience} />
        <Skills skillsData={data.skills} />
        <CodingStats />
        <Projects projectsData={data.projects} />
        <Experience experienceData={data.experience} />
        <Education educationData={data.education} />
        <Certifications certificationsData={data.certifications} />
        <Contact profileData={data.profile} />
      </div>
    </main>
  );
}
