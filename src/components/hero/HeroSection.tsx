'use client'
import dynamic from 'next/dynamic'
import HeroOverlay from './HeroOverlay'

const HeroSpace3D = dynamic(() => import('./HeroSpace3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full" style={{ background: 'radial-gradient(ellipse at center, #0a0f2e 0%, #000408 100%)' }} />
  ),
})

export default function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <HeroSpace3D />
      </div>
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <HeroOverlay />
      </div>
    </section>
  )
}
