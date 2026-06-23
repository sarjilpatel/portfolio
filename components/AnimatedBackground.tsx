// Lightweight fixed backdrop: a static base (image + gradient wash), two very
// slow low-opacity neutral glows animated purely with CSS keyframes, and a
// static film-grain overlay for a tactile, monochrome feel.
// No external requests, no framer-motion.
export default function AnimatedBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-20 h-full w-full bg-[#09090b]">
        {/* Static base image */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.45] contrast-[1.1] grayscale"
          style={{ backgroundImage: 'url("/glass-bg.png")' }}
        />

        {/* Contrast / vignette overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.9)_100%)]" />
        <div className="absolute inset-0 bg-black/55" />

        {/* Two slow neutral accent glows (monochrome) */}
        <div className="blob-a absolute top-[-10%] left-[8%] h-[560px] w-[560px] rounded-full bg-white/[0.06] blur-[90px] pointer-events-none" />
        <div className="blob-b absolute bottom-[8%] right-[8%] h-[640px] w-[640px] rounded-full bg-white/[0.05] blur-[90px] pointer-events-none" />
      </div>

      {/* Film grain — single fixed, static overlay above the bg, below content */}
      <div className="grain-overlay" aria-hidden="true" />
    </>
  )
}
