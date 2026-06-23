"use client"

import { useEffect, useRef, useState } from "react"

// Counts up from 0 to `value` once, the first time it scrolls into view.
// Single short rAF; respects prefers-reduced-motion (jumps straight to value).
export default function CountUp({
  value,
  duration = 1100,
  suffix = "",
}: {
  value: number
  duration?: number
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- jump straight to the value, no animation
      setDisplay(value)
      return
    }

    let raf = 0
    let start = 0
    const run = (now: number) => {
      if (!start) start = now
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(eased * value))
      if (t < 1) raf = requestAnimationFrame(run)
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          raf = requestAnimationFrame(run)
          io.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [value, duration])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}
