import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'framer-motion'

import { GalleryProvider } from '#/components/gallery/GalleryProvider'
import { IntroOverlay } from '#/components/intro/IntroOverlay'
import { Footer } from '#/components/layout/Footer'
import { Navbar } from '#/components/layout/Navbar'
import { About } from '#/components/sections/About'
import { Awards } from '#/components/sections/Awards'
import { Contact } from '#/components/sections/Contact'
import { Education } from '#/components/sections/Education'
import { Experience } from '#/components/sections/Experience'
import { Hero } from '#/components/sections/Hero'
import { Skills } from '#/components/sections/Skills'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    // `user` honours prefers-reduced-motion: transforms are skipped and only opacity fades remain.
    <MotionConfig reducedMotion="user">
      <IntroOverlay />
      <GalleryProvider>
        {/* On desktop the navbar and hero together fill the first screen, so nothing looks unfinished below the fold. */}
        <div className="flex flex-col lg:min-h-[min(100svh,1080px)]">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Skills />
        <Experience />
        <Education />
        <Awards />
        <Contact />
        <Footer />
      </GalleryProvider>
    </MotionConfig>
  )
}
