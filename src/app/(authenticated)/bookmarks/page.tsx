import { FooterBottom } from "~/components/ui/footer-bottom";
import { getBookmarkedCompetitions, getRegistrationStatuses } from "~/data-access/delegate/bookmark";
import { BookmarksList } from "~/components/discovery/BookmarksList";

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

                <BookmarksList
                    competitions={bookmarkedCompetitions}
                    registrationStatuses={registrationStatuses}
                />
            </div>

            <FooterBottom />
        </div>
    );
}
