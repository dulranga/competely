import { CompetitionCard } from "~/components/discovery/CompetitionCard";
import { FooterBottom } from "~/components/ui/footer-bottom";
import { getBookmarkedCompetitions, getRegistrationStatuses } from "~/data-access/delegate/bookmark";
import { mapCompetitionToCardProps } from "~/lib/competition-utils";

export default async function BookmarksPage() {
    const bookmarkedCompetitions = await getBookmarkedCompetitions();

    // Get registration statuses for bookmarked competitions
    const competitionIds = bookmarkedCompetitions.map((c: any) => c.id);
    const registrationStatuses = await getRegistrationStatuses(competitionIds);

    return (
        <div className="flex-1 bg-[#fbf6f3] min-h-[calc(100vh-64px)]">
            <div className="max-w-[1500px] mx-auto w-full px-4 md:px-8 py-8 space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">My Bookmarks</h1>
                </div>

                {bookmarkedCompetitions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                        {bookmarkedCompetitions.map((comp) => (
                            <CompetitionCard
                                key={comp.id}
                                {...mapCompetitionToCardProps(comp, true, registrationStatuses.get(comp.id) || false)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-muted-foreground mb-4">No bookmarks yet</p>
                        <p className="text-sm text-muted-foreground">
                            Start exploring competitions and bookmark the ones you're interested in!
                        </p>
                    </div>
                )}
            </div>

            <FooterBottom />
        </div>
    );
}
