"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useMemo } from "react";
import { fetchEventsAction } from "~/data-access/competitions/actions/competition-events";
import { fetchRoundsAction } from "~/data-access/competitions/actions/competition-rounds";
import { AnalyticsClient } from "./AnalyticsClient";

interface Event {
    id: string;
    name: string;
    type: string;
    startDate: string | Date | null;
    endDate: string | Date | null;
    description: string | null;
    isSystem: boolean;
    form?: {
        name: string;
        id: string;
    };
}

interface Round {
    id: string;
    name: string;
    isSystem: boolean;
}

const AnalyticsPage: FC = () => {
    const searchParams = useSearchParams();
    const roundIdParam = searchParams.get("roundId");
    const router = useRouter();

    const { data: rounds = [], error: roundsError } = useQuery<Round[]>({
        queryKey: ["analytics", "rounds"],
        queryFn: async () => {
            const res = await fetchRoundsAction();
            if (!roundIdParam) {
                router.push(`/dashboard/analytics?roundId=${res[0].id}`);
            }
            return res;
        },
    });

    const selectedRound = useMemo(() => {
        if (!rounds.length) {
            return null;
        }

        return rounds.find((round) => round.id === roundIdParam) ?? rounds[0];
    }, [rounds, roundIdParam]);

    const { data: events = [], error: eventsError } = useQuery({
        queryKey: ["analytics", "events", selectedRound?.id],
        queryFn: () => fetchEventsAction(selectedRound!.id),
        enabled: Boolean(selectedRound?.id),
    });

    if (roundsError || eventsError) {
        return (
            <div className="flex h-full items-center justify-center py-24">
                <p className="text-sm text-destructive">Unable to load analytics data. Please try again.</p>
            </div>
        );
    }

    return <AnalyticsClient events={events} selectedRound={selectedRound} />;
};

export default AnalyticsPage;
