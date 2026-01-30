import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnimatedBackground } from "~/components/ui/animated-background";
import { Button } from "~/components/ui/button";
import { Logo } from "~/components/ui/logo";
import { ScrollIndicator } from "~/components/ui/scroll-indicator";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 text-center overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 space-y-8 max-w-5xl">
        {/* Logo/Brand Name */}
        <div className="space-y-4">
          <h1>
            <Logo size="xl" animated />
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Find, Organize, Manage Competitions all in one place.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link href="/register">
            <Button
              size="lg"
              variant="default"
              className="group w-full sm:w-auto"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/competition">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Browse Competitions
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator className="pt-16" />
      </div>
    </section>
  );
}
