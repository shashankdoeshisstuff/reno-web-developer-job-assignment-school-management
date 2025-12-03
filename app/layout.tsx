import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'School Management System',
    template: '%s | School Management'
  },
  description: 'Complete Next.js 15 implementation of a school management system for web development assignment',
  keywords: ['Next.js 15', 'TypeScript', 'Supabase', 'School Management', 'Web Development'],
  authors: [{ name: 'Shashank Maurya' }],
  openGraph: {
    type: 'website',
    title: 'School Management System',
    description: 'Web development assignment implementation with Next.js 15 and TypeScript',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <Navigation />
          
          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  )
}