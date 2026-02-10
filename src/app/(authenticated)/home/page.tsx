import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CompetitionCard } from "~/components/discovery/CompetitionCard";
import { FooterBottom } from "~/components/ui/footer-bottom";
import { Timeline } from "~/components/timeline/Timeline";
import { Button } from "~/components/ui/button";
import { auth } from "~/lib/auth";
import { getDelegateTimeline } from "~/data-access/delegate/timeline";
import { getTrendingCompetitions } from "~/data-access/delegate/home";
import { getBookmarkStatuses, getRegistrationStatuses } from "~/data-access/delegate/bookmark";
import { mapCompetitionToCardProps } from "~/lib/competition-utils";

export default async function HomePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/");
    }

    const { user } = session;

    // Fetch data in parallel
    const [timelineEvents, trendingCompetitions] = await Promise.all([
        getDelegateTimeline(user),
        getTrendingCompetitions(),
    ]);

    // Fetch user-specific statuses for trending competitions
    let bookmarkStatuses = new Map<string, boolean>();
    let registrationStatuses = new Map<string, boolean>();

    if (trendingCompetitions.length > 0) {
        const trendingIds = trendingCompetitions.map((c) => c.id);
        const [bookmarks, registrations] = await Promise.all([
            getBookmarkStatuses(trendingIds),
            getRegistrationStatuses(trendingIds),
        ]);
        bookmarkStatuses = bookmarks;
        registrationStatuses = registrations;
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#fbf6f3]">
            <div className="flex-1 pb-20 space-y-16 pt-10">
                {/* 1. Timeline Section */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between max-w-[1500px] mx-auto px-4 md:px-8">
                        <h2 className="text-3xl font-bold text-[#1a1b25]">Timeline</h2>
                        <Button
                            variant="outline"
                            className="rounded-full border-2 border-[#1a1b25] text-[#1a1b25] hover:bg-[#1a1b25] hover:text-white font-bold transition-all"
                            asChild
                        >
                            <a href="/timeline">View Full Timeline</a>
                        </Button>
                    </div>
                    <Timeline events={timelineEvents} />
                </section>

                {/* 2. Recommended Section */}
                <section className="space-y-6 max-w-[1500px] mx-auto w-full px-4 md:px-8">
                    <h2 className="text-3xl font-bold text-center text-[#1a1b25]">Recommended</h2>

                    {/* Horizontal Scroll Container */}
                    <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:-mx-0 md:px-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="snap-center shrink-0 w-[300px] md:w-[350px]">
                                <CompetitionCard
                                    title="HackExtreme"
                                    status="Ongoing"
                                    imageUrl="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                                    deadline="Jan 17, 2026 (deadline)"
                                    location="Lyceum College, Nugegoda."
                                    registeredCount={74}
                                    category="School Category"
                                    organizerName="Hack dev Club"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. Trending Now Section */}
                <section className="space-y-6 max-w-[1500px] mx-auto w-full px-4 md:px-8">
                    <h2 className="text-3xl font-bold text-center text-[#1a1b25]">Trending Now</h2>

                    {/* Horizontal Scroll Container */}
                    {trendingCompetitions.length > 0 ? (
                        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:-mx-0 md:px-0">
                            {trendingCompetitions.map((comp) => (
                                <div key={comp.id} className="snap-center shrink-0 w-[300px] md:w-[350px]">
                                    <CompetitionCard
                                        {...mapCompetitionToCardProps(
                                            comp,
                                            bookmarkStatuses.get(comp.id) ?? false,
                                            registrationStatuses.get(comp.id) ?? false
                                        )}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            No trending competitions at the moment.
                        </div>
                    )}
                </section>
            </div>

            <FooterBottom />
        </div>
    );
}
