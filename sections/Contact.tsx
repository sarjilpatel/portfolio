"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Mail, MapPin } from "lucide-react"
import SectionHeading from "@/components/SectionHeading"
import { Profile } from "@/lib/types"

export default function Contact({ profileData }: { profileData: Profile }) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="Get In Touch" 
          subtitle="Let's build something amazing together." 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ willChange: "transform, opacity" }}
            className="flex flex-col space-y-12"
          >
            <h3 className="text-3xl font-bold text-white">Contact Info</h3>
            <div className="space-y-8">
              <div className="flex items-center space-x-6">
                <div className="p-4 rounded-2xl glass text-blue-400">
                  <Mail size={28} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-[0.2em] mb-1">Email</p>
                  <p className="text-xl font-medium text-white">{profileData.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="p-4 rounded-2xl glass text-purple-400">
                  <MapPin size={28} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-[0.2em] mb-1">Location</p>
                  <p className="text-xl font-medium text-white">Gujarat, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ willChange: "transform, opacity" }}
            className="glass-card !p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Name</label>
                <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Message</label>
                <textarea rows={4} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 resize-none" />
              </div>
              <button 
                type="submit"
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all ${submitted ? "bg-green-500" : "bg-blue-600 hover:bg-blue-500"}`}
              >
                {submitted ? "Message Sent!" : <><Send size={18} /><span>Send Message</span></>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
