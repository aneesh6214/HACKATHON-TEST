"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, Globe, Layers, Shield, Zap } from "lucide-react"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["welcome", "features", "about"]
      let currentSection = ""

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section
            break
          }
        }
      }

      // Remove active class from all nav links
      document.querySelectorAll("nav span[data-section]").forEach((el) => {
        el.parentElement?.classList.remove("active")
      })

      // Add active class to current section nav link
      if (currentSection) {
        const activeLink = document.querySelector(`nav span[data-section="${currentSection}"]`)
        activeLink?.parentElement?.classList.add("active")
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check
    setTimeout(handleScroll, 100)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop, // Offset for header
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-fixed bg-gradient-radial from-slate-900 via-blue-900 to-slate-900">
      {/* Animated blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>

      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-14 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <span className="text-lg font-bold">WheelScore</span>
          </Link>
          <nav className="flex flex-nowrap justify-end gap-12">
            <Link
              href="#welcome"
              className="text-sm font-medium transition-colors hover:text-primary relative group"
              onClick={(e) => scrollToSection(e, "welcome")}
            >
              Welcome
              <span
                className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-[.active]:scale-x-100 transition-transform"
                data-section="welcome"
              ></span>
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium transition-colors hover:text-primary relative group"
              onClick={(e) => scrollToSection(e, "features")}
            >
              Features
              <span
                className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-[.active]:scale-x-100 transition-transform"
                data-section="features"
              ></span>
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium transition-colors hover:text-primary relative group"
              onClick={(e) => scrollToSection(e, "about")}
            >
              About
              <span
                className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-[.active]:scale-x-100 transition-transform"
                data-section="about"
              ></span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* WELCOME / HERO SECTION */}
        <section
          id="welcome"
          // Changed from h-screen -> remove forced height, add vertical padding
          className="relative flex items-center justify-center w-full py-20"
        >
          <div
            // Add negative translate only at md breakpoint
            className="container flex flex-col gap-6 px-4 md:px-6 items-center justify-center text-center md:-translate-y-10"
          >
            <h1 className="
              text-5xl      
              sm:text-5xl   
              md:text-4xl
              font-bold
              leading-tight">
              Powering the Future of Technology
            </h1>

            <p className="max-w-[600px] text-base text-muted-foreground md:text-lg lg:text-xl">
              Innovative solutions that transform businesses and drive growth in the digital age.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/upload">
                <Button size="lg" className="inline-flex items-center gap-2">
                  Upload your environment / device
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
            <div className="flex items-center justify-center mt-8">
              {/* Wrap image in a max-w container for small screens */}
              <div className="mx-auto max-w-xl">
                <img
                  alt="Hero"
                  className="aspect-video w-full h-auto rounded-xl object-cover object-center shadow-lg"
                  src="/placeholder.svg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section
          id="features"
          // Remove h-screen, apply min-h to keep some height but still flexible
          className="relative flex items-center justify-center w-full min-h-screen bg-black/10 backdrop-blur-sm py-20"
        >
          <div
            // Negative translate only at md
            className="container flex flex-col items-center justify-center px-4 md:px-6 text-center md:-translate-y-24"
          >
            <div className="space-y-2 mb-8">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                How to Navigate
              </h2>
              <p className="mx-auto max-w-[900px] text-muted-foreground md:text-lg lg:text-xl">
                Discover how to get the most out of our website with these helpful navigation tips.
              </p>
            </div>
            {/* More responsive grid: 1 -> 2 -> 3 columns */}
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 bg-card/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Layers className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Browse Features</h3>
                <p className="text-center text-muted-foreground">
                  Use the navigation bar at the top to quickly jump between different sections of our website.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 bg-card/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Learn About Us</h3>
                <p className="text-center text-muted-foreground">
                  Visit our About section to learn more about our company history and mission.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 bg-card/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Get Support</h3>
                <p className="text-center text-muted-foreground">
                  Need help? Check out our support resources or contact us through the links in the footer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section
          id="about"
          // Remove h-screen, just use py-20
          className="relative flex items-center justify-center w-full py-20"
        >
          <div
            // Negative translate only at md
            className="container flex flex-col items-center justify-center px-4 md:px-6 text-center gap-6 md:-translate-y-10"
          >
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                About Us
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Our Story
              </h2>
              <p className="max-w-[600px] mx-auto text-muted-foreground md:text-lg lg:text-xl">
                Founded in 2010, WheelScore has grown from a small startup to a global technology leader
                with offices in over 30 countries.
              </p>
            </div>
            <div className="space-y-2 max-w-[600px] mx-auto">
              <p className="text-muted-foreground">
                Our mission is to empower businesses with innovative technology solutions that drive
                growth and transformation in the digital age.
              </p>
              
            </div>
            <div className="flex items-center justify-center mt-8">
              {/* Wrap image in a container for small screens */}
              <div className="mx-auto max-w-xl">
                <img
                  alt="About Us"
                  className="aspect-video w-full h-auto rounded-xl object-cover object-center shadow-lg"
                  src="/placeholder.svg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0 relative z-10 bg-background/80 backdrop-blur-sm">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 WheelScore. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
