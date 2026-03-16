"use client"

import { motion } from "framer-motion"
import { Profile, Experience } from "@/lib/types"
import SectionHeading from "@/components/SectionHeading"
import { DateTime } from "luxon"

export default function About({ profileData, experienceData }: { profileData: Profile, experienceData: Experience[] }) {
  const parseDate = (dateStr: string) => {
    if (dateStr.toLowerCase().includes("present")) return DateTime.now()
    return DateTime.fromFormat(dateStr.trim(), "MMM yyyy")
  }

  let totalMonths = 0
  experienceData.forEach((exp) => {
    const [startPart, endPart] = exp.period.split(/[–-]/).map(s => s.trim())
    const start = parseDate(startPart)
    const end = parseDate(endPart)
    totalMonths += end.diff(start, "months").months
  })

  const totalYears = Math.floor(totalMonths / 12)
  const remainingMonths = Math.round(totalMonths % 12)

  let totalExpStr = ""
  if (totalYears > 0) totalExpStr += `${totalYears} yr${totalYears > 1 ? "s" : ""} `
  if (remainingMonths > 0) totalExpStr += `${remainingMonths} mo${remainingMonths > 1 ? "s" : ""}`

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden text-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="About Me"
          subtitle="Passionate developer building modern web solutions"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ willChange: "transform, opacity" }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto relative group">
              <div className="absolute inset-0 border-2 border-blue-500/30 rounded-3xl translate-x-4 translate-y-4 -z-10 transition-transform group-hover:translate-x-6 group-hover:translate-y-6" />
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-3xl -z-10" />
              <div className="w-full h-full glass-card flex flex-col items-center justify-center text-8xl font-bold text-white/10 select-none overflow-hidden text-center border-white/5">
                SP
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-black/80 to-transparent">
                  <p className="text-sm font-mono text-blue-400">sarjil.patel.dev</p>
                  <p className="text-xl font-bold text-white">{profileData.name}</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 top-10 glass px-6 py-4 rounded-2xl shadow-xl z-20 border-white/5">
              <p className="text-2xl font-bold text-blue-400">{totalYears}+</p>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-mono">Years Experience</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ willChange: "transform, opacity" }}
            className="flex flex-col space-y-6"
          >
            <p className="text-xl text-slate-300 leading-relaxed font-sans">
              {profileData.bio}
            </p>

            <div className="grid grid-cols-2 gap-8 pt-4">
              {[
                { label: "Location", value: "Gujarat, India" },
                { label: "Role", value: profileData.role },
                { label: "Availability", value: "Full-time" },
                { label: "Experience", value: totalExpStr }
              ].map((item, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xs text-slate-500 uppercase tracking-widest mb-1">{item.label}</span>
                  <span className="text-lg font-medium text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
