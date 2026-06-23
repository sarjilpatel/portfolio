import { SkillCategory } from "@/lib/types"
import SectionHeading from "@/components/SectionHeading"
import Reveal from "@/components/Reveal"
import { Code2, Database, Layout, Settings, Cpu, Smartphone, Globe, Cloud, type LucideIcon } from "lucide-react"

// Monochrome: every category shares one neutral treatment. Categories are told
// apart by their icon + label, not by colour — which reads as intentional
// rather than the rainbow "AI" look.
const mono = {
  icon: "bg-white/5 text-zinc-300",
  iconHover: "group-hover:bg-white group-hover:text-black",
  tag: "bg-white/[0.04] border-white/10 text-zinc-400",
  tagHover: "hover:bg-white/10 hover:border-white/30 hover:text-white",
  glow: "shadow-[0_0_15px_rgba(255,255,255,0.08)]",
  gradient: "from-white/[0.06] via-white/[0.02] to-transparent",
  titleHover: "group-hover:text-white",
}

const icons: Record<string, LucideIcon> = {
  Languages: Code2,
  Databases: Database,
  Frameworks: Layout,
  Tools: Settings,
  Cloud: Cloud,
  Mobile: Smartphone,
  Web: Globe,
  Backend: Cpu,
}

export default function Skills({ skillsData }: { skillsData: SkillCategory[] }) {
  return (
    <section id="skills" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Skills & Tech"
          tag="TECH STACK"
          subtitle="A comprehensive list of the technologies I specialize in."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((category, index) => {
            const Icon = icons[category.category] || Code2
            const colors = mono

            return (
              <Reveal key={category.category} variant="up" delay={index * 60} className="h-full">
              <div
                className="glass-card group h-full flex flex-col relative overflow-hidden border-white/5 cursor-default hover:-translate-y-1.5 hover:border-white/15"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center space-x-3 mb-5">
                    <div className={`p-3 rounded-xl ${colors.icon} ${colors.iconHover} transition-all duration-200 ${colors.glow}`}>
                      <Icon size={20} />
                    </div>
                    <h3 className={`text-lg font-bold text-white tracking-tight ${colors.titleHover} transition-colors`}>
                      {category.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-2.5 py-1 text-[11px] font-mono rounded-lg border ${colors.tag} ${colors.tagHover} transition-all duration-200 cursor-default`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
