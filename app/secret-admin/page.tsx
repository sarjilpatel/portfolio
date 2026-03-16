import { getData } from "@/lib/data"
import AdminContent from "./AdminContent"
import { PortfolioData } from "@/lib/types"

export default async function AdminPage() {
  const initialData: PortfolioData = {
    profile: await getData("profile"),
    projects: await getData("projects"),
    skills: await getData("skills"),
    experience: await getData("experience"),
    education: await getData("education"),
    certifications: await getData("certifications")
  }

  return <AdminContent initialData={initialData} />
}
