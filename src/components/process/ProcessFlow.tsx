'use client'
import { motion } from 'framer-motion'
import SectionWrapper from '../ui/SectionWrapper'

const STEPS = [
  {
    num: '01',
    title: 'SENSE',
    subtitle: 'Live Telemetry Ingestion',
    description:
      'SNMP traps, NetFlow, syslog, and YANG-modeled telemetry streams are ingested in real-time from all MPLS nodes across the network topology.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    color: '#22d3ee',
  },
  {
    num: '02',
    title: 'UNDERSTAND',
    subtitle: 'RAG-Grounded Analysis',
    description:
      'A local Llama 3.1 model, grounded with FAISS-indexed incident history and network documentation, builds a semantic understanding of anomaly context.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: '#818cf8',
  },
  {
    num: '03',
    title: 'PREDICT',
    subtitle: 'Time-Series Forecasting',
    description:
      'Meta Prophet models trained on historical patterns extrapolate fault trajectories. Each prediction carries a confidence score and estimated time-to-failure.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    color: '#f97316',
  },
  {
    num: '04',
    title: 'GUIDE',
    subtitle: 'Step-by-Step Remediation',
    description:
      'LangGraph orchestrates a multi-agent workflow that generates prioritized, actionable remediation playbooks — delivered through the engineer copilot interface.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: '#34d399',
  },
]

export default function ProcessFlow() {
  return (
    <SectionWrapper id="process" className="py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-purple-400 text-xs font-mono tracking-widest">INTELLIGENCE PIPELINE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              VYOMITRA
            </span>{' '}
            Works
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            A four-stage agentic pipeline transforms raw network telemetry into actionable intelligence — entirely on-premise.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-[72px] left-[calc(12.5%+32px)] right-[calc(12.5%+32px)] h-px">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/60 to-cyan-500/0"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
            />
            {/* Animated particle on line */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
              animate={{ left: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative group"
              >
                <div
                  className="glass-card rounded-2xl p-6 h-full cursor-default"
                  style={{
                    borderColor: `${step.color}20`,
                    boxShadow: `0 0 30px ${step.color}10`,
                  }}
                >
                  {/* Step number */}
                  <div className="text-white/10 font-mono text-5xl font-bold absolute top-4 right-4 select-none">
                    {step.num}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${step.color}15`, color: step.color, boxShadow: `0 0 20px ${step.color}20` }}
                  >
                    {step.icon}
                  </div>

                  <div
                    className="text-xs font-mono tracking-widest mb-1"
                    style={{ color: step.color }}
                  >
                    {step.title}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">{step.subtitle}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>

                  {/* Bottom glow line */}
                  <motion.div
                    className="absolute bottom-0 left-4 right-4 h-px rounded-full"
                    style={{ background: `linear-gradient(to right, transparent, ${step.color}, transparent)` }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
