import { headers } from "next/headers";
import { FooterBottom } from "~/components/ui/footer-bottom";
import { auth } from "~/lib/auth";
import { DiscoverContent } from "~/components/discovery/DiscoverContent";
import { searchCompetitions } from "~/data-access/competitions/searchCompetitions";
import { getAllCompetitions } from "~/data-access/competitions/getAllCompetitions";
import { getBookmarkStatuses, getBookmarkedCount, getRegistrationStatuses } from "~/data-access/delegate/bookmark";

export default async function DiscoverPage({ searchParams }: PageProps) {
    const headersList = await headers();
    const session = await auth.api.getSession({
        headers: headersList,
    });
    const isAuthenticated = !!session;

    const params = await searchParams;
    const query = typeof params.q === 'string' ? params.q : '';

    const competitions = query.trim()
        ? await searchCompetitions(query)
        : await getAllCompetitions();

    // Get bookmark and registration statuses if authenticated
    let bookmarkStatuses = new Map<string, boolean>();
    let registrationStatuses = new Map<string, boolean>();
    let bookmarkCount = 0;
    if (isAuthenticated && competitions) {
        const competitionIds = competitions.map((c: any) => c.id);
        bookmarkStatuses = await getBookmarkStatuses(competitionIds);
        registrationStatuses = await getRegistrationStatuses(competitionIds);
        bookmarkCount = await getBookmarkedCount();
    }

    return (
        <DiscoverContent
            isAuthenticated={isAuthenticated}
            initialCompetitions={competitions || []}
            initialSearchQuery={query}
            bookmarkStatuses={bookmarkStatuses}
            registrationStatuses={registrationStatuses}
            bookmarkCount={bookmarkCount}
        />
    );
}
