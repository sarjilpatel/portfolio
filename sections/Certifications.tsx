import { Certification } from "@/lib/types"
import SectionHeading from "@/components/SectionHeading"
import Reveal from "@/components/Reveal"
import { Award, ExternalLink, Calendar, CheckCircle2 } from "lucide-react"

export default function Certifications({ certificationsData }: { certificationsData: Certification[] }) {
  return (
    <section id="certifications" className="py-16 sm:py-24 px-5 sm:px-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 blur-[100px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Certifications"
          tag="CERTIFICATIONS"
          subtitle="Professional recognition and skill validation"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {certificationsData.map((cert, idx) => (
            <Reveal key={idx} variant="up" delay={idx * 60} fade={false} className="h-full">
            <div
              className="glass-card group border-white/5 flex flex-col h-full relative overflow-hidden cursor-default hover:-translate-y-1.5 hover:border-white/25"
            >
              {/* Corner Glow Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 blur-xl group-hover:bg-white/20 transition-all duration-500" />

              <div className="flex items-start justify-between mb-6">
                <div
                  className="p-3 bg-white/5 rounded-xl text-zinc-200 group-hover:bg-white group-hover:text-black transition-all duration-300"
                >
                  <Award size={24} />
                </div>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>

              <h4 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-zinc-300 transition-colors">
                {cert.title}
              </h4>
              <p className="text-zinc-400 font-medium text-sm mb-4">
                {cert.issuer}
              </p>

              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <Calendar size={12} className="text-zinc-400" />
                  <span>{cert.date}</span>
                </div>
                <div 
                  className="flex items-center gap-1.5 text-xs font-mono text-green-500/80 group-hover:text-green-400 transition-colors"
                >
                  <CheckCircle2 size={12} />
                  <span>Verified</span>
                </div>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
