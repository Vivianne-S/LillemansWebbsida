'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.to(section.querySelector('.contact-bg'), {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Offertförfrågan från ${formData.name}`)
    const body = encodeURIComponent(
      `Namn: ${formData.name}\nE-post: ${formData.email}\nTelefon: ${formData.phone}\n\n${formData.message}`,
    )
    window.location.href = `mailto:kontakt@lillemansplat.se?subject=${subject}&body=${body}`
  }

  return (
    <section ref={sectionRef} id="contact" data-section="Kontakt" className="relative bg-black overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-10 scale-110">
        <div className="contact-bg absolute inset-0">
          <Image
            src="/images/collage-dark2.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            aria-hidden
          />
        </div>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-14 py-28 md:py-40">
        {/* Massive heading */}
        <div className="contact-heading overflow-hidden mb-20">
          <p className="eyebrow mb-6">Kontakt</p>
          <h2 className="leading-tight tracking-tight font-bold text-stone-100 text-[clamp(3rem,8vw,9rem)]">
            Låt oss prata tak<span className="text-[var(--gold)]">.</span>
          </h2>
        </div>

        {/* Info grid */}
        <div className="contact-grid grid md:grid-cols-3 gap-px bg-[var(--border)] mb-16">
          {[
            { label: 'Telefon', value: '073-728 48 99', href: 'tel:+46737284899' },
            { label: 'E-post', value: 'kontakt@lillemansplat.se', href: 'mailto:kontakt@lillemansplat.se' },
            { label: 'Plats', value: 'Göteborg & Västra Götaland', href: null },
          ].map((c) => (
            <div key={c.label} className="contact-block bg-black p-8 md:p-10 group">
              <p className="text-stone-700 text-[0.6rem] tracking-[0.35em] uppercase mb-3">{c.label}</p>
              {c.href ? (
                <a
                  href={c.href}
                  className="text-stone-300 text-lg font-medium hover:text-[var(--gold)] transition-colors duration-300 flex items-center gap-2"
                >
                  {c.value}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--gold)]">↗</span>
                </a>
              ) : (
                <p className="text-stone-300 text-lg font-medium">{c.value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="contact-form grid lg:grid-cols-2 gap-14 lg:gap-20">
          {/* Left: CTA text */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-stone-100 mb-6 leading-tight">
              Begär en fri offert.<br />
              <span className="text-stone-600">Svar inom 24 timmar.</span>
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed mb-8">
              Vi erbjuder kostnadsfri besiktning och rådgivning i Göteborg och
              Västra Götaland. Fyll i formuläret så återkommer vi snart.
            </p>
            <div className="space-y-3">
              {[
                'Kostnadsfri offert',
                'Fri besiktning i Göteborg',
                'Svar inom 24 timmar',
                '20 års erfarenhet',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-stone-500 text-sm">
                  <span className="w-4 h-px bg-[var(--gold)]/60 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[0.6rem] tracking-[0.3em] uppercase text-stone-600 mb-2">
                  Namn
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[var(--surface)] border border-[var(--border)] text-stone-200 text-sm px-4 py-3 focus:outline-none focus:border-[var(--gold)]/60 transition-colors placeholder-stone-700"
                  placeholder="Ditt namn"
                />
              </div>
              <div>
                <label className="block text-[0.6rem] tracking-[0.3em] uppercase text-stone-600 mb-2">
                  Telefon
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[var(--surface)] border border-[var(--border)] text-stone-200 text-sm px-4 py-3 focus:outline-none focus:border-[var(--gold)]/60 transition-colors placeholder-stone-700"
                  placeholder="07X-XXX XX XX"
                />
              </div>
            </div>

            <div>
              <label className="block text-[0.6rem] tracking-[0.3em] uppercase text-stone-600 mb-2">
                E-post
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[var(--surface)] border border-[var(--border)] text-stone-200 text-sm px-4 py-3 focus:outline-none focus:border-[var(--gold)]/60 transition-colors placeholder-stone-700"
                placeholder="din@email.se"
              />
            </div>

            <div>
              <label className="block text-[0.6rem] tracking-[0.3em] uppercase text-stone-600 mb-2">
                Beskriv projektet
              </label>
              <textarea
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-[var(--surface)] border border-[var(--border)] text-stone-200 text-sm px-4 py-3 focus:outline-none focus:border-[var(--gold)]/60 transition-colors resize-none placeholder-stone-700"
                placeholder="Beskriv typ av arbete, adress, önskad tidsplan..."
              />
            </div>

            <button
              type="submit"
              className="w-full group flex items-center justify-center gap-3 bg-[var(--gold)] text-black text-xs font-semibold tracking-[0.2em] uppercase py-4 hover:bg-stone-100 transition-colors duration-300"
            >
              Skicka förfrågan
              <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </button>
          </form>
        </div>

        {/* Footer image */}
        <div className="mt-24 pt-8 border-t border-[var(--border)]">
          <Image
            src="/images/footer.png"
            alt="Lillemans Plåt footer"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto block max-h-[200px] object-cover object-center"
          />
        </div>
      </div>
    </section>
  )
}
