'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const projects = [
  {
    id: 1,
    title: 'Bandtäckning, Göteborg',
    type: 'Bandtäckning',
    year: '2024',
    image: '/images/bandrackning.jpeg',
    featured: true,
  },
  {
    id: 2,
    title: 'Fönsterbleck & Vindskivor',
    type: 'Detaljarbeten',
    year: '2024',
    image: '/images/fonster_vind_rannbyte.jpeg',
    featured: false,
  },
  {
    id: 3,
    title: 'Från idé till färdigt tak',
    type: 'Takarbeten',
    year: '2023',
    image: '/images/ide_fardigt_tak.jpeg',
    featured: false,
  },
  {
    id: 4,
    title: 'Premiumprojekt, Västra Götaland',
    type: 'Takarbeten',
    year: '2023',
    image: '/images/lillemansplat_inspo.jpeg',
    featured: true,
  },
  {
    id: 5,
    title: 'Reparation & Underhåll',
    type: 'Reparation',
    year: '2022',
    image: '/images/tak6.jpeg',
    featured: false,
  },
  {
    id: 6,
    title: 'Takarbeten, Göteborg',
    type: 'Bandtäckning',
    year: '2022',
    image: '/images/tak7.jpeg',
    featured: false,
  },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from(section.querySelector('.gallery-header'), {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%' },
      })

      section.querySelectorAll('.gallery-item').forEach((item, i) => {
        gsap.from(item, {
          y: 50,
          opacity: 0,
          duration: 1,
          delay: i * 0.05,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 88%' },
        })
      })

      // Full-width collage strip
      gsap.from(section.querySelector('.collage-strip'), {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.collage-strip', start: 'top 80%' },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="gallery" data-section="Projekt" className="bg-black py-28 md:py-36 border-t border-[var(--border)]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-14">
        {/* Header */}
        <div className="gallery-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="eyebrow mb-4">Projekt</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-100">
              Utvalda<br />arbeten
            </h2>
          </div>
          <p className="text-stone-600 text-sm max-w-xs leading-relaxed">
            Ett urval av genomförda projekt — tak och fasader vi är stolta över.
          </p>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          {projects.map((p, i) => {
            const isFeatured = p.featured
            const paddingBottom = isFeatured ? '55%' : '70%'

            return (
              <div
                key={p.id}
                className={`gallery-item group relative overflow-hidden cursor-pointer ${
                  isFeatured ? 'md:col-span-2' : 'md:col-span-1'
                }`}
                style={{ position: 'relative' }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={{ paddingBottom }}>
                  <div className="absolute inset-0">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className={`object-cover transition-transform duration-700 ${
                        hovered === p.id ? 'scale-105' : 'scale-100'
                      }`}
                      sizes={
                        isFeatured
                          ? '(max-width: 768px) 100vw, 66vw'
                          : '(max-width: 768px) 100vw, 33vw'
                      }
                    />
                    {/* Dark gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />

                    {/* Info overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="text-[var(--gold)] text-[0.6rem] tracking-[0.3em] uppercase mb-1.5">
                        {p.type} — {p.year}
                      </p>
                      <h3 className="text-stone-100 font-semibold text-base">{p.title}</h3>
                    </div>

                    {/* Gold border on hover */}
                    <div
                      className={`absolute inset-0 border transition-all duration-500 ${
                        hovered === p.id ? 'border-[var(--gold)]/30' : 'border-transparent'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Collage strip */}
        <div className="collage-strip relative overflow-hidden aspect-[21/8]">
          <Image
            src="/images/collage-dark.png"
            alt="Projektöversikt"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="text-[var(--gold)] text-[0.6rem] tracking-[0.4em] uppercase mb-4">
              Premiumkvalitet i varje projekt
            </p>
            <p className="text-stone-200 text-lg md:text-2xl font-light max-w-xl leading-relaxed">
              &ldquo;Detaljer som håller. Kvalitet som syns.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
