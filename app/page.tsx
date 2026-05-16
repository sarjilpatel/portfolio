import { getAllData } from "@/lib/data"
import HomeContent from "./HomeContent"
import { PortfolioData } from "@/lib/types"

export default async function Home() {
  const allData = await getAllData()

  const data: PortfolioData = {
    profile: allData.profile as any,
    projects: allData.projects as any,
    skills: allData.skills as any,
    experience: allData.experience as any,
    education: allData.education as any,
    certifications: allData.certifications as any,
  }

  return <HomeContent data={data} />
}
