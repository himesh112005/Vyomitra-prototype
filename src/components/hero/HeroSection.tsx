'use client'
import HeroOverlay from './HeroOverlay'

export default function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
      <HeroOverlay />
    </section>
  )
}
