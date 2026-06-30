'use client'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { useEffect, useState } from 'react'

const HISTORICAL = [
  { time: '-6h', loss: 0.3, predicted: null },
  { time: '-5h', loss: 0.4, predicted: null },
  { time: '-4h', loss: 0.5, predicted: null },
  { time: '-3h', loss: 0.7, predicted: null },
  { time: '-2h', loss: 1.1, predicted: null },
  { time: '-1h', loss: 1.8, predicted: null },
  { time: 'Now', loss: 2.6, predicted: 2.6 },
  { time: '+1h', loss: null, predicted: 3.8 },
  { time: '+2h', loss: null, predicted: 5.2 },
  { time: '+3h', loss: null, predicted: 7.1 },
  { time: '+4h', loss: null, predicted: 9.4 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0a0f1e] border border-cyan-500/30 rounded-lg px-3 py-2">
        <p className="text-white/50 text-xs font-mono mb-1">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.name} className="text-xs font-mono" style={{ color: entry.color }}>
            {entry.name}: {entry.value?.toFixed(2)}%
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function SparklineChart() {
  const [animatedData, setAnimatedData] = useState(HISTORICAL.slice(0, 1))

  useEffect(() => {
    let i = 1
    const interval = setInterval(() => {
      if (i < HISTORICAL.length) {
        setAnimatedData(HISTORICAL.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-white/90 text-sm font-mono font-semibold">Packet Loss — MPLS-RTR-07</div>
          <div className="text-white/40 text-xs font-mono mt-0.5">Historical + AI Prediction</div>
        </div>
        <div className="flex items-center gap-1 bg-red-500/10 border border-red-500/30 rounded-full px-3 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          <span className="text-red-400 text-xs font-mono">FAULT PREDICTED</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={animatedData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="time"
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'monospace' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
            domain={[0, 12]}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={5} stroke="rgba(239,68,68,0.5)" strokeDasharray="4 4" label={{ value: 'THRESHOLD', fill: 'rgba(239,68,68,0.6)', fontSize: 9, fontFamily: 'monospace' }} />
          <Line
            type="monotone"
            dataKey="loss"
            name="Actual"
            stroke="#22d3ee"
            strokeWidth={2}
            dot={{ fill: '#22d3ee', r: 3, strokeWidth: 0 }}
            connectNulls={false}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="predicted"
            name="Predicted"
            stroke="#f97316"
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={{ fill: '#f97316', r: 3, strokeWidth: 0 }}
            connectNulls={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
