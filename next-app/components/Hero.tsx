'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const features = [
  { icon: '◈', title: 'Hållbart', desc: 'Material som håller i generationer' },
  { icon: '◎', title: 'Precisionarbete', desc: 'Noggrannhet i varje detalj' },
  { icon: '◇', title: 'Kvalitet', desc: 'Vi kompromissar aldrig' },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      tl.from(section.querySelectorAll('.hero-word'), {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.1,
          ease: 'power4.out',
        })
        .from(section.querySelector('.hero-eyebrow'),
          { opacity: 0, y: 12, duration: 0.8, ease: 'power3.out' }, '-=0.9')
        .from(section.querySelector('.hero-lead'),
          { opacity: 0, y: 14, duration: 0.8, ease: 'power3.out' }, '-=0.65')
        .from(section.querySelectorAll('.hero-btn'),
          { opacity: 0, y: 12, duration: 0.7, stagger: 0.1, ease: 'power3.out' }, '-=0.55')
        .from(section.querySelectorAll('.hero-feature'),
          { opacity: 0, x: 16, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.5')

      // Soft parallax
      gsap.to(bgRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(contentRef.current, {
        opacity: 0,
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: '50% top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={sectionRef}
      data-section="Hem"
      className="relative h-screen min-h-[640px] overflow-hidden bg-black"
    >
      {/* Background image */}
      <div
        ref={bgRef}
        className="absolute will-change-transform"
        style={{ inset: '-6% 0' }}
      >
        <Image
          src="/images/header.jpeg"
          alt="Lillemans Plåt – premium takarbeten"
          fill
          priority
          quality={95}
          className="object-cover object-[50%_40%]"
          sizes="100vw"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25" />
      </div>

      {/* Left edge numbers */}
      <div className="absolute left-5 inset-y-0 hidden lg:flex flex-col items-center justify-between py-32 z-10 pointer-events-none">
        <span className="text-[var(--gold)]/40 text-[9px] font-mono tracking-widest [writing-mode:vertical-rl]">01</span>
        <div className="w-px flex-1 my-3 bg-[var(--gold)]/15" />
        <span className="text-[var(--gold)]/40 text-[9px] font-mono tracking-widest [writing-mode:vertical-rl]">06</span>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-start pt-20 md:pt-24 px-8 md:px-16 lg:px-20"
      >
        <div className="max-w-screen-xl mx-auto w-full">
          <p className="hero-eyebrow eyebrow mb-4">
            Plåtarbete med kvalitet i varje detalj
          </p>

          <h1 className="mb-5 leading-[0.92] tracking-tight font-bold text-stone-50">
            {['LILLEMANS', 'BYGGNADS-', 'PLÅTSLAGERI'].map((word) => (
                <span key={word} className="block overflow-hidden pt-2">
                  <span
                    className="hero-word block will-change-transform"
                    style={{ fontSize: 'clamp(3rem, 6.5vw, 7rem)' }}
                  >
                    {word}
                  </span>
                </span>
              ))}
          </h1>

          <p className="hero-lead text-stone-400 text-sm md:text-base max-w-xs leading-relaxed mb-8">
            Vi skapar hållbara lösningar i plåt för tak, fasader och detaljer —
            med precision, känsla och stolthet i varje projekt.
          </p>

            <div className="flex flex-wrap gap-4">
            <a
              href="#services"
              className="hero-btn group inline-flex items-center gap-3 border border-stone-500/60 text-stone-200 text-xs font-semibold tracking-[0.2em] uppercase px-7 py-3.5 hover:border-stone-300 hover:text-white transition-all duration-300"
            >
              Våra tjänster
              <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Features — bottom right */}
      <div className="absolute bottom-32 right-8 md:right-16 lg:right-20 z-10 hidden lg:flex flex-col gap-6 bg-black/40 backdrop-blur-sm px-6 py-5 border-l border-[var(--gold)]/30">
        {features.map((f) => (
          <div key={f.title} className="hero-feature flex items-start gap-4">
            <span className="text-[var(--gold)] text-lg mt-0.5 flex-shrink-0">{f.icon}</span>
            <div>
              <p className="text-stone-100 text-xs font-bold tracking-[0.22em] uppercase mb-1">
                {f.title}
              </p>
              <p className="text-stone-400 text-xs leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-stone-500 text-[9px] tracking-[0.4em] uppercase">Scrolla ner</span>
        <div className="w-px h-8 bg-gradient-to-b from-stone-500/50 to-transparent" />
      </div>
    </section>
  )
}
