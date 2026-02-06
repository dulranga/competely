"use client";

import { useMemo } from "react";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { fetchEventsAction } from "~/data-access/competitions/actions/competition-events";
import { fetchRoundsAction, fetchCompetitionAction } from "~/data-access/competitions/actions/competition-rounds";
import { TimelineClient } from "./TimelineClient";

// Types corresponding to DB logic
interface Event {
    id: string;
    name: string;
    type: string;
    startDate: string | Date | null;
    endDate: string | Date | null;
    description: string | null;
    isSystem: boolean;
    // ...
}

interface Round {
    id: string;
    name: string;
    isSystem: boolean;
}

type Competition = Awaited<ReturnType<typeof fetchCompetitionAction>>;

const TimelinePage = () => {
    const searchParams = useSearchParams();
    const roundIdParam = searchParams.get("roundId");

    const {
        data: competition,
        isLoading: isCompetitionLoading,
        error: competitionError,
    } = useQuery<Competition>({
        queryKey: ["timeline", "competition"],
        queryFn: () => fetchCompetitionAction(),
    });

    const {
        data: rounds = [],
        isLoading: isRoundsLoading,
        error: roundsError,
    } = useQuery<Round[]>({
        queryKey: ["timeline", "rounds"],
        queryFn: () => fetchRoundsAction() as Promise<Round[]>,
    });

    const selectedRound = useMemo(() => {
        if (!rounds.length) {
            return null;
        }
        if (!roundIdParam) {
            return rounds[0];
        }
        return rounds.find((round) => round.id === roundIdParam) ?? rounds[0];
    }, [rounds, roundIdParam]);

    const {
        data: rawEvents = [],
        isLoading: isEventsLoading,
        error: eventsError,
    } = useQuery<Event[]>({
        queryKey: ["timeline", "events", selectedRound?.id],
        queryFn: () => fetchEventsAction(selectedRound!.id) as Promise<Event[]>,
        enabled: Boolean(selectedRound?.id),
    });

    const events = useMemo(() => {
        if (!selectedRound) {
            return [] as Event[];
        }

        if (selectedRound.isSystem && competition) {
            return rawEvents.map((event) => {
                if (!event.isSystem) {
                    return event;
                }

                return {
                    ...event,
                    startDate: competition.registrationDeadline || competition.startDate,
                    endDate: null,
                };
            });
        }

        return rawEvents;
    }, [rawEvents, selectedRound, competition]);

    const isLoading = isRoundsLoading || isCompetitionLoading || (Boolean(selectedRound?.id) && isEventsLoading);

    if (roundsError || competitionError || eventsError) {
        return (
            <div className="flex h-full items-center justify-center py-24">
                <p className="text-sm text-destructive">Unable to load timeline data. Please try again.</p>
            </div>
        );
    }

    if (isLoading || !competition) {
        return (
            <div className="flex h-full items-center justify-center py-24">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return <TimelineClient competition={competition} currentRound={selectedRound} events={events} />;
};

export default TimelinePage;
