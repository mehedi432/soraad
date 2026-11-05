"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export type CarouselItem = {
  /** Evocative name shown large, e.g. "First Layers" */
  title: string
  /** The plain category name shown small, e.g. "Bodysuits" */
  note?: string
  href: string
  image?: string | null
}

const CategoryCarousel = ({
  heading,
  exploreHref,
  items,
}: {
  heading: string
  exploreHref: string
  items: CarouselItem[]
}) => {
  const trackRef = useRef<HTMLUListElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    update()
    const el = trackRef.current
    el?.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      el?.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [update])

  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollBy({
      left: dir * el.clientWidth * 0.8,
      behavior: reduce ? "auto" : "smooth",
    })
  }

  return (
    <section className="mx-auto max-w-[1600px] px-4 pb-14 md:px-8 md:pb-20">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="font-display text-4xl font-light md:text-5xl">
          {heading}
        </h2>
        <LocalizedClientLink
          href={exploreHref}
          className="shrink-0 border-b border-ink pb-1 text-[11px] uppercase tracking-[0.3em] transition-opacity hover:opacity-60"
        >
          Explore all
        </LocalizedClientLink>
      </div>

      <div className="relative">
        <ul
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-5"
        >
          {items.map((item, i) => (
            <li
              key={item.title}
              className="w-[68%] shrink-0 snap-start sm:w-[44%] md:w-[31%] lg:w-[23.5%]"
            >
              <LocalizedClientLink
                href={item.href}
                className="group relative block aspect-[4/5] overflow-hidden rounded-sm bg-oat focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                )}
                {/* sewn-in woven label */}
                <span className="absolute inset-x-3 bottom-3 bg-oat/95 px-4 py-4 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] backdrop-blur-sm md:inset-x-4 md:bottom-4 md:px-5 md:py-5">
                  <span className="pointer-events-none absolute inset-1.5 border border-dashed border-ink/25" />
                  <span className="relative flex items-baseline justify-between gap-3 text-[10px] uppercase tracking-[0.35em] text-clay">
                    <span>No. {String(i + 1).padStart(2, "0")}</span>
                    {item.note && <span className="truncate">{item.note}</span>}
                  </span>
                  <span className="relative mt-3 block font-display text-2xl font-light leading-[1.05] text-ink md:text-[1.75rem]">
                    {item.title}
                  </span>
                  <span className="relative mt-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-ink">
                    <span className="h-px w-8 bg-ink transition-all duration-500 group-hover:w-16 motion-reduce:transition-none" />
                    Discover
                  </span>
                </span>
              </LocalizedClientLink>
            </li>
          ))}
        </ul>

        {canPrev && (
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            aria-label="Previous"
            className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink bg-white text-lg hover:bg-ink hover:text-white md:flex"
          >
            ‹
          </button>
        )}
        {canNext && (
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            aria-label="Next"
            className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink bg-white text-lg hover:bg-ink hover:text-white md:flex"
          >
            ›
          </button>
        )}
      </div>
    </section>
  )
}

export default CategoryCarousel