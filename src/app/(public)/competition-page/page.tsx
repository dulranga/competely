import { HeroSection } from "~/components/competition-page/HeroSection"
import { StatsSection } from "~/components/competition-page/StatsSection"
import { CompetitionTabs } from "~/components/competition-page/CompetitionTabs"
import { CTASection } from "~/components/competition-page/CTASection"

//refactored

export default function CodeFest2026() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <HeroSection />
      <StatsSection />
      <CompetitionTabs />
      <CTASection />
    </div>
  )
}

