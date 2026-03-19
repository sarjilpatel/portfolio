"use client"

import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Education } from "@/lib/types"

interface EducationFormProps {
  education: Education[]
  setEducation: (education: Education[]) => void
}

export function EducationForm({ education, setEducation }: EducationFormProps) {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-10">
        {education.map((edu, idx) => (
          <Card key={edu.id} className="bg-zinc-950/20 border-white/5 rounded-[2rem] overflow-hidden group hover:border-blue-500/20 transition-all shadow-xl">
            <CardContent className="p-10">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                <div className="lg:col-span-2 space-y-6">
                   <div className="space-y-3">
                    <Label className="text-[9px] text-zinc-600 uppercase font-black tracking-[0.2em] ml-1">Academic Institution</Label>
                    <Input 
                      value={edu.institution}
                      onChange={(e) => {
                        const newEdu = [...education]
                        newEdu[idx].institution = e.target.value
                        setEducation(newEdu)
                      }}
                      className="bg-black/60 border-white/5 h-14 text-2xl font-black rounded-xl tracking-tighter"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[9px] text-zinc-600 uppercase font-black tracking-[0.2em] ml-1">Qualified Major / Field</Label>
                    <Input 
                      value={edu.degree}
                      onChange={(e) => {
                        const newEdu = [...education]
                        newEdu[idx].degree = e.target.value
                        setEducation(newEdu)
                      }}
                      className="bg-black/40 border-white/5 h-12 text-blue-400 font-black rounded-xl tracking-tight text-lg"
                    />
                  </div>
                </div>
                
                <div className="space-y-6 lg:col-span-1">
                   <div className="space-y-3">
                    <Label className="text-[9px] text-zinc-600 uppercase font-black tracking-[0.2em] ml-1">Enrollment Span</Label>
                    <Input 
                      value={edu.period}
                      onChange={(e) => {
                        const newEdu = [...education]
                        newEdu[idx].period = e.target.value
                        setEducation(newEdu)
                      }}
                      className="bg-black/40 border-white/5 h-14 rounded-xl text-white font-mono text-center text-sm"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[9px] text-zinc-600 uppercase font-black tracking-[0.2em] ml-1">Academic Status</Label>
                    <Input 
                      value={edu.status}
                      onChange={(e) => {
                        const newEdu = [...education]
                        newEdu[idx].status = e.target.value
                        setEducation(newEdu)
                      }}
                      className="bg-black/40 border-white/5 h-12 rounded-xl text-zinc-500 font-bold uppercase tracking-widest text-center text-[10px]"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col justify-end">
                  <Button 
                    variant="ghost"
                    onClick={() => setEducation(education.filter((_, i) => i !== idx))}
                    className="text-zinc-800 hover:text-red-400 hover:bg-red-400/10 h-14 rounded-xl font-black uppercase tracking-widest text-[9px]"
                  >
                    <Trash2 size={20} className="mr-2" />
                    Purge Node
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
