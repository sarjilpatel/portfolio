"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Github, Linkedin, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "About", href: "/#about", id: "about" },
  { name: "Skills", href: "/#skills", id: "skills" },
  { name: "Projects", href: "/#projects", id: "projects" },
  { name: "Experience", href: "/#experience", id: "experience" },
  { name: "Contact", href: "/#contact", id: "contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const isSecretAdmin = pathname?.startsWith("/secret-admin")

  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { threshold: 0.35, rootMargin: "-80px 0px -40% 0px" }
    )

    const sections = navLinks.map(({ id }) => document.getElementById(id)).filter(Boolean)
    sections.forEach((el) => observerRef.current?.observe(el!))

    return () => observerRef.current?.disconnect()
  }, [])

  if (isSecretAdmin) return null

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled
          ? "bg-black/60 backdrop-blur-2xl border-b border-white/[0.07] py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity text-white"
        >
          SARJIL<span className="text-blue-500">.</span>DEV
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[11px] font-mono uppercase tracking-[0.2em] transition-colors relative py-1 group",
                  isActive ? "text-white" : "text-slate-500 hover:text-white"
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px bg-blue-500 transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            )
          })}

          <div className="flex items-center space-x-4 border-l border-white/10 pl-8">
            <a
              href="https://github.com/sarjilpatel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <Github size={17} />
            </a>
            <a
              href="https://linkedin.com/in/sarjilpatel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <Linkedin size={17} />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col space-y-1 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-base font-mono uppercase tracking-wider px-3 py-2 rounded-lg transition-all",
                    activeSection === link.id
                      ? "text-white bg-white/5"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
