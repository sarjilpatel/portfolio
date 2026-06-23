"use client"

import { useEffect, useRef } from "react"

// One shared pointer listener powering three cheap micro-interactions:
//   1. Spotlight cursor  — a faint radial glow that trails the pointer.
//   2. Magnetic buttons  — elements with [data-magnetic] ease toward the cursor.
//   3. Card tilt         — elements with [data-tilt] tilt slightly in 3D.
// All effects are transform/opacity only and are skipped on touch / coarse
// pointers and when the user prefers reduced motion.
export default function PointerFX() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduced) return

    const glow = glowRef.current
    let raf = 0
    let mx = 0
    let my = 0

    const render = () => {
      raf = 0
      if (glow) {
        glow.style.setProperty("--mx", `${mx}px`)
        glow.style.setProperty("--my", `${my}px`)
      }
    }

    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!glow?.classList.contains("is-active")) glow?.classList.add("is-active")
      if (!raf) raf = requestAnimationFrame(render)

      // Magnetic pull on the nearest [data-magnetic] under/near the cursor.
      const magnet = (e.target as HTMLElement)?.closest?.("[data-magnetic]") as HTMLElement | null
      if (magnet) {
        const r = magnet.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        magnet.style.setProperty("--tx", `${dx * 0.25}px`)
        magnet.style.setProperty("--ty", `${dy * 0.35}px`)
      }

      // 3D tilt on the [data-tilt] card under the cursor.
      const tilt = (e.target as HTMLElement)?.closest?.("[data-tilt]") as HTMLElement | null
      if (tilt) {
        const r = tilt.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        tilt.style.setProperty("--ry", `${px * 6}deg`)
        tilt.style.setProperty("--rx", `${-py * 6}deg`)
      }
    }

    const onOut = (e: PointerEvent) => {
      const el = e.target as HTMLElement
      const magnet = el?.closest?.("[data-magnetic]") as HTMLElement | null
      if (magnet) {
        magnet.style.setProperty("--tx", "0px")
        magnet.style.setProperty("--ty", "0px")
      }
      const tilt = el?.closest?.("[data-tilt]") as HTMLElement | null
      if (tilt) {
        tilt.style.setProperty("--rx", "0deg")
        tilt.style.setProperty("--ry", "0deg")
      }
    }

    const onLeaveWindow = () => glow?.classList.remove("is-active")

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerout", onOut, { passive: true })
    document.addEventListener("mouseleave", onLeaveWindow)

    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerout", onOut)
      document.removeEventListener("mouseleave", onLeaveWindow)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
}
