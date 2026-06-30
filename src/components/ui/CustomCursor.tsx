'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const springConfig = { damping: 25, stiffness: 300 }
  const ringX = useSpring(0, springConfig)
  const ringY = useSpring(0, springConfig)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window
    if (isTouchDevice) return

    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      ringX.set(e.clientX)
      ringY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('button, a, [data-cursor-hover]')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [ringX, ringY, isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-cyan-400 pointer-events-none mix-blend-screen"
        style={{
          left: position.x,
          top: position.y,
          x: "-50%",
          y: "-50%",
          boxShadow: '0 0 8px 2px rgba(34,211,238,0.8)',
        }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          left: ringX,
          top: ringY,
          x: "-50%",
          y: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border border-cyan-400/60"
          animate={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            borderColor: isHovering ? 'rgba(34,211,238,0.9)' : 'rgba(34,211,238,0.4)',
            boxShadow: isHovering ? '0 0 16px 4px rgba(34,211,238,0.4)' : '0 0 8px 2px rgba(34,211,238,0.2)',
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  )
}
