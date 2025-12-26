
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // optional, keeps text visible
  adjustFontFallback: false, // helps avoid network fetch errors
});

export const metadata: Metadata = {
  title: 'Nexcyn - On-Demand Home Services',
  description: 'Book trusted local professionals for repair and maintenance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nexcyn" />
      </head>
      <body>
        {children}
      
      </body>

    </html>
  )
}
