"use client"

import { motion } from "framer-motion"
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
          className="flex flex-col space-y-6"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>Available for New Projects</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight text-white">
            Hi, I&apos;m <span className="text-gradient font-bold">{profileData.name}</span>
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-medium text-slate-300 min-h-[1.2em]">
            I build <TypingEffect />
          </h2>

          <p className="max-w-xl text-lg text-slate-400 leading-relaxed font-sans">
            {profileData.tagline}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link 
              href="#projects" 
              className="px-8 py-3 rounded-full bg-white  font-semibold flex items-center gap-2 hover:bg-slate-200 transition-all group btn-glass-premium"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href={resumeUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass-premium"
            >
              <Download size={18} />
              Resume
            </a>
            <Link 
              href="#contact" 
              className="px-8 py-3 rounded-full btn-glass-premium border border-white/10 font-semibold flex items-center gap-2 hover:bg-white/10 transition-all text-white"
            >
              Contact Me
            </Link>
          </div>

          <div className="flex items-center space-x-6 pt-2">
            <a href={profileData.github} className="text-slate-500 hover:text-white transition-all transform hover:scale-110"><Github size={24} /></a>
            <a href={profileData.linkedin} className="text-slate-500 hover:text-white transition-all transform hover:scale-110"><Linkedin size={24} /></a>
            <a href={`mailto:${profileData.email}`} className="text-slate-500 hover:text-white transition-all transform hover:scale-110"><Mail size={24} /></a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          style={{ willChange: "transform, opacity" }}
          className="hidden lg:block"
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  )
}
