"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Profile } from "@/lib/types"

interface ProfileFormProps {
  profile: Profile
  setProfile: (profile: Profile) => void
}

export function ProfileForm({ profile, setProfile }: ProfileFormProps) {
  return (
    <div className="space-y-10">
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader className="p-6 mb-6 border-b border-white/5 pb-6">
          <CardTitle className="text-xl font-black text-white">Identity Core</CardTitle>
          <CardDescription className="text-zinc-500 font-medium text-xs">Configure your digital footprint and global persona</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-zinc-600 font-bold text-[9px] uppercase tracking-[0.2em] ml-1">Legal Designation</Label>
              <Input
                id="name"
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="bg-zinc-950/40 border-white/5 h-12 rounded-xl text-base font-bold focus:ring-blue-500/50"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="role" className="text-zinc-600 font-bold text-[9px] uppercase tracking-[0.2em] ml-1">Professional Protocol</Label>
              <Input
                id="role"
                type="text"
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                className="bg-zinc-950/40 border-white/5 h-12 rounded-xl text-base font-bold focus:ring-blue-500/50"
              />
            </div>
            <div className="md:col-span-2 space-y-3">
              <Label htmlFor="tagline" className="text-zinc-600 font-bold text-[9px] uppercase tracking-[0.2em] ml-1">Status Narrative</Label>
              <Input
                id="tagline"
                type="text"
                value={profile.tagline}
                onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                className="bg-zinc-950/40 border-white/5 h-12 rounded-xl text-lg font-black text-blue-400 focus:ring-blue-500/50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-zinc-950/20 border-white/5 rounded-2xl overflow-hidden">
          <CardHeader className="bg-zinc-900/30 border-b border-white/5 p-6">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Communication Ports</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest ml-1">Public Endpoint (Email)</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="bg-black/40 border-white/5 h-11 rounded-lg"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="resume" className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest ml-1">Artifact Repository (Resume)</Label>
              <Input
                id="resume"
                type="text"
                value={profile.resume}
                onChange={(e) => setProfile({ ...profile, resume: e.target.value })}
                className="bg-black/40 border-white/5 h-11 rounded-lg"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950/20 border-white/5 rounded-2xl overflow-hidden">
          <CardHeader className="bg-zinc-900/30 border-b border-white/5 p-6">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Social Interconnects</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <Label className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest ml-1">GitHub Hub</Label>
              <Input
                type="text"
                value={profile.github}
                onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                className="bg-black/40 border-white/5 h-11 rounded-lg"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest ml-1">LinkedIn Uplink</Label>
              <Input
                type="text"
                value={profile.linkedin}
                onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                className="bg-black/40 border-white/5 h-11 rounded-lg"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-950/20 border-white/5 rounded-2xl overflow-hidden">
        <CardHeader className="bg-zinc-900/30 border-b border-white/5 p-6">
          <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Bio-Core Expansion</CardTitle>
          <CardDescription className="text-[10px]">Extended biographical data for about segments</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Textarea
            rows={6}
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="bg-black/40 border-white/5 rounded-xl focus:ring-blue-500 resize-none text-sm leading-relaxed p-4"
          />
        </CardContent>
      </Card>
    </div>
  )
}
