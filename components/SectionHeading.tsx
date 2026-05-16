"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  tag?: string
}

export default function SectionHeading({ title, subtitle, tag }: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-4 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ willChange: "transform, opacity" }}
        className="inline-block"
      >
        <div className="flex items-center justify-center gap-4 mb-5">
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 32, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-px bg-gradient-to-r from-transparent to-blue-500/60"
          />
          <span className="text-[11px] font-mono text-blue-400 uppercase tracking-[0.4em] px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5">
            {tag ?? title}
          </span>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 32, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-px bg-gradient-to-l from-transparent to-blue-500/60"
          />
        </div>

        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-tight">
          {title}
        </h2>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 mx-auto mt-5 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.4)]"
        />
      </motion.div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-slate-400 text-lg max-w-2xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
