"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import Hero from "@/sections/Hero"
import About from "@/sections/About"
import Skills from "@/sections/Skills"
import Projects from "@/sections/Projects"
import Experience from "@/sections/Experience"
import Education from "@/sections/Education"
import Certifications from "@/sections/Certifications"
import Contact from "@/sections/Contact"
import { PortfolioData } from "@/lib/types"

export default function HomeContent({ data }: { data: PortfolioData }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <main className="relative">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-[60]" 
        style={{ scaleX }} 
      />
      
      <div className="flex flex-col">
        <Hero profileData={data.profile} />
        <About profileData={data.profile} experienceData={data.experience} />
        <Skills skillsData={data.skills} />
        <Projects projectsData={data.projects} />
        <Experience experienceData={data.experience} />
        <Education educationData={data.education} />
        <Certifications certificationsData={data.certifications} />
        <Contact profileData={data.profile} />
      </div>
    </main>
  )
}
