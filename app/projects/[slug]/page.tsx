import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, ChevronRight } from "lucide-react"
import { getAllProjects, getProjectBySlug } from "@/lib/data"
import { getGoogleDriveUrl } from "@/lib/utils"
import ProjectGallery from "@/components/ProjectGallery"

// Fully static — one prerendered page per project slug.
export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: "Project not found" }
  return {
    title: `${project.title} | Sarjilkumar Patel`,
    description: project.overview || project.description,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const previewUrl = getGoogleDriveUrl(project.previewImage || "")
  const meta = [project.org, project.year, project.role].filter(Boolean)

  return (
    <main className="relative z-10 min-h-screen px-6 pt-28 pb-24">
      <article className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          Back to work
        </Link>

        {/* Header */}
        <header className="mb-12">
          {project.type && (
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">
              {project.type}
            </span>
          )}
          <h1 className="text-5xl md:text-7xl font-bold tracking-[-0.03em] text-white mt-3 mb-6">
            {project.title}
          </h1>

          {meta.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-400 font-mono">
              {meta.map((m, i) => (
                <span key={i} className="flex items-center gap-3">
                  {i > 0 && <span className="text-zinc-700">/</span>}
                  {m}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          {(project.demo || project.github) && (
            <div className="flex flex-wrap gap-3 mt-8">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors"
                >
                  <ExternalLink size={16} />
                  Live Site
                  <ArrowUpRight size={16} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/5 text-white text-sm font-semibold hover:bg-white/10 hover:border-white/30 transition-colors"
                >
                  <Github size={16} />
                  Source
                </a>
              )}
            </div>
          )}
        </header>

        {/* Cover image (uses preview if present) */}
        {previewUrl && (
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 mb-14 flex items-center justify-center">
            <Image
              src={previewUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>
        )}

        {/* Overview */}
        {(project.overview || project.description) && (
          <section className="mb-14">
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 mb-4">
              Overview
            </h2>
            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
              {project.overview || project.description}
            </p>
          </section>
        )}

        {/* What I did */}
        {project.contributions && project.contributions.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 mb-5">
              What I did
            </h2>
            <ul className="space-y-3">
              {project.contributions.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-300 leading-relaxed">
                  <ChevronRight size={18} className="mt-1 shrink-0 text-zinc-500" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 mb-5">
              Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.highlights.map((h, i) => (
                <div
                  key={i}
                  className="glass-card !p-4 text-sm text-zinc-300 flex items-center"
                >
                  {h}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tech stack */}
        {project.tech.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 mb-5">
              Tech stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-mono px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-300 uppercase tracking-wider"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Screenshots */}
        {project.images && project.images.length > 0 && (
          <section className="mb-4">
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 mb-5">
              Screenshots
            </h2>
            <ProjectGallery images={project.images} title={project.title} />
          </section>
        )}
      </article>
    </main>
  )
}
