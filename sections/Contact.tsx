"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Mail, MapPin, Github, Linkedin } from "lucide-react"
import SectionHeading from "@/components/SectionHeading"
import { Profile } from "@/lib/types"

export default function Contact({ profileData }: { profileData: Profile }) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = fd.get("name") as string
    const message = fd.get("message") as string
    const subject = encodeURIComponent(`Hello from ${name}`)
    const body = encodeURIComponent(message)
    window.open(`mailto:${profileData.email}?subject=${subject}&body=${body}`, "_blank")
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  const contactInfo = [
    {
      icon: <Mail size={22} />,
      label: "Email",
      value: profileData.email,
      href: `mailto:${profileData.email}`,
      color: "text-blue-400",
      bg: "bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20",
    },
    {
      icon: <MapPin size={22} />,
      label: "Location",
      value: "Gujarat, India",
      href: null,
      color: "text-purple-400",
      bg: "bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20",
    },
    {
      icon: <Github size={22} />,
      label: "GitHub",
      value: profileData.github?.replace("https://", "").replace("http://", "") || "github.com",
      href: profileData.github,
      color: "text-slate-300",
      bg: "bg-white/5 hover:bg-white/10 border border-white/10",
    },
    {
      icon: <Linkedin size={22} />,
      label: "LinkedIn",
      value: profileData.linkedin?.replace("https://", "").replace("http://", "") || "linkedin.com/in/sarjil",
      href: profileData.linkedin,
      color: "text-sky-400",
      bg: "bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20",
    },
  ]

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Get In Touch"
          tag="CONTACT"
          subtitle="Have a project in mind or just want to say hello? My inbox is always open."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ willChange: "transform, opacity" }}
            className="flex flex-col space-y-6"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-3">Let's build something</h3>
              <p className="text-slate-400 leading-relaxed">
                I'm currently open to new opportunities and interesting projects.
                Whether you have a question, a proposal, or just want to connect — reach out.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all group ${item.bg}`}
                    >
                      <span className={`shrink-0 ${item.color} transition-transform group-hover:scale-110 duration-200`}>
                        {item.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-0.5">{item.label}</p>
                        <p className="text-sm font-medium text-white truncate">{item.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className={`flex items-center gap-4 p-4 rounded-2xl ${item.bg}`}>
                      <span className={`shrink-0 ${item.color}`}>{item.icon}</span>
                      <div className="min-w-0">
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-0.5">{item.label}</p>
                        <p className="text-sm font-medium text-white truncate">{item.value}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ willChange: "transform, opacity" }}
            className="glass-card !p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">Send a message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="What's on your mind?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  submitted
                    ? "bg-green-500/20 border border-green-500/40 text-green-400"
                    : "bg-blue-600 hover:bg-blue-500 text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                }`}
              >
                {submitted ? (
                  "Message sent — check your email client!"
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
