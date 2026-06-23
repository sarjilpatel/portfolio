"use client"

import { useState, useEffect } from "react"

const skills = ["Next.js apps", "Node.js APIs", "NestJS backends", "AWS cloud platforms", "developer tools"]

export default function TypingEffect() {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [reverse, setReverse] = useState(false)
  const [blink, setBlink] = useState(true)

  // Single timer that advances the typing state. All transitions (including the
  // reverse / next-word flips) happen inside the timeout callback so we never
  // call setState synchronously during the effect body.
  useEffect(() => {
    const atEnd = subIndex === skills[index].length
    const atStart = subIndex === 0

    const delay = !reverse && atEnd ? 1600 : reverse ? 60 : 110

    const timeout = setTimeout(() => {
      if (!reverse && atEnd) {
        setReverse(true)
      } else if (reverse && atStart) {
        setReverse(false)
        setIndex((prev) => (prev + 1) % skills.length)
      } else {
        setSubIndex((prev) => prev + (reverse ? -1 : 1))
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [subIndex, index, reverse])

  useEffect(() => {
    const timeout = setTimeout(() => setBlink((prev) => !prev), 500)
    return () => clearTimeout(timeout)
  }, [blink])

  return (
    <span className="font-mono text-white">
      {`${skills[index].substring(0, subIndex)}${blink ? "|" : " "}`}
    </span>
  )
}
