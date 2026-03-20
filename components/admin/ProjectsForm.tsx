"use client"

import { Trash2, X, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Project } from "@/lib/types"

interface ProjectsFormProps {
  projects: Project[]
  setProjects: (projects: Project[]) => void
}

export function ProjectsForm({ projects, setProjects }: ProjectsFormProps) {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-10">
        {projects.map((proj, idx) => (
          <Card key={proj.id} className="bg-zinc-950/20 border-white/5 rounded-[2rem] overflow-hidden group hover:border-blue-500/20 transition-all shadow-xl">
            <CardHeader className="border-b border-white/5 bg-black/40 flex flex-row items-center justify-between space-y-0 p-8">
              <div className="flex-1 mr-6">
                <Input
                  className="bg-transparent border-none px-2 py-3 h-auto text-2xl font-black focus-visible:ring-0 w-full placeholder:text-zinc-800 text-white"
                  value={proj.title}
                  placeholder="Asset Title..."
                  onChange={(e) => {
                    const newProjs = [...projects]
                    newProjs[idx].title = e.target.value
                    setProjects(newProjs)
                  }}
                />
                <p className="text-[9px] px-2 font-black text-blue-500 mt-1 uppercase tracking-[0.2em]">Instance: {proj.id}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setProjects(projects.filter((_, i) => i !== idx))}
                className="text-zinc-800 hover:text-red-400 hover:bg-red-400/10 h-12 w-12 rounded-xl"
              >
                <Trash2 size={20} />
              </Button>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-zinc-600 font-bold text-[9px] uppercase tracking-[0.2em] ml-1">Asset Narrative</Label>
                    <Textarea
                      rows={5}
                      value={proj.description}
                      onChange={(e) => {
                        const newProjs = [...projects]
                        newProjs[idx].description = e.target.value
                        setProjects(newProjs)
                      }}
                      className="bg-black/40 border-white/5 focus:ring-blue-500/50 rounded-xl leading-relaxed p-4 text-zinc-300 text-sm"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-zinc-600 font-bold text-[9px] uppercase tracking-[0.2em] ml-1">Technology protocol stack</Label>
                    <div className="flex flex-wrap gap-2 mb-3 min-h-[50px] p-4 bg-black/40 rounded-xl border border-white/5">
                      {proj.tech.map((t, tIdx) => (
                        <Badge key={tIdx} variant="secondary" className="bg-zinc-900 text-zinc-300 border-zinc-800 px-3 py-1 flex items-center gap-2 hover:bg-zinc-800 transition-colors rounded-md font-bold text-[10px]">
                          {t}
                          <button
                            className="text-zinc-700 hover:text-red-400 transition-colors"
                            onClick={() => {
                              const newProjs = [...projects]
                              newProjs[idx].tech = proj.tech.filter((_, i) => i !== tIdx)
                              setProjects(newProjs)
                            }}>
                            <X size={12} />
                          </button>
                        </Badge>
                      ))}
                      {proj.tech.length === 0 && <span className="text-zinc-800 text-[10px] italic pt-1">No technology nodes indexed</span>}
                    </div>
                    <Input
                      placeholder="Add tech node (Enter)..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          const val = e.currentTarget.value.trim()
                          if (val) {
                            const newProjs = [...projects]
                            newProjs[idx].tech = [...proj.tech, val]
                            setProjects(newProjs)
                            e.currentTarget.value = ""
                          }
                        }
                      }}
                      className="bg-black/40 border-white/5 h-10 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <Label className="text-zinc-600 font-bold text-[9px] uppercase tracking-[0.2em] ml-1">Connectivity links</Label>
                    <div className="space-y-4">
                      <div className="group space-y-1.5">
                        <Label className="text-[9px] text-zinc-700 ml-1 font-bold">PRODUCTION URL</Label>
                        <div className="relative">
                          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-800 group-focus-within:text-blue-500 transition-colors">
                            <ExternalLink size={14} />
                          </div>
                          <Input
                            placeholder="https://..."
                            value={proj.demo}
                            onChange={(e) => {
                              const newProjs = [...projects]
                              newProjs[idx].demo = e.target.value
                              setProjects(newProjs)
                            }}
                            className="bg-black/40 border-white/5 pl-10 h-11 rounded-xl text-xs font-medium"
                          />
                        </div>
                      </div>
                      <div className="group space-y-1.5">
                        <Label className="text-[9px] text-zinc-700 ml-1 font-bold">SOURCE REPOSITORY</Label>
                        <div className="relative">
                          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-800 group-focus-within:text-blue-500 transition-colors">
                            <Github size={14} />
                          </div>
                          <Input
                            placeholder="https://github.com/..."
                            value={proj.github}
                            onChange={(e) => {
                              const newProjs = [...projects]
                              newProjs[idx].github = e.target.value
                              setProjects(newProjs)
                            }}
                            className="bg-black/40 border-white/5 pl-10 h-11 rounded-xl text-xs font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-zinc-600 font-bold text-[9px] uppercase tracking-[0.2em] ml-1">Visual Media assets</Label>
                    <div className="space-y-1.5">
                      <Label className="text-[9px] text-zinc-700 ml-1 font-bold">THUMBNAIL RESOURCE URL</Label>
                      <Input
                        placeholder="Direct link to asset (JPG/PNG)..."
                        value={proj.image || ""}
                        onChange={(e) => {
                          const newProjs = [...projects]
                          newProjs[idx].image = e.target.value
                          setProjects(newProjs)
                        }}
                        className="bg-black/40 border-white/5 h-10 rounded-lg text-xs"
                      />
                    </div>
                    {proj.image && (
                      <div className="mt-4 rounded-2xl overflow-hidden border border-white/5 aspect-video bg-black flex items-center justify-center relative group/img max-w-xs mx-auto">
                        <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover/img:opacity-100 transition-opacity" />
                        <img src={proj.image} alt="Preview" className="w-full h-full object-cover opacity-60 group-hover/img:opacity-80 transition-all duration-700" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
