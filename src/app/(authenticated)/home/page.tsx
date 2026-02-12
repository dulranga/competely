import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FooterBottom } from "~/components/ui/footer-bottom";
import { Timeline } from "~/components/timeline/Timeline";
import { Button } from "~/components/ui/button";
import { auth } from "~/lib/auth";
import { getDelegateTimeline } from "~/data-access/delegate/timeline";
import { getTrendingCompetitions } from "~/data-access/competitions/getTrendingCompetitions";
import { getBookmarkStatuses, getRegistrationStatuses } from "~/data-access/delegate/bookmark";
import { TrendingList } from "~/components/discovery/TrendingList";

export default async function HomePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/");
    }

    const { user } = session;
    const timelineEvents = await getDelegateTimeline(user);
    const trendingCompetitions = await getTrendingCompetitions();

    // Get bookmark and registration statuses
    let bookmarkStatuses = new Map<string, boolean>();
    let registrationStatuses = new Map<string, boolean>();

    if (trendingCompetitions.length > 0) {
        const competitionIds = trendingCompetitions.map((c) => c.id);
        bookmarkStatuses = await getBookmarkStatuses(competitionIds);
        registrationStatuses = await getRegistrationStatuses(competitionIds);
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


                {/* 3. Trending Now Section */}
                <section className="space-y-6 max-w-[1500px] mx-auto w-full px-4 md:px-8">
                    <h2 className="text-3xl font-bold text-center text-[#1a1b25]">Trending Now</h2>

                    <TrendingList
                        competitions={trendingCompetitions}
                        bookmarkStatuses={bookmarkStatuses}
                        registrationStatuses={registrationStatuses}
                    />
                </section>

            </div>

            <FooterBottom />
        </div>
    );
}
