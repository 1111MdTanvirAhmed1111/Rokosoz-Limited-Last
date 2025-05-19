"use client"

import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

export default function ServicesSection() {
  const isMobile = useIsMobile()
  const [expandedCategory, setExpandedCategory] = useState("branding")
  const { t } = useLanguage()

  // Define service categories and their sub-items with translation keys
  const serviceCategories = [
    {
      id: "corporate",
      titleKey: "services.corporate",
      subItemKeys: [
        "services.corporate.item1",
        "services.corporate.item2",
        "services.corporate.item3",
        "services.corporate.item4",
      ],
    },
    {
      id: "cultural",
      titleKey: "services.cultural",
      subItemKeys: [
        "services.cultural.item1",
        "services.cultural.item2",
        "services.cultural.item3",
        "services.cultural.item4",
      ],
    },
    {
      id: "branding",
      titleKey: "services.branding",
      subItemKeys: ["services.branding.item1", "services.branding.item2", "services.branding.item3"],
    },
    {
      id: "ux",
      titleKey: "services.ux",
      subItemKeys: ["services.ux.item1", "services.ux.item2", "services.ux.item3", "services.ux.item4"],
    },
    {
      id: "development",
      titleKey: "services.development",
      subItemKeys: [
        "services.development.item1",
        "services.development.item2",
        "services.development.item3",
        "services.development.item4",
      ],
    },
    {
      id: "strategy",
      titleKey: "services.strategy",
      subItemKeys: [
        "services.strategy.item1",
        "services.strategy.item2",
        "services.strategy.item3",
        "services.strategy.item4",
      ],
    },
  ]

  const toggleCategory = (categoryId: string) => {
    // If clicking the already expanded category, collapse it
    // Otherwise, expand the clicked category (which automatically collapses any other)
    setExpandedCategory(expandedCategory === categoryId ? "" : categoryId)
  }

  return (
    <section className="h-screen flex bg-[#111b3f] p-0 relative">
      {/* Vertical "SERVICES" text */}
      <div className="hidden md:flex flex-col justify-center items-center border-r border-white/20 px-6">
        <div className="vertical-text -rotate-180 translate translate-y-40 translate-x-2 text-white tracking-widest text-xl font-medium whitespace-nowrap">
          SERVICES
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-auto md:overflow-y-visible">
        {/* Mobile "SERVICES" text */}
        <div className="md:hidden text-white tracking-widest text-xl font-medium p-6 border-b border-white/20">
          SERVICES
        </div>

        {/* Service categories */}
        <div className="flex-1">
          {serviceCategories.map((category) => (
            <div key={category.id} className="border-b border-white/20">
              <button
                className="w-full text-left py-6 px-6 md:px-12 flex justify-between items-center focus:outline-none group"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center">
                  <span className="text-white mr-3">•</span>
                  <span className="text-white text-sm md:text-base tracking-wider group-hover:text-gray-300 transition-colors">
                    {t(category.titleKey)}
                  </span>
                </div>
                <span className="text-white">
                  {expandedCategory === category.id ? (
                    <ChevronUp size={16} className="opacity-60" />
                  ) : (
                    <ChevronDown size={16} className="opacity-60" />
                  )}
                </span>
              </button>

              {/* Sub-items */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  expandedCategory === category.id ? "max-h-60" : "max-h-0",
                )}
              >
                <div className="pl-12 pr-6 pb-6">
                  {category.subItemKeys.map((itemKey, index) => (
                    <div key={index} className="text-gray-400 text-sm py-1.5">
                      {t(itemKey)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
