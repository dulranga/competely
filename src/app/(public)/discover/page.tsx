import { headers } from "next/headers";
import { FooterBottom } from "~/components/ui/footer-bottom";
import { auth } from "~/lib/auth";
import { DiscoverContent } from "~/components/discovery/DiscoverContent";
import { searchCompetitions } from "~/data-access/competitions/searchCompetitions";
import { getAllCompetitions } from "~/data-access/competitions/getAllCompetitions";

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

    return (
        <DiscoverContent 
            isAuthenticated={isAuthenticated} 
            initialCompetitions={competitions || []}
            initialSearchQuery={query}
        />
    );
}
