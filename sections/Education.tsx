import { Education as EducationType } from "@/lib/types"
import SectionHeading from "@/components/SectionHeading"
import Reveal from "@/components/Reveal"
import { GraduationCap, Calendar } from "lucide-react"

export default function Education({ educationData }: { educationData: EducationType[] }) {
  return (
    <section id="education" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[100px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Education"
          tag="EDUCATION"
          subtitle="My academic foundation and qualifications"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {educationData.map((edu, idx) => (
            <Reveal key={idx} variant="up" delay={idx * 60}>
            <div
              className="glass-card relative group border-white/5 cursor-default overflow-hidden hover:-translate-y-1.5"
            >
              <div className="flex flex-col h-full relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-white/5 rounded-2xl text-zinc-200 group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.08)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    <GraduationCap size={28} />
                  </div>
                  <span className="text-xs font-mono bg-white/5 border border-white/10 px-3 py-1 rounded-full text-zinc-400 group-hover:text-white transition-colors">
                    {edu.status}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-zinc-300 transition-colors">
                  {edu.degree}
                </h3>
                <p className="text-lg text-zinc-300 font-medium mb-6">
                  {edu.institution}
                </p>

                <div className="mt-auto flex items-center gap-4 text-sm text-zinc-500 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-zinc-400" />
                    <span>{edu.period}</span>
                  </div>
                </div>
              </div>
              
              {/* Shine Overlay Effect - optimized */}
              <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
