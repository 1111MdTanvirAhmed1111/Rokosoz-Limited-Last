"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { useLanguage } from "@/contexts/language-context"

export default function AboutSection() {
  const isMobile = useIsMobile()
  const { t } = useLanguage()

  return (
    <section id="about" className="h-screen flex bg-[#111b3f] my-2 p-6 relative">
      {/* Vertical "ABOUT US" text */}
      <div className="hidden md:flex flex-col justify-center items-center border-r border-white/20 pr-6 mr-6">
        <div className="vertical-text -rotate-180  translate translate-y-40  translate-x-2   text-white tracking-widest text-xl font-medium whitespace-nowrap">
          ABOUT US
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center overflow-y-auto md:overflow-y-visible py-12 md:py-0">
        <div className="max-w-5xl mx-auto">
          {/* Mobile "ABOUT US" text */}
          <div className="md:hidden text-white tracking-widest text-xl font-medium mb-6">ABOUT US</div>

          {/* Heading */}
          <h2 className="text-sm text-white uppercase tracking-wider mb-6">{t("about.title")}</h2>

          {/* Main paragraph */}
          <p className="text-white text-xl md:text-3xl font-light leading-relaxed mb-16">{t("about.paragraph")}</p>

          {/* Three columns section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {/* Column 1 */}
            <div>
              <h3 className="text-white text-sm uppercase tracking-wider mb-3">{t("about.expertise.title")}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{t("about.expertise.text")}</p>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-white text-sm uppercase tracking-wider mb-3">{t("about.approach.title")}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{t("about.approach.text")}</p>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-white text-sm uppercase tracking-wider mb-3">{t("about.culture.title")}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{t("about.culture.text")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
