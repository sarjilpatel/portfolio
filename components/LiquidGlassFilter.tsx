"use client"

export default function LiquidGlassFilter() {
  return (
    <svg style={{ display: "none" }} aria-hidden="true">
      <defs>
        <filter id="liquid-glass">
          {/* Subtle turbulence for the liquid effect */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves="3"
            result="noise"
          />
          {/* Lower scale for less intensity as requested */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="10"
          />
        </filter>
      </defs>
    </svg>
  )
}
