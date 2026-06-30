'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ALERTS = [
  {
    id: 1,
    link: 'MPLS-RTR-07 → RTR-12',
    issue: 'BGP session degrading',
    confidence: 87,
    eta: '2h 15m',
    severity: 'critical',
  },
  {
    id: 2,
    link: 'MPLS-RTR-03 → RTR-09',
    issue: 'Latency spike predicted',
    confidence: 72,
    eta: '4h 30m',
    severity: 'warning',
  },
  {
    id: 3,
    link: 'MPLS-RTR-15 → RTR-22',
    issue: 'Packet loss trending',
    confidence: 91,
    eta: '1h 05m',
    severity: 'critical',
  },
]

const SYSTEM_METRICS = [
  { label: 'Nodes Monitored', value: '247', unit: '' },
  { label: 'Active Links', value: '1,842', unit: '' },
  { label: 'Avg Latency', value: '4.2', unit: 'ms' },
  { label: 'Model Accuracy', value: '94.7', unit: '%' },
]

export default function LiveStatus() {
  const [activeAlerts, setActiveAlerts] = useState([ALERTS[0]])
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => {
        const next = (t + 1) % ALERTS.length
        setActiveAlerts((prev) => {
          const exists = prev.find((a) => a.id === ALERTS[next].id)
          if (exists) return prev
          return [ALERTS[next], ...prev].slice(0, 3)
        })
        return next
      })
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-6">
      {/* System status header */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-400 animate-ping opacity-75" />
        </div>
        <span className="text-emerald-400 font-mono text-sm tracking-widest">SYSTEM STATUS: OPERATIONAL</span>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-2 gap-3">
        {SYSTEM_METRICS.map((m) => (
          <div
            key={m.label}
            className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm"
          >
            <div className="text-white/40 text-xs font-mono mb-1">{m.label}</div>
            <div className="text-cyan-300 font-mono text-xl font-bold">
              {m.value}<span className="text-sm text-white/40 ml-1">{m.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Predicted faults */}
      <div>
        <div className="text-white/50 text-xs font-mono tracking-widest mb-3 flex items-center gap-2">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          PREDICTED FAULT ALERTS
        </div>
        <div className="flex flex-col gap-2 min-h-[200px]">
          <AnimatePresence mode="popLayout">
            {activeAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`relative overflow-hidden rounded-xl border p-3 ${
                  alert.severity === 'critical'
                    ? 'border-red-500/40 bg-red-500/5'
                    : 'border-amber-500/40 bg-amber-500/5'
                }`}
              >
                {/* Pulse line at top */}
                <motion.div
                  className={`absolute top-0 left-0 h-0.5 ${
                    alert.severity === 'critical' ? 'bg-red-400' : 'bg-amber-400'
                  }`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3.5, ease: 'linear' }}
                />
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-white/90 text-xs font-mono font-semibold">{alert.link}</div>
                    <div className="text-white/50 text-xs mt-0.5">{alert.issue}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div
                      className={`text-xs font-mono font-bold ${
                        alert.severity === 'critical' ? 'text-red-400' : 'text-amber-400'
                      }`}
                    >
                      {alert.confidence}%
                    </div>
                    <div className="text-white/30 text-xs">ETA {alert.eta}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
