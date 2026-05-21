'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

import Loader from '@/components/animations/Loader'
import FloatingLogo from '@/components/animations/FloatingLogo'

import ScrollButton from '@/components/ui/ScrollButton'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function AppShell({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isHome = pathname === '/'

  const [loaderDone, setLoaderDone] = useState(!isHome)

  const [logoInNavbar, setLogoInNavbar] = useState(false)

  return (
    <>
      {isHome && !loaderDone && (
        <Loader onComplete={() => setLoaderDone(true)} />
      )}

      <FloatingLogo
        loaderDone={loaderDone}
        onNavbarArrival={setLogoInNavbar}
        isHome={isHome}
      />

      <AnimatePresence mode="wait">
        {loaderDone && (
          <motion.div
            key="page"
            initial={isHome ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1] as const,
              delay: isHome ? 0.1 : 0,
            }}
            className="relative flex min-h-screen flex-col overflow-hidden"
          >

            <div className="relative z-10 flex min-h-screen flex-col">
              <Navbar logoInNavbar={logoInNavbar} />

              <main className="flex-1">
                {children}
              </main>

              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollButton />
    </>
  )
}
