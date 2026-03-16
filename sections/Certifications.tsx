"use client"

import { motion } from "framer-motion"
import { Certification } from "@/lib/types"
import SectionHeading from "@/components/SectionHeading"
import { Award, ExternalLink, Calendar, CheckCircle2 } from "lucide-react"

export default function Certifications({ certificationsData }: { certificationsData: Certification[] }) {
  return (
    <section id="certifications" className="py-24 px-6 bg-zinc-950 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="Certifications" 
          subtitle="Professional recognition and skill validation" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {certificationsData.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="glass-card group border-white/5 flex flex-col h-full relative overflow-hidden cursor-default hover:border-blue-500/30 transition-colors"
            >
              {/* Corner Glow Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 blur-xl group-hover:bg-blue-500/20 transition-all duration-500" />
              
              <div className="flex items-start justify-between mb-6">
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300"
                >
                  <Award size={24} />
                </motion.div>
                {cert.link && (
                  <motion.a 
                    whileHover={{ scale: 1.2, color: "#fff" }}
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-slate-500 transition-colors"
                  >
                    <ExternalLink size={18} />
                  </motion.a>
                )}
              </div>
              
              <h4 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">
                {cert.title}
              </h4>
              <p className="text-slate-400 font-medium text-sm mb-4">
                {cert.issuer}
              </p>
              
              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <Calendar size={12} className="text-blue-500" />
                  <span>{cert.date}</span>
                </div>
                <motion.div 
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-1.5 text-xs font-mono text-green-500/80"
                >
                  <CheckCircle2 size={12} />
                  <span>Verified</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
