"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { getGoogleDriveUrl } from "@/lib/utils"

// Lightweight screenshot gallery + lightbox. No animation library — just a
// responsive grid and a native-feeling overlay toggled with React state.
export default function ProjectGallery({
  images,
  title,
}: {
  images: string[]
  title: string
}) {
  const [open, setOpen] = useState<number | null>(null)
  const urls = images.map((i) => getGoogleDriveUrl(i)).filter(Boolean)

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null)
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % urls.length))
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + urls.length) % urls.length))
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, urls.length])

  if (urls.length === 0) return null

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {urls.map((url, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            className="group relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-zinc-950 cursor-zoom-in"
            aria-label={`Open screenshot ${i + 1} of ${title}`}
          >
            <Image
              src={url}
              alt={`${title} screenshot ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setOpen(null)}
        >
          <button
            className="absolute top-5 right-5 p-2 text-zinc-300 hover:text-white"
            onClick={() => setOpen(null)}
            aria-label="Close"
          >
            <X size={26} />
          </button>

          {urls.length > 1 && (
            <>
              <button
                className="absolute left-4 p-2 text-zinc-300 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen((i) => (i === null ? i : (i - 1 + urls.length) % urls.length))
                }}
                aria-label="Previous"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                className="absolute right-4 p-2 text-zinc-300 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen((i) => (i === null ? i : (i + 1) % urls.length))
                }}
                aria-label="Next"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          <div
            className="relative w-full max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={urls[open]}
              alt={`${title} screenshot ${open + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}
