// Fixed CSS-only backdrop (no image fetch). A faint grid + two soft tonal glows
// give the near-black page subtle depth and tonal variation that shows faintly
// through the (now blur-free) translucent glass cards, so they read as panels
// sitting on a surface rather than floating on flat black. Everything is static
// or transform/opacity-animated, so it stays GPU-cheap and monochrome.
export default function AnimatedBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-20 h-full w-full bg-[#08080a]">
        {/* Tonal base — a soft top-down gradient instead of a flat fill, so even
            the smooth areas behind a card pick up a gentle light-to-dark shift. */}
        <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_0%,#121216_0%,#0a0a0c_45%,#050506_100%)]" />

        {/* Faint grid — subtle surface texture behind the cards. Softer than
            before (0.045) so the crisp lines don't read as seams through the
            blur-free translucent cards. Masked to fade out toward the edges so it
            never looks like a spreadsheet. */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
            backgroundSize: "84px 84px",
            maskImage:
              "radial-gradient(150% 140% at 50% 20%, #000 45%, transparent 90%)",
            WebkitMaskImage:
              "radial-gradient(150% 140% at 50% 20%, #000 45%, transparent 90%)",
          }}
        />

        {/* Two slow grayscale glows — tonal variation the cards refract. A touch
            brighter than before so the blur has visible highs and lows to mix. */}
        <div className="blob-a absolute top-[-8%] left-[6%] h-[560px] w-[560px] rounded-full bg-white/[0.11] blur-[100px] pointer-events-none" />
        <div className="blob-b absolute bottom-[6%] right-[6%] h-[640px] w-[640px] rounded-full bg-white/[0.09] blur-[100px] pointer-events-none" />

        {/* Gentle vignette to keep focus toward the center. */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,transparent_20%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      {/* Film grain — single fixed, static overlay above the bg, below content */}
      <div className="grain-overlay" aria-hidden="true" />
    </>
  )
}
