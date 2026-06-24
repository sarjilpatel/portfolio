import { getDsaStats } from "@/lib/dsa"
import CodingStatsView from "@/components/CodingStatsView"

// Async server component: fetches the (cached) DSA stats on the server and hands
// them to the client view, which owns the scroll-reveal + count-up animations.
export default async function CodingStats() {
  const { leetcode, gfg } = await getDsaStats()
  return <CodingStatsView leetcode={leetcode} gfg={gfg} />
}
