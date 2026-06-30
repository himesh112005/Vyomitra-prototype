'use client'
import { motion } from 'framer-motion'
import SectionWrapper from '../ui/SectionWrapper'

const CLOUD_CONS = [
  'Data leaves secure perimeter',
  'Internet connectivity required',
  'ITAR/data sovereignty violations',
  'Unpredictable inference latency',
  'Subscription costs at scale',
  'Vendor lock-in risk',
  'No offline operation capability',
]

const LOCAL_PROS = [
  'Zero-egress — data never leaves',
  'Fully air-gapped operation',
  'ITAR & ISRO compliance native',
  '<50ms inference on local GPU',
  'One-time deployment cost',
  'Open-weight model freedom',
  'Works in signal-dead zones',
]

export default function AirGapComparison() {
  return (
    <SectionWrapper id="airgap" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-emerald-400 text-xs font-mono tracking-widest">SECURITY ARCHITECTURE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
              Air-Gapped?
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Mission-critical infrastructure demands absolute data sovereignty. VYOMITRA was designed from day one for air-gapped environments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
          {/* Cloud LLMs — left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl border border-red-500/20 bg-red-500/5 p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div>
                <div className="text-red-400 font-semibold">Cloud LLMs</div>
                <div className="text-white/30 text-xs font-mono">GPT-4, Claude, Gemini</div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {CLOUD_CONS.map((con, i) => (
                <motion.div
                  key={con}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <svg className="w-4 h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/50 text-sm line-through decoration-red-500/50">{con}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Center shield */}
          <div className="flex flex-col items-center gap-4 px-4">
            <motion.div
              animate={{ scale: [1, 1.08, 1], boxShadow: ['0 0 20px rgba(34,211,238,0.2)', '0 0 40px rgba(34,211,238,0.5)', '0 0 20px rgba(34,211,238,0.2)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 flex items-center justify-center"
            >
              <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </motion.div>
            <div className="text-center">
              <div className="text-white/80 text-sm font-mono font-semibold">PERIMETER</div>
              <div className="text-white/30 text-xs font-mono">SECURED</div>
            </div>
            {/* Blocked arrow */}
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="flex items-center gap-1"
            >
              <div className="w-8 h-0.5 bg-red-500" />
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <div className="text-red-400 text-xs font-mono">BLOCKED</div>
            </motion.div>
          </div>

          {/* VYOMITRA Local — right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <span className="text-emerald-400 font-bold text-sm">V</span>
              </div>
              <div>
                <div className="text-emerald-400 font-semibold">VYOMITRA Local</div>
                <div className="text-white/30 text-xs font-mono">Llama 3.1 on-premise</div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {LOCAL_PROS.map((pro, i) => (
                <motion.div
                  key={pro}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white/80 text-sm">{pro}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
