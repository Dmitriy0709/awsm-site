'use client'

import * as React from 'react'
import { MenuIcon, ArrowRight } from 'lucide-react'
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/Sheet'
import { Button, buttonVariants } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { useLeadModal } from '@/hooks/useLeadModal'
import Link from 'next/link'

export function FloatingHeader() {
  const [open, setOpen] = React.useState(false)
  const { openModal } = useLeadModal()

  const links = [
    {
      label: 'Кому подходит',
      href: '#audience',
    },
    {
      label: 'Как работаем',
      href: '#how-we-work',
    },
    {
      label: 'Тарифы',
      href: '#pricing',
    },
    {
      label: 'Кейсы',
      href: '#cases',
    },
  ]

  return (
    <div className="fixed top-5 left-0 right-0 z-50 px-4">
      <header
        className={cn(
          'mx-auto w-full max-w-4xl rounded-full border border-white/20 shadow-lg',
          'bg-white/70 backdrop-blur-md',
        )}
      >
        <nav className="mx-auto flex items-center justify-between p-1.5 px-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="hover:bg-black/5 flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 duration-100"
          >
            <p className="font-display text-base font-bold tracking-tight text-text-primary">AWSM <span className="font-medium">Geo</span></p>
          </Link>

          {/* Desktop Nav — Absolutely Centered */}
          <div className="hidden items-center gap-1 lg:flex absolute left-1/2 -translate-x-1/2">
            {links.map((link) => (
              <a
                key={link.href}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  'rounded-full text-black hover:bg-black/5 uppercase tracking-widest text-[10px] font-bold'
                )}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              className="rounded-full hidden sm:flex items-center gap-2 group"
              onClick={openModal}
            >
              Получить аудит
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            
            <Sheet open={open} onOpenChange={setOpen}>
              <Button
                size="icon"
                variant="outline"
                onClick={() => setOpen(!open)}
                className="lg:hidden rounded-full size-9"
              >
                <MenuIcon className="size-4" />
              </Button>
              <SheetContent
                className="bg-white/95 backdrop-blur-lg gap-0 flex flex-col"
                showClose={false}
                side="left"
                onClose={() => setOpen(false)}
              >
                <div className="flex items-center gap-2 mb-8 mt-2">
                  <p className="font-display text-xl font-bold">AWSM Geo</p>
                </div>
                
                <div className="grid gap-y-2 overflow-y-auto pb-5">
                  {links.map((link) => (
                    <a
                      key={link.href}
                      className={cn(
                        buttonVariants({
                          variant: 'ghost',
                          className: 'justify-start text-lg font-display uppercase tracking-widest',
                        }),
                        'py-6 px-0 border-b border-border/50 last:border-0'
                      )}
                      href={link.href}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <SheetFooter className="px-0 pt-6">
                  <Button 
                    className="w-full rounded-xl py-6 text-base items-center justify-center gap-2 group"
                    onClick={() => {
                      setOpen(false)
                      openModal()
                    }}
                  >
                    Бесплатный аудит
                    <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </div>
  )
}
