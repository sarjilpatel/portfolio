"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<{ x: string, y: string, delay: number, duration: number }[]>([])

  useEffect(() => {
    setMounted(true)
    const newParticles = [...Array(20)].map(() => ({
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    }))
    setParticles(newParticles)
  }, [])

  if (!mounted) return <div className="fixed inset-0 -z-20 bg-black" />

  return (
    <div className="fixed inset-0 -z-20 h-full w-full bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(0,0,0,1))]" />
      
      {/* Subtle floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-blue-500/20"
          initial={{
            x: p.x,
            y: p.y,
            opacity: 0,
          }}
          animate={{
            y: [null, "-20px", "20px", "0px"],
            opacity: [0, 1, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
          style={{
            left: p.x,
            top: p.y,
          }}
        />
      ))}

      {/* Large subtle glow blobs */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]"
      />
      <motion.div 
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 20, repeat: Infinity, delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-purple-600/10 blur-[120px]"
      />
    </div>
  )
}
