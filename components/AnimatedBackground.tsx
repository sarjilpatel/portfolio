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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(0,0,0,1))]" />
      
      {/* Optimized floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-blue-500/10"
          initial={{ left: p.x, top: p.y, opacity: 0 }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
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
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600/5 blur-[80px] pointer-events-none"
      />
      <motion.div 
        animate={{
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{ duration: 15, repeat: Infinity, delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-purple-600/5 blur-[80px] pointer-events-none"
      />
    </div>
  )
}
