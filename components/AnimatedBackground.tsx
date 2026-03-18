"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<{ x: string, y: string, delay: number, duration: number }[]>([])

  useEffect(() => {
    setMounted(true)
    const newParticles = [...Array(10)].map(() => ({
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 5,
    }))
    setParticles(newParticles)
  }, [])

  if (!mounted) return <div className="fixed inset-0 -z-20 bg-black" />

  return (
    <div className="fixed inset-0 -z-20 h-full w-full bg-black">
      {/* Premium Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-[0.7] contrast-[1.1] "
        style={{ backgroundImage: 'url("/glass-bg.png")', backgroundAttachment: 'fixed' }}
      />

      {/* Gradient Overlay for better contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />
      <div className="absolute inset-0 bg-black/40" />

      {/* Subtle Noise Grain for texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      {/* Optimized floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute h-[2px] w-[2px] rounded-full bg-blue-400/20"
          initial={{ left: p.x, top: p.y, opacity: 0 }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
          style={{ willChange: "transform, opacity" }}
        />
      ))}

      {/* Large subtle glow blobs - optimized */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[10%] h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[10%] right-[10%] h-[700px] w-[700px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none"
      />
    </div>
  )
}
