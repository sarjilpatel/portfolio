"use client"

import { useEffect, useRef } from "react"

// Top scroll-progress bar. A tiny rAF-throttled scroll listener sets a CSS
// variable (0..1) that CSS turns into a scaleX transform — no framer-motion.
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const progress = max > 0 ? doc.scrollTop / max : 0
      ref.current?.style.setProperty("--scroll", String(progress))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="scroll-progress fixed top-0 left-0 right-0 h-1 bg-blue-500 z-[60]"
    />
  )
}
