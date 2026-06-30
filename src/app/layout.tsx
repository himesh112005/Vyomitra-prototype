import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VYOMITRA — Predictive Copilot for MPLS Networks',
  description:
    'Air-gapped, multi-agent predictive copilot for MPLS network operations. 100% local inference, zero egress. Built for ISRO Bharatiya Antariksh Hackathon 2026.',
  keywords: ['VYOMITRA', 'MPLS', 'network operations', 'air-gapped AI', 'ISRO', 'predictive copilot'],
  openGraph: {
    title: 'VYOMITRA — Predictive Copilot for MPLS Networks',
    description: 'Air-gapped, multi-agent predictive copilot for secure MPLS operations.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#000408] text-white antialiased cursor-none selection:bg-cyan-500/30">
        {children}
      </body>
    </html>
  )
}
