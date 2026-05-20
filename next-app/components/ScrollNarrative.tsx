'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Lightbox from './Lightbox'

const panels = [
  {
    index: '01',
    label: 'Bandtäckning',
    title: 'Så går det\ntill — steg\nför steg',
    body: 'Varje band läggs med precision. Från underarbete till kvalitetskontroll — ett tidlöst hantverk utfört på högsta nivå.',
    image: '/images/bandrackning.jpeg',
    points: ['10 tydliga steg', 'Från underarbete till finish', 'Tidlöst och hållbart resultat', 'Certifierade plåtarbetare', 'Garanti på utfört arbete'],
  },
  {
    index: '02',
    label: 'Fönsterbleck & Detaljer',
    title: 'Precision i\nvarje\ndetalj',
    body: 'Fönsterbleck, vindskivor och genomföringar kräver exakt hantverk. Vi anpassar varje detalj till fasadens form — tätt, snyggt och beständigt mot alla väder.',
    image: '/images/fonsterblack.png',
    points: ['Anpassas efter fasadens mått', '4 montageSteg', 'Täthet mot väder och vind', 'Rostfritt eller lackerat stål', 'Snabb och ren montering'],
  },
  {
    index: '03',
    label: 'Rännor & Rörgenomföringar',
    title: 'Tätt i\nvarje\nfog',
    body: 'Rännor, stuprör och rörgenomföringar ska sitta perfekt — annars tar vattnet vägen in. Vi monterar och byter med precision så att allt är tätt i generationer.',
    image: '/images/rann_ror_byte.png',
    points: ['Byte av rännor & stuprör', 'Tätning av genomföringar', 'Förhindrar fuktskador', 'Anpassad lutning och fall', 'Lång livslängd'],
  },
  {
    index: '04',
    label: 'Arbete på tak',
    title: 'Hantverk\npå plats',
    body: 'Ute på taket är det vi som levererar. Med rätt verktyg, rätt teknik och lång erfarenhet utför vi varje moment med omsorg — oavsett väder och höjd.',
    image: '/images/arbete_in_progress.jpeg',
    points: ['Erfarna plåtslagare', 'Rätt verktyg för varje jobb', 'Säker arbetsmetodik', 'Städar upp efter sig', 'Alltid i tid'],
  },
]

export default function ScrollNarrative() {
  const sectionRef = useRef<HTMLElement>(null)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)


  return (
    <>
    <section ref={sectionRef} className="bg-[var(--surface)] py-28 md:py-36">
      <div className="max-w-screen-xl mx-auto px-6 md:px-14">
        {/* Section intro */}
        <div className="mb-20 md:mb-28 max-w-xl">
          <p className="eyebrow mb-4">Kvalitet & Precision</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-stone-100 leading-tight">
            Detaljer som håller.<br />Resultat som syns.
          </h2>
        </div>

        {/* Panels */}
        <div className="space-y-6 md:space-y-4">
          {panels.map((panel, i) => (
            <div
              key={panel.index}
              className={`narrative-panel grid md:grid-cols-[70fr_30fr] gap-4 overflow-hidden ${
                i % 2 === 1 ? 'md:[direction:rtl]' : ''
              }`}
            >
              {/* Image side */}
              <div
                className="panel-img relative overflow-hidden cursor-zoom-in"
                onClick={() => setLightbox({ src: panel.image, alt: panel.label })}
              >
                <div className="panel-img-inner">
                  <Image
                    src={panel.image}
                    alt={panel.label}
                    width={0}
                    height={0}
                    sizes="(max-width: 768px) 100vw, 65vw"
                    className="w-full h-auto block transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
              </div>

              {/* Text side */}
              <div
                className={`panel-text bg-[var(--surface-2)] px-5 py-6 md:px-8 md:py-10 flex flex-col justify-start gap-4 ${
                  i % 2 === 1 ? '[direction:ltr]' : ''
                }`}
              >
                <span className="panel-line block w-6 h-px bg-[var(--gold)]" />
                <p className="panel-label text-xs tracking-[0.2em] uppercase text-[var(--gold)] font-medium">{panel.label}</p>
                <h3 className="panel-title text-2xl md:text-3xl lg:text-4xl font-bold text-stone-100 leading-snug whitespace-pre-line">
                  {panel.title}
                </h3>
                <p className="panel-body text-stone-400 text-sm md:text-base leading-relaxed">
                  {panel.body}
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {panel.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-stone-500">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--gold)] shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {lightbox && (
      <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
    )}
    </>
  )
}
