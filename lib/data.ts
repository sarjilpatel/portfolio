import type {
  PortfolioData,
  Profile,
  Project,
  SkillCategory,
  Experience,
  Education,
  Certification,
} from "@/lib/types"

import profile from "@/data/profile.json"
import projects from "@/data/projects.json"
import skills from "@/data/skills.json"
import experience from "@/data/experience.json"
import education from "@/data/education.json"
import certifications from "@/data/certifications.json"

// All portfolio content is read directly from the bundled JSON files in /data.
// This keeps the homepage fully static (no database, no runtime fetch), so the
// page renders instantly. To update content, edit the JSON files and redeploy.
export function getAllData(): PortfolioData {
  return {
    profile: profile as Profile,
    projects: projects as Project[],
    skills: skills as SkillCategory[],
    experience: experience as Experience[],
    education: education as Education[],
    certifications: certifications as Certification[],
  }
}

// Project helpers — same bundled JSON, so detail pages stay fully static.
export function getAllProjects(): Project[] {
  return projects as Project[]
}

export function getProjectBySlug(slug: string): Project | undefined {
  return (projects as Project[]).find((p) => p.slug === slug)
}
