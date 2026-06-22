import { getAllData } from "@/lib/data"
import HomeContent from "./HomeContent"

export default function Home() {
  const data = getAllData()
  return <HomeContent data={data} />
}
