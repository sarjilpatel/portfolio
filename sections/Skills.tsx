"use client"

import { useState } from "react"
import { SkillCategory } from "@/lib/types"
import SectionHeading from "@/components/SectionHeading"
import Reveal from "@/components/Reveal"
import { skillIcons } from "@/lib/skillIcons"
import { Code2 } from "lucide-react"

export default function Skills({ skillsData }: { skillsData: SkillCategory[] }) {
  const tabs = ["All", ...skillsData.map((c) => c.category)]
  const [activeTab, setActiveTab] = useState("All")

  const visibleSkills =
    activeTab === "All"
      ? skillsData.flatMap((c) => c.skills)
      : skillsData.find((c) => c.category === activeTab)?.skills ?? []

  return (
    <section id="skills" className="py-16 sm:py-24 px-5 sm:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Skills & Tech"
          tag="TECH STACK"
          subtitle="A comprehensive list of the technologies I specialize in."
        />

        <Reveal variant="up" className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium tracking-tight transition-all duration-200 border cursor-pointer ${
                activeTab === tab
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                  : "bg-white/3 text-zinc-400 border-white/10 hover:border-white/25 hover:text-white hover:bg-white/6"
              }`}
            >
              {tab}
            </button>
          ))}
        </Reveal>

        {/* One Reveal wraps the whole grid: a single observer + a single
            translateY/opacity animation for all tiles, no matter how many
            skills. Re-keyed by tab so switching filters replays the entrance. */}
        <Reveal
          key={activeTab}
          variant="up"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-2.5 sm:gap-3"
        >
          {visibleSkills.map((skill) => {
            const entry = skillIcons[skill]
            const Icon = entry?.icon ?? Code2
            const color = entry?.color ?? "#FFFFFF"

            return (
              <div
                key={skill}
                className="glass-lite group rounded-full flex flex-col items-center gap-2.5 px-3.5 py-3 cursor-default hover:-translate-y-0.5 hover:border-white/25"
              >
                <Icon
                  size={20}
                  style={{ color }}
                  className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                />
                <span className="text-[13px] text-zinc-300 font-medium group-hover:text-white transition-colors truncate">
                  {skill}
                </span>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
