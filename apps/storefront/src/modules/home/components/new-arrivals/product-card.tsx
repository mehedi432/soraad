import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  product: HttpTypes.StoreProduct
  /** 0-based position; drives the "No. 01" numbering */
  index: number
  /** Optional: your existing add-to-bag button (placed top-right of the photo). */
  quickAdd?: React.ReactNode
}

/**
 * Product-first card: a big, clean photo and a small stitched label underneath.
 * No patterns behind or on top of the product.
 */
const KnitProductCard = ({ product, index, quickAdd }: Props) => {
  const { cheapestPrice } = getProductPrice({ product })

  // Sale only when the old price is really higher than the current one.
  const isSale =
    !!cheapestPrice &&
    Number(cheapestPrice.original_price_number) >
      Number(cheapestPrice.calculated_price_number)
  const discount = isSale
    ? Math.round(
        (1 -
          Number(cheapestPrice!.calculated_price_number) /
            Number(cheapestPrice!.original_price_number)) *
          100
      )
    : 0

  const colorOption = product.options?.find((o) =>
    /colou?r/i.test(o.title ?? "")
  )
  const colors = colorOption?.values?.length ?? 0

  const image = product.thumbnail ?? product.images?.[0]?.url

  return (
    <li className="group relative">
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        {/* photo: fills the panel, nothing competes with it */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-oat">
          {image && (
            <img
              src={image}
              alt={product.title ?? ""}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-contain p-2 mix-blend-multiply [filter:brightness(1.06)] transition-transform duration-700 group-hover:scale-[1.05] motion-reduce:transition-none"
            />
          )}

          {isSale && (
            <span className="absolute left-2 top-2 bg-oat px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-clay">
              −{discount}%
            </span>
          )}
        </div>

        {/* small stitched label, below the photo (never covers the product) */}
        <div className="relative mt-3 border border-dashed border-ink/30 px-3 py-2.5">
          <div className="flex items-baseline justify-between gap-3 text-[10px] uppercase tracking-[0.3em] text-clay">
            <span>No. {String(index + 1).padStart(2, "0")}</span>
            {colors > 1 && <span className="text-ink/50">{colors} colours</span>}
          </div>

          <h3 className="mt-1 font-display text-lg font-light leading-tight text-ink md:text-xl">
            {product.title}
          </h3>

          {cheapestPrice && (
            <p className="mt-1.5 flex items-baseline gap-2 text-sm">
              <span className={isSale ? "text-clay" : "text-ink"}>
                {cheapestPrice.calculated_price}
              </span>
              {isSale && (
                <span className="text-xs text-ink/45 line-through">
                  {cheapestPrice.original_price}
                </span>
              )}
            </p>
          )}
        </div>
      </LocalizedClientLink>

      {quickAdd && <div className="absolute right-2 top-2 z-20">{quickAdd}</div>}
    </li>
  )
}

export default KnitProductCard