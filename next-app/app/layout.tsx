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
  title: 'Lillemans Plåt — Premium Plåtslageri Göteborg',
  description:
    'Premium plåtarbeten för tak och fasad i Göteborg och Västra Götaland. Bandtäckning, plåtfasader, detaljarbeten och reparationer sedan 2005.',
  keywords: 'plåtslagare Göteborg, bandtäckning, plåttak, fasadplåt, takarbeten',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={`${spaceGrotesk.variable} grain-overlay dark`}>
      <body className="bg-[var(--bg)] text-[var(--text)] antialiased overflow-x-hidden">
        <LenisProvider>
          <Nav />
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  )
}
