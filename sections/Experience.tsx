import { Experience as ExperienceType } from "@/lib/types"
import SectionHeading from "@/components/SectionHeading"
import Reveal from "@/components/Reveal"
import TimelineLine from "@/components/TimelineLine"
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
    <section id="experience" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-24">
          <SectionHeading
            title="Work Experience"
            tag="EXPERIENCE"
            subtitle="My professional journey and industry contribution"
          />
        </div>
        
        <div className="relative mt-32">
          {/* Total Experience Header */}
          <div
            className="absolute -top-16 left-4 md:left-1/2 md:-translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-zinc-300 text-xs font-mono z-20 cursor-default transition-all hover:scale-105 hover:bg-white/10 hover:border-white/25"
          >
            <Clock size={14} />
            <span className="tracking-wider">Total Experience: {totalExpStr}</span>
          </div>

          {/* Vertical Timeline Line — draws itself downward on enter */}
          <TimelineLine className="absolute left-4 -ml-px md:left-1/2 -top-6 bottom-0 w-px bg-linear-to-b from-white/45 via-white/20 to-transparent hidden sm:block" />
          
          <div className="space-y-12 md:space-y-24">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative flex flex-col md:flex-row items-center group">
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-12 h-12 -translate-x-1/2 flex items-center justify-center z-10 hidden sm:flex">
                  <div className="w-3 h-3 bg-black border-2 border-white rounded-full ring-4 ring-white/10 group-hover:scale-150 transition-transform" />
                </div>

                {/* Left Side (Period) */}
                <Reveal
                  variant={index % 2 === 0 ? "left" : "right"}
                  delay={50}
                  className={`flex-1 w-full hidden md:block ${index % 2 === 0 ? "text-right pr-20" : "order-last pl-20"}`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-mono text-zinc-200 font-bold tracking-widest uppercase group-hover:text-white transition-colors">
                      {exp.period}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">({exp.durationStr})</span>
                  </div>
                </Reveal>

                {/* Content Card */}
                <Reveal
                  variant="up"
                  delay={100}
                  className={`flex-1 w-full pl-12 sm:pl-0 md:w-auto ${index % 2 === 0 ? "md:pl-20" : "md:pr-20 md:text-right"}`}
                >
                  <div className="glass-card p-0! overflow-hidden relative border-white/5 transition-all hover:border-white/25 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:-translate-y-2">
                    {/* Subtle sheen on hover */}
                    <div className="absolute inset-0 bg-linear-to-br from-white/6 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="p-8 relative z-10">
                      <div className="mb-6">
                        <div className="flex items-center gap-3 sm:hidden mb-4">
                            <span className="text-[10px] font-mono text-zinc-300 font-bold border border-white/15 px-2 py-0.5 rounded-full mb-1">
                                {exp.period} • {exp.durationStr}
                            </span>
                        </div>
                        <div className={`flex items-center gap-3 mb-2 ${index % 2 !== 0 ? "md:justify-end" : ""}`}>
                          <div className="p-2 bg-white/5 rounded-lg">
                            <Briefcase size={20} className="text-zinc-200" />
                          </div>
                          <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-zinc-300 transition-colors uppercase">{exp.role}</h3>
                        </div>
                        <div className={`flex items-center gap-2 text-zinc-400 font-medium ${index % 2 !== 0 ? "md:justify-end" : ""}`}>
                          <span className="text-zinc-500">@</span>
                          <span className="text-lg text-zinc-300">{exp.company}</span>
                        </div>
                      </div>

                      <ul className="space-y-4 text-left">
                        {exp.achievements.map((achievement, i) => (
                          <li 
                            key={i} 
                            className={`flex items-start text-zinc-400 text-sm leading-relaxed ${index % 2 !== 0 ? "md:flex-row-reverse md:text-right" : ""}`}
                          >
                            <ChevronRight size={16} className={`mt-1.5 shrink-0 text-zinc-300 ${index % 2 !== 0 ? "md:ml-3 md:rotate-180" : "mr-3"}`} />
                            <span className="group-hover:text-zinc-200 transition-colors">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>

                {/* Mobile line */}
                <div className="sm:hidden absolute left-3.75 top-0 -bottom-12 w-px bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
