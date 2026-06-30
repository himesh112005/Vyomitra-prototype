'use client'
import dynamic from 'next/dynamic'
import CustomCursor from '@/components/ui/CustomCursor'
import MissionTimeline from '@/components/ui/MissionTimeline'
import Dashboard from '@/components/dashboard/Dashboard'
import ProcessFlow from '@/components/process/ProcessFlow'
import AirGapComparison from '@/components/comparison/AirGapComparison'
import TechBadges from '@/components/features/TechBadges'
import FeatureGrid from '@/components/features/FeatureGrid'
import Footer from '@/components/footer/Footer'
import ChatBotPopup from '@/components/ui/ChatBotPopup'

// Lazy-load heavy 3D sections
const HeroSection = dynamic(() => import('@/components/hero/HeroSection'), { ssr: false })
const SubtleAntigravity = dynamic(() => import('@/components/ui/SubtleAntigravity'), { ssr: false })
const Architecture3D = dynamic(() => import('@/components/architecture/Architecture3D'), { ssr: false })

export default function Home() {
  return (
    <>
      <CustomCursor />
      <MissionTimeline />
      
      <main className="relative bg-[#000408] min-h-screen">
        {/* Subtle global dark background with noise */}
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        
        {/* Subtle Antigravity 3D Background */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <SubtleAntigravity />
        </div>
        
        <div className="noise-overlay" />

        {/* 1. HERO */}
        <HeroSection />

        {/* Divider */}
        <div className="section-glow-divider" />

        {/* 2. DASHBOARD */}
        <div className="relative">
          {/* Subtle background nebula for dashboard */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(34,211,238,0.04) 0%, transparent 70%)',
            }}
          />
          <Dashboard />
        </div>

        {/* Divider */}
        <div className="section-glow-divider" />

        {/* 3. PROCESS FLOW */}
        <div className="relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(168,85,247,0.04) 0%, transparent 70%)',
            }}
          />
          <ProcessFlow />
        </div>

        {/* Divider */}
        <div className="section-glow-divider" />

        {/* 4. ARCHITECTURE 3D */}
        <div className="relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(249,115,22,0.04) 0%, transparent 70%)',
            }}
          />
          <Architecture3D />
        </div>

        {/* Divider */}
        <div className="section-glow-divider" />

        {/* 5. AIR-GAP COMPARISON */}
        <div className="relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(52,211,153,0.04) 0%, transparent 70%)',
            }}
          />
          <AirGapComparison />
        </div>

        {/* Divider */}
        <div className="section-glow-divider" />

        {/* 6. TECH BADGES */}
        <TechBadges />

        {/* Divider */}
        <div className="section-glow-divider" />

        {/* 7. FEATURE GRID */}
        <div className="relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)',
            }}
          />
          <FeatureGrid />
        </div>
      </main>

      {/* 8. FOOTER */}
      <Footer />

      {/* GLOBAL FLOATING UI */}
      <ChatBotPopup />
    </>
  )
}
