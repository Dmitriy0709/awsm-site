'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, CTA_LINK } from '@/constants/navigation'
import { Button } from '@/components/ui/Button'
import { ButtonColorful } from '@/components/ui/ButtonColorful'
import { useLeadModal } from '@/hooks/useLeadModal'

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
  const { openModal } = useLeadModal()

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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-white/70 backdrop-blur-md border-b border-white/20 shadow-[var(--shadow-card),inset_0_-1px_0_rgba(255,255,255,0.5)]'
          : 'bg-transparent',
      )}
    >
      <nav className="container flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <Link href="/" className="flex items-center group" aria-label="AWSM — на главную">
          <span className={cn(
            "font-display font-bold text-heading-s tracking-tight transition-colors duration-300",
            scrolled ? "text-text-primary" : "text-white"
          )}>
            AWSM <span className={cn(
              "font-medium transition-colors duration-300",
              scrolled ? "text-text-muted" : "text-white/70"
            )}>Geo</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-label font-display uppercase tracking-widest transition-colors duration-300 relative group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                  scrolled ? "text-text-muted hover:text-text-primary" : "text-white/80 hover:text-white"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full",
                  scrolled ? "bg-primary" : "bg-white"
                )} />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <div className="hidden md:inline-flex">
            <ButtonColorful
              label={CTA_LINK.label}
              onClick={openModal}
              variant="dark"
              className="h-9 px-4 rounded-full"
            />
          </div>

          <motion.button
            type="button"
            className={cn(
              "md:hidden p-2 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
              scrolled ? "text-text-muted hover:text-text-primary" : "text-white hover:text-white"
            )}
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
                    className="block text-text-primary text-label font-display uppercase tracking-widest py-4 border-b border-border last:border-0 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-inset rounded-sm"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={linkVariants} className="pt-2">
                <ButtonColorful
                  label={CTA_LINK.label}
                  variant="dark"
                  className="w-full rounded-full"
                  onClick={() => { setMobileOpen(false); openModal() }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
