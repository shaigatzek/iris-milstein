import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import Script from 'next/script'
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
  metadataBase: new URL('https://irismilstein.com'),
  title: 'Iris Milstein | Luxury Real Estate — Herzliya Pituach & Kfar Shmaryahu',
  description: 'Boutique luxury real estate in Herzliya Pituach, Nof Yam & Kfar Shmaryahu. Over 25 years of expertise. Villas, penthouses & exclusive off-market properties. Sales & rentals.',
  keywords: 'Herzliya Pituach real estate, luxury homes Herzliya Pituach, Kfar Shmaryahu real estate, Nof Yam luxury properties, Israel luxury real estate agent, villas for sale Herzliya',
  authors: [{ name: 'Iris Milstein' }],
  creator: 'Iris Milstein',
  alternates: {
    canonical: 'https://irismilstein.com/',
    languages: {
      'en': 'https://irismilstein.com/',
      'he': 'https://irismilstein.com/he',
    },
  },
  openGraph: {
    title: 'Iris Milstein | Luxury Real Estate — Herzliya Pituach & Kfar Shmaryahu',
    description: 'Boutique luxury real estate in Herzliya Pituach & Kfar Shmaryahu. Over 25 years of expertise. Off-market villas & exclusive properties.',
    url: 'https://irismilstein.com/',
    siteName: 'Iris Milstein Real Estate',
    locale: 'en_US',
    alternateLocale: ['he_IL'],
    type: 'website',
    images: [
      {
        url: 'https://irismilstein.com/images/property-livingroom.png',
        width: 1200,
        height: 630,
        alt: 'Luxury real estate Herzliya Pituach — Iris Milstein',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Iris Milstein | Luxury Real Estate',
    description: 'Boutique luxury real estate in Herzliya Pituach & Kfar Shmaryahu.',
    images: ['https://irismilstein.com/images/property-livingroom.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Iris Milstein Real Estate',
  description: 'Boutique luxury real estate agency specializing in Herzliya Pituach, Nof Yam and Kfar Shmaryahu',
  url: 'https://irismilstein.com',
  telephone: '+972-52-2525277',
  email: 'iris@irismilstein.com',
  image: 'https://irismilstein.com/images/iris-profile.jpeg',
  logo: 'https://irismilstein.com/images/logo-cmyk-blush.png',
  founder: {
    '@type': 'Person',
    name: 'Iris Milstein',
    jobTitle: 'Luxury Real Estate Agent',
    knowsLanguage: ['en', 'he'],
  },
  areaServed: [
    { '@type': 'Place', name: 'Herzliya Pituach', address: { '@type': 'PostalAddress', addressLocality: 'Herzliya', addressCountry: 'IL' } },
    { '@type': 'Place', name: 'Kfar Shmaryahu', address: { '@type': 'PostalAddress', addressLocality: 'Kfar Shmaryahu', addressCountry: 'IL' } },
    { '@type': 'Place', name: 'Nof Yam', address: { '@type': 'PostalAddress', addressLocality: 'Herzliya', addressCountry: 'IL' } },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Zohar Tal 34',
    addressLocality: 'Herzliya Pituach',
    addressCountry: 'IL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 32.1633,
    longitude: 34.7867,
  },
  sameAs: [
    'https://www.facebook.com/iris.milstein',
    'https://www.instagram.com/iris_milstein/',
  ],
  priceRange: '$$$$$',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        {/* Google Analytics 4 — replace REPLACE_WITH_GA4_ID with your Measurement ID */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=REPLACE_WITH_GA4_ID"></script> */}
        {/* <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','REPLACE_WITH_GA4_ID');` }} /> */}
      </head>
      <body className="bg-ivory text-charcoal font-sans antialiased">
        {children}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </body>
    </html>
  )
}
