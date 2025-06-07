"use client"

import { useEffect, useRef, useState } from "react"
import Navbar from "@/components/navbar"
import HomeSection from "@/components/sections/home-section"
import AboutSection from "@/components/sections/about-section"
import ServicesSection from "@/components/sections/services-section"
import PortfolioSection from "@/components/sections/portfolio-section"
import ContactSection from "@/components/sections/contact-section"
import ScrollIndicator from "@/components/scroll-indicator"
import { useIsMobile } from "@/hooks/use-mobile"

// Define sections
const SECTIONS = [
  { id: "home", component: HomeSection },
  { id: "about", component: AboutSection },
  { id: "services", component: ServicesSection },
  { id: "portfolio", component: PortfolioSection },
  { id: "contact", component: ContactSection },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrolling = useRef(false)
  const currentPosition = useRef(0)
  const targetPosition = useRef(0)
  const maxScrollRef = useRef(0)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const lastTouchX = useRef(0)
  const isTouching = useRef(false)
  const touchVelocity = useRef(0)
  const isMobile = useIsMobile()

  // Initialize horizontal scroll
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Calculate max scroll distance
    const updateMaxScroll = () => {
      maxScrollRef.current = container.scrollWidth - window.innerWidth
    }

    updateMaxScroll()

    // Variables for smooth scrolling
    let animationFrame: number | null = null
    let momentumAnimationFrame: number | null = null
    let lastTimestamp = 0

    // Function to handle smooth scrolling animation
    const smoothScroll = (timestamp: number) => {
      // Calculate time delta for consistent animation speed
      const delta = lastTimestamp ? (timestamp - lastTimestamp) / 16 : 1
      lastTimestamp = timestamp

      // Calculate distance to target
      const distance = targetPosition.current - currentPosition.current

      // If we're close enough to the target, snap to it
      if (Math.abs(distance) < 5) {
        currentPosition.current = targetPosition.current
        scrolling.current = false
      } else {
        // Otherwise, move a percentage of the way there (easing)
        // Much higher easing factor for faster navigation to sections
        currentPosition.current += distance * 0.25 * delta
        scrolling.current = true
      }

      // Ensure we don't scroll past boundaries
      currentPosition.current = Math.max(0, Math.min(maxScrollRef.current, currentPosition.current))

      // Apply the transform
      container.style.transform = `translateX(${-currentPosition.current}px)`

      // Update scroll progress
      const progress = maxScrollRef.current > 0 ? currentPosition.current / maxScrollRef.current : 0
      setScrollProgress(progress)

      // Update active section based on current position
      updateActiveSection()

      // Continue animation if still scrolling
      if (scrolling.current) {
        animationFrame = requestAnimationFrame(smoothScroll)
      } else if (animationFrame) {
        lastTimestamp = 0
        cancelAnimationFrame(animationFrame)
        animationFrame = null
      }
    }

    // Function to handle momentum scrolling after touch end
    const momentumScroll = () => {
      if (Math.abs(touchVelocity.current) < 0.5) {
        touchVelocity.current = 0
        if (momentumAnimationFrame) {
          cancelAnimationFrame(momentumAnimationFrame)
          momentumAnimationFrame = null
        }
        return
      }

      // Apply friction to slow down
      touchVelocity.current *= 0.95

      // Update target position based on velocity
      targetPosition.current += touchVelocity.current

      // Ensure we don't scroll past boundaries
      targetPosition.current = Math.max(0, Math.min(maxScrollRef.current, targetPosition.current))

      // Start smooth scrolling if not already running
      if (!animationFrame) {
        animationFrame = requestAnimationFrame(smoothScroll)
      }

      // Continue momentum animation
      momentumAnimationFrame = requestAnimationFrame(momentumScroll)
    }

    // Function to update active section based on scroll position
    const updateActiveSection = () => {
      // Find which section is most visible
      const viewportCenter = currentPosition.current + window.innerWidth / 2

      // Get all section elements
      const sectionElements = Array.from(container.children) as HTMLElement[]

      // Find which section contains the center point of the viewport
      for (let i = 0; i < sectionElements.length; i++) {
        const section = sectionElements[i]
        const sectionLeft = section.offsetLeft
        const sectionRight = sectionLeft + section.offsetWidth

        if (viewportCenter >= sectionLeft && viewportCenter < sectionRight) {
          const newActiveSection = section.id
          if (newActiveSection !== activeSection) {
            setActiveSection(newActiveSection)
          }
          break
        }
      }
    }

    // Handle wheel events
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      // Calculate new target position based on wheel delta
      const sensitivity = isMobile ? 1 : 2 // Lower sensitivity on mobile
      const delta = (e.deltaY || e.deltaX) * sensitivity
      targetPosition.current = Math.max(0, Math.min(maxScrollRef.current, targetPosition.current + delta))

      // Start smooth scrolling if not already running
      if (!animationFrame) {
        lastTimestamp = 0
        animationFrame = requestAnimationFrame(smoothScroll)
      }
    }

    // Handle touch start
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return

      // Cancel any ongoing animations
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
        animationFrame = null
      }
      if (momentumAnimationFrame) {
        cancelAnimationFrame(momentumAnimationFrame)
        momentumAnimationFrame = null
      }

      // Record the starting position
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
      lastTouchX.current = touchStartX.current
      isTouching.current = true
      touchVelocity.current = 0
    }

    // Handle touch move
    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching.current || e.touches.length !== 1) return

      const touchX = e.touches[0].clientX
      const touchY = e.touches[0].clientY

      // Calculate horizontal and vertical movement
      const deltaX = lastTouchX.current - touchX
      const deltaY = touchStartY.current - touchY

      // If scrolling more horizontally than vertically, prevent default to avoid page scrolling
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault()
      }

      // Update velocity (for momentum)
      touchVelocity.current = deltaX * 0.8 + touchVelocity.current * 0.2

      // Update position
      currentPosition.current += deltaX
      targetPosition.current = currentPosition.current

      // Ensure we don't scroll past boundaries
      currentPosition.current = Math.max(0, Math.min(maxScrollRef.current, currentPosition.current))
      targetPosition.current = currentPosition.current

      // Apply the transform directly for responsive touch movement
      container.style.transform = `translateX(${-currentPosition.current}px)`

      // Update scroll progress
      const progress = maxScrollRef.current > 0 ? currentPosition.current / maxScrollRef.current : 0
      setScrollProgress(progress)

      // Update active section
      updateActiveSection()

      // Update last touch position
      lastTouchX.current = touchX
    }

    // Handle touch end
    const handleTouchEnd = () => {
      isTouching.current = false

      // Start momentum scrolling if there's velocity
      if (Math.abs(touchVelocity.current) > 0.5) {
        momentumAnimationFrame = requestAnimationFrame(momentumScroll)
      }
    }

    // Handle scroll indicator click
    window.handleScrollIndicatorClick = (progress: number) => {
      targetPosition.current = progress * maxScrollRef.current

      if (!animationFrame) {
        lastTimestamp = 0
        animationFrame = requestAnimationFrame(smoothScroll)
      }
    }

    // Expose scrollToSection function globally
    window.scrollToSection = (sectionId: string) => {
      // Close mobile nav if open
      setMobileNavOpen(false)

      const sectionIndex = SECTIONS.findIndex((section) => section.id === sectionId)
      if (sectionIndex !== -1) {
        // Calculate target position - each section is full viewport width
        const targetPos = sectionIndex * window.innerWidth

        console.log(`Scrolling to section: ${sectionId}, index: ${sectionIndex}, targetPos: ${targetPos}, currentPos: ${currentPosition.current}`)
        console.log(`Window width: ${window.innerWidth}, maxScroll: ${maxScrollRef.current}`)

        // Cancel any existing animations
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
          animationFrame = null
        }
        if (momentumAnimationFrame) {
          cancelAnimationFrame(momentumAnimationFrame)
          momentumAnimationFrame = null
        }

        // Set both current and target position for immediate jump
        currentPosition.current = targetPos
        targetPosition.current = targetPos

        // Apply transform immediately
        container.style.transform = `translateX(${-targetPos}px)`
        console.log(`Applied transform: translateX(${-targetPos}px)`)

        // Update scroll progress immediately
        const progress = maxScrollRef.current > 0 ? targetPos / maxScrollRef.current : 0
        setScrollProgress(progress)
        console.log(`Updated progress: ${progress}`)

        // Update active section immediately
        updateActiveSection()

        // Stop any scrolling animation
        scrolling.current = false

        console.log(`Scroll completed. New currentPos: ${currentPosition.current}, targetPos: ${targetPosition.current}`)
      }
    }

    // Handle resize
    const handleResize = () => {
      // Recalculate max scroll
      updateMaxScroll()

      // Ensure current position is still valid
      currentPosition.current = Math.min(currentPosition.current, maxScrollRef.current)
      targetPosition.current = currentPosition.current

      // Apply the transform immediately
      container.style.transform = `translateX(${-currentPosition.current}px)`

      // Update scroll progress
      const progress = maxScrollRef.current > 0 ? currentPosition.current / maxScrollRef.current : 0
      setScrollProgress(progress)
    }

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault()
        targetPosition.current = Math.min(maxScrollRef.current, targetPosition.current + window.innerWidth * 0.1)
        if (!animationFrame) {
          lastTimestamp = 0
          animationFrame = requestAnimationFrame(smoothScroll)
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        targetPosition.current = Math.max(0, targetPosition.current - window.innerWidth * 0.1)
        if (!animationFrame) {
          lastTimestamp = 0
          animationFrame = requestAnimationFrame(smoothScroll)
        }
      }
    }

    // Add event listeners
    container.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("touchstart", handleTouchStart, { passive: true })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    container.addEventListener("touchend", handleTouchEnd)
    window.addEventListener("resize", handleResize)
    window.addEventListener("keydown", handleKeyDown)

    // Initial setup
    handleResize()

    // Clean up
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      if (momentumAnimationFrame) {
        cancelAnimationFrame(momentumAnimationFrame)
      }
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("keydown", handleKeyDown)
      // @ts-ignore - Clean up global functions
      window.scrollToSection = undefined
      window.handleScrollIndicatorClick = undefined
    }
  }, [activeSection, isMobile])

  return (
    <main className="h-screen overflow-hidden bg-[#111b3f] text-white relative">
      <Navbar activeSection={activeSection} mobileNavOpen={mobileNavOpen} setMobileNavOpen={setMobileNavOpen} />
      <div ref={containerRef} className="flex h-screen transition-transform duration-300 ease-out" style={{ paddingTop: "56px" }}>
        {SECTIONS.map(({ id, component: Component }) => (
          <section key={id} id={id} className="w-screen h-screen flex-shrink-0">
            <Component />
          </section>
        ))}
      </div>
      <ScrollIndicator progress={scrollProgress} />
    </main>
  )
}
