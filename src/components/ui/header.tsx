"use client";

import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "~/lib/auth-client";
import { HeaderAuthenticated } from "./header-authenticated";
import { HeaderPublic } from "./header-public";
import { getBookmarksCountAction } from "~/data-access/delegate/actions/bookmarks";

export function Header() {
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();

    const { data: bookmarkCount = 0 } = useQuery({
        queryKey: ["bookmarks", "count"],
        queryFn: () => getBookmarksCountAction(),
        enabled: !!session,
        // Refresh every minute to keep it roughly in sync
        refetchInterval: 60 * 1000,
    });

    if (isPending) {
        return <div className="h-16 w-full border-b border-border/40 bg-background/95 animate-pulse" />;
    }

    if (session) {
        return <HeaderAuthenticated currentPath={pathname} user={session.user} bookmarkCount={bookmarkCount} />;
    }

    return <HeaderPublic />;
}
