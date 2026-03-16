"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, LogOut, Plus, Trash2, Lock } from "lucide-react"
import { updateData } from "@/lib/actions"
import { PortfolioData, Profile, Project, SkillCategory, Experience, Certification } from "@/lib/types"

export default function AdminContent({ initialData }: { initialData: PortfolioData }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [activeTab, setActiveTab] = useState("profile")
  
  // Local state for editing with proper types
  const [profile, setProfile] = useState<Profile>(initialData.profile)
  const [projects, setProjects] = useState<Project[]>(initialData.projects)
  const [skills, setSkills] = useState<SkillCategory[]>(initialData.skills)
  const [experience, setExperience] = useState<Experience[]>(initialData.experience)
  const [certifications, setCertifications] = useState<Certification[]>(initialData.certifications)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin123") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid password")
    }
  }

  const handleSave = async (type: string, data: any) => {
    const res = await updateData(type, data)
    if (res.success) {
      alert(`${type} updated successfully!`)
    } else {
      alert(`Error updating ${type}: ${res.error}`)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card max-w-md w-full p-8"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-blue-500/10 text-blue-400">
              <Lock size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-8">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500/50"
            />
            <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold transition-all">
              Login
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your portfolio content</p>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-2">
            {[
              { id: "profile", label: "Profile" },
              { id: "projects", label: "Projects" },
              { id: "skills", label: "Skills" },
              { id: "experience", label: "Experience" },
              { id: "certifications", label: "Certifications" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-6 py-3 rounded-xl transition-all ${
                  activeTab === tab.id ? "bg-blue-600 text-white" : "hover:bg-white/5 text-muted-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 glass-card !p-8">
            {activeTab === "profile" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Profile Details</h2>
                  <button 
                    onClick={() => handleSave("profile", profile)}
                    className="flex items-center space-x-2 px-6 py-2 bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors"
                  >
                    <Save size={18} />
                    <span>Save Changes</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <input 
                      type="text" 
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Role</label>
                    <input 
                      type="text" 
                      value={profile.role}
                      onChange={(e) => setProfile({...profile, role: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Biography</label>
                    <textarea 
                      rows={4}
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Manage Projects</h2>
                  <button 
                    onClick={() => handleSave("projects", projects)}
                    className="flex items-center space-x-2 px-6 py-2 bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors"
                  >
                    <Save size={18} />
                    <span>Save All</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {projects.map((proj, idx) => (
                    <div key={proj.id} className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                      <div className="flex justify-between items-center gap-4">
                        <input 
                          className="bg-transparent font-bold text-xl outline-none w-full border-b border-transparent focus:border-blue-500"
                          value={proj.title}
                          onChange={(e) => {
                            const newProjs = [...projects]
                            newProjs[idx].title = e.target.value
                            setProjects(newProjs)
                          }}
                        />
                        <button 
                          onClick={() => {
                            const newProjs = projects.filter((_, i) => i !== idx)
                            setProjects(newProjs)
                          }}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <textarea 
                        className="w-full bg-transparent text-muted-foreground outline-none resize-none border-b border-transparent focus:border-blue-500"
                        value={proj.description}
                        rows={2}
                        onChange={(e) => {
                          const newProjs = [...projects]
                          newProjs[idx].description = e.target.value
                          setProjects(newProjs)
                        }}
                      />
                    </div>
                  ))}
                  <button 
                    onClick={() => setProjects([...projects, { id: Date.now().toString(), title: "New Project", description: "Project description", tech: [], github: "", demo: "" }])}
                    className="w-full py-6 border-2 border-dashed border-white/10 rounded-2xl hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-center space-x-2 text-muted-foreground"
                  >
                    <Plus size={20} />
                    <span>Add New Project</span>
                  </button>
                </div>
              </div>
            )}
            
            {/* Implement similar views for experience, skills, certifications as needed */}
            {activeTab !== "profile" && activeTab !== "projects" && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-xl text-muted-foreground">Coming Soon</p>
                <p className="text-sm text-muted-foreground/60 mt-2">Editing capability for {activeTab} will be available in the next update.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
