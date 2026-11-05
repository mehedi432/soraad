import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import NewArrivals from "@modules/home/components/new-arrivals"

const MAX_PRODUCTS = 8 // 4 per row on desktop, so 8 = two rows

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!products?.length) return null

  // "New arrivals" -> lead "New" + italic accent "arrivals" (last word is italic)
  const words = collection.title.trim().split(/\s+/)
  const accent = words.pop() ?? ""
  const lead = words.join(" ")

  return (
    <NewArrivals
      products={products.slice(0, MAX_PRODUCTS)}
      eyebrow={(collection.metadata?.eyebrow as string) ?? "Collection"}
      lead={lead}
      accent={accent}
      viewAllHref={`/collections/${collection.handle}`}
    />
  )
}