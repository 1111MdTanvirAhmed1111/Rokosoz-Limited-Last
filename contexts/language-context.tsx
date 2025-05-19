"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define available languages
export type Language = "en" | "hu"

// Define the context type
type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
})

// Translations object
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.about": "About",
    "nav.services": "Services",
    "nav.portfolio": "References",
    "nav.contact": "Contact",

    // Home section
    "home.title": "Welcome to Our Website",
    "home.subtitle": "Expert Film and Visual Content Production with Innovative Marketing Solutions",
    "home.button": "Get Started",

    // About section
    "about.title": "WHAT MAKES US DIFFERENT",
    "about.paragraph":
      "We take pride in our ability to represent diverse perspectives. Beyond creations tailored for the business world, we do not shy away from crafting an opera film or navigating an entire rehearsal process. As an observant and invisible eye, we seek those moments that make living and working in the realm of culture truly worthwhile.",
    "about.expertise.title": "Expertise in every segment",
    "about.expertise.text":
      "Be it a film, a corporate video or a creative marketing campaign, our work does not end with the actual production. Through our innovative solutions, we help our clients stand out in the competition both in the online space and the traditional media.",
    "about.approach.title": "Customer-centric approach, comprehensive representation",
    "about.approach.text":
      "Our services are not just tasks; they are personalized experiences where we pay attention to every detail. We do not act as mere service providers, but as creative partners who actively participate in the project, assisting our clients with unique storytelling and effective marketing solutions.",
    "about.culture.title": "Advocacy for culture",
    "about.culture.text":
      "We are deeply committed to supporting culture. Not only do we produce films, but we also endorse cultural projects.",

    // Services section
    "services.corporate": "CORPORATE FILM PRODUCTION",
    "services.cultural": "CULTURAL CONTENT PRODUCTION",
    "services.branding": "BRANDING / IMAGE",
    "services.ux": "UX / UI",
    "services.development": "DEVELOPMENT",
    "services.strategy": "STRATEGY",
    "services.branding.item1": "Image Design",
    "services.branding.item2": "Brand Development",
    "services.branding.item3": "Product Development",
    "services.corporate.item1": "Corporate Videos",
    "services.corporate.item2": "Product Demonstrations",
    "services.corporate.item3": "Company Profiles",
    "services.corporate.item4": "Event Coverage",
    "services.cultural.item1": "Documentary Films",
    "services.cultural.item2": "Cultural Events",
    "services.cultural.item3": "Art Exhibitions",
    "services.cultural.item4": "Performance Recordings",
    "services.ux.item1": "User Experience Design",
    "services.ux.item2": "Interface Design",
    "services.ux.item3": "Prototyping",
    "services.ux.item4": "Usability Testing",
    "services.development.item1": "Web Development",
    "services.development.item2": "Mobile Applications",
    "services.development.item3": "Custom Software",
    "services.development.item4": "E-commerce Solutions",
    "services.strategy.item1": "Marketing Strategy",
    "services.strategy.item2": "Content Strategy",
    "services.strategy.item3": "Brand Strategy",
    "services.strategy.item4": "Social Media Strategy",

    // Portfolio section
    "portfolio.project1.title": "R - GIFT CONCERT",
    "portfolio.project2.title": "THE TRIUMPH OF THE BODY",
    "portfolio.project3.title": "BE PROUD OF YOUR WORK, TOO! - WABERER'S RECRUITMENT ADVERTISEMENT",
    "portfolio.project4.title": "WELDING - PANNON LÉZER WORKSHOP",
    "portfolio.project5.title": "VASARELY MUSEUM - ART AND SPACE",

    // Contact section
    "contact.contacts": "CONTACTS",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.address1": "Budapest, 1146",
    "contact.address2": "Ajtony u. 3/B fsz 3",
    "contact.social": "SOCIAL MEDIA PLATFORMS",
    "contact.youtube": "YOUTUBE",
    "contact.instagram": "INSTAGRAM",
    "contact.facebook": "FACEBOOK",
    "contact.cta": "Request a custom proposal, and let us create stories together that make your messages indelible.",
    "contact.quote": "REQUEST A QUOTE",
    "contact.design": "DESIGN BY: WHATTHEBRAND©",
  },
  hu: {
    // Navigation
    "nav.about": "Rólunk",
    "nav.services": "Szolgáltatások",
    "nav.portfolio": "Referenciák",
    "nav.contact": "Kapcsolat",

    // Home section
    "home.title": "Üdvözöljük Weboldalunkon",
    "home.subtitle": "Szakértői Film és Vizuális Tartalom Készítés Innovatív Marketing Megoldásokkal",
    "home.button": "Kezdjük",

    // About section
    "about.title": "MI TESZ MINKET KÜLÖNLEGESSÉ",
    "about.paragraph":
      "Büszkék vagyunk arra, hogy képesek vagyunk különböző perspektívákat képviselni. Az üzleti világra szabott alkotásokon túl nem riadunk vissza egy operafilm elkészítésétől vagy egy teljes próbafolyamat végigkísérésétől. Megfigyelő és láthatatlan szemként keressük azokat a pillanatokat, amelyek igazán értékessé teszik a kultúra területén való életet és munkát.",
    "about.expertise.title": "Szakértelem minden szegmensben",
    "about.expertise.text":
      "Legyen szó filmről, vállalati videóról vagy kreatív marketing kampányról, munkánk nem ér véget a tényleges gyártással. Innovatív megoldásaink révén segítünk ügyfeleinknek kitűnni a versenyben mind az online térben, mind a hagyományos médiában.",
    "about.approach.title": "Ügyfélközpontú megközelítés, átfogó képviselet",
    "about.approach.text":
      "Szolgáltatásaink nem csupán feladatok; személyre szabott élmények, ahol minden részletre figyelünk. Nem egyszerű szolgáltatóként, hanem kreatív partnerként működünk, akik aktívan részt vesznek a projektben, segítve ügyfeleinket egyedi történetmeséléssel és hatékony marketing megoldásokkal.",
    "about.culture.title": "A kultúra támogatása",
    "about.culture.text":
      "Mélyen elkötelezettek vagyunk a kultúra támogatása mellett. Nemcsak filmeket készítünk, hanem kulturális projekteket is támogatunk.",

    // Services section
    "services.corporate": "VÁLLALATI FILMGYÁRTÁS",
    "services.cultural": "KULTURÁLIS TARTALOM KÉSZÍTÉS",
    "services.branding": "ARCULAT / IMÁZS",
    "services.ux": "UX / UI",
    "services.development": "FEJLESZTÉS",
    "services.strategy": "STRATÉGIA",
    "services.branding.item1": "Imázs Tervezés",
    "services.branding.item2": "Márka Fejlesztés",
    "services.branding.item3": "Termék Fejlesztés",
    "services.corporate.item1": "Vállalati Videók",
    "services.corporate.item2": "Termék Bemutatók",
    "services.corporate.item3": "Cégprofilok",
    "services.corporate.item4": "Esemény Közvetítés",
    "services.cultural.item1": "Dokumentumfilmek",
    "services.cultural.item2": "Kulturális Események",
    "services.cultural.item3": "Művészeti Kiállítások",
    "services.cultural.item4": "Előadás Felvételek",
    "services.ux.item1": "Felhasználói Élmény Tervezés",
    "services.ux.item2": "Felület Tervezés",
    "services.ux.item3": "Prototípus Készítés",
    "services.ux.item4": "Használhatósági Tesztelés",
    "services.development.item1": "Webfejlesztés",
    "services.development.item2": "Mobil Alkalmazások",
    "services.development.item3": "Egyedi Szoftverek",
    "services.development.item4": "E-kereskedelmi Megoldások",
    "services.strategy.item1": "Marketing Stratégia",
    "services.strategy.item2": "Tartalom Stratégia",
    "services.strategy.item3": "Márka Stratégia",
    "services.strategy.item4": "Közösségi Média Stratégia",

    // Portfolio section
    "portfolio.project1.title": "R - AJÁNDÉK KONCERT",
    "portfolio.project2.title": "A TEST DIADALA",
    "portfolio.project3.title": "LÉGY BÜSZKE A MUNKÁDRA! - WABERER'S TOBORZÁSI HIRDETÉS",
    "portfolio.project4.title": "HEGESZTÉS - PANNON LÉZER MŰHELY",
    "portfolio.project5.title": "VASARELY MÚZEUM - MŰVÉSZET ÉS TÉR",

    // Contact section
    "contact.contacts": "ELÉRHETŐSÉGEK",
    "contact.email": "Email",
    "contact.phone": "Telefon",
    "contact.address1": "Budapest, 1146",
    "contact.address2": "Ajtony u. 3/B fsz 3",
    "contact.social": "KÖZÖSSÉGI MÉDIA PLATFORMOK",
    "contact.youtube": "YOUTUBE",
    "contact.instagram": "INSTAGRAM",
    "contact.facebook": "FACEBOOK",
    "contact.cta":
      "Kérjen egyedi ajánlatot, és hagyja, hogy együtt olyan történeteket alkossunk, amelyek maradandóvá teszik üzeneteit.",
    "contact.quote": "AJÁNLATOT KÉREK",
    "contact.design": "TERVEZTE: WHATTHEBRAND©",
  },
}

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize with browser language or stored preference
  const [language, setLanguageState] = useState<Language>("en")

  // Load language preference from localStorage on mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") as Language
    if (storedLanguage && (storedLanguage === "en" || storedLanguage === "hu")) {
      setLanguageState(storedLanguage)
    }
  }, [])

  // Update localStorage when language changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext)
