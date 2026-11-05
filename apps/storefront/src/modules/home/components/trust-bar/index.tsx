const items = [
  ["Free shipping", "On orders over $50"],
  ["30-day returns", "Hassle-free refunds"],
  ["Secure checkout", "256-bit encryption"],
  ["24/7 support", "We're here to help"],
]

export default function TrustBar() {
  return (
    <section className="border-b border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 lg:grid-cols-4 lg:px-8">
        {items.map(([t, s]) => (
          <div key={t}>
            <p className="text-sm font-semibold">{t}</p>
            <p className="text-sm text-neutral-500">{s}</p>
          </div>
        ))}
      </div>
    </section>
  )
}