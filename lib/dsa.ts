import type { LeetCodeStats, GfgStats, DsaStats } from "@/lib/types"

// Server-side DSA stats fetchers.
//
// Neither platform exposes an official public API, so we hit their unofficial
// surfaces directly (LeetCode's public GraphQL endpoint, and GFG's profile page
// HTML — both of which embed the numbers we want). Running this on the server
// sidesteps CORS, and Next's fetch cache (`revalidate`) means each upstream is
// hit at most once every REVALIDATE seconds no matter how much traffic we get.
//
// These endpoints are not contractual and can change/disappear, so every fetch
// is wrapped in try/catch and falls back to the last-known-good numbers below —
// the section renders real data even when an upstream is down.

const LEETCODE_USERNAME = "sarjilpatel"
const GFG_USERNAME = "sarjilpatel"
const REVALIDATE = 60 * 60 * 12 // refresh at most twice a day

const LEETCODE_FALLBACK: LeetCodeStats = {
  username: LEETCODE_USERNAME,
  totalSolved: 134,
  easy: 60,
  medium: 69,
  hard: 5,
  ranking: 1203675,
}

const GFG_FALLBACK: GfgStats = {
  username: GFG_USERNAME,
  codingScore: 371,
  problemsSolved: 137,
  monthlyScore: 41,
}

export async function getLeetCodeStats(): Promise<LeetCodeStats> {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query:
          "query($u:String!){matchedUser(username:$u){profile{ranking} submitStatsGlobal{acSubmissionNum{difficulty count}}}}",
        variables: { u: LEETCODE_USERNAME },
      }),
      next: { revalidate: REVALIDATE },
    })
    if (!res.ok) throw new Error(`LeetCode responded ${res.status}`)

    const json = await res.json()
    const user = json?.data?.matchedUser
    if (!user) throw new Error("LeetCode: user not found")

    const nums: { difficulty: string; count: number }[] =
      user.submitStatsGlobal?.acSubmissionNum ?? []
    const by = (d: string) => nums.find((n) => n.difficulty === d)?.count ?? 0

    return {
      username: LEETCODE_USERNAME,
      totalSolved: by("All"),
      easy: by("Easy"),
      medium: by("Medium"),
      hard: by("Hard"),
      ranking: user.profile?.ranking ?? 0,
    }
  } catch (err) {
    console.error("[dsa] LeetCode fetch failed, using fallback:", err)
    return LEETCODE_FALLBACK
  }
}

export async function getGfgStats(): Promise<GfgStats> {
  try {
    const res = await fetch(`https://www.geeksforgeeks.org/user/${GFG_USERNAME}/`, {
      headers: {
        // GFG's profile route serves the embedded JSON only to browser-like UAs.
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
      },
      next: { revalidate: REVALIDATE },
    })
    if (!res.ok) throw new Error(`GFG responded ${res.status}`)

    const html = await res.text()
    // The profile stats live inside an embedded JSON blob in the page markup.
    const pick = (re: RegExp) => {
      const m = html.match(re)
      return m ? parseInt(m[1], 10) : NaN
    }
    // The blob is JSON embedded inside a JS string, so its quotes are
    // backslash-escaped (\"score\":371). The optional \\? tolerates both the
    // escaped form and a future raw-JSON form.
    const codingScore = pick(/\\?"score\\?":(\d+)/)
    const problemsSolved = pick(/\\?"total_problems_solved\\?":(\d+)/)
    const monthlyScore = pick(/\\?"monthly_score\\?":(\d+)/)

    if (Number.isNaN(codingScore) && Number.isNaN(problemsSolved)) {
      throw new Error("GFG: no stats found in page markup")
    }

    return {
      username: GFG_USERNAME,
      codingScore: Number.isNaN(codingScore) ? GFG_FALLBACK.codingScore : codingScore,
      problemsSolved: Number.isNaN(problemsSolved)
        ? GFG_FALLBACK.problemsSolved
        : problemsSolved,
      monthlyScore: Number.isNaN(monthlyScore) ? GFG_FALLBACK.monthlyScore : monthlyScore,
    }
  } catch (err) {
    console.error("[dsa] GFG fetch failed, using fallback:", err)
    return GFG_FALLBACK
  }
}

export async function getDsaStats(): Promise<DsaStats> {
  const [leetcode, gfg] = await Promise.all([getLeetCodeStats(), getGfgStats()])
  return { leetcode, gfg }
}
