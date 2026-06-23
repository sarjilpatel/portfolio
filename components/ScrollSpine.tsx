"use client"

import { useEffect, useRef } from "react"

// 3D serpentine scroll-spine.
//
// A curved line runs down the whole page. A FAINT full-length track is always
// visible (so there's a line through the content at all times), and a BRIGHT
// "drawn" portion + glowing comet sweep down it as you scroll. The moving
// boundary between bright and faint is what reads as the animation, and it
// always sits inside the viewport (≈ scroll-progress fraction down the screen).
//
// Reliability:
//  - Path is built in REAL pixel coordinates (viewBox = wrap's px size, 1:1,
//    no preserveAspectRatio stretching) and measured with getTotalLength().
//    The old `pathLength` + stretched-viewBox trick silently fails to normalise
//    the dash, so the stroke rendered static.
//  - stroke-dashoffset is written straight from JS in one rAF-throttled passive
//    scroll listener — no CSS-var/calc() indirection. Deterministic + cheap.
export default function ScrollSpine() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const trackRef = useRef<SVGPathElement>(null)
  const drawRef = useRef<SVGPathElement>(null)
  const cometRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const svg = svgRef.current
    const track = trackRef.current
    const draw = drawRef.current
    const comet = cometRef.current
    if (!wrap || !svg || !track || !draw || !comet) return

    const COMET = 110 // comet dash length (px)
    // NOTE: the scroll-spine intentionally animates even under
    // prefers-reduced-motion — it's scroll-driven (not autoplaying) and is the
    // site's signature element. The autoplay comet *pulse* is still disabled by
    // the global reduced-motion rule.
    let len = 0
    // Lookup table mapping path Y -> distance-along-path. The weave makes the
    // path longer than its height, so distance isn't proportional to Y; this
    // table lets us place the head at an exact Y (the viewport centre).
    let lut: { y: number; d: number }[] = []

    const build = () => {
      const w = wrap.offsetWidth
      const h = wrap.offsetHeight
      if (w < 2 || h < 2) return

      const cx = w / 2
      const left = w * 0.13
      const right = w * 0.87

      // Weave through the gutters up top, then resolve to dead-centre for the
      // lower half so it lines up with the work-section timeline.
      const d = [
        `M ${cx} 0`,
        `C ${cx} ${h * 0.07} ${left} ${h * 0.11} ${left} ${h * 0.2}`,
        `C ${left} ${h * 0.29} ${right} ${h * 0.31} ${right} ${h * 0.4}`,
        `C ${right} ${h * 0.47} ${cx} ${h * 0.5} ${cx} ${h * 0.56}`,
        `L ${cx} ${h}`,
      ].join(" ")

      svg.setAttribute("viewBox", `0 0 ${w} ${h}`)
      track.setAttribute("d", d)
      draw.setAttribute("d", d)
      comet.setAttribute("d", d)

      len = draw.getTotalLength()
      draw.style.strokeDasharray = `${len}px`
      comet.style.strokeDasharray = `${COMET}px ${len}px`

      // Sample the path once to build the Y -> distance table (y is monotonic).
      const N = 240
      lut = []
      for (let i = 0; i <= N; i++) {
        const d = (i / N) * len
        const pt = draw.getPointAtLength(d)
        lut.push({ y: pt.y, d })
      }

      apply()
    }

    // Distance along the path at which the curve reaches vertical position `y`.
    const distForY = (y: number) => {
      if (lut.length === 0) return 0
      if (y <= lut[0].y) return lut[0].d
      if (y >= lut[lut.length - 1].y) return lut[lut.length - 1].d
      let lo = 0
      let hi = lut.length - 1
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1
        if (lut[mid].y < y) lo = mid
        else hi = mid
      }
      const a = lut[lo]
      const b = lut[hi]
      const t = (y - a.y) / (b.y - a.y || 1)
      return a.d + t * (b.d - a.d)
    }

    // The comet head tracks the CENTRE of the viewport: it starts at the very
    // top of the page and eases to screen-centre over the first half-viewport of
    // scrolling, then stays centred. The drawn portion fills down to the head.
    //   head screen-Y = min(scrollY, vh/2)  ->  0 (top) ... vh/2 (centre)
    //   head page-Y   = scrollY + that
    const apply = () => {
      if (lut.length === 0) return
      const vh = window.innerHeight
      const targetY = window.scrollY + Math.min(window.scrollY, vh / 2)
      const dist = distForY(targetY) // exact distance so the head sits at targetY
      draw.style.strokeDashoffset = `${len - dist}px`
      comet.style.strokeDashoffset = `${COMET / 2 - dist}px`
    }

    let raf = 0
    const onScroll = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0
          apply()
        })
    }

    build()

    const ro = new ResizeObserver(build)
    ro.observe(wrap)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", build, { passive: true })
    const t = window.setTimeout(build, 600) // settle after fonts/images

    return () => {
      ro.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", build)
      window.clearTimeout(t)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="spine-wrap" ref={wrapRef} aria-hidden="true">
      <svg ref={svgRef} className="spine-svg" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="spineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
            <stop offset="6%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="80%" stopColor="rgba(255,255,255,0.45)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
          </linearGradient>
        </defs>

        {/* Always-visible faint track */}
        <path ref={trackRef} className="spine-track" strokeWidth="1.5" strokeLinecap="round" />
        {/* Bright drawn-so-far portion */}
        <path ref={drawRef} className="spine-draw" strokeWidth="2" strokeLinecap="round" />
        {/* Glowing comet at the leading tip */}
        <path ref={cometRef} className="spine-comet" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}
