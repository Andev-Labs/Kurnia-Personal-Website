import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'framer-motion'

import { GalleryProvider } from '#/components/gallery/GalleryProvider'
import { Footer } from '#/components/layout/Footer'
import { Navbar } from '#/components/layout/Navbar'
import { About } from '#/components/sections/About'
import { Activities } from '#/components/sections/Activities'
import { Certifications } from '#/components/sections/Certifications'
import { Contact } from '#/components/sections/Contact'
import { Education } from '#/components/sections/Education'
import { Experience } from '#/components/sections/Experience'
import { Hero } from '#/components/sections/Hero'
import { ImpactStrip } from '#/components/sections/ImpactStrip'
import { Marquee } from '#/components/sections/Marquee'
import { Skills } from '#/components/sections/Skills'
import { m } from '#/paraglide/messages.js'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    // `user` honours prefers-reduced-motion: transforms are skipped and only opacity fades remain.
    <MotionConfig reducedMotion="user">
      <GalleryProvider>
        <a
          href="#main"
          className="fixed top-3 left-3 z-90 -translate-y-20 rounded-full bg-ink px-4 py-2 text-[14px] font-medium text-paper focus:translate-y-0"
        >
          {m.skip_link()}
        </a>
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <ImpactStrip />
          <Marquee />
          <About />
          <Experience />
          <Skills />
          <Education />
          <Certifications />
          <Activities />
          <Contact />
        </main>
        <Footer />
      </GalleryProvider>
    </MotionConfig>
  )
}
