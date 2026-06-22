// Lightweight fixed backdrop: a static base (image + gradient wash) plus two
// very slow, low-opacity glow blobs animated purely with CSS keyframes.
// No external requests, no framer-motion.
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-20 h-full w-full bg-black">
      {/* Static base image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-[0.6] contrast-[1.05]"
        style={{ backgroundImage: 'url("/glass-bg.png")' }}
      />

      {/* Contrast / vignette overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.85)_100%)]" />
      <div className="absolute inset-0 bg-black/50" />

      {/* Two slow accent glows (blue → violet) */}
      <div className="blob-a absolute top-[-10%] left-[8%] h-[560px] w-[560px] rounded-full bg-blue-500/10 blur-[90px] pointer-events-none" />
      <div className="blob-b absolute bottom-[8%] right-[8%] h-[640px] w-[640px] rounded-full bg-violet-500/10 blur-[90px] pointer-events-none" />
    </div>
  )
}
