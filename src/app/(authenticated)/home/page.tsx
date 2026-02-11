import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CompetitionCard } from "~/components/discovery/CompetitionCard";
import { FooterBottom } from "~/components/ui/footer-bottom";
import { Timeline } from "~/components/timeline/Timeline";
import { Button } from "~/components/ui/button";
import { auth } from "~/lib/auth";
import { getDelegateTimeline } from "~/data-access/delegate/timeline";
import { getTrendingCompetitions } from "~/data-access/competitions/getTrendingCompetitions";
import { getFileUrlById } from "~/lib/utils";

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

                    {/* Horizontal Scroll Container */}
                    <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:-mx-0 md:px-0">
                        {trendingCompetitions.length > 0 ? (
                            trendingCompetitions.map((competition) => (
                                <div key={competition.id} className="snap-center shrink-0 w-[300px] md:w-[350px]">
                                    <CompetitionCard
                                        competitionId={competition.id}
                                        title={competition.title || "Untitled Competition"}
                                        status={undefined} // Let StatusBadge calculate from dates
                                        imageUrl={competition.imageUrl ? getFileUrlById(competition.imageUrl) : undefined}
                                        deadline={
                                            competition.deadline
                                                ? new Date(competition.deadline).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })
                                                : "No deadline"
                                        }
                                        startDate={competition.startDate}
                                        endDate={competition.endDate}
                                        location="Online" // Schema doesn't have location yet
                                        registeredCount={competition.registeredCount}
                                        category={competition.category || "General"}
                                        organizerName={competition.organizerName}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 w-full py-10">
                                No trending competitions found.
                            </div>
                        )}
                    </div>
                </section>

            </div>

            <FooterBottom />
        </div>
    );
}
