import { CompetitionCard } from "~/components/public/CompetitionCard";

export default function CompetitionCardTestPage() {
    return (
        <div className="min-h-screen bg-background p-10">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Competition Card Component Test</h1>
                    <p className="text-muted-foreground">
                        Displaying variations of the CompetitionCard component.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {/* Default Card */}
                    <CompetitionCard />

                    {/* Variant 1: Ended */}
                    <CompetitionCard
                        title="CodeFest 2025"
                        status="Ended"
                        imageUrl="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop"
                        description="An annual gathering of coding enthusiasts. Join us for 48 hours of uninterrupted coding and innovation."
                        deadline="Dec 20, 2025 (Ended)"
                        registeredCount={230}
                        category="University Category"
                    />

                    {/* Variant 2: Upcoming */}
                    <CompetitionCard
                        title="AI Challenge"
                        status="Upcoming"
                        imageUrl="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop"
                        description="Build the future with AI. Create innovative solutions using the latest machine learning models."
                        deadline="Mar 15, 2026 (Registration Open)"
                        location="Online Event"
                        registeredCount={12}
                        category="Open Category"
                        organizerName="AI Society"
                    />
                </div>
            </div>
        </div>
    );
}
