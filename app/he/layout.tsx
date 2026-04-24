import type { Metadata } from 'next'
import { Frank_Ruhl_Libre, Heebo } from 'next/font/google'

const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500'],
  variable: '--font-frank',
  display: 'swap',
})

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500'],
  variable: '--font-heebo',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://irismilstein.com'),
  title: 'איריס מילשטיין | נדל"ן יוקרה — הרצליה פיתוח וכפר שמריהו',
  description: 'משרד תיווך בוטיקי לנכסי יוקרה בהרצליה פיתוח, נוף ים וכפר שמריהו. וילות, פנטהאוזים ונכסים אקסקלוסיביים מחוץ לשוק. מכירה והשכרה. למעלה מ-25 שנות ניסיון.',
  keywords: 'נדל"ן הרצליה פיתוח, בתים למכירה הרצליה פיתוח, וילות הרצליה פיתוח, נדל"ן כפר שמריהו, תיווך יוקרה הרצליה, נכסים נוף ים',
  alternates: {
    canonical: 'https://irismilstein.com/he',
    languages: {
      'en': 'https://irismilstein.com/',
      'he': 'https://irismilstein.com/he',
    },
  },
  openGraph: {
    title: 'איריס מילשטיין | נדל"ן יוקרה — הרצליה פיתוח וכפר שמריהו',
    description: 'נכסי יוקרה אקסקלוסיביים בהרצליה פיתוח וכפר שמריהו. למעלה מ-25 שנות ניסיון.',
    url: 'https://irismilstein.com/he',
    siteName: 'Iris Milstein Real Estate',
    locale: 'he_IL',
    alternateLocale: ['en_US'],
    type: 'website',
    images: [
      {
        url: 'https://irismilstein.com/images/property-livingroom.png',
        width: 1200,
        height: 630,
        alt: 'נדל"ן יוקרה הרצליה פיתוח — איריס מילשטיין',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'איריס מילשטיין | נדל"ן יוקרה',
    description: 'נכסי יוקרה אקסקלוסיביים בהרצליה פיתוח וכפר שמריהו.',
    images: ['https://irismilstein.com/images/property-livingroom.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function HebrewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl" lang="he" className={`${frankRuhlLibre.variable} ${heebo.variable} bg-ivory text-charcoal font-hebrew-sans antialiased`} style={{ direction: 'rtl', minHeight: '100vh' }}>
      {children}
    </div>
  )
}
