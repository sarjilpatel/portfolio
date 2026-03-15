"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  subtitle?: string
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-4 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="inline-block"
      >
        <span className="text-sm font-mono text-blue-500 uppercase tracking-[0.3em] mb-4 block opacity-80">
          Section
        </span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-tight">
          {title}
        </h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-1.5 bg-linear-to-r from-blue-600 to-purple-600 mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
        />
      </motion.div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-lg max-w-2xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
