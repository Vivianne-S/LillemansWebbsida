'use client'

import { useEffect, useRef, useState } from 'react'
const links = [
  { label: 'Hem', href: '#top' },
  { label: 'Tjänster', href: '#services' },
  { label: 'Om oss', href: '#craftsmanship' },
]

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Hem')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = document.querySelectorAll<HTMLElement>('[data-section]')
      sections.forEach((s) => {
        const top = s.offsetTop - 140
        if (window.scrollY >= top && window.scrollY < top + s.offsetHeight) {
          setActive(s.dataset.section ?? '')
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-xl border-b border-white/[0.06] py-3'
          : 'bg-black/70 backdrop-blur-md border-b border-white/[0.05] py-5'
      }`}
    >
      <div className="max-w-[1600px] mx-auto w-full px-8 md:px-16 flex items-center justify-between gap-8">

        {/* ── Logo ── */}
        <a href="#top" className="nav-logo group flex items-center gap-3 flex-shrink-0">
          {/* Diamond icon */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="w-5 h-5 border border-[var(--gold)] rotate-45 group-hover:rotate-[135deg] transition-transform duration-700" />
            <div className="absolute w-2 h-2 bg-[var(--gold)]/30 rotate-45 group-hover:bg-[var(--gold)]/60 transition-colors duration-500" />
          </div>
          <div className="leading-none">
            <div className="text-[0.7rem] font-bold tracking-[0.25em] uppercase text-stone-100">Lillemans</div>
            <div className="text-[0.7rem] font-bold tracking-[0.25em] uppercase text-[var(--gold)]">Plåt</div>
          </div>
        </a>

        {/* ── Desktop links ── */}
        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center" aria-label="Huvudmeny">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link relative px-4 py-2 text-[0.65rem] tracking-[0.25em] uppercase transition-colors duration-300 ${
                active === link.label
                  ? 'text-stone-100'
                  : 'text-stone-500 hover:text-stone-200'
              }`}
            >
              {link.label}
              {/* Active underline */}
              <span
                className={`absolute bottom-0 left-4 right-4 h-px bg-[var(--gold)] transition-all duration-300 ${
                  active === link.label ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                }`}
                style={{ transformOrigin: 'left' }}
              />
            </a>
          ))}
        </nav>

        {/* ── CTA ── */}
        <a
          href="#contact"
          className="nav-cta hidden md:inline-flex items-center gap-2.5 border border-[var(--gold)]/70 text-[var(--gold)] text-[0.65rem] font-semibold tracking-[0.22em] uppercase px-6 py-2.5 hover:bg-[var(--gold)] hover:text-black hover:border-[var(--gold)] transition-all duration-300 flex-shrink-0"
        >
          Kontakta oss
        </a>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Öppna meny"
        >
          <span className={`block h-px bg-stone-300 transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6px] w-6' : 'w-6'}`} />
          <span className={`block h-px bg-stone-300 transition-all duration-300 ${menuOpen ? 'opacity-0 w-4' : 'w-4'}`} />
          <span className={`block h-px bg-stone-300 transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6px] w-6' : 'w-6'}`} />
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={`md:hidden transition-all duration-500 ease-out overflow-hidden ${
          menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        } bg-black/98 backdrop-blur-xl border-t border-white/[0.05]`}
      >
        <div className="flex flex-col px-6 py-6 gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`py-3 text-sm tracking-[0.2em] uppercase border-b border-white/[0.04] transition-colors ${
                active === link.label ? 'text-[var(--gold)]' : 'text-stone-400 hover:text-stone-100'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 text-center text-sm font-semibold tracking-[0.2em] uppercase bg-[var(--gold)] text-black py-3.5 hover:bg-stone-100 transition-colors duration-300"
          >
            Kontakta oss
          </a>
        </div>
      </div>
    </header>
  )
}
