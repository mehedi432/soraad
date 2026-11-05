"use client"

import { ReactNode, useEffect, useRef, useState, useTransition } from "react"
import { useParams, usePathname } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { updateRegion } from "@lib/data/cart"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { MailIcon, PhoneIcon, TruckIcon, ChevronIcon } from "@modules/layout/components/icons"

// Replace with your real details
const SUPPORT_EMAIL = "support@soraad.com"

const item = "flex items-center gap-2 text-[13px] text-ink transition-opacity duration-300 hover:opacity-60"

function Menu({
  trigger,
  children,
  align = "left",
}: {
  trigger: ReactNode
  children: ReactNode
  align?: "left" | "right"
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} className={item}>
        {trigger}
        <span className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <ChevronIcon />
        </span>
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className={`absolute top-full z-50 mt-3 max-h-72 min-w-[200px] overflow-y-auto rounded-[6px] border border-ink/10 bg-white py-2 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.25)] ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  )
}

const flag = (code: string) => `https://flagcdn.com/w40/${code.toLowerCase()}.png`

export default function TopBar({ regions }: { regions: HttpTypes.StoreRegion[] }) {
  const { countryCode } = useParams() as { countryCode: string }
  const currentPath = usePathname().split("/").slice(2).join("/")
  const [pending, startTransition] = useTransition()

  const countries = regions
    .flatMap((r) => r.countries ?? [])
    .map((c) => ({ code: c.iso_2 as string, label: c.display_name as string }))
    .sort((a, b) => a.label.localeCompare(b.label))

  const current = countries.find((c) => c.code === countryCode)

  const onCountry = (code: string) => {
    startTransition(() => {
      updateRegion(code, currentPath)
    })
  }

  return (
    <div className="relative z-[60] hidden border-t-2 border-ink bg-white md:block">
      <div className="mx-auto flex h-11 max-w-[1600px] items-center justify-between px-10">
        {/* Left */}
        <div className="flex items-center gap-8">
          <Menu trigger={<span>English</span>}>
            <button type="button" className="block w-full px-4 py-2 text-left text-[13px] text-ink hover:bg-ink/5">
              English
            </button>
            {/* Add Bangla here after i18n is set up */}
          </Menu>

          <a href={`mailto:${SUPPORT_EMAIL}`} className={item}>
            <MailIcon />
            {SUPPORT_EMAIL}
          </a>

          <LocalizedClientLink href="/contact" className={item}>
            <PhoneIcon />
            Contact
          </LocalizedClientLink>
        </div>

        {/* Right */}
        <div className="flex items-center gap-8">
          <div className={`flex items-center gap-2 ${pending ? "opacity-50" : ""}`}>
            <span className="text-ink/60">
              <TruckIcon />
            </span>
            <span className="text-[13px] text-ink/60">Deliver to:</span>
            <Menu
              align="right"
              trigger={
                <span className="flex items-center gap-2">
                  {current && (
                    <img src={flag(current.code)} alt="" width={20} height={14} className="h-[14px] w-5 object-cover" />
                  )}
                  <span>{current?.label ?? "Select"}</span>
                </span>
              }
            >
              {countries.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => onCountry(c.code)}
                  className={`flex w-full items-center gap-3 px-4 py-2 text-left text-[13px] text-ink hover:bg-ink/5 ${
                    c.code === countryCode ? "font-medium" : ""
                  }`}
                >
                  <img src={flag(c.code)} alt="" width={20} height={14} className="h-[14px] w-5 object-cover" />
                  {c.label}
                </button>
              ))}
            </Menu>
          </div>

          <LocalizedClientLink href="/about" className={item}>
            Our Story
          </LocalizedClientLink>
          <LocalizedClientLink href="/shipping" className={item}>
            Shipping
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}