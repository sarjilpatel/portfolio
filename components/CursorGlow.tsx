"use client"

import { useEffect, useState } from "react"

export default function CursorGlow() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      className="cursor-glow"
      style={{
        left: mousePos.x,
        top: mousePos.y,
      }}
    />
  )
}
