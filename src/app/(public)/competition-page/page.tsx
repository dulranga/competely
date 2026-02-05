import { HeroSection } from "~/components/competition-page/HeroSection"
import { InfoCard } from "~/components/competition-page/InfoCard"
import { RegistrationCard } from "~/components/competition-page/RegistrationCard"
import { CountdownSection } from "~/components/competition-page/CountdownSection"
import { TimelineSection } from "~/components/competition-page/TimelineSection"
import { PrizesSection } from "~/components/competition-page/PrizesSection"
import { ContactUsSection } from "~/components/competition-page/ContactUsSection"
import { Button } from "~/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CodeFest2026() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <HeroSection />

      <main className="max-w-7xl mx-auto px-4 py-12 md:py-20">

        {/* Top Section: Info + InfoCard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <h1 className="text-5xl md:text-6xl font-black uppercase mb-4 tracking-tight">HACKEXTREME</h1>
              <p className="text-xl text-muted-foreground font-medium mb-8">Compile your dreams into reality.</p>

              <div className="prose prose-lg text-muted-foreground space-y-6 max-w-none">
                <p>
                  Codefest is the ultimate 24-hour hackathon organized by Tec Dev club.
                  We challenge developers, designers, and visionaries to step away from
                  textbooks and turn wild ideas into working prototypes. Whether you are a
                  coding veteran or a first-time hacker, this is your platform to build the future.
                </p>

                <div>
                  <h3 className="text-foreground font-bold mb-2">Why Participate?</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Build Real Solutions:</strong> Tackle industry challenges in tracks like [List 2-3 main themes, e.g., AI, FinTech].</li>
                    <li><strong>Connect & Learn:</strong> Network with industry experts and find your future mentors.</li>
                    <li><strong>Win Big:</strong> Compete for a prize pool of [Amount] and exclusive titles.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-foreground font-bold mb-2">Who Should Join?</h3>
                  <p>
                    Open to all undergraduates backend builders, UI/UX designers, data strategists, and creative thinkers.
                    Bring your laptop and your team; we'll provide the rest.
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <Button className="font-bold text-xl px-8 py-6" size="lg">
                  Register Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar Column (Top) */}
          <div className="lg:col-span-4 space-y-8">
            <InfoCard />
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-border my-12" />

        {/* Bottom Section: Countdown + RegistrationCard Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8">
            <CountdownSection />
          </div>
          <div className="lg:col-span-4">
            <RegistrationCard />
          </div>
        </div>

      </main>

      <TimelineSection />

      <PrizesSection />

      <ContactUsSection />
    </div>
  )
}
