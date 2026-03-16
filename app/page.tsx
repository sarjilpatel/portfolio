import { getData } from "@/lib/data"
import HomeContent from "./HomeContent"
import { PortfolioData } from "@/lib/types"

export default async function Home() {
  const data: PortfolioData = {
    profile: await getData("profile"),
    projects: await getData("projects"),
    skills: await getData("skills"),
    experience: await getData("experience"),
    education: await getData("education"),
    certifications: await getData("certifications")
  }

  return <HomeContent data={data} />
}
