'use client'
import LiveStatus from './LiveStatus'
import ChatBox from './ChatBox'
import SparklineChart from './SparklineChart'
import SectionWrapper from '../ui/SectionWrapper'

export default function Dashboard() {
  return (
    <SectionWrapper id="dashboard" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 text-xs font-mono tracking-widest">LIVE MISSION CONTROL</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Engineer{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Copilot
            </span>{' '}
            Dashboard
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Real-time telemetry ingestion, AI-powered fault prediction, and step-by-step remediation guidance — all running locally, zero cloud.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Live Status */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-white/80 text-sm font-mono tracking-widest mb-6">NETWORK STATUS</h3>
            <LiveStatus />
          </div>

          {/* Center: Chart */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-white/80 text-sm font-mono tracking-widest mb-4">PREDICTIVE TELEMETRY</h3>
            <SparklineChart />
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Prophet model — 15-min update cadence
              </div>
            </div>
          </div>

          {/* Right: Chat */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-white/80 text-sm font-mono tracking-widest mb-4">AI COPILOT CHAT</h3>
            <ChatBox />
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
