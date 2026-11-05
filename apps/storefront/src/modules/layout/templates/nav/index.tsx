import { Suspense } from "react"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import NavShell from "@modules/layout/components/nav-shell"
import MobileMenu from "@modules/layout/components/mobile-menu"
import TopBar from "@modules/layout/components/top-bar"
import { SearchIcon, UserIcon, BagIcon } from "@modules/layout/components/icons"

const navLink =
  "relative block text-[14px] leading-none text-ink transition-opacity duration-300 hover:opacity-60 " +
  "after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-ink after:transition-all after:duration-300 hover:after:w-full"

const iconBtn =
  "flex h-10 w-10 items-center justify-center text-ink transition-opacity duration-300 hover:opacity-60"

// Replace these hrefs with your real collection links
const links: [string, string][] = [
  ["New Arrivals", "/store"],
  ["Newborn", "/store"],
  ["Baby", "/store"],
  ["Kids", "/store"],
  ["Gifts", "/store"],
  ["Inside Story", "/about"],
]

export default async function Nav() {
  const regions = await listRegions().then((r: StoreRegion[]) => r)

  return (
    <>
      <TopBar regions={regions} />

      <header className="sticky top-0 inset-x-0 z-50">
        <NavShell>
          <div className="md:hidden">
            <MobileMenu />
          </div>

          <LocalizedClientLink
            href="/"
            className="absolute left-1/2 block -translate-x-1/2 pl-[0.4em] font-display text-[22px] font-medium leading-none tracking-[0.4em] text-ink md:static md:translate-x-0 md:text-[24px]"
          >
            SORAAD
          </LocalizedClientLink>

          <div className="hidden flex-1 items-center justify-center gap-10 md:flex">
            {links.map(([label, href]) => (
              <LocalizedClientLink key={label} href={href} className={navLink}>
                {label}
              </LocalizedClientLink>
            ))}
          </div>

          <div className="flex items-center">
            <LocalizedClientLink href="/search" className={iconBtn} aria-label="Search">
              <SearchIcon />
            </LocalizedClientLink>
            <LocalizedClientLink href="/account" className={iconBtn} aria-label="Account">
              <UserIcon />
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink href="/cart" className={iconBtn} aria-label="Bag">
                  <BagIcon />
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </NavShell>
      </header>
    </>
  )
}