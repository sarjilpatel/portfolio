"use client"

import { useEffect, useRef, type CSSProperties } from "react"

// A vertical timeline line that fills (scaleY 0 -> 1) IN SYNC WITH SCROLL as the
// section passes through the viewport — the same feel as the page spine.
//
// Low-load by design: it adds NO scroll listener. It only measures its own
// document position once (on mount + resize) to store two scroll fractions
// (--ts start, --te end). The actual fill is pure CSS reading the shared
// :root `--scroll` variable, so it updates on the existing rAF.
export default function TimelineLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const root = document.documentElement

    const measure = () => {
      const max = root.scrollHeight - root.clientHeight
      if (max <= 0) return
      const rect = el.getBoundingClientRect()
      const top = rect.top + root.scrollTop
      const vh = root.clientHeight
      // Start drawing when the top reaches 80% down the viewport,
      // finish when the bottom reaches 45% up the viewport.
      const start = (top - vh * 0.8) / max
      const end = (top + rect.height - vh * 0.45) / max
      el.style.setProperty("--ts", String(Math.max(0, start)))
      el.style.setProperty("--te", String(Math.max(start + 0.001, end)))
    }

    measure()
    window.addEventListener("resize", measure, { passive: true })
    // Re-measure after fonts/images settle the layout.
    const t = window.setTimeout(measure, 600)
    return () => {
      window.removeEventListener("resize", measure)
      window.clearTimeout(t)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`spine-timeline origin-top ${className}`}
      style={
        {
          transform:
            "scaleY(clamp(0, calc((var(--scroll, 0) - var(--ts, 0)) / (var(--te, 1) - var(--ts, 0))), 1))",
        } as CSSProperties
      }
    />
  )
}
