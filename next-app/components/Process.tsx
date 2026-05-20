'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const steps = [
  {
    num: '01',
    title: 'Rådgivning & Planering',
    desc: 'Vi lyssnar på dina behov och idéer. Tillsammans planerar vi lösningen som passar ditt projekt och din budget.',
  },
  {
    num: '02',
    title: 'Offert & Materialval',
    desc: 'Du får en tydlig och detaljerad offert utan dolda kostnader. Vi väljer material av högsta kvalitet för ditt tak.',
  },
  {
    num: '03',
    title: 'Tillverkning',
    desc: 'Plåten tillverkas med precision i vår verkstad. Varje detalj anpassas exakt för ett perfekt slutresultat.',
  },
  {
    num: '04',
    title: 'Förberedelse',
    desc: 'Underlaget kontrolleras noggrant och alla förutsättningar skapas för att monteringen ska gå smidigt.',
  },
  {
    num: '05',
    title: 'Montering',
    desc: 'Vi monterar med precision och hantverksskicklighet. Varje detalj sätts på plats exakt som planerat.',
  },
  {
    num: '06',
    title: 'Kvalitetskontroll',
    desc: 'Vi går igenom varje del av arbetet för att säkerställa att allt håller vår höga standard.',
  },
  {
    num: '07',
    title: 'Slutbesiktning',
    desc: 'Tillsammans med dig granskar vi resultatet och säkerställer att du är 100% nöjd med slutresultatet.',
  },
  {
    num: '08',
    title: 'Överlämning',
    desc: 'Ett tak byggt för att hålla i generationer. Vi lämnar över med stolthet och fullständig dokumentation.',
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: {
          trigger: section.querySelector('.timeline'),
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 0.5,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="process" data-section="Process" className="bg-[var(--surface)] py-28 md:py-36 border-t border-[var(--border)]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-14">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">
          {/* Left: sticky header + image */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
            <div className="process-header">
              <p className="eyebrow mb-5">Vår Process</p>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-100 leading-tight mb-6">
                Från idé<br />till färdigt<br />tak
              </h2>
              <p className="text-stone-500 text-base leading-relaxed mb-8">
                En transparent och strukturerad process som säkerställer kvalitet i varje steg — från
                första mötet till slutlig överlämning.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 text-[var(--gold)] text-xs tracking-[0.2em] uppercase border-b border-[var(--gold)]/40 pb-1 hover:border-[var(--gold)] transition-colors duration-300"
              >
                Börja ditt projekt →
              </a>
            </div>

          </div>

          {/* Right: timeline */}
          <div className="lg:col-span-7 timeline relative">
            {/* Vertical line */}
            <div className="absolute left-[18px] top-2 bottom-2 w-px bg-[var(--border)] overflow-hidden">
              <div ref={lineRef} className="absolute inset-0 bg-[var(--gold)]" />
            </div>

            <div className="space-y-0">
              {steps.map((step) => (
                <div key={step.num} className="step-item relative pl-14 pb-12">
                  {/* Node */}
                  <div className="absolute left-0 top-0.5 w-9 h-9 border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center rounded-sm">
                    <div className="w-1.5 h-1.5 bg-[var(--gold)]" />
                  </div>

                  <span className="block text-[var(--gold)] text-[0.6rem] font-mono tracking-widest mb-2">
                    {step.num}
                  </span>
                  <h3 className="text-lg font-bold text-stone-200 mb-2">{step.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed max-w-lg">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
