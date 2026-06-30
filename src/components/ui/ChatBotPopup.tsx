'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ChatBotPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[9999]">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-16 right-0 w-80 md:w-96 glass-card rounded-2xl overflow-hidden border border-cyan-500/30 flex flex-col shadow-[0_0_30px_rgba(34,211,238,0.15)]"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 px-4 py-3 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-cyan-400 text-xs font-mono tracking-widest font-semibold">VYOMITRA COPILOT</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Chat Area */}
              <div className="p-4 h-80 overflow-y-auto flex flex-col gap-4 bg-[#050814]/80">
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[85%]">
                    <p className="text-white/80 text-sm font-mono leading-relaxed">
                      Systems nominal. Continuous telemetry ingestion active. How can I assist you with the MPLS network today?
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[85%]">
                    <p className="text-white/90 text-sm font-mono">
                      Check RTR-07 latency status.
                    </p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[85%]">
                    <p className="text-white/80 text-sm font-mono leading-relaxed">
                      Analyzing... Minor BGP session degradation detected on RTR-07. Recommend reviewing interface Gi0/0/1 logs. Confidence: 87%.
                    </p>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-3 bg-[#0a0f1e] border-t border-white/10 flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask VYOMITRA..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white font-mono placeholder:text-white/30 outline-none focus:border-cyan-500/50 transition-colors"
                />
                <button className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-400 rounded-xl px-3 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.5)] border border-cyan-300/30"
        >
          {isOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <span className="text-white font-bold text-xl">V</span>
          )}
        </motion.button>
      </div>
    </>
  )
}
