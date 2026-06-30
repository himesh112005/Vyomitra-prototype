'use client'
import { motion } from 'framer-motion'

export default function HeroOverlay() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
      {/* Dark radial backdrop to ensure text readability against complex asteroid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 70% at 35% 50%, rgba(0,2,14,0.75) 0%, rgba(0,1,8,0.45) 55%, transparent 100%)',
        }}
      />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="pointer-events-auto mb-6 relative z-10"
      >
        <div className="inline-flex items-center gap-2 bg-cyan-950/70 border border-cyan-400/40 rounded-full px-5 py-2 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.2)]">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,1)]" />
          <span className="text-cyan-300 text-xs font-mono tracking-widest font-semibold">
            ISRO BHARATIYA ANTARIKSH HACKATHON 2026 — PS #13
          </span>
        </div>
      </motion.div>

      {/* Main headline */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        className="text-center text-5xl sm:text-7xl md:text-9xl font-black tracking-tight mb-4 relative z-10"
        style={{ fontFamily: 'Orbitron, sans-serif' }}
      >
        <span
          className="text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(34,211,238,0.8)]"
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
        className="text-white text-lg md:text-2xl font-light text-center mb-3 max-w-3xl relative z-10 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
        style={{ textShadow: '0 2px 20px rgba(0,0,0,0.95)' }}
      >
        Air-Gapped Predictive Copilot for Secure MPLS Operations
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="text-cyan-100/70 text-sm md:text-base text-center mb-10 max-w-xl font-mono relative z-10"
        style={{ textShadow: '0 1px 10px rgba(0,0,0,1)' }}
      >
        Multi-agent AI — 100% local inference, zero egress
      </motion.p>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.0 }}
        className="flex gap-8 mb-10 relative z-10"
      >
        {[
          { value: '247', label: 'Nodes Monitored' },
          { value: '94.7%', label: 'Model Accuracy' },
          { value: '<50ms', label: 'Inference Latency' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div
              className="text-2xl font-black font-mono text-cyan-300"
              style={{ textShadow: '0 0 20px rgba(34,211,238,0.6)' }}
            >
              {stat.value}
            </div>
            <div
              className="text-white/60 text-xs font-mono tracking-wider mt-0.5"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,1)' }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.1 }}
        className="pointer-events-auto flex flex-col sm:flex-row gap-4 relative z-10"
      >
        <button
          onClick={() => scrollTo('dashboard')}
          className="group relative px-8 py-4 rounded-2xl overflow-hidden font-mono text-sm tracking-wide"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-90 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: '0 0 30px rgba(34,211,238,0.5), inset 0 1px 0 rgba(255,255,255,0.2)' }} />
          <span className="relative text-white font-bold flex items-center gap-2">
            See It In Action
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>

        <button
          onClick={() => scrollTo('architecture')}
          className="group px-8 py-4 rounded-2xl border border-white/30 bg-black/40 backdrop-blur-md font-mono text-sm tracking-wide text-white hover:border-cyan-400/50 hover:bg-black/60 hover:text-cyan-200 transition-all"
          style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
        >
          <span className="flex items-center gap-2">
            Explore the System
            <svg className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        className="absolute bottom-8 flex flex-col items-center gap-2 pointer-events-none z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-cyan-400/30 flex items-start justify-center pt-1.5"
          style={{ boxShadow: '0 0 12px rgba(34,211,238,0.2)' }}
        >
          <div className="w-1 h-2 rounded-full bg-cyan-400/60" />
        </motion.div>
        <span className="text-white/30 text-xs font-mono tracking-widest">SCROLL</span>
      </motion.div>
    </div>
  )
}
