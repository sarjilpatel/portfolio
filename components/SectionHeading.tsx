import Reveal from "@/components/Reveal"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  tag?: string
}

export default function SectionHeading({ title, subtitle, tag }: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-4 mb-12 sm:mb-16">
      <Reveal variant="up" className="inline-block">
        <div className="flex items-center justify-center gap-4 mb-5">
          <div className="grow-line h-px bg-gradient-to-r from-transparent to-white/50" />
          <span className="text-[11px] font-mono text-zinc-300 uppercase tracking-[0.4em] px-3 py-1 rounded-full border border-white/15 bg-white/5">
            {tag ?? title}
          </span>
          <div className="grow-line h-px bg-gradient-to-l from-transparent to-white/50" />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter text-white leading-[1.05]">
          {title}
        </h2>

        <div className="grow-underline h-1 bg-gradient-to-r from-white via-zinc-300 to-transparent mx-auto mt-5 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.25)]" />
      </Reveal>

      {subtitle && (
        <Reveal variant="up" delay={150} className="text-zinc-400 text-base sm:text-lg max-w-2xl px-2 leading-relaxed">
          {subtitle}
        </Reveal>
      )}
    </div>
  )
}
