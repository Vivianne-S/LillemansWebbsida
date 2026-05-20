import Hero from '@/components/Hero'
import ScrollNarrative from '@/components/ScrollNarrative'
import Services from '@/components/Services'
import Craftsmanship from '@/components/Craftsmanship'
import IdeaTak from '@/components/IdeaTak'
import Process from '@/components/Process'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <IdeaTak />
      <ScrollNarrative />
      <Services />
      <Craftsmanship />
      <Process />
      <Contact />
    </>
  )
}
