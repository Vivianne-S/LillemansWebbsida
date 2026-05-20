'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function IdeaTak() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // ── Whole section slides up over the hero (overlap effect)
      gsap.from(section, {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
      })

      // ── Eyebrow line grows in
      gsap.from(section.querySelector('.eyebrow-line'), {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ideatak-header', start: 'top 82%' },
      })

      // ── Title words fly up one by one
      gsap.from(section.querySelectorAll('.title-word'), {
        yPercent: 105,
        duration: 1.1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.ideatak-header', start: 'top 78%' },
      })

      // ── Sub-text and counter fade in
      gsap.from(section.querySelectorAll('.ideatak-sub'), {
        opacity: 0,
        y: 20,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.ideatak-header', start: 'top 72%' },
      })

      // ── Horizontal divider line grows across
      gsap.from(section.querySelector('.divider-line'), {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.divider-line', start: 'top 90%' },
      })

      // ── Grid cells reveal one by one with delay after banner is visible
      gsap.to(section.querySelectorAll('.grid-cell'), {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1.0,
        delay: 0.6,
        stagger: {
          each: 0.18,
          from: 'start',
        },
        ease: 'power2.inOut',
        scrollTrigger: { trigger: '.ideatak-img', start: 'top 82%' },
      })

      // ── Step counter animates up
      const obj = { value: 0 }
      gsap.to(obj, {
        value: 10,
        duration: 2,
        ease: 'power2.out',
        onUpdate() {
          const el = section.querySelector<HTMLElement>('.step-counter')
          if (el) el.textContent = Math.round(obj.value).toString()
        },
        scrollTrigger: { trigger: '.ideatak-header', start: 'top 75%' },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-black will-change-transform"
    >
      {/* ── Header ── */}
      <div className="ideatak-header max-w-screen-xl mx-auto px-5 md:px-16 lg:px-20 pt-10 md:pt-16 pb-4 md:pb-8">

        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-6">
          <span className="eyebrow-line block w-8 h-px bg-[var(--gold)]" />
          <p className="eyebrow">Så här går det till</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-end">
          {/* Title */}
          <h2
            className="font-bold text-stone-50 leading-[0.92] tracking-tight"
            style={{ fontSize: 'clamp(2.6rem, 5vw, 5.5rem)' }}
          >
            {['Från idé till', 'färdigt tak'].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span className={`title-word block ${i === 1 ? 'text-[var(--gold)]' : ''}`}>
                  {line}
                </span>
              </span>
            ))}
          </h2>

          {/* Right: subtext + counter */}
          <div className="ideatak-sub flex flex-col gap-3 md:items-end">
            <p className="text-stone-500 text-sm leading-relaxed max-w-xs md:text-right">
              Kvalitet i varje steg. Detaljer som håller.
            </p>
            <div className="ideatak-sub flex items-baseline gap-3 md:justify-end">
              <span className="text-stone-600 text-[0.6rem] tracking-[0.35em] uppercase">
                Steg i processen
              </span>
              <span className="step-counter text-4xl font-bold text-[var(--gold)] leading-none tabular-nums">
                0
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Thin gold divider line */}
      <div className="divider-line max-w-screen-xl mx-auto px-8 md:px-16 lg:px-20 mb-8">
        <div className="h-px bg-[var(--gold)]/30 w-full" />
      </div>

      {/* ── Full image with cell-by-cell reveal overlay ── */}
      <div className="ideatak-img relative">
        <Image
          src="/images/ide_fardigt_tak.jpeg"
          alt="Från idé till färdigt tak"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto block"
        />

        {/* Overlay grid — only covers the 10 step-cells (bottom ~72%), banner always visible */}
        <div
          className="absolute left-0 right-0 bottom-0 grid pointer-events-none"
          style={{
            top: '28%',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="grid-cell bg-black"
              style={{ clipPath: 'inset(0 0 0% 0)' }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
