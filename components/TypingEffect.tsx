"use client"

import { useState, useEffect } from "react"

const skills = ["React Native", "Next.js", "AWS Cloud", "Node.js", "TypeScript", "Full Stack"]

export default function TypingEffect() {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [reverse, setReverse] = useState(false)
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    if (subIndex === skills[index].length + 1 && !reverse) {
      setReverse(true)
      return
    }

    if (subIndex === 0 && reverse) {
      setReverse(false)
      setIndex((prev) => (prev + 1) % skills.length)
      return
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1))
    }, Math.max(reverse ? 75 : subIndex === skills[index].length ? 2000 : 150, Math.random() * 200))

    return () => clearTimeout(timeout)
  }, [subIndex, index, reverse])

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev)
    }, 500)
    return () => clearTimeout(timeout2)
  }, [blink])

  return (
    <span className="font-mono text-blue-500">
      {`${skills[index].substring(0, subIndex)}${blink ? "|" : " "}`}
    </span>
  )
}
