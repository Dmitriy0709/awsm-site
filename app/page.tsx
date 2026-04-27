import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/home/HeroSection'
import { SocialProofBar } from '@/components/sections/home/SocialProofBar'
import { VideoSection } from '@/components/sections/home/VideoSection'
import { PricingPreviewSection } from '@/components/sections/home/PricingPreviewSection'
import { ProblemSolutionSection } from '@/components/sections/home/ProblemSolutionSection'
import { AudienceSection } from '@/components/sections/home/AudienceSection'
import { HowWeWorkSection } from '@/components/sections/home/HowWeWorkSection'
import { CasesPreviewSection } from '@/components/sections/home/CasesPreviewSection'
import { CtaSection } from '@/components/sections/home/CtaSection'

export const metadata: Metadata = {
  title: 'AWSM — Геомаркетинг. Результат.',
  openGraph: {
    title: 'AWSM — Продвижение в геосервисах',
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SocialProofBar />
      <VideoSection />
      <PricingPreviewSection />
      <ProblemSolutionSection />
      <AudienceSection />
      <HowWeWorkSection />
      <CasesPreviewSection />
      <CtaSection />
    </>
  )
}
