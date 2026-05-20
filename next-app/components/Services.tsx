'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const services = [
  {
    num: '01',
    title: 'Takarbeten',
    desc: 'Bandtäckning, stående fall, falstak och omläggning. Alla typer av plåttak utförda med hantverksskicklighet.',
    tags: ['Bandtäckning', 'Stående fall', 'Omläggning', 'Falsat tak'],
  },
  {
    num: '02',
    title: 'Plåtfasader',
    desc: 'Skräddarsydda fasader i plåt med hög estetik och maximalt väderskydd. Stående och liggande panel.',
    tags: ['Stående panel', 'Liggande panel', 'Detaljpassning', 'Underhåll'],
  },
  {
    num: '03',
    title: 'Detaljarbeten',
    desc: 'Specialiserade detaljer som fönsterbleck, vindskivor och takfotsplåt med exakt millimeterprecision.',
    tags: ['Fönsterbleck', 'Vindskivor', 'Takfot', 'Nockplåtar'],
  },
  {
    num: '04',
    title: 'Reparationer',
    desc: 'Snabba och hållbara reparationer när det behövs som mest. Vi löser läckor och skador effektivt.',
    tags: ['Akutreparation', 'Läckagefix', 'Underhåll', 'Besiktning'],
  },
  {
    num: '05',
    title: 'Taksäkerhet',
    desc: 'Snörasskydd, gångbryggor och säkerhetssystem som uppfyller alla krav och standarder.',
    tags: ['Snörasskydd', 'Gångbryggor', 'Stegar', 'Räcken'],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const ctx = gsap.context(() => {
      gsap.from(section.querySelector('.services-header'), {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%' },
      })

      gsap.from(section.querySelectorAll('.service-card'), {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" data-section="Tjänster" className="bg-black py-28 md:py-36 border-t border-[var(--border)]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-14">
        {/* Header */}
        <div className="services-header flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <p className="eyebrow mb-4">Tjänster</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-100 leading-tight">
              Helhetslösningar<br />i plåt
            </h2>
          </div>
          <p className="text-stone-500 text-base max-w-xs leading-relaxed">
            Allt inom plåtarbeten för privatpersoner och fastighetsbolag i Göteborg och Västra Götaland.
          </p>
        </div>

        {/* Grid */}
        <div className="services-grid grid md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.num}
              className="service-card group bg-black p-8 md:p-10 border border-[var(--border)] hover:bg-[var(--surface)] transition-colors duration-500 cursor-default"
            >
              <div className="flex items-start justify-between mb-8">
                <span className="text-[var(--gold)] text-[0.65rem] font-mono tracking-widest">{s.num}</span>
                <div className="w-6 h-px bg-[var(--border)] group-hover:bg-[var(--gold)] group-hover:w-12 transition-all duration-500 mt-2" />
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-stone-200 mb-4 group-hover:text-[var(--gold)] transition-colors duration-300">
                {s.title}
              </h3>

              <p className="text-stone-600 text-sm leading-relaxed mb-8 group-hover:text-stone-500 transition-colors duration-300">
                {s.desc}
              </p>

              <ul className="space-y-2">
                {s.tags.map((tag) => (
                  <li key={tag} className="flex items-center gap-3 text-stone-700 text-[0.7rem] tracking-wide group-hover:text-stone-500 transition-colors duration-300">
                    <span className="w-3 h-px bg-[var(--gold)]/50 flex-shrink-0" />
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
