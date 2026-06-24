import { Github, ExternalLink, ArrowUpRight } from "lucide-react"
import { Project } from "@/lib/types"
import SectionHeading from "@/components/SectionHeading"
import Reveal from "@/components/Reveal"
import { getGoogleDriveUrl } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

function ProjectCard({ project, index }: { project: Project, index: number }) {
  const imageUrl = getGoogleDriveUrl(project.previewImage || "");

  return (
    <Reveal variant="up" delay={index * 70} fade={false} className="h-full">
      {/* Outer relative container holds the tilt + the external links as siblings
          of the card Link (avoids invalid nested anchors). */}
      <div className="relative h-full group">
        <Link
          href={`/projects/${project.slug}`}
          className="glass-card flex flex-col h-full relative overflow-hidden hover:-translate-y-2 hover:border-white/20"
        >
          {/* Subtle sheen on hover */}
          <div className="absolute inset-0 bg-linear-to-br from-white/6 via-transparent to-white/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="aspect-video relative overflow-hidden rounded-xl mb-6 bg-zinc-950 border border-white/5">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-bold text-white/5 select-none tracking-tighter">
                  {project.title}
                </span>
              </div>
            )}
            {/* Read-more hint sweeps in on hover */}
            <div className="absolute inset-0 flex items-end justify-start bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="m-4 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-white">
                View case study <ArrowUpRight size={14} />
              </span>
            </div>
          </div>

          <div className="flex flex-col grow relative z-10 px-4 pb-4">
            {project.org && (
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-1.5">
                {project.org}
              </span>
            )}
            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-zinc-300 transition-colors tracking-tight">
              {project.title}
            </h3>
            <p className="text-zinc-400 text-sm mb-6 grow leading-relaxed line-clamp-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 6).map((t: string) => (
                <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/4 border border-white/10 text-zinc-400 uppercase tracking-wider group-hover:border-white/20">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Link>

        {/* External links — siblings of the Link, so no nested anchors */}
        {(project.github || project.demo) && (
          <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source`}
                className="p-2.5 bg-white/10 hover:bg-white hover:text-black rounded-full text-white backdrop-blur-md transition-colors"
              >
                <Github size={18} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="p-2.5 bg-white/10 hover:bg-white hover:text-black rounded-full text-white backdrop-blur-md transition-colors"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        )}
      </div>
    </Reveal>
  )
}

export default function Projects({ projectsData }: { projectsData: Project[] }) {
  return (
    <section id="projects" className="py-16 sm:py-24 px-5 sm:px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-150 bg-white/3 blur-[150px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Featured Projects"
          tag="PROJECTS"
          subtitle="Recent work and side projects I've built. Click any card for the full case study."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-12">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
