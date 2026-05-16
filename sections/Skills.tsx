"use client"

import { motion } from "framer-motion"
import { SkillCategory } from "@/lib/types"
import SectionHeading from "@/components/SectionHeading"
import { Code2, Database, Layout, Settings, Cpu, Smartphone, Globe, Cloud } from "lucide-react"

type ColorConfig = {
  icon: string
  iconHover: string
  tag: string
  tagHover: string
  glow: string
  gradient: string
  titleHover: string
}

const categoryConfig: Record<string, ColorConfig> = {
  Languages: {
    icon: "bg-blue-500/10 text-blue-400",
    iconHover: "group-hover:bg-blue-500 group-hover:text-white",
    tag: "bg-blue-500/5 border-blue-500/15 text-blue-400",
    tagHover: "hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-300",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.2)]",
    gradient: "from-blue-600/10 via-blue-500/5 to-transparent",
    titleHover: "group-hover:text-blue-400",
  },
  Databases: {
    icon: "bg-emerald-500/10 text-emerald-400",
    iconHover: "group-hover:bg-emerald-500 group-hover:text-white",
    tag: "bg-emerald-500/5 border-emerald-500/15 text-emerald-400",
    tagHover: "hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-emerald-300",
    glow: "shadow-[0_0_15px_rgba(52,211,153,0.2)]",
    gradient: "from-emerald-600/10 via-emerald-500/5 to-transparent",
    titleHover: "group-hover:text-emerald-400",
  },
  Frameworks: {
    icon: "bg-violet-500/10 text-violet-400",
    iconHover: "group-hover:bg-violet-500 group-hover:text-white",
    tag: "bg-violet-500/5 border-violet-500/15 text-violet-400",
    tagHover: "hover:bg-violet-500/20 hover:border-violet-500/50 hover:text-violet-300",
    glow: "shadow-[0_0_15px_rgba(139,92,246,0.2)]",
    gradient: "from-violet-600/10 via-violet-500/5 to-transparent",
    titleHover: "group-hover:text-violet-400",
  },
  Tools: {
    icon: "bg-amber-500/10 text-amber-400",
    iconHover: "group-hover:bg-amber-500 group-hover:text-white",
    tag: "bg-amber-500/5 border-amber-500/15 text-amber-400",
    tagHover: "hover:bg-amber-500/20 hover:border-amber-500/50 hover:text-amber-300",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.2)]",
    gradient: "from-amber-600/10 via-amber-500/5 to-transparent",
    titleHover: "group-hover:text-amber-400",
  },
  Cloud: {
    icon: "bg-sky-500/10 text-sky-400",
    iconHover: "group-hover:bg-sky-500 group-hover:text-white",
    tag: "bg-sky-500/5 border-sky-500/15 text-sky-400",
    tagHover: "hover:bg-sky-500/20 hover:border-sky-500/50 hover:text-sky-300",
    glow: "shadow-[0_0_15px_rgba(14,165,233,0.2)]",
    gradient: "from-sky-600/10 via-sky-500/5 to-transparent",
    titleHover: "group-hover:text-sky-400",
  },
  Mobile: {
    icon: "bg-green-500/10 text-green-400",
    iconHover: "group-hover:bg-green-500 group-hover:text-white",
    tag: "bg-green-500/5 border-green-500/15 text-green-400",
    tagHover: "hover:bg-green-500/20 hover:border-green-500/50 hover:text-green-300",
    glow: "shadow-[0_0_15px_rgba(34,197,94,0.2)]",
    gradient: "from-green-600/10 via-green-500/5 to-transparent",
    titleHover: "group-hover:text-green-400",
  },
  Web: {
    icon: "bg-pink-500/10 text-pink-400",
    iconHover: "group-hover:bg-pink-500 group-hover:text-white",
    tag: "bg-pink-500/5 border-pink-500/15 text-pink-400",
    tagHover: "hover:bg-pink-500/20 hover:border-pink-500/50 hover:text-pink-300",
    glow: "shadow-[0_0_15px_rgba(236,72,153,0.2)]",
    gradient: "from-pink-600/10 via-pink-500/5 to-transparent",
    titleHover: "group-hover:text-pink-400",
  },
  Backend: {
    icon: "bg-orange-500/10 text-orange-400",
    iconHover: "group-hover:bg-orange-500 group-hover:text-white",
    tag: "bg-orange-500/5 border-orange-500/15 text-orange-400",
    tagHover: "hover:bg-orange-500/20 hover:border-orange-500/50 hover:text-orange-300",
    glow: "shadow-[0_0_15px_rgba(249,115,22,0.2)]",
    gradient: "from-orange-600/10 via-orange-500/5 to-transparent",
    titleHover: "group-hover:text-orange-400",
  },
}

const defaultConfig: ColorConfig = categoryConfig.Languages

const icons: Record<string, any> = {
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
            const colors = categoryConfig[category.category] || defaultConfig

            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                style={{ willChange: "transform, opacity" }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2 },
                }}
                className="glass-card group h-full flex flex-col relative overflow-hidden border-white/5 cursor-default transition-all hover:border-white/15"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

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
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
