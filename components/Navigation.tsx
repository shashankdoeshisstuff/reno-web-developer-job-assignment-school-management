'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Plus, 
  School, 
  Menu, 
  X,
  User,
  ExternalLink,
  FileText,
  Search
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { 
      href: '/', 
      label: 'Home', 
      icon: Home,
    },
    { 
      href: '/add-school', 
      label: 'Add School', 
      icon: Plus,
    },
    { 
      href: '/show-schools', 
      label: 'View Schools', 
      icon: Search,
    },
  ]

  return (
    <>
      {/* Main Navigation */}
      <nav className={cn(
        "sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b transition-all duration-300",
        scrolled && "shadow-sm"
      )}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <Link 
              href="/" 
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="rounded-lg bg-primary/10 p-2">
                <School className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold">
                  School Management
                </span>
                <span className="hidden sm:block text-xs text-muted-foreground">
                  Web Development Assignment
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {links.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              
              return (
                <Button
                  key={link.href}
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <Link href={link.href}>
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </Button>
              )
            })}
            
            <Separator orientation="vertical" className="h-6 mx-2" />
            
            <Button 
              asChild
              size="sm"
              variant="outline"
              className="gap-2"
            >
              <a
                href="https://shashank-maurya-portfolio.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <User className="h-4 w-4" />
                Portfolio
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="hidden sm:flex gap-2"
            >
              <a
                href="https://shashank-maurya-portfolio.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <User className="h-4 w-4" />
                Portfolio
              </a>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t">
            <div className="container px-4 py-4 space-y-2">
              {links.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                
                return (
                  <Button
                    key={link.href}
                    asChild
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3"
                  >
                    <Link href={link.href}>
                      <Icon className="h-4 w-4" />
                      {link.label}
                      {isActive && (
                        <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
                      )}
                    </Link>
                  </Button>
                )
              })}
              
              <Separator className="my-2" />
              
              <Button
                asChild
                variant="outline"
                className="w-full justify-start gap-3"
              >
                <a
                  href="https://shashank-maurya-portfolio.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <User className="h-4 w-4" />
                  Developer Portfolio
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              </Button>

              <div className="pt-4 border-t text-center">
                <p className="text-xs text-muted-foreground">
                  Developed by Shashank Maurya
                </p>
                <p className="text-xs text-muted-foreground">
                  Next.js 15 • TypeScript • Supabase
                </p>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}