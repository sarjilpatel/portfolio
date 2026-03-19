"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Briefcase,
  Code,
  GraduationCap,
  Award,
  ExternalLink,
  Lock,
  ChevronRight,
  Sparkles,
  BarChart3,
  Clock,
  Database,
  Globe,
  Settings,
  Save,
  PlusCircle,
  Undo2
} from "lucide-react"
import Link from "next/link"
import { updateData } from "@/lib/actions"
import { PortfolioData, Profile, Project, SkillCategory, Experience, Certification, Education } from "@/lib/types"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { toast, Toaster } from "sonner"

// Import sub-components
import { ProfileForm } from "@/components/admin/ProfileForm"
import { ProjectsForm } from "@/components/admin/ProjectsForm"
import { SkillsForm } from "@/components/admin/SkillsForm"
import { ExperienceForm } from "@/components/admin/ExperienceForm"
import { EducationForm } from "@/components/admin/EducationForm"
import { CertificationsForm } from "@/components/admin/CertificationsForm"

export default function AdminContent({ initialData }: { initialData: PortfolioData }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [activeTab, setActiveTab] = useState("profile")
  const [currentTime, setCurrentTime] = useState(new Date())

  // Local state for editing with proper types
  const [profile, setProfile] = useState<Profile>(initialData.profile)
  const [projects, setProjects] = useState<Project[]>(initialData.projects)
  const [skills, setSkills] = useState<SkillCategory[]>(initialData.skills)
  const [experience, setExperience] = useState<Experience[]>(initialData.experience)
  const [education, setEducation] = useState<Education[]>(initialData.education || [])
  const [certifications, setCertifications] = useState<Certification[]>(initialData.certifications)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin123") {
      setIsAuthenticated(true)
    } else {
      toast.error("Invalid password")
    }
  }

  const handleSave = async () => {
    let data;
    let type = activeTab;

    switch (activeTab) {
      case "profile": data = profile; break;
      case "projects": data = projects; break;
      case "skills": data = skills; break;
      case "experience": data = experience; break;
      case "education": data = education; break;
      case "certifications": data = certifications; break;
      default: return;
    }

    const res = await updateData(type, data)
    if (res.success) {
      toast.success(`${type} updated successfully!`)
    } else {
      toast.error(`Error updating ${type}: ${res.error}`)
    }
  }

  const handleAddInstance = () => {
    switch (activeTab) {
      case "projects":
        setProjects([{ id: Date.now().toString(), title: "New Project", description: "Stage your project description here...", tech: ["React"], link: "", github: "", image: "https://via.placeholder.com/600x400" }, ...projects])
        break;
      case "skills":
        setSkills([...skills, { category: "New Segment", skills: ["New Entry"] }])
        break;
      case "experience":
        setExperience([{ id: Date.now().toString(), role: "New Role", company: "Meta", period: "Jan 2024 - Present", achievements: ["Spearheaded the development of AI-driven dashboards"] }, ...experience])
        break;
      case "education":
        setEducation([{ id: Date.now().toString(), institution: "University Name", degree: "Major / Field", period: "2020 - 2024", status: "Graduate" }, ...education])
        break;
      case "certifications":
        setCertifications([{ id: Date.now().toString(), title: "Certification Title", issuer: "Credentialing Body", date: "2024", link: "" }, ...certifications])
        break;
      default: break;
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-6 font-sans relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-950/20 via-transparent to-transparent opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card max-w-md w-full p-8 relative z-10 border border-white/10"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-3xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20">
              <Lock size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">Portfolio OS</h2>
          <p className="text-zinc-500 text-center text-sm mb-8">Authentication required for system changes</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="System Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500/50 transition-all text-center tracking-widest placeholder:tracking-normal placeholder:text-zinc-600"
            />
            <button className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 font-bold transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
              Unlock Terminal
              <ChevronRight size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  const navItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Code },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "certifications", label: "Certifications", icon: Award }
  ]

  const getStats = () => {
    switch (activeTab) {
      case "profile": {
        const profileFields = [profile.name, profile.role, profile.tagline, profile.email, profile.resume, profile.github, profile.linkedin, profile.bio];
        const filledFields = profileFields.filter(f => f && f.length > 0).length;
        const completion = Math.round((filledFields / profileFields.length) * 100);
        
        const socialLinks = [profile.github, profile.linkedin, profile.email].filter(l => l && l.length > 0).length;

        return [
          { label: "Completion", value: `${completion}%`, icon: Sparkles, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Visibility", value: profile.name ? "Public" : "Private", icon: User, color: "text-green-400", bg: "bg-green-500/10" },
          { label: "Socials", value: `${socialLinks} Linked`, icon: ExternalLink, color: "text-purple-400", bg: "bg-purple-500/10" }
        ]
      }
      case "projects": return [
        { label: "Active Staging", value: projects.length.toString(), icon: Briefcase, color: "text-blue-400", bg: "bg-blue-500/10" },
        { label: "Direct Stack", value: [...new Set(projects.flatMap(p => p.tech))].length.toString(), icon: Code, color: "text-orange-400", bg: "bg-orange-500/10" },
        { label: "Visual Media", value: projects.filter(p => p.image).length.toString(), icon: Sparkles, color: "text-pink-400", bg: "bg-pink-500/10" }
      ]
      case "skills": {
        const totalSkills = skills.reduce((acc, curr) => acc + curr.skills.length, 0);
        const proficiency = totalSkills > 20 ? "Master" : totalSkills > 10 ? "Expert" : "Advancing";
        return [
          { label: "Modules", value: skills.length.toString(), icon: Database, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Skill Nodes", value: totalSkills.toString(), icon: Code, color: "text-indigo-400", bg: "bg-indigo-500/10" },
          { label: "Proficiency", value: proficiency, icon: Award, color: "text-emerald-400", bg: "bg-emerald-500/10" }
        ]
      }
      case "experience": {
        const totalImpact = experience.reduce((acc, curr) => acc + curr.achievements.length, 0);
        return [
          { label: "Years Exp", value: experience.length > 0 ? `${experience.length * 2}+` : "0", icon: Clock, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Orgs", value: experience.length.toString(), icon: Briefcase, color: "text-cyan-400", bg: "bg-cyan-500/10" },
          { label: "Impact", value: totalImpact.toString(), icon: Sparkles, color: "text-amber-400", bg: "bg-amber-500/10" }
        ]
      }
      case "education": return [
        { label: "Certificates", value: education.length.toString(), icon: GraduationCap, color: "text-blue-400", bg: "bg-blue-500/10" },
        { label: "Academic", value: education.length > 0 ? education[0].status : "N/A", icon: Award, color: "text-yellow-400", bg: "bg-yellow-500/10" },
        { label: "Verified", value: "100%", icon: Sparkles, color: "text-green-400", bg: "bg-green-500/10" }
      ]
      case "certifications": {
        const latestYear = certifications.length > 0 
          ? Math.max(...certifications.map(c => parseInt(c.date) || 0)) 
          : "N/A";
        return [
          { label: "Total Awards", value: certifications.length.toString(), icon: Award, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Domains", value: [...new Set(certifications.map(c => c.issuer))].length.toString(), icon: Database, color: "text-purple-400", bg: "bg-purple-500/10" },
          { label: "Latest Year", value: latestYear.toString(), icon: Clock, color: "text-rose-400", bg: "bg-rose-500/10" }
        ]
      }
      default: return []
    }
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar
          items={navItems}
          activeTab={activeTab}
          onTabChange={(id) => setActiveTab(id)}
          onLogout={() => setIsAuthenticated(false)}
        />
        <SidebarInset className="bg-black text-white p-0 relative overflow-hidden flex flex-col min-h-screen">
          {/* Abstract Background Design */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] -mr-48 -mt-48 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] -ml-32 -mb-32 pointer-events-none" />

          <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-10 sticky top-0 bg-black/80 backdrop-blur-2xl z-50 border-b border-white/5">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1 text-zinc-400 hover:text-white transition-colors" />
              <Separator orientation="vertical" className="mx-2 h-4 bg-white/10" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#" className="text-zinc-500 hover:text-blue-400 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-tighter">
                      <Database size={12} />
                      Terminal
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block">
                    <ChevronRight size={14} className="text-zinc-800" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-white capitalize font-black tracking-tight flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      {activeTab}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="flex items-center gap-3">
              <AnimatePresence mode="wait">
                {activeTab !== "profile" && (
                  <motion.div
                    key="add-button"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="outline"
                      onClick={handleAddInstance}
                      className="bg-zinc-900 border-white/10 hover:bg-zinc-800 text-zinc-300 rounded-xl h-10 px-4 font-bold text-[10px] uppercase tracking-widest"
                    >
                      <PlusCircle size={14} className="mr-2" />
                      New Entry
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl h-10 px-6 font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20"
              >
                <Save size={14} className="mr-2" />
                Save
              </Button>

              <Separator orientation="vertical" className="mx-1 h-5 bg-white/10" />

              <Link
                href="/"
                className="group flex items-center space-x-2 px-4 py-2 rounded-lg border border-white/5 hover:bg-white/5 transition-all text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white"
              >
                <Globe size={11} className="group-hover:rotate-12 transition-transform" />
                <span>Preview</span>
              </Link>
            </div>
          </header>

          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="flex-1 flex flex-col gap-10 p-10 max-w-[1440px] mx-auto w-full relative z-10">
              {/* Quick Stats Banner */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {getStats().map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-zinc-900/30 border border-white/5 rounded-[1.5rem] p-6 flex items-center justify-between group hover:border-blue-500/20 transition-all cursor-default"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`p-3.5 rounded-xl bg-black border border-white/5 ${stat.color} ${stat.bg} group-hover:scale-110 transition-transform`}>
                        <stat.icon size={20} />
                      </div>
                      <div>
                        <p className="text-zinc-600 text-[9px] uppercase font-bold tracking-[0.2em]">{stat.label}</p>
                        <p className="text-xl font-black text-white">{stat.value}</p>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-zinc-800 group-hover:text-blue-500 transition-colors" />
                  </motion.div>
                ))}
              </div>

              <main className="w-full glass-card !p-0 border border-white/5 rounded-[2.5rem] mb-16 overflow-hidden bg-zinc-950/20 shadow-2xl">
                <div className="p-8 md:p-12 lg:p-14">
                  {activeTab === "profile" && (
                    <ProfileForm profile={profile} setProfile={setProfile} />
                  )}
                  {activeTab === "projects" && (
                    <ProjectsForm projects={projects} setProjects={setProjects} />
                  )}
                  {activeTab === "skills" && (
                    <SkillsForm skills={skills} setSkills={setSkills} />
                  )}
                  {activeTab === "experience" && (
                    <ExperienceForm experience={experience} setExperience={setExperience} />
                  )}
                  {activeTab === "education" && (
                    <EducationForm education={education} setEducation={setEducation} />
                  )}
                  {activeTab === "certifications" && (
                    <CertificationsForm certifications={certifications} setCertifications={setCertifications} />
                  )}
                </div>
              </main>
            </div>

            {/* System Footer Info */}
            <footer className="w-full max-w-[1440px] mx-auto px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-8 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600 border-t border-white/5 mt-auto">
              <div className="flex items-center gap-10">
                <div className="flex items-center gap-3">
                  <BarChart3 size={12} className="text-zinc-800" />
                  <span>Memory Pool: 1.2GB</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe size={12} className="text-zinc-800" />
                  <span>Sync Region: Edge</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={12} className="text-zinc-800" />
                <span>{currentTime.toLocaleTimeString()} SYSTEM</span>
              </div>
            </footer>
          </div>
        </SidebarInset>
      </SidebarProvider>
      <Toaster position="bottom-right" theme="dark" closeButton />
    </TooltipProvider>
  )
}
