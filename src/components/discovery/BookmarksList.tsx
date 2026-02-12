"use client";

import { useRouter } from "next/navigation";
import { CompetitionCard } from "~/components/discovery/CompetitionCard";
import { mapCompetitionToCardProps } from "~/lib/competition-utils";

interface BookmarksListProps {
    competitions: any[];
    registrationStatuses: Map<string, boolean>;
}

export function BookmarksList({ competitions, registrationStatuses }: BookmarksListProps) {
    const router = useRouter();

    if (competitions.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-xl text-muted-foreground mb-4">No bookmarks yet</p>
                <p className="text-sm text-muted-foreground">
                    Start exploring competitions and bookmark the ones you're interested in!
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {competitions.map((comp) => (
                <CompetitionCard
                    key={comp.id}
                    {...mapCompetitionToCardProps(comp, true, registrationStatuses.get(comp.id) || false)}
                    onClick={() => router.push(`/c/${comp.id}`)}
                />
            ))}
        </div>
    );
}
