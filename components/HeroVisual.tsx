"use client"

import { motion, useMotionValue, useSpring, useTransform, useAnimationControls, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { Atom, Cpu, Zap, Cloud, Database, Box, Terminal, Code2, Layers, Figma, Send, Triangle } from "lucide-react"



export default function HeroVisual() {
  const [mounted, setMounted] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [isSurprised, setIsSurprised] = useState(false)
  const [isShocked, setIsShocked] = useState(false)
  const [isExcited, setIsExcited] = useState(false)

  // Imperative controls let every click restart the jump instantly (no waiting
  // for the previous animation to finish), and a combo counter escalates the
  // expression when the droid is tapped rapidly.
  const jumpControls = useAnimationControls()
  const comboRef = useRef(0)
  const lastClickRef = useRef(0)
  const resetTimerRef = useRef<number | undefined>(undefined)

  // Mouse tracking values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for fluid movement
  const springX = useSpring(mouseX, { stiffness: 80, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 15 })

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client mount guard
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

    // Global click trigger — a little "O" surprised expression
    const globalClick = (e: MouseEvent) => {
        // Avoid double trigger if clicking the head (that fires the wave instead)
        if (!(e.target as HTMLElement).closest(".droid-head")) {
            setIsShocked(true)
            window.setTimeout(() => setIsShocked(false), 1500)
        }
    }
    window.addEventListener("click", globalClick)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", globalClick)
    }
  }, [mouseX, mouseY])

  // Character movement (drifting towards cursor)
  const charX = useTransform(springX, (v) => v * 0.15)
  const charY = useTransform(springY, (v) => v * 0.15)

  // Head rotation (looking towards cursor)
  const rotateX = useTransform(springY, [-500, 500], [25, -25])
  const rotateY = useTransform(springX, [-500, 500], [-25, 25])

  // Eye movement (pupils following cursor)
  const eyeX = useTransform(springX, [-500, 500], [-8, 8])
  const eyeY = useTransform(springY, [-500, 500], [-8, 8])

  // Direct click on the droid head — jump, wave and say hello.
  // Each click replays the jump immediately and escalates to an excited face
  // when tapped rapidly; a single debounced timer resets after the LAST click.
  const handleAction = () => {
    const now = Date.now()
    comboRef.current = now - lastClickRef.current < 600 ? comboRef.current + 1 : 1
    lastClickRef.current = now
    const excited = comboRef.current >= 3

    setShowMessage(true)
    setIsSurprised(true)
    setIsExcited(excited)

    jumpControls.start({
      y: [0, excited ? -78 : -55, 0],
      scale: [1, excited ? 1.55 : 1.32, excited ? 1.2 : 1.12],
      rotateZ: excited ? [0, 8, -8, 6, -4, 0] : [0, 5, -5, 0],
      transition: { duration: excited ? 0.5 : 0.42, ease: "backOut" },
    })

    if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current)
    resetTimerRef.current = window.setTimeout(() => {
      setShowMessage(false)
      setIsSurprised(false)
      setIsExcited(false)
      comboRef.current = 0
      jumpControls.start({ y: 0, scale: 1, rotateZ: 0, transition: { duration: 0.3 } })
    }, 1400)
  }

  // Clear the pending reset on unmount
  useEffect(() => () => {
    if (resetTimerRef.current) window.clearTimeout(resetTimerRef.current)
  }, [])

  if (!mounted) return null

  return (
    <div
        ref={containerRef}
        className="relative w-full h-[600px] flex items-center justify-center perspective-1000 overflow-visible"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-radial from-white/5 via-transparent to-transparent blur-3xl -z-10" />


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
                { icon: <Atom size={18} />, x: -160, y: -180, color: "text-zinc-300", z: 20 },
                { icon: <Zap size={18} />, x: 200, y: -180, color: "text-white", z: 35 },
                { icon: <Cpu size={18} />, x: -200, y: 150, color: "text-zinc-400", z: 15 },
                { icon: <Cloud size={18} />, x: 200, y: 150, color: "text-zinc-200", z: 25 },
                { icon: <Database size={18} />, x: -260, y: 0, color: "text-zinc-300", z: 40 },
                { icon: <Box size={18} />, x: 260, y: 0, color: "text-zinc-400", z: 10 },
                { icon: <Terminal size={18} />, x: -100, y: 220, color: "text-zinc-200", z: 45 },
                { icon: <Code2 size={18} />, x: -220, y: -200, color: "text-zinc-500", z: 20 },
                { icon: <Layers size={18} />, x: -110, y: -240, color: "text-zinc-300", z: 50 },
                { icon: <Figma size={18} />, x: 250, y: -100, color: "text-zinc-400", z: 5 },
                { icon: <Send size={18} />, x: -250, y: -100, color: "text-zinc-300", z: 30 },
                { icon: <Triangle size={18} />, x: 100, y: 220, color: "text-zinc-200", z: 15 }
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
            initial={{ scale: 1 }}
            animate={jumpControls}
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
                  className="absolute -top-28 left-24 z-50 glass px-10 py-5 rounded-[40px] border-white/30 text-white text-2xl font-black shadow-[0_0_50px_rgba(255,255,255,0.18)] bg-white/10 backdrop-blur-3xl border whitespace-nowrap"
                >
                  <div className="relative flex items-center gap-4">
                    <span>{isExcited ? "WOOHOO!" : "HELLO"}</span>
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
                className="absolute -inset-10 border border-white/15 rounded-full"
                style={{ translateZ: -50 }}
            />

            {/* Droid Head */}
            <motion.div
              style={{ translateZ: 50 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95, rotate: 5 }}
              onClick={(e) => {
                  e.stopPropagation()
                  handleAction()
              }}
              className="droid-head relative w-40 h-36 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[40px] shadow-[0_0_40px_rgba(255,255,255,0.18)] flex flex-col items-center justify-center gap-4 overflow-hidden group cursor-pointer active:scale-95 transition-transform"
            >
              {/* Inner Gradient */}
              <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-white/5" />

              {/* Visor Area */}
              <div className="w-28 h-12 bg-black/40 rounded-full flex items-center justify-center gap-8 px-4 relative overflow-hidden">
                 {/* Pupils / Eyes — round (idle), wide (shocked), happy arcs (smiling) */}
                 <motion.div
                    style={{ x: eyeX, y: eyeY }}
                    className="flex gap-8 items-center"
                 >
                    {[0, 1].map((i) =>
                      isSurprised && !isShocked ? (
                        // happy "∩" curved eye
                        <div
                          key={i}
                          className="w-4 h-2.5 border-t-[3px] border-white rounded-t-full"
                          style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.7))" }}
                        />
                      ) : (
                        <motion.div
                          key={i}
                          animate={isShocked ? { scale: 1.8 } : { scaleY: 1, scaleX: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          className="w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] relative"
                        >
                          <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white/90 rounded-full" />
                        </motion.div>
                      )
                    )}
                 </motion.div>

                 {/* Visor Glint */}
                 <div className="absolute inset-0 bg-linear-to-t from-transparent via-white/5 to-transparent pointer-events-none" />
              </div>

              {/* Mouth — line (idle) · open "O" (shocked) · smile (happy) · big grin (excited) */}
              <motion.div
                 animate={isShocked ? {
                    width: 15,
                    height: 15,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                    borderBottom: "0px solid transparent",
                    y: 10
                 } : (isExcited ? {
                    width: 82,
                    height: 38,
                    borderRadius: "0 0 44px 44px",
                    borderBottom: "5px solid #fafafa",
                    borderLeft: "2px solid rgba(255, 255, 255, 0.25)",
                    borderRight: "2px solid rgba(255, 255, 255, 0.25)",
                    backgroundColor: "rgba(255, 255, 255, 0.18)",
                    y: 10
                 } : (isSurprised ? {
                    width: 64,
                    height: 24,
                    borderRadius: "0 0 32px 32px",
                    borderBottom: "4px solid #fafafa",
                    borderLeft: "2px solid rgba(255, 255, 255, 0.2)",
                    borderRight: "2px solid rgba(255, 255, 255, 0.2)",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    y: 10
                 } : {
                    width: 24,
                    height: 4,
                    borderRadius: "999px",
                    borderBottom: "0px solid transparent",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    y: 0
                 }))}
                 transition={ (isSurprised || isShocked) ? { type: "spring", stiffness: 300, damping: 15 } : { duration: 0.5 }}
                 className="relative shadow-[0_4px_10px_rgba(255,255,255,0.25)]"
              />

              {/* Side Antennas */}
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-white/15 border border-white/25 rounded-full blur-[2px]" />
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-white/15 border border-white/25 rounded-full blur-[2px]" />
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
                            <Hand size={32} className="text-zinc-200" />
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
