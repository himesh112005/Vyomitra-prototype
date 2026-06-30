'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CONVERSATIONS = [
  {
    question: "What's causing the latency on RTR-07?",
    answer: "Analysis complete. BGP session on RTR-07→RTR-12 showing 23% packet retransmission over last 45 minutes. Root cause identified: Interface Gi0/0/1 exhibiting CRC error rate trending at +0.8%/hr. Likely cause: fiber degradation or SFP module fault. Recommended action: Schedule maintenance window for physical layer inspection. Confidence score: 87%. RAG sources: 3 incident reports matched.",
  },
  {
    question: "What remediation steps should I take for RTR-15?",
    answer: "Step-by-step remediation for MPLS-RTR-15: (1) Verify interface Gi0/1/2 stats — look for increasing output drops. (2) Check MPLS label stack integrity via 'show mpls forwarding'. (3) Verify LDP neighbor adjacency. (4) If packet loss >5%, initiate traffic failover to backup path RTR-15→RTR-08→RTR-22. (5) Log all actions in audit trail for compliance review. ETA to resolve: ~35 minutes with 91% confidence.",
  },
]

export default function ChatBox() {
  const [convoIndex, setConvoIndex] = useState(0)
  const [displayedAnswer, setDisplayedAnswer] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showQuestion, setShowQuestion] = useState(true)
  const answerRef = useRef('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const currentConvo = CONVERSATIONS[convoIndex]

  const typeAnswer = (text: string, onDone?: () => void) => {
    setIsTyping(true)
    setDisplayedAnswer('')
    answerRef.current = ''
    let i = 0
    const type = () => {
      if (i < text.length) {
        answerRef.current += text[i]
        setDisplayedAnswer(answerRef.current)
        i++
        timerRef.current = setTimeout(type, 18)
      } else {
        setIsTyping(false)
        onDone?.()
      }
    }
    timerRef.current = setTimeout(type, 400)
  }

  useEffect(() => {
    typeAnswer(currentConvo.answer, () => {
      // After 6 seconds, cycle to next conversation
      timerRef.current = setTimeout(() => {
        setConvoIndex((i) => (i + 1) % CONVERSATIONS.length)
      }, 6000)
    })
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [convoIndex])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-cyan-400/80 text-xs font-mono tracking-widest">VYOMITRA COPILOT — ACTIVE</span>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1 min-h-[280px] max-h-[340px]">
        {/* Question bubble */}
        <div className="flex justify-end">
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%]">
            <p className="text-white/90 text-sm font-mono">{currentConvo.question}</p>
          </div>
        </div>

        {/* Answer bubble */}
        <div className="flex justify-start">
          <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[95%]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">V</span>
              </div>
              <span className="text-cyan-400/60 text-xs font-mono">VYOMITRA</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed font-mono">
              {displayedAnswer}
              {isTyping && (
                <motion.span
                  className="inline-block w-0.5 h-4 bg-cyan-400 ml-0.5 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Input bar (decorative) */}
      <div className="mt-4 flex gap-2">
        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white/30 text-sm font-mono">
          Ask VYOMITRA anything about your network...
        </div>
        <button className="px-4 py-2.5 bg-cyan-500/20 border border-cyan-500/40 rounded-xl text-cyan-400 text-sm font-mono hover:bg-cyan-500/30 transition-colors">
          ↑
        </button>
      </div>
    </div>
  )
}
