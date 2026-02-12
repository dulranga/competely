"use client";

import { useRouter } from "next/navigation";
import { CompetitionCard } from "~/components/discovery/CompetitionCard";
import { mapCompetitionToCardProps } from "~/lib/competition-utils";

interface TrendingListProps {
    competitions: any[];
    bookmarkStatuses: Map<string, boolean>;
    registrationStatuses: Map<string, boolean>;
}

export function TrendingList({ competitions, bookmarkStatuses, registrationStatuses }: TrendingListProps) {
    const router = useRouter();

    if (competitions.length === 0) {
        return (
            <div className="col-span-full text-center text-gray-500 w-full py-10">
                No trending competitions found.
            </div>
        );
    }

    return (
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:-mx-0 md:px-0">
            {competitions.map((competition) => (
                <div key={competition.id} className="snap-center shrink-0 w-[300px] md:w-[350px]">
                    <CompetitionCard
                        {...mapCompetitionToCardProps(
                            competition,
                            bookmarkStatuses.get(competition.id) || false,
                            registrationStatuses.get(competition.id) || false
                        )}
                        onClick={() => router.push(`/c/${competition.id}`)}
                    />
                </div>
            ))}
        </div>
    );
}
