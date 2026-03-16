export interface Profile {
  name: string
  role: string
  tagline: string
  bio: string
  email: string
  github: string
  linkedin: string
  resume: string
}

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  github: string
  demo: string
  image?: string
}

export interface SkillCategory {
  category: string
  skills: string[]
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  achievements: string[]
}

export interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  link: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  status: string
  period: string
}

export interface PortfolioData {
  profile: Profile
  projects: Project[]
  skills: SkillCategory[]
  experience: Experience[]
  education: Education[]
  certifications: Certification[]
}
