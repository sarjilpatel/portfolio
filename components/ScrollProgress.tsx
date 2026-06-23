"use client"

import { useEffect, useRef } from "react"

// Shared scroll signal + top progress bar.
// A single rAF-throttled scroll listener publishes a CSS variable `--scroll`
// (0..1) onto :root so ANY element (the progress bar, the serpentine spine,
// hero parallax, …) can read it in pure CSS — no per-effect listeners.
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const root = document.documentElement
    const update = () => {
      raf = 0
      const max = root.scrollHeight - root.clientHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, root.scrollTop / max)) : 0
      root.style.setProperty("--scroll", String(progress))
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
      className="scroll-progress fixed top-0 left-0 right-0 h-px bg-white/70 z-60"
    />
  )
}
