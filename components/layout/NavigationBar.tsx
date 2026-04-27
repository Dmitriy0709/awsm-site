'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, CTA_LINK } from '@/constants/navigation'
import { Button } from '@/components/ui/Button'

const menuVariants = {
  hidden:  { opacity: 0, height: 0, y: -8 },
  visible: {
    opacity: 1, height: 'auto', y: 0,
    transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], staggerChildren: 0.05, delayChildren: 0.04 },
  },
  exit: {
    opacity: 0, height: 0, y: -8,
    transition: { duration: 0.22, ease: [0.7, 0, 0.84, 0] as [number,number,number,number] },
  },
}

const linkVariants = {
  hidden:  { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
  exit:    { opacity: 0, x: -6,  transition: { duration: 0.14 } },
}

export function NavigationBar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [mobileOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-base/92 backdrop-blur-xl border-b border-border shadow-[0_1px_12px_rgba(23,21,46,0.08)]'
          : 'bg-transparent',
      )}
    >
      <nav className="container flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="AWSM — на главную">
          <span
            className="w-9 h-9 rounded-full bg-text-primary flex items-center justify-center flex-shrink-0 transition-opacity duration-200 group-hover:opacity-80"
            aria-hidden="true"
          >
            <span className="font-display font-bold text-sm text-white leading-none">A</span>
          </span>
          <span className="font-display font-bold text-heading-s text-text-primary tracking-tight">
            AWSM <span className="text-text-muted font-medium">{'// Geo'}</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-text-muted hover:text-text-primary text-body-s font-body font-medium transition-colors duration-200 relative group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <div className="hidden md:inline-flex">
            <Button
              variant="primary"
              size="sm"
              href={CTA_LINK.href}
              className="!bg-text-primary !text-white !shadow-none hover:!opacity-80 hover:!translate-y-0 !rounded-full"
            >
              {CTA_LINK.label}
            </Button>
          </div>

          <motion.button
            type="button"
            className="md:hidden text-text-muted hover:text-text-primary p-2 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={mobileOpen}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen
                ? <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X size={22} aria-hidden="true" /></motion.span>
                : <motion.span key="open"  initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><List size={22} aria-hidden="true" /></motion.span>
              }
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden bg-surface/96 backdrop-blur-xl border-t border-border overflow-hidden"
            role="navigation"
            aria-label="Мобильное меню"
          >
            <div className="container py-6 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <motion.div key={link.href} variants={linkVariants}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-text-primary text-body-l font-body font-medium py-3 border-b border-border last:border-0 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-inset rounded-sm"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={linkVariants} className="pt-2">
                <Button variant="primary" size="md" className="w-full !bg-text-primary !text-white !shadow-none hover:!opacity-80 hover:!translate-y-0 !rounded-full" href={CTA_LINK.href} onClick={() => setMobileOpen(false)}>
                  {CTA_LINK.label}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
