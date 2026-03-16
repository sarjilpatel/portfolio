"use client"

import { motion } from "framer-motion"
import { Experience as ExperienceType } from "@/lib/types"
import SectionHeading from "@/components/SectionHeading"
import { Briefcase, ChevronRight, Clock } from "lucide-react"
import { DateTime } from "luxon"

export default function Experience({ experienceData }: { experienceData: ExperienceType[] }) {
  const parseDate = (dateStr: string) => {
    if (dateStr.toLowerCase().includes("present")) {
      return DateTime.now()
    }
    return DateTime.fromFormat(dateStr.trim(), "MMM yyyy")
  }

  const experiences = experienceData.map((exp) => {
    const [startPart, endPart] = exp.period.split(/[–-]/).map(s => s.trim())
    const start = parseDate(startPart)
    const end = parseDate(endPart)
    
    const diff = end.diff(start, ["years", "months"])
    const years = Math.floor(diff.years)
    const months = Math.ceil(diff.months)
    
    let durationStr = ""
    if (years > 0) durationStr += `${years} yr${years > 1 ? "s" : ""} `
    if (months > 0) durationStr += `${months} mo${months > 1 ? "s" : ""}`
    if (years === 0 && months === 0) durationStr = "1 mo"
    
    return { ...exp, durationStr, durationObj: diff }
  })

  let totalMonths = 0
  experiences.forEach(exp => {
    totalMonths += exp.durationObj.as("months")
  })
  
  const totalYears = Math.floor(totalMonths / 12)
  const remainingMonths = Math.round(totalMonths % 12)
  
  let totalExpStr = ""
  if (totalYears > 0) totalExpStr += `${totalYears} Year${totalYears > 1 ? "s" : ""} `
  if (remainingMonths > 0) totalExpStr += `${remainingMonths} Month${remainingMonths > 1 ? "s" : ""}`

  return (
    <section id="experience" className="py-24 px-6 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-24">
          <SectionHeading 
            title="Work Experience" 
            subtitle="My professional journey and industry contribution" 
          />
        </div>
        
        <div className="relative mt-32">
          {/* Total Experience Header */}
          <motion.div 
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            whileInView={{ opacity: 1, y: 0, x: "-50%" }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.15)", borderColor: "rgba(59, 130, 246, 0.3)" }}
            className="absolute -top-16 left-4 md:left-1/2 -track-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono z-20 cursor-default transition-all"
          >
            <Clock size={14} />
            <span className="tracking-wider">Total Experience: {totalExpStr}</span>
          </motion.div>

          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 -top-6 bottom-0 w-px bg-linear-to-b from-blue-500/50 via-purple-500/50 to-transparent -translate-x-1/2 hidden sm:block opacity-30" />
          
          <div className="space-y-12 md:space-y-24">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative flex flex-col md:flex-row items-center group">
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-12 h-12 -translate-x-1/2 flex items-center justify-center z-10 hidden sm:flex">
                  <div className="w-3 h-3 bg-black border-2 border-blue-500 rounded-full ring-4 ring-blue-500/10 group-hover:scale-150 transition-transform duration-300" />
                </div>

                {/* Left Side (Period) */}
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`flex-1 w-full hidden md:block ${index % 2 === 0 ? "text-right pr-20" : "order-last pl-20"}`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-mono text-blue-400 font-bold tracking-widest uppercase group-hover:text-blue-300 transition-colors">
                      {exp.period}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">({exp.durationStr})</span>
                  </div>
                </motion.div>

                {/* Content Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ 
                    x: index % 2 === 0 ? 5 : -5,
                    transition: { duration: 0.2 }
                  }}
                  className={`flex-1 w-full pl-12 sm:pl-0 md:w-auto ${index % 2 === 0 ? "md:pl-20" : "md:pr-20 md:text-right"}`}
                >
                  <div className="glass-card !p-0 overflow-hidden relative border-white/5 transition-all duration-300 group-hover:border-blue-500/40 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                    {/* Vibrant Gradient on Hover */}
                    <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="p-8 relative z-10">
                      <div className="mb-6">
                        <div className="flex items-center gap-3 sm:hidden mb-4">
                            <span className="text-[10px] font-mono text-blue-400 font-bold border border-blue-500/20 px-2 py-0.5 rounded-full mb-1">
                                {exp.period} • {exp.durationStr}
                            </span>
                        </div>
                        <div className={`flex items-center gap-3 mb-2 ${index % 2 !== 0 ? "md:justify-end" : ""}`}>
                          <motion.div whileHover={{ rotate: 10 }}>
                            <Briefcase size={20} className="text-blue-500" />
                          </motion.div>
                          <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">{exp.role}</h3>
                        </div>
                        <div className={`flex items-center gap-2 text-slate-400 font-medium ${index % 2 !== 0 ? "md:justify-end" : ""}`}>
                          <span className="text-blue-500/80">@</span>
                          <span className="text-lg text-slate-300">{exp.company}</span>
                        </div>
                      </div>

                      <ul className="space-y-4 text-left">
                        {exp.achievements.map((achievement, i) => (
                          <motion.li 
                            key={i} 
                            whileHover={{ x: index % 2 !== 0 ? -5 : 5 }}
                            className={`flex items-start text-slate-400 text-sm leading-relaxed ${index % 2 !== 0 ? "md:flex-row-reverse md:text-right" : ""}`}
                          >
                            <ChevronRight size={16} className={`mt-1.5 shrink-0 text-blue-500 ${index % 2 !== 0 ? "md:ml-3 md:rotate-180" : "mr-3"}`} />
                            <span className="group-hover:text-slate-200 transition-colors">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
                
                {/* Mobile line */}
                <div className="sm:hidden absolute left-[15px] top-0 bottom-[-48px] w-px bg-blue-500/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
