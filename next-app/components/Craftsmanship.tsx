'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const qualities = [
  { label: 'Precision', value: '±0.1 mm tolerans i varje falsning' },
  { label: 'Material', value: 'Premiumplåt från certifierade leverantörer' },
  { label: 'Garanti', value: '10 års garanti på utförda arbeten' },
  { label: 'Certifierat', value: 'Auktoriserade plåtslagarmästare' },
]

const stats = [
  { num: 450, suffix: '+', label: 'Genomförda uppdrag' },
  { num: 20, suffix: ' år', label: 'I branschen' },
  { num: 98, suffix: '%', label: 'Nöjda kunder' },
  { num: 24, suffix: 'h', label: 'Svarstid' },
]

export default function Craftsmanship() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Left text reveal
      gsap.from(section.querySelectorAll('.craft-text-item'), {
        x: -40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.craft-split', start: 'top 75%' },
      })

      // Stats counter animation
      section.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
        const target = parseInt(el.dataset.counter ?? '0')
        const obj = { value: 0 }
        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate() {
            el.textContent = Math.round(obj.value).toString()
          },
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })

      gsap.from(section.querySelectorAll('.stat-card'), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.stats-row', start: 'top 80%' },
      })

      // Metal details image
      gsap.from(section.querySelector('.metal-img'), {
        opacity: 0,
        scale: 0.97,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.metal-img', start: 'top 80%' },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="craftsmanship" data-section="Om oss" className="bg-[var(--surface)] py-16 md:py-28 lg:py-36">
      <div className="max-w-screen-xl mx-auto px-6 md:px-14">
        {/* Centered intro text */}
        <div className="craft-split text-center max-w-3xl mx-auto mb-20">
          <p className="craft-text-item eyebrow mb-5">Hantverk & Precision</p>
          <h2 className="craft-text-item text-3xl md:text-4xl lg:text-6xl font-bold text-stone-100 leading-tight mb-8">
            Kvalitet som<br />syns i varje<br />detalj
          </h2>
          <p className="craft-text-item text-stone-500 text-base leading-relaxed mb-10">
            Vi kombinerar traditionellt hantverk med moderna metoder. Varje lödfogar,
            falsning och infästning görs med minutiös precision och respekt för materialet.
          </p>
          <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-8 gap-y-4">
            {qualities.map((q) => (
              <li key={q.label} className="craft-text-item flex items-start gap-2 text-left">
                <div className="w-1 h-1 rounded-full bg-[var(--gold)] mt-2 flex-shrink-0" />
                <div>
                  <span className="text-stone-300 text-sm font-medium">{q.label}: </span>
                  <span className="text-stone-600 text-sm">{q.value}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Metal details full-width image */}
        <div className="metal-img relative overflow-hidden aspect-[21/9] mb-20">
          <Image
            src="/images/metal-details.png"
            alt="Metalldetaljer i plåt"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-stone-300 text-xs tracking-[0.5em] uppercase font-medium">
              Precision i varje detalj
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="stats-row grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border)]">
          {stats.map((s) => (
            <div key={s.label} className="stat-card bg-[var(--surface)] p-8 md:p-12">
              <div className="flex items-end gap-1 mb-2">
                <span
                  className="text-4xl md:text-5xl font-bold text-stone-100 leading-none"
                  data-counter={s.num}
                >
                  {s.num}
                </span>
                <span className="text-[var(--gold)] text-2xl md:text-3xl font-bold leading-none pb-0.5">
                  {s.suffix}
                </span>
              </div>
              <p className="text-stone-600 text-xs tracking-[0.2em] uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
