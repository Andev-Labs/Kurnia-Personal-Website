import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'framer-motion'

import { GalleryProvider } from '#/components/gallery/GalleryProvider'
import { WelcomeIntro } from '#/components/intro/WelcomeIntro'
import { Footer } from '#/components/layout/Footer'
import { Navbar } from '#/components/layout/Navbar'
import { About } from '#/components/sections/About'
import { Activities } from '#/components/sections/Activities'
import { Awards } from '#/components/sections/Awards'
import { Contact } from '#/components/sections/Contact'
import { Education } from '#/components/sections/Education'
import { Experience } from '#/components/sections/Experience'
import { Hero } from '#/components/sections/Hero'
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
          className="fixed top-3 left-3 z-90 -translate-y-20 rounded-full bg-violet px-4 py-2 text-[14px] font-bold text-white focus:translate-y-0 print:hidden"
        >
          {m.skip_link()}
        </a>
        <WelcomeIntro />
        {/* On desktop the navbar and hero together fill the first screen, so nothing looks unfinished below the fold. */}
        <div className="flex flex-col lg:min-h-[min(100svh,1080px)]">
          <Navbar />
          <Hero />
        </div>
        <main id="main" tabIndex={-1} className="pb-16 outline-none lg:pb-24">
          <About />
          <Skills />
          <Experience />
          <Education />
          <Awards />
          <Activities />
          <Contact />
        </main>
        <Footer />
      </GalleryProvider>
    </MotionConfig>
  )
}
