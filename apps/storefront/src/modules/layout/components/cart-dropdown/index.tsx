"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@lib/util/money"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import DeleteButton from "@modules/common/components/delete-button"
import { BagIcon } from "@modules/layout/components/icons"

export default function CartDropdown({ cart }: { cart?: HttpTypes.StoreCart | null }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const items = cart?.items ?? []
  const count = items.reduce((sum, i) => sum + i.quantity, 0)
  const onCartPage = pathname?.includes("/cart")

  useEffect(() => setOpen(false), [pathname])

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => !onCartPage && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <LocalizedClientLink
        href="/cart"
        aria-label="Bag"
        data-testid="nav-cart-link"
        className="relative flex h-9 w-9 items-center justify-center text-ink/80 transition-colors duration-300 hover:text-ink"
      >
        <BagIcon />
        {count > 0 && (
          <span className="absolute right-0 top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-ink px-1 text-[9px] text-white">
            {count}
          </span>
        )}
      </LocalizedClientLink>

      {open && !onCartPage && (
        <div className="absolute right-0 top-full z-50 w-[360px] pt-3">
          <div className="border border-ink/10 bg-white p-6 shadow-[0_20px_60px_-20px_rgba(43,38,35,0.25)]">
            <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-clay">Your bag</p>

            {items.length === 0 ? (
              <div className="py-8 text-center">
                <p className="font-display text-2xl font-light text-ink">Your bag is empty</p>
                <LocalizedClientLink
                  href="/store"
                  className="mt-6 inline-block border-b border-ink pb-1 text-[10px] uppercase tracking-[0.3em] text-ink"
                >
                  Continue shopping
                </LocalizedClientLink>
              </div>
            ) : (
              <>
                <ul className="max-h-[320px] space-y-5 overflow-y-auto pr-1">
                  {items
                    .slice()
                    .sort((a, b) => ((a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1))
                    .map((item) => (
                      <li key={item.id} className="flex gap-4">
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="relative block aspect-[3/4] w-20 shrink-0 overflow-hidden bg-oat"
                        >
                          {item.thumbnail && (
                            <Image src={item.thumbnail} alt={item.title} fill sizes="80px" className="object-cover" />
                          )}
                        </LocalizedClientLink>

                        <div className="flex flex-1 flex-col justify-between py-0.5">
                          <div>
                            <p className="font-display text-[16px] leading-snug text-ink">{item.product_title}</p>
                            {item.variant?.title && item.variant.title !== "Default variant" && (
                              <p className="mt-1 text-[11px] text-ink/60">{item.variant.title}</p>
                            )}
                            <p className="mt-1 text-[11px] text-ink/60">Qty {item.quantity}</p>
                          </div>
                          <div className="flex items-end justify-between">
                            <span className="text-[12px] text-ink">
                              {convertToLocale({
                                amount: item.total ?? item.unit_price * item.quantity,
                                currency_code: cart!.currency_code,
                              })}
                            </span>
                            <DeleteButton
                              id={item.id}
                              className="text-[10px] uppercase tracking-[0.2em] text-ink/50 hover:text-ink"
                            >
                              Remove
                            </DeleteButton>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>

                <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-5">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-ink/60">Subtotal</span>
                  <span className="text-[14px] text-ink">
                    {convertToLocale({ amount: cart!.item_subtotal ?? 0, currency_code: cart!.currency_code })}
                  </span>
                </div>

                <LocalizedClientLink
                  href="/cart"
                  className="mt-5 block bg-ink py-4 text-center text-[10px] uppercase tracking-[0.35em] !text-white transition-colors duration-300 hover:bg-clay"
                >
                  View bag
                </LocalizedClientLink>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}