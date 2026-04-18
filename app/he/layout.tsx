import type { Metadata } from 'next'
import { Noto_Serif_Hebrew, Heebo } from 'next/font/google'
import '../globals.css'

const notoSerifHebrew = Noto_Serif_Hebrew({
  subsets: ['hebrew', 'latin'],
  weight: ['200', '300', '400'],
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
  title: 'איריס מילשטיין | נדל"ן יוקרה — הרצליה פיתוח וכפר שמריהו',
  description: 'נכסי יוקרה אקסקלוסיביים מחוץ לשוק בהרצליה פיתוח וכפר שמריהו. מומחית נדל"ן ועורכת דין. פגישות אישיות בתיאום מראש.',
  openGraph: {
    title: 'איריס מילשטיין | נדל"ן יוקרה',
    description: 'נכסי יוקרה אקסקלוסיביים בהרצליה פיתוח וכפר שמריהו',
    url: 'https://irismilstein.com/he',
    locale: 'he_IL',
    type: 'website',
  },
}

export default function HebrewLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${notoSerifHebrew.variable} ${heebo.variable}`}>
      <body className="bg-ivory text-charcoal font-hebrew-sans antialiased" style={{ direction: 'rtl' }}>
        {children}
      </body>
    </html>
  )
}
