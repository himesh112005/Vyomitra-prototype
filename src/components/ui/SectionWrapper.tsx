'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionWrapperProps {
  id?: string
  children: ReactNode
  className?: string
  delay?: number
}

export default function SectionWrapper({ id, children, className = '', delay = 0 }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
}
