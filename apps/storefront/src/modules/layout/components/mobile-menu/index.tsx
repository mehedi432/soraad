"use client"

import { useEffect, useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Replace these hrefs with your real collection links
const items: [string, string][] = [
  ["New Arrivals", "/store"],
  ["Newborn", "/store"],
  ["Baby", "/store"],
  ["Kids", "/store"],
  ["Gifts", "/store"],
  ["Our Story", "/about"],
  ["Account", "/account"],
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex flex-col gap-[6px] py-2"
      >
        <span className="block h-px w-6 bg-ink" />
        <span className="block h-px w-4 bg-ink" />
      </button>

      <div
        className={`fixed inset-0 z-[60] bg-white transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-14 items-center justify-between px-5">
          <button
            onClick={() => setOpen(false)}
            className="text-[11px] uppercase tracking-[0.3em] text-ink"
          >
            Close
          </button>
          <span className="pr-[0.4em] font-display text-lg tracking-[0.4em] text-ink">
            SORAAD
          </span>
          <span className="w-10" />
        </div>

        <ul className="mt-12 space-y-6 px-5">
          {items.map(([label, href]) => (
            <li key={label}>
              <LocalizedClientLink
                href={href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl font-light text-ink"
              >
                {label}
              </LocalizedClientLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}