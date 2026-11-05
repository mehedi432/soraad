"use client"

import { ReactNode, useCallback, useEffect, useRef, useState } from "react"

/**
 * Client shell: native scroll-snap (swipe works on phones), arrows,
 * season tabs, and a gentle autoplay that pauses on hover/focus and is
 * disabled for people who prefer reduced motion.
 */
const HeroCarousel = ({
  slides,
  labels,
  interval = 7000,
}: {
  slides: ReactNode[]
  labels: string[]
  interval?: number
}) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const reduceRef = useRef(false)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  }, [])

  const goTo = useCallback(
    (i: number) => {
      const el = trackRef.current
      if (!el) return
      const n = (i + slides.length) % slides.length
      el.scrollTo({
        left: n * el.clientWidth,
        behavior: reduceRef.current ? "auto" : "smooth",
      })
    },
    [slides.length]
  )

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onScroll = () =>
      setIndex(Math.round(el.scrollLeft / Math.max(el.clientWidth, 1)))
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (paused || reduceRef.current) return
    const t = window.setInterval(() => goTo(index + 1), interval)
    return () => window.clearInterval(t)
  }, [index, paused, goTo, interval])

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Seasonal collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden rounded-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <div
            key={labels[i]}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}: ${labels[i]}`}
            className="relative aspect-[9/13] w-full shrink-0 snap-center md:aspect-auto md:h-[clamp(440px,46vw,720px)]"
          >
            {slide}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 md:mt-5">
        <div className="flex gap-5 overflow-x-auto [scrollbar-width:none] md:gap-9 [&::-webkit-scrollbar]:hidden">
          {labels.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => goTo(i)}
              aria-current={i === index}
              className={`relative shrink-0 pb-2 text-[10px] uppercase tracking-[0.3em] transition-colors ${
                i === index ? "text-ink" : "text-ink/45 hover:text-ink/80"
              }`}
            >
              <span className="mr-2 text-clay">
                {String(i + 1).padStart(2, "0")}
              </span>
              {label}
              <span
                className={`absolute inset-x-0 bottom-0 h-px origin-left bg-ink transition-transform duration-500 motion-reduce:transition-none ${
                  i === index ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous season"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink text-lg transition-colors hover:bg-ink hover:text-white"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next season"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink text-lg transition-colors hover:bg-ink hover:text-white"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroCarousel