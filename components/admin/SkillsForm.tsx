"use client"

import { Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SkillCategory } from "@/lib/types"

interface SkillsFormProps {
  skills: SkillCategory[]
  setSkills: (skills: SkillCategory[]) => void
}

export function SkillsForm({ skills, setSkills }: SkillsFormProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((cat, idx) => (
          <Card key={idx} className="bg-zinc-950/20 border-white/5 flex flex-col hover:border-blue-500/20 transition-all group rounded-2xl overflow-hidden shadow-lg">
            <CardHeader className="border-b border-white/5 bg-black/40 flex flex-row items-center justify-between space-y-0 py-4 px-6">
              <Input
                className="bg-transparent border-none py-3 px-2 h-auto text-lg font-black focus-visible:ring-0 w-full placeholder:text-zinc-700 text-white"
                value={cat.category}
                placeholder="Segment..."
                onChange={(e) => {
                  const newSkills = [...skills]
                  newSkills[idx].category = e.target.value
                  setSkills(newSkills)
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSkills(skills.filter((_, i) => i !== idx))}
                className="text-zinc-800 hover:text-red-400 h-8 w-8 rounded-lg transition-colors"
              >
                <Trash2 size={14} />
              </Button>
            </CardHeader>
            <CardContent className="p-6 flex-1 space-y-6">
              <div className="flex flex-wrap gap-2 min-h-[100px] p-4 bg-black/40 rounded-xl border border-white/5">
                {cat.skills.map((skill, sIdx) => (
                  <Badge key={sIdx} className="bg-zinc-900 text-zinc-300 border-zinc-800 font-bold py-1.5 pr-1.5 pl-3 flex items-center gap-2 group/badge hover:bg-zinc-800 transition-colors rounded-md text-[10px]">
                    {skill}
                    <button
                      className="p-1 hover:text-red-400 text-zinc-700 transition-colors"
                      onClick={() => {
                        const newSkills = [...skills]
                        newSkills[idx].skills = cat.skills.filter((_, i) => i !== sIdx)
                        setSkills(newSkills)
                      }}>
                      <X size={10} />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="relative group/input">
                <Input
                  placeholder="Index node..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      const val = e.currentTarget.value.trim()
                      if (val) {
                        const newSkills = [...skills]
                        newSkills[idx].skills = [...cat.skills, val]
                        setSkills(newSkills)
                        e.currentTarget.value = ""
                      }
                    }
                  }}
                  className="bg-black/40 border-white/5 h-10 rounded-lg text-xs font-medium focus:ring-blue-500/30"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
