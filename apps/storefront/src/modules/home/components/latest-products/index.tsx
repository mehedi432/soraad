import { HttpTypes } from "@medusajs/types"
import ProductCard from "@modules/products/components/product-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function LatestProducts({
  products = [],
}: {
  products?: HttpTypes.StoreProduct[]
  region?: HttpTypes.StoreRegion
}) {
  if (!products.length) return null

  return (
    <section className="mx-auto max-w-[1600px] px-5 py-14 md:px-10 md:py-20">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="font-display text-3xl font-light md:text-4xl">
          New <em>arrivals</em>
        </h2>
        <LocalizedClientLink
          href="/store"
          className="text-[11px] uppercase tracking-[0.3em] underline underline-offset-8"
        >
          View all
        </LocalizedClientLink>
      </div>

      <ul className="grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-3 md:gap-x-4 md:gap-y-10 lg:grid-cols-4">
        {products.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  )
}