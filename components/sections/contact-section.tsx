"use client"

import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

export default function ContactSection() {
  const isMobile = useIsMobile()
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)
  const { t } = useLanguage()

  const socialMedia = [
    { id: "youtube", nameKey: "contact.youtube", url: "https://youtube.com" },
    { id: "instagram", nameKey: "contact.instagram", url: "https://instagram.com" },
    { id: "facebook", nameKey: "contact.facebook", url: "https://facebook.com" },
  ]

  return (
    <section id="contact" className="h-screen flex bg-[#111b3f] p-0 relative">
      {/* Vertical "CONTACT US" text */}
      <div className="hidden md:flex flex-col justify-center items-center border-r border-white/20 px-6">
        <div className="vertical-text -rotate-180 translate translate-y-40 translate-x-2 text-white tracking-widest text-xl font-medium whitespace-nowrap">
          CONTACT US
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-auto md:overflow-y-visible p-6 md:p-12">
        {/* Mobile "CONTACT US" text */}
        <div className="md:hidden text-white tracking-widest text-xl font-medium mb-8">CONTACT US</div>

        {/* Contacts section */}
        <div className="mb-16">
          <h2 className="text-white text-sm tracking-wider mb-8">{t("contact.contacts")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-sm mb-2">{t("contact.email")}</h3>
              <a
                href="mailto:hello@mmedia.solutions"
                className="text-gray-400 text-sm hover:text-white transition-colors"
              >
                office@rokoszlimited.com
              </a>
            </div>

       

            <div>
              <h3 className="text-white text-sm mb-2">{t("contact.address1")}</h3>
              <p className="text-gray-400 text-sm">{t("contact.address2")}</p>
            </div>
          </div>
        </div>

     

        {/* Call to action section */}
        <div className="mb-8 max-w-md">
          <p className="text-white text-sm leading-relaxed mb-8">{t("contact.cta")}</p>

          <a
            href="#"
            className="inline-flex items-center text-white text-sm tracking-wider hover:text-gray-300 transition-colors group"
          >
            {t("contact.quote")}
            <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-8">
          <p className="text-gray-400 text-xs">{t("contact.design")}</p>
        </div>
      </div>
    </section>
  )
}
