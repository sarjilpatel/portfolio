"use client"

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { Hand, Atom, Cpu, Zap, Cloud, Database, Box, Terminal, Code2, Layers, Figma, Send, Triangle } from "lucide-react"



export default function HeroVisual() {
  const [mounted, setMounted] = useState(false)
  
  // Mouse tracking values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for fluid movement
  const springX = useSpring(mouseX, { stiffness: 80, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 15 })

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // Get position relative to component center
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    
    // Global click trigger
    const globalClick = (e: MouseEvent) => {
        // Avoid double trigger if clicking the head
        if (!(e.target as HTMLElement).closest(".droid-head")) {
            handleAction(false)
        }
    }
    window.addEventListener("click", globalClick)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", globalClick)
    }
  }, [mouseX, mouseY]) // eslint-disable-line react-hooks/exhaustive-deps

  // Character movement (drifting towards cursor)
  const charX = useTransform(springX, (v) => v * 0.15)
  const charY = useTransform(springY, (v) => v * 0.15)

  // Head rotation (looking towards cursor)
  const rotateX = useTransform(springY, [-500, 500], [25, -25])
  const rotateY = useTransform(springX, [-500, 500], [-25, 25])

  // Eye movement (pupils following cursor)
  const eyeX = useTransform(springX, [-500, 500], [-8, 8])
  const eyeY = useTransform(springY, [-500, 500], [-8, 8])

  // Hand movement
  const leftHandX = useTransform(springX, [-500, 500], [-30, 10])
  const leftHandY = useTransform(springY, [-500, 500], [-10, 30])
  const rightHandX = useTransform(springX, [-500, 500], [-10, 30])
  const rightHandY = useTransform(springY, [-500, 500], [30, -10])

  const [showMessage, setShowMessage] = useState(false)
  const [isWaving, setIsWaving] = useState(false)
  const [isSurprised, setIsSurprised] = useState(false)
  const [isShocked, setIsShocked] = useState(false)

  const handleAction = (isDirect: boolean) => {
    if (isDirect) {
        setShowMessage(true)
        setIsWaving(true)
        setIsSurprised(true)
        setTimeout(() => {
            setShowMessage(false)
            setIsWaving(false)
            setIsSurprised(false)
        }, 3000)
    } else {
        // Just a little "O" expression for global clicks
        setIsShocked(true)
        setTimeout(() => setIsShocked(false), 1500)
    }
  }

  if (!mounted) return null

  return (
    <div 
        ref={containerRef}
        className="relative w-full h-[600px] flex items-center justify-center perspective-1000 overflow-visible"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-radial from-blue-500/5 via-transparent to-transparent blur-3xl -z-10" />


      {/* Shared Parallax Container for Both Droid and Icons */}
      <motion.div
        style={{
          x: charX,
          y: charY,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Technology Icons - Move with face parallax but DON'T popup */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {[
                { icon: <Atom size={18} />, x: -160, y: -180, color: "text-blue-400", z: 20 },
                { icon: <Zap size={18} />, x: 200, y: -180, color: "text-white", z: 35 },
                { icon: <Cpu size={18} />, x: -200, y: 150, color: "text-green-400", z: 15 },
                { icon: <Cloud size={18} />, x: 200, y: 150, color: "text-yellow-400", z: 25 },
                { icon: <Database size={18} />, x: -260, y: 0, color: "text-blue-500", z: 40 },
                { icon: <Box size={18} />, x: 260, y: 0, color: "text-blue-400", z: 10 },
                { icon: <Terminal size={18} />, x: -100, y: 220, color: "text-red-400", z: 45 },
                { icon: <Code2 size={18} />, x: -220, y: -200, color: "text-blue-600", z: 20 },
                { icon: <Layers size={18} />, x: -110, y: -240, color: "text-green-500", z: 50 },
                { icon: <Figma size={18} />, x: 250, y: -100, color: "text-pink-400", z: 5 },
                { icon: <Send size={18} />, x: -250, y: -100, color: "text-orange-400", z: 30 },
                { icon: <Triangle size={18} />, x: 100, y: 220, color: "text-indigo-400", z: 15 }
            ].map((tech, i) => (
              <div 
                key={i}
                style={{ 
                    left: `calc(50% + ${tech.x}px)`,
                    top: `calc(50% + ${tech.y}px)`,
                    transform: `translate(-50%, -50%) translateZ(${tech.z}px)`
                }}
                className={`absolute w-10 h-10 glass rounded-xl flex items-center justify-center border-white/10 ${tech.color} shadow-xl opacity-50`}
              >
                {tech.icon}
              </div>
            ))}
        </div>

        {/* The Jumping Droid Face (Only this pops up) */}
        <motion.div
            animate={isWaving ? {
                y: [0, -60, 0],
                scale: [1, 1.5, 1.2],
                rotateZ: [0, 5, -5, 5, 0]
            } : { scale: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="relative w-64 h-64 flex flex-col items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* Speech Bubble (Nested inside to follow the jump) */}
            <AnimatePresence>
              {showMessage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -10, y: 30 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -10, y: 30 }}
                  className="absolute -top-28 left-24 z-50 glass px-10 py-5 rounded-[40px] border-blue-400/30 text-white text-2xl font-black shadow-[0_0_50px_rgba(59,130,246,0.2)] bg-white/10 backdrop-blur-3xl border border-white/30 whitespace-nowrap"
                >
                  <div className="relative flex items-center gap-4">
                    <span>HELLO</span>
                    <img 
                      src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b_1f3fb/512.gif" 
                      alt="👋" 
                      width="38" 
                      height="38" 
                      className="relative z-50 drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]" 
                    />

                    {/* Centered Thought Bubble Tail (Leads down from box center) */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full glass border border-white/30 shadow-lg" />
                    <div className="absolute -bottom-18 left-5 -translate-x-1/2 w-5 h-5 rounded-full glass border border-white/20 shadow-md" />
                    <div className="absolute -bottom-24 left-0 -translate-x-1/2 w-3 h-3 rounded-full glass border border-white/10 shadow-sm" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Floating Halo/Ring */}
            <motion.div
                animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity } }}
                className="absolute -inset-10 border border-blue-500/20 rounded-full"
                style={{ translateZ: -50 }}
            />

            {/* Droid Head */}
            <motion.div
              style={{ translateZ: 50 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95, rotate: 5 }}
              onClick={(e) => {
                  e.stopPropagation()
                  handleAction(true)
              }}
              className="droid-head relative w-40 h-36 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[40px] shadow-[0_0_40px_rgba(59,130,246,0.2)] flex flex-col items-center justify-center gap-4 overflow-hidden group cursor-pointer active:scale-95 transition-transform"
            >
              {/* Inner Gradient */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-400/10 via-transparent to-purple-400/10" />
              
              {/* Visor Area */}
              <div className="w-28 h-12 bg-black/40 rounded-full flex items-center justify-center gap-8 px-4 relative overflow-hidden">
                 {/* Pupils / Eyes */}
                 <motion.div 
                    style={{ x: eyeX, y: eyeY }}
                    className="flex gap-8"
                 >
                    <motion.div 
                        animate={isShocked ? { scale: 1.8 } : (isSurprised ? { scaleY: 1.5, scaleX: 1.2 } : { scaleY: 1, scaleX: 1 })}
                        className="w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)] relative"
                    >
                        <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white/80 rounded-full" />
                    </motion.div>
                    <motion.div 
                        animate={isShocked ? { scale: 1.8 } : (isSurprised ? { scaleY: 1.5, scaleX: 1.2 } : { scaleY: 1, scaleX: 1 })}
                        className="w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)] relative"
                    >
                        <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white/80 rounded-full" />
                    </motion.div>
                 </motion.div>
    
                 {/* Visor Glint */}
                 <div className="absolute inset-0 bg-linear-to-t from-transparent via-blue-400/5 to-transparent pointer-events-none" />
              </div>

              {/* Mouth / Smile / Shock */}
              <motion.div
                 animate={isShocked ? { 
                    width: 15,
                    height: 15,
                    borderRadius: "50%",
                    backgroundColor: "rgba(96, 165, 250, 0.4)",
                    borderBottom: "0px solid transparent",
                    y: 10
                 } : (isSurprised ? { 
                    width: 64,
                    height: 24,
                    borderRadius: "0 0 32px 32px",
                    borderBottom: "4px solid #60a5fa",
                    borderLeft: "2px solid rgba(96, 165, 250, 0.2)",
                    borderRight: "2px solid rgba(96, 165, 250, 0.2)",
                    backgroundColor: "rgba(96, 165, 250, 0.1)",
                    y: 10
                 } : { 
                    width: 24,
                    height: 4,
                    borderRadius: "999px",
                    borderBottom: "0px solid transparent",
                    backgroundColor: "rgba(96, 165, 250, 0.5)",
                    y: 0
                 })}
                 transition={ (isSurprised || isShocked) ? { type: "spring", stiffness: 300, damping: 15 } : { duration: 0.5 }}
                 className="relative shadow-[0_4px_10px_rgba(96,165,250,0.3)]"
              />

              {/* Side Antennas */}
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-blue-500/20 border border-blue-500/30 rounded-full blur-[2px]" />
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-blue-500/20 border border-blue-500/30 rounded-full blur-[2px]" />
            </motion.div>

            {/* Floating Hands */}
            {/* <AnimatePresence>
              {isWaving && (
                <>
                  <motion.div
                      key="right-hand-parallax"
                      style={!isWaving ? { x: rightHandX, y: rightHandY, translateZ: 100 } : { translateZ: 100 }}
                      className="absolute left-1/2 top-1/2"
                  >
                      <motion.div
                          initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                          animate={{ opacity: 1, scale: 1.5, x: 150, y: -100 }}
                          exit={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="w-16 h-16 glass rounded-2xl flex items-center justify-center border-white/20 shadow-2xl -translate-x-1/2 -translate-y-1/2"
                      >
                          <motion.div
                            animate={{ rotate: [-20, -45, 5, -45, 5, -20] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                          >
                            <Hand size={32} className="text-purple-400" />
                          </motion.div>
                      </motion.div>
                  </motion.div>
                </>
              )}
            </AnimatePresence> */}
        </motion.div>
      </motion.div>

      {/* Background interactable grid (Subtle) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none -z-10">
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}
