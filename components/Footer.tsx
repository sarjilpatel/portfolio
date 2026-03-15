"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/10 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <Link href="/" className="text-xl font-bold tracking-tighter text-white">
            SARJIL<span className="text-blue-500">.</span>DEV
          </Link>
          <p className="text-sm text-slate-500 mt-2 max-w-xs">
            Built with Next.js, Tailwind CSS and Framer Motion. 
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end space-y-4">
          <div className="flex items-center space-x-6">
            <a href="https://github.com" className="text-slate-500 hover:text-white transition-colors"><Github size={20} /></a>
            <a href="https://linkedin.com" className="text-slate-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
            <a href="mailto:sarjil.patel.dev@gmail.com" className="text-slate-500 hover:text-white transition-colors"><Mail size={20} /></a>
          </div>
          <p className="text-sm text-slate-500 flex items-center">
            Designed & Developed with <Heart size={14} className="mx-1 text-red-500 fill-red-500" /> by Sarjil
          </p>
        </div>
      </div>
    </footer>
  )
}
