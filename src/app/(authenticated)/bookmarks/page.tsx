import { CompetitionCard } from "~/components/discovery/CompetitionCard";
import { FooterBottom } from "~/components/ui/footer-bottom";
import { HeaderAuthenticated } from "~/components/ui/header-authenticated";
import { getBookmarkedCompetitions } from "~/data-access/delegate/bookmark";
import { mapCompetitionToCardProps } from "~/lib/competition-utils";

export default async function BookmarksPage() {
    const bookmarkedCompetitions = await getBookmarkedCompetitions();

    return (
        <div className="flex flex-col min-h-screen bg-[#fbf6f3]">
            <HeaderAuthenticated currentPath="/bookmarks" bookmarkCount={bookmarkedCompetitions.length} />

            <div className="flex-1 max-w-[1500px] mx-auto w-full px-4 md:px-8 py-8 space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">Your Bookmarks</h1>
                </div>

                {bookmarkedCompetitions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {bookmarkedCompetitions.map((comp) => (
                            <CompetitionCard key={comp.id} {...mapCompetitionToCardProps(comp, true)} />
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
