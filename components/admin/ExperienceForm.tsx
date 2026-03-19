"use client"

import { Plus, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Experience } from "@/lib/types"

interface ExperienceFormProps {
  experience: Experience[]
  setExperience: (experience: Experience[]) => void
}

export function ExperienceForm({ experience, setExperience }: ExperienceFormProps) {
  return (
    <div className="space-y-10">
      <div className="space-y-10">
        {experience.map((exp, idx) => (
          <Card key={exp.id} className="bg-zinc-950/20 border-white/5 rounded-[2rem] overflow-hidden group hover:border-blue-500/10 transition-all shadow-xl">
            <CardHeader className="border-b border-white/5 bg-black/50 p-8 flex flex-row items-start justify-between">
              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <Input
                    className="bg-transparent border-none px-2 py-3 h-auto text-3xl font-black focus-visible:ring-0 placeholder:text-zinc-800 text-white tracking-tightest"
                    value={exp.role}
                    placeholder="Role Designation..."
                    onChange={(e) => {
                      const newExp = [...experience]
                      newExp[idx].role = e.target.value
                      setExperience(newExp)
                    }}
                  />
                  <div className="flex items-center gap-3 bg-zinc-900/60 px-4 py-1.5 rounded-xl border border-white/5 w-fit ring-1 ring-white/5">
                    <span className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">Period</span>
                    <Input
                      className="bg-transparent border-none h-auto text-[10px] text-blue-400 font-black focus-visible:ring-0 w-28 uppercase tracking-widest"
                      value={exp.period}
                      placeholder="Span..."
                      onChange={(e) => {
                        const newExp = [...experience]
                        newExp[idx].period = e.target.value
                        setExperience(newExp)
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 group/company">
                  <div className="w-2 h-2 rounded-full bg-blue-500 group-hover/company:scale-125 transition-transform shrink-0" />
                  <Input
                    className="bg-transparent border-none  px-2 py-2 h-auto text-lg text-zinc-500 font-bold focus-visible:ring-0 placeholder:text-zinc-800"
                    value={exp.company}
                    placeholder="Operation Base (Company)..."
                    onChange={(e) => {
                      const newExp = [...experience]
                      newExp[idx].company = e.target.value
                      setExperience(newExp)
                    }}
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setExperience(experience.filter((_, i) => i !== idx))}
                className="text-zinc-800 hover:text-red-400 hover:bg-red-400/10 h-12 w-12 rounded-xl transition-all shrink-0"
              >
                <Trash2 size={20} />
              </Button>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <Label className="text-zinc-600 font-black text-[9px] uppercase tracking-[0.2em] ml-1">Contributions Narrative</Label>
                </div>
                <div className="space-y-6">
                  {exp.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex gap-6 group/ach items-start">
                      <div className="mt-4 w-1 h-10 bg-zinc-900 rounded-full group-hover/ach:bg-blue-500 transition-all shrink-0" />
                      <Textarea
                        value={ach}
                        onChange={(e) => {
                          const newExp = [...experience]
                          newExp[idx].achievements[aIdx] = e.target.value
                          setExperience(newExp)
                        }}
                        className="bg-black/40 border-white/5 min-h-[80px] flex-1 rounded-xl text-zinc-300 focus:bg-black/60 text-base font-medium p-4 leading-relaxed border-none focus-visible:ring-blue-500/20"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newExp = [...experience]
                          newExp[idx].achievements = exp.achievements.filter((_, i) => i !== aIdx)
                          setExperience(newExp)
                        }}
                        className="opacity-0 group-hover/ach:opacity-100 text-zinc-800 hover:text-red-400 h-10 w-10 mt-2 rounded-lg transition-all"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    onClick={() => {
                      const newExp = [...experience]
                      newExp[idx].achievements = [...exp.achievements, "New contribution node..."]
                      setExperience(newExp)
                    }}
                    className="w-full h-14 border-2 border-dashed border-white/5 bg-black/20 hover:bg-black/40 text-zinc-700 hover:text-blue-500 transition-all rounded-xl mt-4 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[9px]"
                  >
                    <Plus size={14} />
                    Register Segment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
