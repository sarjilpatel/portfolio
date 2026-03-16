"use client"

import { motion } from "framer-motion"
import { SkillCategory } from "@/lib/types"
import SectionHeading from "@/components/SectionHeading"
import { Code2, Database, Layout, Settings, Cpu, Smartphone, Globe, Cloud } from "lucide-react"

const icons: Record<string, any> = {
  "Languages": Code2,
  "Databases": Database,
  "Frameworks": Layout,
  "Tools": Settings,
  "Cloud": Cloud,
  "Mobile": Smartphone,
  "Web": Globe,
  "Backend": Cpu
}

export default function Skills({ skillsData }: { skillsData: SkillCategory[] }) {
  return (
    <section id="skills" className="py-24 px-6 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="Skills & Tech" 
          subtitle="A comprehensive list of the technologies I specialize in." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillsData.map((category, index) => {
            const Icon = icons[category.category] || Code2
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                className="glass-card group h-full flex flex-col relative overflow-hidden border-white/5 cursor-default transition-all duration-300"
              >
                {/* Dynamic Gradient Background on Hover */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 via-purple-600/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <motion.div 
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                    >
                      <Icon size={24} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">{category.category}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {category.skills.map((skill) => (
                      <motion.span 
                        key={skill}
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: "rgba(59, 130, 246, 0.2)",
                          borderColor: "rgba(59, 130, 246, 0.5)",
                          color: "#fff"
                        }}
                        className="px-3 py-1.5 text-xs font-mono rounded-xl bg-white/5 border border-white/10 text-slate-400 transition-all"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
