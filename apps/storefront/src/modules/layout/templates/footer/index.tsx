import LocalizedClientLink from "@modules/common/components/localized-client-link"

const cols = [
  { title: "Shop", links: [["All Products", "/store"], ["Newborn", "/store"], ["Collections", "/collections"]] },
  { title: "Care", links: [["Shipping", "/shipping"], ["Returns", "/returns"], ["Knit Care Guide", "/care"]] },
  { title: "Soraad", links: [["Our Story", "/about"], ["Contact", "/contact"], ["Account", "/account"]] },
]

const fl = "text-[13px] text-ink/70 transition-colors duration-300 hover:text-ink"

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-cream">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-6 py-20 md:grid-cols-12 md:px-12">
        <div className="md:col-span-5">
          <p className="font-display text-3xl font-light">
            Join the <em>Soraad</em> circle
          </p>
          <p className="mt-3 max-w-sm text-[13px] text-ink/70">
            New arrivals and quiet offers, delivered gently.
          </p>
          <form className="mt-8 flex max-w-sm border-b border-ink">
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-transparent py-3 text-[13px] outline-none placeholder:text-ink/40"
            />
            <button type="button" className="text-[10px] uppercase tracking-[0.3em]">
              Subscribe
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7 md:pl-16">
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="mb-6 text-[10px] uppercase tracking-[0.35em] text-clay">{c.title}</h4>
              <ul className="space-y-4">
                {c.links.map(([label, href]) => (
                  <li key={label}>
                    <LocalizedClientLink href={href} className={fl}>{label}</LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden border-t border-ink/10">
        <p className="select-none py-6 text-center font-display text-[18vw] font-light leading-none tracking-[0.3em] text-ink/[0.06]">
          SORAAD
        </p>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 border-t border-ink/10 px-6 py-6 text-[10px] uppercase tracking-[0.25em] text-ink/50 md:flex-row md:px-12">
        <span>© {new Date().getFullYear()} Soraad. All rights reserved.</span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  )
}