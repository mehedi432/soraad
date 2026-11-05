import { Metadata } from "next"
import { getRegion } from "@lib/data/regions"
import { listProducts } from "@lib/data/products"
import Hero from "@modules/home/components/hero"
import LatestProducts from "@modules/home/components/latest-products"
import CategoryCarousel from "@modules/home/components/category-carousel"
import NewArrivals from "@modules/home/components/new-arrivals"

export const metadata: Metadata = {
  title: "Soraad | Premium Newborn & Kids Knitwear",
  description: "Soft, considered knitwear for newborns and little ones.",
}

export default async function Home(props: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await props.params
  const region = await getRegion(countryCode)
  if (!region) return null

  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: { limit: 8, order: "-created_at" },
  })

  return (
    <>
        <Hero />      
        <CategoryCarousel
          heading="The Newborn Edit"
          exploreHref="/categories/newborn"
          items={[
            { title: "First Layers", note: "Bodysuits", href: "/categories/bodysuits", image: "/categories/bodysuits.svg" },
            { title: "Cable & Cloud", note: "Cardigans", href: "/categories/cardigans", image: "/categories/cardigans.svg" },
            { title: "Swaddle Stories", note: "Blankets", href: "/categories/blankets", image: "/categories/blankets.svg" },
            { title: "The Gifting Edit", note: "Gift sets", href: "/categories/gift-sets", image: "/categories/gift-sets.svg" },
            { title: "Little Crowns", note: "Hats & booties", href: "/categories/hats-booties", image: "/categories/hats-booties.svg" },
          ]}
        />
        <NewArrivals products={products} />
    </>
  )
}