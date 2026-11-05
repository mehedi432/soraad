import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { KNIT_STRIP } from "./patterns"
import KnitProductCard from "./product-card"

type Props = {
  products: HttpTypes.StoreProduct[]
  eyebrow?: string
  lead?: string
  accent?: string
  viewAllHref?: string
  /** Optional: render your existing add-to-bag button for each product. */
  renderQuickAdd?: (product: HttpTypes.StoreProduct) => React.ReactNode
  /** Show the Fair Isle strip under the heading (off by default so products stay the focus). */
  showPattern?: boolean
}

/**
 * "New arrivals" grid: Fair Isle divider + garment-label product cards.
 * <NewArrivals products={products} />
 */
const NewArrivals = ({
  products,
  eyebrow = "Just in",
  lead = "New",
  accent = "arrivals",
  viewAllHref = "/store",
  renderQuickAdd,
  showPattern = false,
}: Props) => {
  if (!products?.length) return null

  return (
    <section className="mx-auto max-w-[1600px] px-4 py-8 md:px-8 md:py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-clay">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-display text-3xl font-light leading-none text-ink md:text-5xl">
            {lead && <>{lead} </>}
            <em className="font-light italic">{accent}</em>
          </h2>
        </div>
        <LocalizedClientLink
          href={viewAllHref}
          className="shrink-0 border-b border-ink pb-1 text-[11px] uppercase tracking-[0.3em] transition-opacity hover:opacity-60"
        >
          View all
        </LocalizedClientLink>
      </div>

      {showPattern ? (
        <div
          aria-hidden
          className="my-4 h-[22px] w-full opacity-90"
          style={{
            backgroundImage: KNIT_STRIP,
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 22px",
          }}
        />
      ) : (
        <div aria-hidden className="my-4 border-t border-dashed border-ink/25 md:my-5" />
      )}

      <ul className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
        {products.map((product, i) => (
          <KnitProductCard
            key={product.id}
            product={product}
            index={i}
            quickAdd={renderQuickAdd?.(product)}
          />
        ))}
      </ul>
    </section>
  )
}

export default NewArrivals