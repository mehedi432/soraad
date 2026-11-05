"use client"

import { useEffect, useState, ReactNode } from "react"

export default function NavShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="relative">
      <div
        className={`absolute inset-0 -z-10 bg-white transition-all duration-500 ${
          scrolled
            ? "bg-white/90 shadow-[0_1px_0_rgba(0,0,0,0.08)] backdrop-blur-md"
            : "shadow-[0_1px_0_rgba(0,0,0,0.05)]"
        }`}
      />
      <nav
        className={`relative mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 transition-[height] duration-500 md:px-10 ${
          scrolled ? "h-16" : "h-[76px]"
        }`}
      >
        {children}
      </nav>
    </div>
  )
}