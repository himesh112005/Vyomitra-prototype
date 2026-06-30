'use client'
import { motion } from 'framer-motion'

export default function HeroOverlay() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="pointer-events-auto mb-6"
      >
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-5 py-2 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-400 text-xs font-mono tracking-widest">ISRO BHARATIYA ANTARIKSH HACKATHON 2026 — PS #13</span>
        </div>
      </motion.div>

      {/* Main headline */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        className="text-center text-7xl md:text-9xl font-black tracking-tight mb-4"
        style={{ fontFamily: 'Orbitron, sans-serif' }}
      >
        <span
          className="text-transparent bg-clip-text"
          style={{
            backgroundImage: 'linear-gradient(135deg, #22d3ee 0%, #818cf8 40%, #ffffff 70%, #22d3ee 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 4s ease infinite',
          }}
        >
          VYOMITRA
        </span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="text-white/80 text-lg md:text-2xl font-light text-center mb-3 max-w-3xl"
      >
        Air-Gapped Predictive Copilot for Secure MPLS Operations
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="text-white/40 text-sm md:text-base text-center mb-10 max-w-xl font-mono"
      >
        Multi-agent AI system for ISRO's mission-critical network infrastructure — 100% local inference, zero egress
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.1 }}
        className="pointer-events-auto flex flex-col sm:flex-row gap-4"
      >
        <button
          onClick={() => scrollTo('dashboard')}
          className="group relative px-8 py-4 rounded-2xl overflow-hidden font-mono text-sm tracking-wide"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-90 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: '0 0 30px rgba(34,211,238,0.4)' }} />
          <span className="relative text-white font-semibold flex items-center gap-2">
            See It In Action
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>

        <button
          onClick={() => scrollTo('architecture')}
          className="group px-8 py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm font-mono text-sm tracking-wide text-white/80 hover:border-white/40 hover:bg-white/10 hover:text-white transition-all"
        >
          <span className="flex items-center gap-2">
            Explore the System
            <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-white/40" />
        </motion.div>
        <span className="text-white/20 text-xs font-mono">SCROLL</span>
      </motion.div>
    </div>
  )
}
