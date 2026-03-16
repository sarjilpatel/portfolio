"use client"

import { motion } from "framer-motion"
import { Education as EducationType } from "@/lib/types"
import SectionHeading from "@/components/SectionHeading"
import { GraduationCap, Calendar } from "lucide-react"

export default function Education({ educationData }: { educationData: EducationType[] }) {
  return (
    <section id="education" className="py-24 px-6 bg-black relative overflow-hidden perspective-1000">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 blur-[100px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="Education" 
          subtitle="My academic foundation and qualifications" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {educationData.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ 
                rotateX: 5,
                rotateY: -5,
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="glass-card relative group border-white/5 transition-all duration-300 cursor-default"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                    <GraduationCap size={28} />
                  </div>
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    className="text-xs font-mono bg-white/5 border border-white/10 px-3 py-1 rounded-full text-slate-400"
                  >
                    {edu.status}
                  </motion.span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {edu.degree}
                </h3>
                <p className="text-lg text-slate-300 font-medium mb-6">
                  {edu.institution}
                </p>
                
                <div className="mt-auto flex items-center gap-4 text-sm text-slate-500 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-purple-500" />
                    <span>{edu.period}</span>
                  </div>
                </div>
              </div>
              
              {/* Shine Overlay Effect */}
              <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
