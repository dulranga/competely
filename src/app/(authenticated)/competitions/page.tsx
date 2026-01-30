import { HeaderAuthenticated } from "~/components/ui/header-authenticated";
import { FooterBottom } from "~/components/ui/footer-bottom";

export default function CompetitionsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-muted/30">
            <HeaderAuthenticated currentPath="/competitions" />
            
            <main className="flex-1 flex items-center justify-center">
                <h1 className="text-4xl font-bold">Competitions</h1>
            </main>

            <FooterBottom />
        </div>
    );
}
