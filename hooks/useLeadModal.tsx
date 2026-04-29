'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface LeadModalCtx {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const Ctx = createContext<LeadModalCtx | null>(null)

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Ctx.Provider value={{ isOpen, openModal: () => setIsOpen(true), closeModal: () => setIsOpen(false) }}>
      {children}
    </Ctx.Provider>
  )
}

export function useLeadModal(): LeadModalCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLeadModal must be used within LeadModalProvider')
  return ctx
}
