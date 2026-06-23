import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import HeroVisual from "@/components/HeroVisual"
import { Profile } from "@/lib/types"
import TypingEffect from "@/components/TypingEffect"
import { getGoogleDriveUrl } from "@/lib/utils"

export default function Hero({ profileData }: { profileData: Profile }) {
  const resumeUrl = getGoogleDriveUrl(profileData.resume);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="hero-in flex flex-col space-y-7">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for New Projects</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[0.92] text-white">
            Hi, I&apos;m <br className="hidden sm:block" />
            <span className="text-gradient">{profileData.name}</span>
          </h1>

          <h2 className="text-2xl md:text-4xl font-medium text-zinc-300 min-h-[1.2em]">
            I build <TypingEffect />
          </h2>

          <p className="max-w-xl text-lg text-zinc-400 leading-relaxed font-sans">
            {profileData.tagline}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="#projects"
              data-magnetic
              className="magnetic group px-8 py-3 rounded-full bg-white text-black font-semibold inline-flex items-center gap-2 hover:bg-zinc-200 transition-colors"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="magnetic px-8 py-3 rounded-full inline-flex items-center gap-2 font-semibold text-white border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-colors"
            >
              <Download size={18} />
              Resume
            </a>
            <Link
              href="#contact"
              data-magnetic
              className="magnetic px-8 py-3 rounded-full inline-flex items-center gap-2 font-semibold text-zinc-300 hover:text-white border border-transparent hover:border-white/15 transition-colors"
            >
              Contact Me
            </Link>
          </div>

          <div className="flex items-center space-x-6 pt-2">
            <a href={profileData.github} aria-label="GitHub" className="text-zinc-500 hover:text-white transition-all hover:scale-110"><Github size={24} /></a>
            <a href={profileData.linkedin} aria-label="LinkedIn" className="text-zinc-500 hover:text-white transition-all hover:scale-110"><Linkedin size={24} /></a>
            <a href={`mailto:${profileData.email}`} aria-label="Email" className="text-zinc-500 hover:text-white transition-all hover:scale-110"><Mail size={24} /></a>
          </div>
        </div>

        <div
          className="hero-in hidden lg:block"
          style={{
            "--hero-delay": "100ms",
            // micro parallax: drift up a touch as the page scrolls (reads shared --scroll)
            transform: "translateY(calc(var(--scroll, 0) * -60px))",
          } as React.CSSProperties}
        >
          <HeroVisual />
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-in absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500" style={{ "--hero-delay": "400ms" } as React.CSSProperties}>
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px bg-linear-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}
