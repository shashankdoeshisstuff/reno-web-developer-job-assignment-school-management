import Link from 'next/link'
import { 
  CheckCircle, 
  Code, 
  Database, 
  ExternalLink, 
  FileText, 
  Github, 
  Globe, 
  Shield, 
  User, 
  Terminal,
  Server,
  ArrowRight,
  Upload,
  Search,
  Check,
  Layout,
  Smartphone,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export default function HomePage() {
  const requirements = [
    { 
      title: 'MySQL Table Structure',
      description: 'Created schools table with all required fields',
      icon: Database
    },
    { 
      title: 'Page 1: Add School Form',
      description: 'Form with validation, image upload, responsive design',
      icon: Upload
    },
    { 
      title: 'Page 2: School Display',
      description: 'E-commerce style listing with responsive grid',
      icon: Search
    },
    { 
      title: 'Submission Guidelines',
      description: 'GitHub repo, Vercel deployment, URLs submitted',
      icon: CheckCircle
    },
  ]

  const technologies = [
    { 
      icon: Layout, 
      name: 'Next.js 15', 
      description: 'App Router, Server Components'
    },
    { 
      icon: Code, 
      name: 'TypeScript', 
      description: 'Type safety, better DX'
    },
    { 
      icon: Database, 
      name: 'Supabase', 
      description: 'Database & Storage'
    },
    { 
      icon: Shield, 
      name: 'React Hook Form', 
      description: 'Form validation'
    },
    { 
      icon: Smartphone, 
      name: 'Tailwind CSS', 
      description: 'Responsive design'
    },
    { 
      icon: Zap, 
      name: 'Modern Stack', 
      description: 'Best practices'
    },
  ]

  const projectLinks = [
    {
      title: 'GitHub Repository',
      description: 'Complete source code',
      icon: Github,
      link: 'https://github.com/yourusername/school-management',
    },
    {
      title: 'Live Deployment',
      description: 'Hosted on Vercel',
      icon: Globe,
      link: 'https://school-management-reno.vercel.app',
    },
    {
      title: 'Add School Form',
      description: 'Page 1: Data Input',
      icon: FileText,
      link: '/add-school',
    },
    {
      title: 'View Schools',
      description: 'Page 2: Data Display',
      icon: ExternalLink,
      link: '/show-schools',
    },
  ]

  const keyFeatures = [
    'Complete form validation with Zod',
    'Image upload to Supabase Storage',
    'Fully responsive mobile-first design',
    'E-commerce style card layout',
    'Production-ready error handling',
    'One-click Vercel deployment',
  ]

  return (
    <div className="min-h-screen bg-background container mx-auto">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-primary/5 to-background">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
        <div className="container relative px-4 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <Badge 
              variant="secondary" 
              className="mb-6 sm:mb-8 rounded-full px-4 py-1.5 text-sm font-medium"
            >
              Web Development Assignment
            </Badge>
            
            {/* Main Title */}
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              School Management System
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl md:text-2xl">
              Complete Next.js 15 Implementation
            </p>
            
            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              A production-ready application implementing all assignment requirements with modern web technologies.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/add-school" className="flex items-center gap-2">
                  View Page 1: Add School
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link href="/show-schools" className="flex items-center gap-2">
                  View Page 2: Show Schools
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>

              {/* Portfolio Button for Mobile */}
              <div className="block sm:hidden w-full">
                <Button 
                  asChild 
                  size="lg" 
                  variant="secondary"
                  className="w-full"
                >
                  <Link
                    href="https://shashank-maurya-portfolio.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Developer Portfolio
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container px-4 py-8 sm:py-12 md:py-16">
        {/* Portfolio Button for Desktop */}
        <div className="hidden sm:flex items-center justify-center mb-8">
          <Button 
            asChild 
            size="lg"
            variant="secondary"
            className="gap-2"
          >
            <Link
              href="https://shashank-maurya-portfolio.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <User className="h-4 w-4" />
              View Developer Portfolio
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Assignment Summary */}
        <section className="mb-12 sm:mb-16">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl">
                Assignment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                Design a mini-project using JavaScript framework (React or Next.js) with MySQL 
                consisting of two pages: one page to input and store school data, another page 
                to fetch and display the data.
              </p>
              <div className="flex items-center justify-center gap-2 text-primary">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">All requirements successfully implemented</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Requirements Grid */}
        <section className="mb-12 sm:mb-16">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl">
                Assignment Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {requirements.map((req, index) => {
                  const Icon = req.icon
                  return (
                    <Card key={index} className="border">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-primary/10 p-2">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <CardTitle className="text-base sm:text-lg">
                            {req.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {req.description}
                        </p>
                        <div className="mt-4 flex items-center gap-1 text-sm text-green-600">
                          <Check className="h-4 w-4" />
                          Complete
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Technologies Used */}
        <section className="mb-12 sm:mb-16">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl">
                Technology Stack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {technologies.map((tech, index) => {
                  const Icon = tech.icon
                  return (
                    <Card key={index} className="border">
                      <CardContent className="flex flex-col items-center p-4 text-center">
                        <div className="mb-3 rounded-lg bg-primary/10 p-3">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-sm font-semibold">
                          {tech.name}
                        </CardTitle>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {tech.description}
                        </p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Key Features */}
        <section className="mb-12 sm:mb-16">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl">
                Key Implementation Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground sm:text-base">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Database Schema */}
        <section className="mb-12 sm:mb-16">
          <Card className="bg-muted/50">
            <CardHeader className="text-center">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl">
                Database Schema
              </CardTitle>
              <CardDescription>
                MySQL / Supabase implementation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg bg-background p-4">
                <pre className="text-sm text-muted-foreground">
                  <code>
{`CREATE TABLE schools (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact TEXT NOT NULL,
  image_url TEXT,
  email_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);`}
                  </code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* How to Run */}
        <section className="mb-12 sm:mb-16">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl">
                How to Run This Project
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Terminal className="h-5 w-5 text-primary" />
                    <h4 className="text-lg font-semibold">Local Development</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      { text: 'Clone repository', code: 'git clone [repo-url]' },
                      { text: 'Install dependencies', code: 'npm install' },
                      { text: 'Setup environment', code: 'cp .env.example .env.local' },
                      { text: 'Start dev server', code: 'npm run dev' },
                    ].map((step, index) => (
                      <div key={index} className="space-y-1">
                        <p className="text-sm font-medium">{step.text}</p>
                        <code className="block rounded bg-muted px-3 py-2 text-sm">
                          {step.code}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Server className="h-5 w-5 text-primary" />
                    <h4 className="text-lg font-semibold">Deployment</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      { text: 'Push to GitHub', code: 'git push origin main' },
                      { text: 'Deploy on Vercel', code: 'Import GitHub repo' },
                      { text: 'Add environment variables', code: 'Add Supabase keys' },
                      { text: 'Setup database', code: 'Run SQL from README' },
                    ].map((step, index) => (
                      <div key={index} className="space-y-1">
                        <p className="text-sm font-medium">{step.text}</p>
                        <code className="block rounded bg-muted px-3 py-2 text-sm">
                          {step.code}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button asChild size="lg" className="gap-2">
                  <a 
                    href="https://github.com/yourusername/school-management" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Get Started with Code
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8" />

        {/* Final CTA */}
        <section className="text-center">
          <Card className="border-primary/20">
            <CardHeader className="text-center">
              <Badge variant="outline" className="mx-auto mb-4">
                Assignment Complete
              </Badge>
              <CardTitle className="text-xl sm:text-2xl md:text-3xl">
                All Requirements Successfully Implemented
              </CardTitle>
              <CardDescription className="mx-auto max-w-2xl">
                This project demonstrates full implementation of the assignment specifications 
                using modern web development practices.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" variant="default" className="w-full sm:w-auto">
                  <Link href="/add-school" className="gap-2">
                    Test Page 1: Add School
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
                
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                  <a 
                    href="https://github.com/yourusername/school-management" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <Github className="h-4 w-4" />
                    View Source Code
                  </a>
                </Button>
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Developed by <span className="font-semibold">Shashank Maurya</span> • 
                  Web Development Assignment • 
                  Next.js 15 • TypeScript • Supabase
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Production-ready implementation with best practices
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}