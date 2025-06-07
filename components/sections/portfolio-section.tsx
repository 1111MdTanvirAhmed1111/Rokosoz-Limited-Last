"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { useLanguage } from "@/contexts/language-context"

export default function PortfolioSection() {
  const isMobile = useIsMobile()
  const { t } = useLanguage()

  return (
    <section id="portfolio" className="h-screen flex bg-[#111b3f] p-0 relative">
      {/* Vertical "REFERENCES" text */}
      <div className="hidden md:flex flex-col justify-center items-center border-r border-white/20 px-6">
        <div className="vertical-text -rotate-180 translate translate-y-40 translate-x-2 text-white tracking-widest text-xl font-medium whitespace-nowrap">
          REFERENCES
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-auto md:overflow-y-visible">
        {/* Mobile "REFERENCES" text */}
        <div className="md:hidden text-white tracking-widest text-xl font-medium p-6 border-b border-white/20">
          REFERENCES
        </div>

        {/* Portfolio grid - custom layout to match the reference image */}
        <div className="grid grid-cols-1 md:grid-cols-5 auto-rows-auto h-[calc(100vh-60px)]">
          {/* Project 1: R - GIFT CONCERT */}
          <div className="relative md:col-span-1 md:row-span-1 border-b border-r border-white/10 overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt={t("portfolio.project1.title")}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
              <div className="flex justify-between items-start">
                <span className="text-white text-xs">2016/08</span>
                <span className="text-white text-xs">02</span>
              </div>
              <h3 className="text-white text-sm font-medium">{t("portfolio.project1.title")}</h3>
            </div>
          </div>

          {/* Project 2: THE TRIUMPH OF THE BODY */}
          <div className="relative md:col-span-1 md:row-span-2 border-b border-r border-white/10 overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="/placeholder.svg?height=600&width=300"
                alt={t("portfolio.project2.title")}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
              <div className="flex justify-between items-start">
                <span className="text-white text-xs">2019/05</span>
                <span className="text-white text-xs">03</span>
              </div>
              <h3 className="text-white text-sm font-medium">{t("portfolio.project2.title")}</h3>
            </div>
          </div>

          {/* Project 3: BE PROUD OF YOUR WORK, TOO! */}
          <div className="relative md:col-span-1 md:row-span-1 border-b border-r border-white/10 overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt={t("portfolio.project3.title")}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
              <div className="flex justify-between items-start">
                <span className="text-white text-xs">2016/04</span>
                <span className="text-white text-xs">04</span>
              </div>
              <h3 className="text-white text-sm font-medium max-w-[90%] leading-tight">
                {t("portfolio.project3.title")}
              </h3>
            </div>
          </div>

          {/* Project 4: WELDING - PANNON LÉZER WORKSHOP */}
          <div className="relative md:col-span-1 md:row-span-1 border-b border-r border-white/10 overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt={t("portfolio.project4.title")}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
              <div className="flex justify-between items-start">
                <span className="text-white text-xs">2016</span>
                <span className="text-white text-xs">05</span>
              </div>
              <h3 className="text-white text-sm font-medium">{t("portfolio.project4.title")}</h3>
            </div>
          </div>

          {/* Project 5: VASARELY MUSEUM - ART AND SPACE */}
          <div className="relative md:col-span-1 md:row-span-2 border-b border-r border-white/10 overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="/placeholder.svg?height=600&width=300"
                alt={t("portfolio.project5.title")}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
              <div className="flex justify-between items-start">
                <span className="text-white text-xs">2019/07</span>
              </div>
              <h3 className="text-white text-sm font-medium">{t("portfolio.project5.title")}</h3>
            </div>
          </div>
        </div>

        {/* Bottom timeline */}
        <div className="flex items-center p-4 border-t border-white/20">
          <span className="text-white text-xs mr-2">01/07</span>
          <div className="h-0.5 bg-white/50 flex-grow">
            <div className="h-full bg-white w-[15%]"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
