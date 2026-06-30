'use client'
import { motion } from 'framer-motion'
import SectionWrapper from '../ui/SectionWrapper'

const FEATURES = [
  {
    icon: '📡',
    title: 'Live Telemetry Ingestion',
    desc: 'Continuous SNMP, NetFlow, and syslog streams processed in real-time from all MPLS edge and core routers.',
    color: '#22d3ee',
  },
  {
    icon: '🔍',
    title: 'Anomaly Detection',
    desc: 'Statistical and ML-based outlier detection identifies deviations from baseline network behavior within seconds.',
    color: '#818cf8',
  },
  {
    icon: '📈',
    title: 'Fault Forecasting',
    desc: 'Meta Prophet time-series models predict link failures and performance degradation up to 6 hours in advance.',
    color: '#f97316',
  },
  {
    icon: '📚',
    title: 'RAG-Grounded Diagnosis',
    desc: 'FAISS-indexed incident knowledge base grounds every AI response in real historical precedent from your network.',
    color: '#a855f7',
  },
  {
    icon: '🛠️',
    title: 'Step-by-Step Remediation',
    desc: 'LangGraph orchestrates multi-agent workflows to generate precise, ordered remediation playbooks for engineers.',
    color: '#34d399',
  },
  {
    icon: '🎯',
    title: 'Confidence Scoring',
    desc: 'Every prediction and recommendation includes a calibrated confidence score and evidence citation chain.',
    color: '#fbbf24',
  },
  {
    icon: '🔒',
    title: 'Zero-Egress Guarantee',
    desc: 'Complete air-gap compliance — no telemetry, prompt, or response ever leaves the secure network perimeter.',
    color: '#22d3ee',
  },
  {
    icon: '💬',
    title: 'Engineer Copilot Chat',
    desc: 'Natural language interface powered by local Llama 3.1, letting engineers query, diagnose, and plan in plain English.',
    color: '#818cf8',
  },
  {
    icon: '📋',
    title: 'Audit Trail Logging',
    desc: 'Every AI decision, alert, and remediation action is cryptographically logged for compliance and post-incident review.',
    color: '#fb7185',
  },
]

export default function FeatureGrid() {
  return (
    <SectionWrapper id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="text-blue-400 text-xs font-mono tracking-widest">CAPABILITIES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Full-Spectrum{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Intelligence
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Nine mission-critical capabilities, all running locally on your infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass-card rounded-2xl p-6 group cursor-default"
              style={{
                '--feature-color': feature.color,
              } as React.CSSProperties}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${feature.color}15` }}
              >
                {feature.icon}
              </div>
              <h3 className="text-white font-semibold mb-2 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                style={{ WebkitTextFillColor: 'inherit' }}
              >
                <span
                  className="group-hover:bg-gradient-to-r"
                  style={{ backgroundImage: `linear-gradient(to right, ${feature.color}, white)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } as React.CSSProperties}
                >
                  {feature.title}
                </span>
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
              <div
                className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: `linear-gradient(to right, ${feature.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
