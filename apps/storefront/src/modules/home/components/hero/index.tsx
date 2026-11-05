import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HERO_ART } from "./art"
import HeroCarousel from "./hero-carousel"
import { HERO_SLIDES } from "./slides"

type HeroProps = {
  /** Legacy props from the old hero. They are ignored now; you can remove them. */
  image?: string | null
  mobileImage?: string | null
}

/**
 * Seasonal hero carousel (server component).
 * - Knit artwork is inline SVG, so there are no image files or paths to break.
 * - Text uses your own font-display, so the typography matches the rest of the site.
 * - Edit copy and links in ./slides.ts.
 */
const Hero = (_props: HeroProps) => {
  const slides = HERO_SLIDES.map((s, i) => {
    const Heading = i === 0 ? "h1" : "h2"
    return (
      <div key={s.id} className="relative h-full w-full overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 [&>svg]:h-full [&>svg]:w-full"
          dangerouslySetInnerHTML={{ __html: HERO_ART[s.id] }}
        />

        <div className="absolute inset-x-3 bottom-3 md:inset-x-auto md:bottom-auto md:left-8 md:top-1/2 md:w-[46%] md:max-w-[560px] md:-translate-y-1/2 lg:left-12 lg:w-[40%]">
          <div className="relative bg-oat px-5 py-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)] md:px-9 md:py-9">
            <span className="pointer-events-none absolute inset-2 border border-dashed border-ink/25" />

            <p
              className="relative text-[10px] uppercase tracking-[0.4em]"
              style={{ color: s.color }}
            >
              {s.eyebrow}
            </p>

            <Heading className="relative mt-4 font-display text-[2rem] font-light leading-[1] text-ink md:text-5xl lg:text-6xl">
              {s.lead} <em className="font-light italic">{s.accent}</em>{" "}
              {s.tail}
            </Heading>

            <p className="relative mt-4 max-w-sm text-sm leading-relaxed text-ink/70 md:mt-5">
              {s.blurb}
            </p>

            <div className="relative mt-6 flex items-center justify-between gap-4 md:mt-8">
              <LocalizedClientLink
                href={s.href}
                className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-ink"
              >
                <span className="border-b border-ink pb-1">{s.cta}</span>
                <span
                  aria-hidden
                  className="h-px w-8 bg-ink transition-all duration-500 group-hover:w-14 motion-reduce:transition-none"
                />
              </LocalizedClientLink>
              <span className="hidden text-[10px] uppercase tracking-[0.3em] text-ink/50 sm:block">
                {s.ages}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <section className="mx-auto max-w-[1600px] px-4 py-6 md:px-8 md:py-10">
      <HeroCarousel slides={slides} labels={HERO_SLIDES.map((s) => s.season)} />
    </section>
  )
}

export default Hero