import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Web Developer Portfolio | Senior Web Developer',
  description: 'Professional portfolio of a senior web developer with 4 years of experience. Specialized in React, Next.js, TypeScript, and modern web development.',
  keywords: 'web developer, react developer, next.js developer, typescript, frontend developer, portfolio',
  authors: [{ name: 'Web Developer' }],
  openGraph: {
    title: 'Web Developer Portfolio',
    description: 'Senior Web Developer specializing in React, Next.js, and TypeScript',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Developer Portfolio',
    description: 'Senior Web Developer specializing in React, Next.js, and TypeScript',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  )
}

