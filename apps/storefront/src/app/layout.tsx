import { Cormorant_Garamond, Jost } from "next/font/google"
import "styles/globals.css"

const display = Cormorant_Garamond({
  subsets: ["latin"], weight: ["300", "400", "500"], style: ["normal", "italic"],
  variable: "--font-display",
})
const body = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-body" })

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={`${display.variable} ${body.variable}`}>
      <body className="bg-cream font-body text-ink antialiased">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}