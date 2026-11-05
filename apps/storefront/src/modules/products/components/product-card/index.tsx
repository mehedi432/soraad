"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getProductPrice } from "@lib/util/get-product-price"
import { addToCart } from "@lib/data/cart"

const BagPlus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 7h12l1 13H5L6 7Z" />
    <path d="M9 7a3 3 0 0 1 6 0" />
    <path d="M12 11v5M9.5 13.5h5" />
  </svg>
)

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

export default function ProductCard({ product }: { product: HttpTypes.StoreProduct }) {
  const { countryCode } = useParams() as { countryCode: string }
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<"idle" | "adding" | "added">("idle")

  const { cheapestPrice } = getProductPrice({ product })
  const onSale = cheapestPrice?.price_type === "sale"

  const primary = product.thumbnail || product.images?.[0]?.url
  const secondary = product.images?.find((img) => img.url !== primary)?.url

  const variants = product.variants ?? []
  const colorCount =
    product.options?.find((o) => o.title?.toLowerCase().startsWith("colo"))?.values?.length ?? 0

  const inStock = (v: HttpTypes.StoreProductVariant) =>
    !v.manage_inventory || v.allow_backorder || (v.inventory_quantity ?? 0) > 0

  const soldOut = variants.length > 0 && variants.every((v) => !inStock(v))

  const add = async (variantId: string) => {
    setStatus("adding")
    try {
      await addToCart({ variantId, quantity: 1, countryCode })
      router.refresh()
      setStatus("added")
      setOpen(false)
      setTimeout(() => setStatus("idle"), 1800)
    } catch {
      setStatus("idle")
    }
  }

  const onBagClick = () => {
    if (soldOut) return
    if (variants.length === 1) {
      if (inStock(variants[0])) add(variants[0].id)
    } else {
      setOpen((o) => !o)
    }
  }

  return (
    <div className="group relative">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[6px] bg-[#F1F0EE]">
        <LocalizedClientLink href={`/products/${product.handle}`} className="absolute inset-0 block">
          {primary ? (
            <Image
              src={primary}
              alt={product.title}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className={`object-cover transition-all duration-700 ease-out group-hover:scale-[1.04] ${
                secondary ? "group-hover:opacity-0" : ""
              }`}
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center font-display text-3xl tracking-[0.4em] text-ink/10">
              SORAAD
            </span>
          )}
          {secondary && (
            <Image
              src={secondary}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-100"
            />
          )}
        </LocalizedClientLink>

        {onSale && !soldOut && (
          <span className="pointer-events-none absolute left-3 top-3 rounded-[3px] bg-white px-2.5 py-1 text-[9px] uppercase tracking-[0.25em] text-ink">
            Sale
          </span>
        )}

        {soldOut && (
          <span className="pointer-events-none absolute left-3 top-3 rounded-[3px] bg-ink px-2.5 py-1 text-[9px] uppercase tracking-[0.25em] text-white">
            Sold out
          </span>
        )}

        {/* Quick add button */}
        <button
          type="button"
          onClick={onBagClick}
          aria-label="Add to bag"
          disabled={status === "adding" || soldOut}
          className="absolute bottom-3 left-3 z-10 flex h-11 w-11 items-center justify-center rounded-[6px] bg-white text-ink shadow-sm transition-all duration-300 hover:bg-ink hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-ink"
        >
          {status === "added" ? <Check /> : <BagPlus />}
        </button>

        {/* Size picker */}
        <div
          className={`absolute inset-x-0 bottom-0 z-20 bg-white/95 p-4 backdrop-blur-md transition-transform duration-500 ease-out ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.3em] text-ink/60">Select size</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-lg leading-none text-ink/60 hover:text-ink"
            >
              ×
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => {
              const available = inStock(v)
              return (
                <button
                  key={v.id}
                  type="button"
                  disabled={!available || status === "adding"}
                  onClick={() => add(v.id)}
                  className={`relative min-w-[44px] overflow-hidden rounded-[4px] border px-3 py-2 text-[12px] transition-colors ${
                    available
                      ? "border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white"
                      : "cursor-not-allowed border-ink/10 text-ink/30"
                  }`}
                >
                  {v.title}
                  {!available && (
                    <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-ink/40" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <LocalizedClientLink href={`/products/${product.handle}`} className="mt-4 block">
        <h3 className="text-[15px] font-normal leading-snug text-ink">{product.title}</h3>
        {colorCount > 1 && <p className="mt-1.5 text-[13px] text-ink/50">{colorCount} colors</p>}
        {cheapestPrice && (
          <p className="mt-2 text-[14px] font-semibold text-ink">
            <span className={onSale ? "text-clay" : ""}>{cheapestPrice.calculated_price}</span>
            {onSale && (
              <span className="ml-2 font-normal text-ink/40 line-through">{cheapestPrice.original_price}</span>
            )}
          </p>
        )}
      </LocalizedClientLink>
    </div>
  )
}