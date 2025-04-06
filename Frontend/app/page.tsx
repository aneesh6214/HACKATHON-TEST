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

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-fixed bg-gradient-radial from-slate-900 via-blue-900 to-slate-900">
      {/* Animated particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>

      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex items-center h-14 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <span className="text-lg font-bold">WheelScore</span>
          </Link>
          <nav className="hidden md:flex justify-end flex-1 gap-12">
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
        {/* Welcome Section */}
        {/* <section id="welcome" className="w-full h-[650px] md:h-[650px] lg:h-[650px] pt-32"> */}
        <section id="welcome" className="w-full h-screen pt-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    AI Powered LLM Gemini API Wrapper Wheelchair Score
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    WheelScore is an application that uses the Gemini API to score an image or an STL 3d file based on how wheelchair accessible a space is.
                  </p>
                </div>
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
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="Hero"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center shadow-lg"
                  height="400"
                  src="/raw.png"
                  width="800"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        {/* <section
          id="features"
          className="w-full min-h-[500px] pt-8 pb-24 md:min-h-[600px] lg:min-h-[700px] bg-black/10 backdrop-blur-sm"
        > */}
        <section
          id="features"
          className="w-full h-screen pt-8 pb-24 bg-black/10 backdrop-blur-sm"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl pt-7">
                  Here's how to get started
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  WheelScore is designed to be user-friendly and intuitive. Follow these simple steps to get started:
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 bg-card/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Layers className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Go to the file upload page</h3>
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

        {/* About Section */}
        {/* <section
          id="about"
          className="w-full min-h-[550px] md:h-[550px] lg:h-[550px] py-0 pt-0 md:py-16 lg:py-32"
        > */}
        <section
          id="about"
          className="w-full h-screen py-0 pt-0 md:py-16 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              {/* Text content with negative margin to move up */}
              <div className="flex flex-col justify-start space-y-4 -mt-8">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                    About Us
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                    Our Story
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Founded in 2010, WheelScore has grown from a small startup to a global technology leader with
                    offices in over 30 countries.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="max-w-[600px] text-muted-foreground">
                    Our mission is to empower businesses with innovative technology solutions that drive growth and
                    transformation in the digital age.
                  </p>
                  <p className="max-w-[600px] text-muted-foreground">
                    With over 5,000 employees worldwide, we're committed to pushing the boundaries of what's possible in
                    technology.
                  </p>
                </div>
              </div>
              {/* Image container with negative margin */}
              <div className="flex items-center justify-center -mt-8">
                <img
                  alt="About Us"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center shadow-lg"
                  height="550"
                  src="/placeholder.svg?height=550&width=800"
                  width="800"
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
            <Link href="#" className="underline underline-offset-4 hover:text-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
