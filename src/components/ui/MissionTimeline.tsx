'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const SECTIONS = [
  { id: 'hero', label: 'INIT' },
  { id: 'dashboard', label: 'MONITOR' },
  { id: 'process', label: 'PIPELINE' },
  { id: 'architecture', label: 'SYSTEM' },
  { id: 'airgap', label: 'SECURITY' },
  { id: 'features', label: 'FEATURES' },
]

export default function MissionTimeline() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-1">
      <div className="flex flex-col items-center gap-0">
        {SECTIONS.map((section, i) => (
          <div key={section.id} className="flex flex-col items-center">
            {i > 0 && (
              <div
                className={`w-px h-8 transition-all duration-500 ${
                  activeSection === section.id || SECTIONS.findIndex(s => s.id === activeSection) > i
                    ? 'bg-cyan-400/80'
                    : 'bg-white/10'
                }`}
              />
            )}
            <button
              onClick={() => scrollTo(section.id)}
              className="group relative flex items-center gap-3"
            >
              <motion.div
                className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
                  activeSection === section.id
                    ? 'border-cyan-400 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]'
                    : 'border-white/30 bg-transparent'
                }`}
                animate={activeSection === section.id ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span
                className={`absolute left-5 text-xs font-mono tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                  activeSection === section.id ? 'text-cyan-400' : 'text-white/50'
                }`}
              >
                {section.label}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
