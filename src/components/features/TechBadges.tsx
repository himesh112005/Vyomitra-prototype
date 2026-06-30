'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

const BADGES = [
  { name: 'Next.js 14', color: '#ffffff', bg: 'rgba(255,255,255,0.08)' },
  { name: 'React', color: '#61DAFB', bg: 'rgba(97,218,251,0.08)' },
  { name: 'LangGraph', color: '#a855f7', bg: 'rgba(168,85,247,0.08)' },
  { name: 'Ollama', color: '#22d3ee', bg: 'rgba(34,211,238,0.08)' },
  { name: 'FAISS', color: '#818cf8', bg: 'rgba(129,140,248,0.08)' },
  { name: 'Llama 3.1', color: '#f97316', bg: 'rgba(249,115,22,0.08)' },
  { name: 'Prophet', color: '#34d399', bg: 'rgba(52,211,153,0.08)' },
  { name: 'Docker', color: '#2496ED', bg: 'rgba(36,150,237,0.08)' },
  { name: 'Python', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)' },
  { name: 'TypeScript', color: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
  { name: 'Three.js', color: '#ffffff', bg: 'rgba(255,255,255,0.06)' },
  { name: 'SNMP/NetFlow', color: '#fb7185', bg: 'rgba(251,113,133,0.08)' },
]

function Badge({ name, color, bg }: { name: string; color: string; bg: string }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -14
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 14
    setTilt({ x, y })
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="shrink-0 px-4 py-2 rounded-xl border text-sm font-mono cursor-default select-none"
      style={{
        background: bg,
        borderColor: `${color}30`,
        color,
        boxShadow: `0 0 12px ${color}15`,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.08, boxShadow: `0 0 20px ${color}35` }}
    >
      {name}
    </motion.div>
  )
}

export default function TechBadges() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-white/30 text-xs font-mono tracking-widest">BUILT WITH</p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {BADGES.map((badge, i) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Badge {...badge} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
