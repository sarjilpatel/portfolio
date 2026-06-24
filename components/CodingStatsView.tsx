"use client"

import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si"
import { ExternalLink, Trophy } from "lucide-react"
import SectionHeading from "@/components/SectionHeading"
import Reveal from "@/components/Reveal"
import CountUp from "@/components/CountUp"
import type { LeetCodeStats, GfgStats } from "@/lib/types"

function diffPct(part: number, total: number) {
  return total > 0 ? (part / total) * 100 : 0
}

export default function CodingStatsView({
  leetcode,
  gfg,
}: {
  leetcode: LeetCodeStats
  gfg: GfgStats
}) {
  const lcTotal = leetcode.easy + leetcode.medium + leetcode.hard || 1

  // Difficulty tiers as white-opacity steps to stay on the monochrome palette —
  // brightest = easiest, dimmest = hardest.
  const tiers = [
    { label: "Easy", count: leetcode.easy, bar: "bg-white/85", dot: "bg-white/85" },
    { label: "Medium", count: leetcode.medium, bar: "bg-white/45", dot: "bg-white/45" },
    { label: "Hard", count: leetcode.hard, bar: "bg-white/20", dot: "bg-white/25" },
  ]

  return (
    <section
      id="coding"
      className="py-16 sm:py-24 px-5 sm:px-6 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="DSA & Problem Solving"
          tag="CODING PROFILES"
          subtitle="Live stats pulled from my competitive programming profiles."
        />

        <Reveal
          variant="up"
          fade={false}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* ---- LeetCode ---- */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col">
            <div className="flex items-center justify-between gap-3 mb-7">
              <div className="flex items-center gap-3">
                <SiLeetcode size={26} style={{ color: "#FFA116" }} className="shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-white leading-none">
                    LeetCode
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">@{leetcode.username}</span>
                </div>
              </div>
              <a
                href={`https://leetcode.com/u/${leetcode.username}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
                aria-label="Open LeetCode profile"
              >
                <ExternalLink size={17} />
              </a>
            </div>

            <div className="flex items-end gap-2.5 mb-6">
              <span className="text-5xl sm:text-6xl font-bold tracking-tighter text-white tabular-nums">
                <CountUp value={leetcode.totalSolved} />
              </span>
              <span className="text-sm text-zinc-400 mb-2">problems solved</span>
            </div>

            {/* Difficulty breakdown bar */}
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-white/5 mb-4">
              {tiers.map((t) => (
                <div
                  key={t.label}
                  className={`${t.bar} h-full`}
                  style={{ width: `${diffPct(t.count, lcTotal)}%` }}
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 mb-7">
              {tiers.map((t) => (
                <div key={t.label} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`size-2 rounded-full ${t.dot}`} />
                    <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-mono">
                      {t.label}
                    </span>
                  </div>
                  <span className="text-xl font-semibold text-white tabular-nums">
                    <CountUp value={t.count} />
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-2 border-t border-white/10 pt-5">
              <Trophy size={15} className="text-zinc-500" />
              <span className="text-sm text-zinc-400">Global rank</span>
              <span className="ml-auto text-sm font-semibold text-white tabular-nums">
                #<CountUp value={leetcode.ranking} />
              </span>
            </div>
          </div>

          {/* ---- GeeksforGeeks ---- */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col">
            <div className="flex items-center justify-between gap-3 mb-7">
              <div className="flex items-center gap-3">
                <SiGeeksforgeeks size={26} style={{ color: "#2F8D46" }} className="shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-white leading-none">
                    GeeksforGeeks
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">@{gfg.username}</span>
                </div>
              </div>
              <a
                href={`https://www.geeksforgeeks.org/user/${gfg.username}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
                aria-label="Open GeeksforGeeks profile"
              >
                <ExternalLink size={17} />
              </a>
            </div>

            <div className="flex items-end gap-2.5 mb-7">
              <span className="text-5xl sm:text-6xl font-bold tracking-tighter text-white tabular-nums">
                <CountUp value={gfg.codingScore} />
              </span>
              <span className="text-sm text-zinc-400 mb-2">coding score</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-7">
              <div className="glass-lite rounded-xl px-4 py-3.5 flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-mono">
                  Problems
                </span>
                <span className="text-2xl font-semibold text-white tabular-nums">
                  <CountUp value={gfg.problemsSolved} />
                </span>
              </div>
              <div className="glass-lite rounded-xl px-4 py-3.5 flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-mono">
                  This month
                </span>
                <span className="text-2xl font-semibold text-white tabular-nums">
                  +<CountUp value={gfg.monthlyScore} />
                </span>
              </div>
            </div>

            <div className="mt-auto flex items-center gap-2 border-t border-white/10 pt-5">
              <span className="text-sm text-zinc-400">Total problems solved</span>
              <span className="ml-auto text-sm font-semibold text-white tabular-nums">
                <CountUp value={gfg.problemsSolved} />
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
