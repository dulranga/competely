import { headers } from "next/headers";
import { HeaderPublic } from "~/components/ui/header-public";
import { HeaderAuthenticated } from "~/components/ui/header-authenticated";
import { FooterBottom } from "~/components/ui/footer-bottom";
import { auth } from "~/lib/auth";

export default async function DiscoverPage() {
    const headersList = await headers();
    const session = await auth.api.getSession({
        headers: headersList,
    });
    const isAuthenticated = !!session;

    return (
        <div className="flex flex-col min-h-screen bg-muted/30">
            {isAuthenticated ? (
                <HeaderAuthenticated currentPath="/discover" />
            ) : (
                <HeaderPublic />
            )}
            
            <main className="flex-1 flex items-center justify-center">
                <h1 className="text-4xl font-bold">Discover</h1>
            </main>

            <FooterBottom />
        </div>
    );
}
