"use client"

import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

// Define sections
const sections = [
  { id: "about", labelKey: "nav.about" },
  { id: "services", labelKey: "nav.services" },
  { id: "portfolio", labelKey: "nav.portfolio" },
  { id: "contact", labelKey: "nav.contact" },
]

// Extend Window interface to include our custom function
declare global {
  interface Window {
    scrollToSection?: (sectionId: string) => void
  }
}

interface NavbarProps {
  activeSection: string
  mobileNavOpen: boolean
  setMobileNavOpen: (open: boolean) => void
}

export default function Navbar({ activeSection, mobileNavOpen, setMobileNavOpen }: NavbarProps) {
  const isMobile = useIsMobile()
  const { language, setLanguage, t } = useLanguage()

  const handleNavClick = (sectionId: string) => {
    // Use the global function set up by the main component
    if (window.scrollToSection) {
      window.scrollToSection(sectionId)
    }
  }

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen)
  }

  const toggleLanguage = (lang: "en" | "hu") => {
    setLanguage(lang)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-14 border-b-2 border-[#17275a] bg-[#111b3f]/90 backdrop-blur-sm z-50 px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-white cursor-pointer" onClick={() => handleNavClick("home")}>
          <Image src="/images/logo_text.png" alt="Rokosz" width={30} height={30} className="w-auto h-6" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center space-x-8">
          {sections.map((section) => (
            <button
              key={section.id}
              id={`nav-${section.id}`}
              onClick={() => handleNavClick(section.id)}
              className={cn(
                "text-sm uppercase tracking-wider font-medium transition-colors relative group",
                activeSection === section.id ? "text-white" : "text-gray-400 hover:text-white",
              )}
            >
              {t(section.labelKey)}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 w-full h-0.5 bg-white transition-all duration-300",
                  activeSection === section.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                )}
              />
            </button>
          ))}
        </div>

        {/* Language Selector */}
        <div className="hidden md:flex space-x-2 text-xs">
          <span
            className={cn(
              "cursor-pointer transition-colors",
              language === "en" ? "text-white" : "text-gray-400 hover:text-white",
            )}
            onClick={() => toggleLanguage("en")}
          >
            EN
          </span>
         
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          onClick={toggleMobileNav}
          aria-label="Toggle menu"
        >
          {mobileNavOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-[#111b3f] z-40 transition-transform duration-300 ease-in-out transform",
          mobileNavOpen ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="pt-20 px-6 flex flex-col space-y-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavClick(section.id)}
              className={cn(
                "text-xl uppercase tracking-wider font-medium py-3 border-b border-white/20 text-left",
                activeSection === section.id ? "text-white" : "text-gray-400",
              )}
            >
              {t(section.labelKey)}
            </button>
          ))}

          {/* Mobile Language Selector */}
          <div className="flex space-x-4 pt-4">
            <span
              className={cn("cursor-pointer", language === "en" ? "text-white" : "text-gray-400")}
              onClick={() => toggleLanguage("en")}
            >
              EN
            </span>
            <span
              className={cn("cursor-pointer", language === "hu" ? "text-white" : "text-gray-400")}
              onClick={() => toggleLanguage("hu")}
            >
              HU
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
