"use client";

import { HeaderPublic } from "~/components/ui/header-public";
import { HeaderAuthenticated } from "~/components/ui/header-authenticated";
import { FooterBottom } from "~/components/ui/footer-bottom";

interface DiscoverContentProps {
    isAuthenticated: boolean;
}

export function DiscoverContent({ isAuthenticated }: DiscoverContentProps) {
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

