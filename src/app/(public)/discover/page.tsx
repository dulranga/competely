import { headers } from "next/headers";
import { FooterBottom } from "~/components/ui/footer-bottom";
import { auth } from "~/lib/auth";
import { DiscoverContent } from "~/components/discovery/DiscoverContent";

export default async function DiscoverPage() {
    const headersList = await headers();
    const session = await auth.api.getSession({
        headers: headersList,
    });
    const isAuthenticated = !!session;

    return (
        <DiscoverContent isAuthenticated={isAuthenticated} />
    );
}
