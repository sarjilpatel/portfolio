"use client"

import { Trash2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Certification } from "@/lib/types"

interface CertificationsFormProps {
  certifications: Certification[]
  setCertifications: (certifications: Certification[]) => void
}

export function CertificationsForm({ certifications, setCertifications }: CertificationsFormProps) {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert, idx) => (
          <Card key={cert.id} className="bg-zinc-950/20 border-white/5 border-l-4 border-l-blue-600 rounded-2xl overflow-hidden group hover:bg-black/30 transition-all shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col h-full space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-2">
                    <Label className="text-[9px] text-zinc-600 uppercase font-black tracking-[0.2em] ml-1">Award Title</Label>
                    <Input
                      className="bg-transparent border-none  px-2 py-3 h-auto text-xl font-black focus-visible:ring-0 placeholder:text-zinc-800 text-white tracking-tight"
                      value={cert.title}
                      placeholder="Certificate Designation..."
                      onChange={(e) => {
                        const newCerts = [...certifications]
                        newCerts[idx].title = e.target.value
                        setCertifications(newCerts)
                      }}
                    />
                    <div className="pt-2">
                      <Label className="text-[9px] text-zinc-600 uppercase font-black tracking-[0.2em] ml-1">Credentialing Body</Label>
                      <Input
                        className="bg-transparent border-none  px-2 py-3 h-auto text-[11px] text-blue-400 font-black focus-visible:ring-0 placeholder:text-zinc-800 uppercase tracking-widest mt-0.5"
                        value={cert.issuer}
                        placeholder="Issuer Network..."
                        onChange={(e) => {
                          const newCerts = [...certifications]
                          newCerts[idx].issuer = e.target.value
                          setCertifications(newCerts)
                        }}
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCertifications(certifications.filter((_, i) => i !== idx))}
                    className="text-zinc-800 hover:text-red-400 hover:bg-red-400/10 h-10 w-10 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 mt-auto border-t border-white/5">
                  <div className="flex items-center gap-3 bg-zinc-900/80 px-4 py-2 rounded-xl border border-white/5 w-full sm:w-fit group-hover:bg-zinc-900 transition-colors">
                    <span className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.2em]">Validated</span>
                    <Input
                      className="bg-transparent border-none p-0 h-auto text-[10px] text-indigo-400 font-black focus-visible:ring-0 w-16 text-center tracking-tighter"
                      value={cert.date}
                      placeholder="YYYY"
                      onChange={(e) => {
                        const newCerts = [...certifications]
                        newCerts[idx].date = e.target.value
                        setCertifications(newCerts)
                      }}
                    />
                  </div>
                  <div className="flex-1 relative w-full group/link">
                    <Input
                      placeholder="Verification URL..."
                      value={cert.link}
                      onChange={(e) => {
                        const newCerts = [...certifications]
                        newCerts[idx].link = e.target.value
                        setCertifications(newCerts)
                      }}
                      className="bg-black/40 border-white/5 h-10 text-[10px] rounded-lg pl-10 font-medium focus:bg-black/60"
                    />
                    <ExternalLink size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within/link:text-blue-500" />
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
