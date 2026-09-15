import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'framer-motion'

import { GalleryProvider } from '#/components/gallery/GalleryProvider'
import { Footer } from '#/components/layout/Footer'
import { Navbar } from '#/components/layout/Navbar'
import { About } from '#/components/sections/About'
import { Awards } from '#/components/sections/Awards'
import { Contact } from '#/components/sections/Contact'
import { Education } from '#/components/sections/Education'
import { Experience } from '#/components/sections/Experience'
import { Hero } from '#/components/sections/Hero'
import { Marquee } from '#/components/sections/Marquee'
import { Skills } from '#/components/sections/Skills'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    // `user` honours prefers-reduced-motion: transforms are skipped and only opacity fades remain.
    <MotionConfig reducedMotion="user">
      <GalleryProvider>
        <Navbar />
        <Hero />
        <Marquee />
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
