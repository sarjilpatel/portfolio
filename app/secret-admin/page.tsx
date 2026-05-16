import { getAllDataFresh } from "@/lib/data"
import AdminContent from "./AdminContent"
import { PortfolioData } from "@/lib/types"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const allData = await getAllDataFresh()

  const initialData: PortfolioData = {
    profile: allData.profile as any,
    projects: allData.projects as any,
    skills: allData.skills as any,
    experience: allData.experience as any,
    education: allData.education as any,
    certifications: allData.certifications as any,
  }

  return <AdminContent initialData={initialData} />
}
