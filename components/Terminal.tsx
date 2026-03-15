"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const commands = [
  { text: "npm install", color: "text-blue-400" },
  { text: "installing dependencies...", color: "text-slate-400" },
  { text: "found 0 vulnerabilities", color: "text-green-400" },
  { text: "npm run build", color: "text-blue-400" },
  { text: "> compiling client and server...", color: "text-slate-400" },
  { text: "✓ build successful", color: "text-green-400" },
  { text: "next start", color: "text-blue-400" },
  { text: "- ready on http://localhost:3000", color: "text-slate-400" },
]

export default function Terminal() {
  const [visibleLines, setVisibleLines] = useState<number[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev.length >= commands.length) {
          return [0]
        }
        return [...prev, prev.length]
      })
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full max-w-lg aspect-video glass-card p-0 overflow-hidden border-white/20 shadow-2xl">
      <div className="bg-white/5 border-b border-white/10 px-4 py-2 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
      </div>
      <div className="p-6 font-mono text-sm h-full flex flex-col">
        <div className="flex items-center space-x-2 text-blue-400 mb-2">
          <span>~/portfolio</span>
          <span className="text-white">$</span>
        </div>
        <div className="space-y-1">
          {visibleLines.map((index) => (
            <div key={index} className={commands[index].color}>
              {commands[index].text}
            </div>
          ))}
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-white/50 align-middle ml-1"
          />
        </div>
      </div>
    </div>
  )
}
