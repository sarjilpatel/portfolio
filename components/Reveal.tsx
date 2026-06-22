"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

type Variant = "up" | "down" | "left" | "right" | "scale"

interface RevealProps {
  children: ReactNode
  className?: string
  variant?: Variant
  delay?: number // ms
  /**
   * Re-animate in/out every time the element enters/leaves the viewport.
   * Default true: elements slide/fade in on scroll-down and reverse back out
   * (and vice-versa). Set false to reveal only once.
   */
  repeat?: boolean
  id?: string
}

// Lightweight scroll-reveal: toggles an `is-visible` class via IntersectionObserver
// so the actual animation runs in CSS. Replaces framer-motion's whileInView.
export default function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  repeat = true,
  id,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!("IntersectionObserver" in window)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- fallback for unsupported browsers
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            if (!repeat) io.disconnect()
          } else if (repeat) {
            setVisible(false)
          }
        }
      },
      // Directional reveal: the root is extended effectively infinitely ABOVE
      // the viewport, so the top edge NEVER toggles an element — once it crosses
      // the bottom line it stays revealed no matter how far up it scrolls.
      // Only the bottom edge (inset 12%) animates: in when entering from the
      // bottom (scroll down) and reverse back out the bottom (scroll up).
      { threshold: 0, rootMargin: "100000px 0px -12% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [repeat])

  return (
    <div
      ref={ref}
      id={id}
      className={`reveal reveal-${variant} ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
