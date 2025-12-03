'use client'

import Link from 'next/link'
import { 
  Github, 
  Linkedin, 
  ExternalLink, 
  Mail, 
  School,
  Code,
  Database,
  Cloud,
  FileText,
  User,
  ChevronUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Project Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <School className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">School Management System</h3>
                  <p className="text-sm text-muted-foreground">Web Development Assignment</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Complete implementation using Next.js 15, TypeScript, and Supabase with responsive design.
              </p>
            </div>

            {/* Developer Info */}
            <div className="space-y-4">
              <h4 className="font-semibold">Developer</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Shashank Maurya</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Frontend Developer</span>
                </div>
                <Link
                  href="https://shashank-maurya-portfolio.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  View Portfolio
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold">Links</h4>
              <div className="space-y-3">
                <Link 
                  href="https://github.com/shashankdoeshisstuff"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub Profile</span>
                </Link>
                <Link 
                  href="https://linkedin.com/in/shashank-maurya-41a926217"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn Profile</span>
                </Link>
                <Link 
                  href="mailto:shashank.maurya.pro@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact Email</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mt-8 pt-8 border-t">
            <h4 className="mb-4 text-sm font-medium text-muted-foreground">Built With</h4>
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs">
                <Code className="h-3 w-3" />
                <span>Next.js 15</span>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs">
                <Code className="h-3 w-3" />
                <span>TypeScript</span>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs">
                <Database className="h-3 w-3" />
                <span>Supabase</span>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs">
                <Cloud className="h-3 w-3" />
                <span>Tailwind CSS</span>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs">
                <FileText className="h-3 w-3" />
                <span>React Hook Form</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="text-center md:text-left">
                <p className="text-sm text-muted-foreground">
                  © {currentYear} Shashank Maurya • Web Development Assignment
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  All requirements implemented • Production ready
                </p>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>+91-9219639278</span>
                <Separator orientation="vertical" className="h-4" />
                <span>Lucknow, India</span>
              </div>
            </div>
          </div>

          {/* Attribution */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Designed and developed with Shadcn UI • Fully responsive
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          variant="secondary"
          className="fixed bottom-6 right-6 z-50 shadow-lg"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      )}
    </>
  )
}