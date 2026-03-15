"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import projectsData from "@/data/projects.json"
import SectionHeading from "@/components/SectionHeading"

function ProjectCard({ project, index }: { project: any, index: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="glass-card flex flex-col group h-full relative overflow-hidden transition-all duration-500 hover:border-blue-500/30"
    >
      {/* Vibrant Background Hover */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 via-transparent to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="aspect-video relative overflow-hidden rounded-xl mb-6 bg-zinc-950 border border-white/5"
      >
        <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-purple-600/20 opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center justify-center h-full">
          <span className="text-3xl font-bold text-white/5 group-hover:text-blue-400 transition-all duration-700">
            {project.title}
          </span>
        </div>
        
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
           <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all duration-300"
          >
            <Github size={22} />
          </a>
          <a 
            href={project.demo} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 bg-blue-600 hover:bg-blue-500 rounded-full text-white backdrop-blur-md transition-all duration-300"
          >
            <ExternalLink size={22} />
          </a>
        </div>
      </div>
      
      <div style={{ transform: "translateZ(30px)" }} className="flex flex-col flex-grow relative z-10">
        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors tracking-tight">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t: string) => (
            <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-500/5 border border-blue-500/10 text-blue-400 uppercase tracking-wider group-hover:border-blue-500/30">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-black relative perspective-1000">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-blue-600/5 blur-[150px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="Featured Projects" 
          subtitle="Recent work and side projects I've built." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 px-4 sm:px-0">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
