import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import Nav from '@/components/Nav'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Lillemans Plåt — Plåtslagare Göteborg | Tak & Fasad',
  description:
    'Lillemans Plåt är din plåtslagare i Göteborg. Vi utför bandtäckning, plåttak, fasadplåt, fönsterbleck, rännor, stuprör och plåtreparationer. Certifierade plåtslagarmästare med 20 års erfarenhet i Västra Götaland.',
  keywords: [
    'plåtslagare Göteborg',
    'plåtslagare',
    'bandtäckning',
    'plåttak',
    'takplåt',
    'fasadplåt',
    'fönsterbleck',
    'rännor stuprör',
    'plåtarbete',
    'takarbete Göteborg',
    'plåtreparation',
    'ny plåt tak',
    'plåtslagare Västra Götaland',
    'bandtäckning Göteborg',
    'plåt tak fasad',
    'takentreprenad',
    'plåtslageri',
    'Lillemans Plåt',
    'tak och fasad Göteborg',
    'certifierad plåtslagare',
  ].join(', '),
  openGraph: {
    title: 'Lillemans Plåt — Plåtslagare Göteborg',
    description: 'Bandtäckning, plåttak, fasadplåt och fönsterbleck i Göteborg. Certifierade plåtslagarmästare med 20 års erfarenhet.',
    url: 'https://www.lillemansplat.se',
    siteName: 'Lillemans Plåt',
    locale: 'sv_SE',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.lillemansplat.se',
  },
}

export const viewport = {
  width: 1200,
  initialScale: 1,
  minimumScale: 0.25,
  maximumScale: 1,
  userScalable: false,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Lillemans Plåt',
  description: 'Plåtslagare i Göteborg. Bandtäckning, plåttak, fasadplåt, fönsterbleck och reparationer.',
  url: 'https://www.lillemansplat.se',
  telephone: '+46737284899',
  email: 'kontakt@lillemansplat.se',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Göteborg',
    addressRegion: 'Västra Götaland',
    addressCountry: 'SE',
  },
  areaServed: 'Västra Götaland',
  priceRange: '$$',
  openingHours: 'Mo-Fr 07:00-17:00',
  sameAs: ['https://www.lillemansplat.se'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={`${spaceGrotesk.variable} grain-overlay dark`}>
      <body className="bg-[var(--bg)] text-[var(--text)] antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LenisProvider>
          <Nav />
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  )
}
