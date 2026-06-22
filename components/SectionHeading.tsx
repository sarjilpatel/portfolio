import Reveal from "@/components/Reveal"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  tag?: string
}

export default function SectionHeading({ title, subtitle, tag }: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-4 mb-16">
      <Reveal variant="up" className="inline-block">
        <div className="flex items-center justify-center gap-4 mb-5">
          <div className="grow-line h-px bg-gradient-to-r from-transparent to-blue-500/60" />
          <span className="text-[11px] font-mono text-blue-400 uppercase tracking-[0.4em] px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5">
            {tag ?? title}
          </span>
          <div className="grow-line h-px bg-gradient-to-l from-transparent to-blue-500/60" />
        </div>

        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-tight">
          {title}
        </h2>

        <div className="grow-underline h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 mx-auto mt-5 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)]" />
      </Reveal>

      {subtitle && (
        <Reveal variant="up" delay={150} className="text-slate-400 text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </Reveal>
      )}
    </div>
  )
}
