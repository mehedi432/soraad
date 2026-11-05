import type { SeasonId } from "./art"

export type HeroSlide = {
  id: SeasonId
  /** Short name used in the navigation row under the banner */
  season: string
  eyebrow: string
  /** Headline = lead + italic accent + tail */
  lead: string
  accent: string
  tail: string
  blurb: string
  cta: string
  href: string
  ages: string
  /** Accent colour for the eyebrow text (must read well on cream) */
  color: string
}

// Edit the copy and links here. Change "/store" to a collection handle,
// e.g. "/collections/autumn", once you have created those collections.
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "autumn",
    season: "Autumn",
    eyebrow: "Autumn Collection",
    lead: "Soft layers for",
    accent: "falling",
    tail: "leaves.",
    blurb: "Cable cardigans and warm-toned knits for the first cool evenings.",
    cta: "Shop autumn",
    href: "/store",
    ages: "Newborn – 24 months",
    color: "#9A4A33",
  },
  {
    id: "winter",
    season: "Winter",
    eyebrow: "Winter Collection",
    lead: "Snug knits for",
    accent: "first",
    tail: "winter mornings.",
    blurb: "Heirloom-soft sweaters with Nordic snowflake yokes, made to be handed down.",
    cta: "Shop winter",
    href: "/store",
    ages: "Newborn – 24 months",
    color: "#3F6178",
  },
  {
    id: "spring",
    season: "Spring",
    eyebrow: "Spring Collection",
    lead: "Pastel cottons for",
    accent: "little",
    tail: "blossoms.",
    blurb: "Light cardigans and rompers in blush, sage and lilac.",
    cta: "Shop spring",
    href: "/store",
    ages: "Newborn – 24 months",
    color: "#8B5E83",
  },
  {
    id: "summer",
    season: "Summer",
    eyebrow: "Summer Collection",
    lead: "Breezy eyelet knits for",
    accent: "sunny",
    tail: "afternoons.",
    blurb: "Breathable, open-knit pieces that keep tiny skin cool and comfortable.",
    cta: "Shop summer",
    href: "/store",
    ages: "Newborn – 24 months",
    color: "#B5532F",
  },
]