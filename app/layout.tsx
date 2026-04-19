import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Iris Milstein | Real Estate — Herzliya Pituach & Kfar Shmaryahu',
  description:
    'Off-market luxury estates in Israel\'s most coveted coastal enclaves. Private viewings by appointment. Herzliya Pituach & Kfar Shmaryahu.',
  openGraph: {
    title: 'Iris Milstein Real Estate',
    description: 'Off-market luxury estates in Herzliya Pituach & Kfar Shmaryahu',
    url: 'https://square34.com',
    siteName: 'Iris Milstein Real Estate',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-ivory text-charcoal font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
