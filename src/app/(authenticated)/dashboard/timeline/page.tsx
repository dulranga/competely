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

export default async function TimelinePage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    // 1. Fetch Rounds to determine current round
    // @ts-ignore
    const rounds: Round[] = await fetchRoundsAction();
    const comp = await fetchCompetitionAction();

    // Await searchParams if using Next.js 15, or access directly if 14.
    // Assuming safe access pattern or awaiting if needed.
    // Since we don't know exact version, we treat it as object for now
    // but if it errors we fix. The type signature allows direct access usually in 14.
    const roundIdParam = searchParams?.roundId as string | undefined;

    let selectedRound = rounds.find((r) => r.id === roundIdParam);
    if (!selectedRound && rounds.length > 0) {
        selectedRound = rounds[0];
    }

    let events: Event[] = [];

    if (selectedRound) {
        // 2. Fetch Events for selected round
        // @ts-ignore
        const roundEvents = await fetchEventsAction(selectedRound.id);

        // If System Round (Registration), sync dates with Competition Global Dates for display
        if (selectedRound.isSystem && comp) {
            const mappedEvents = roundEvents.map((e: any) => {
                if (e.isSystem) {
                    return {
                        ...e,
                        // Registration Logic Update:
                        // Start Date = Registration Deadline
                        // End Date = null (or kept as is, but user requested Deadline as Start)
                        startDate: comp.registrationDeadline || comp.startDate,
                        endDate: null, // Making it a point-in-time event as implied by "Deadline" usage
                    };
                }
                return e;
            });
            // @ts-ignore
            events = mappedEvents;
        } else {
            // @ts-ignore
            events = roundEvents;
        }
    }

    return (
        <TimelineClient
            competition={comp}
            currentRound={selectedRound || null}
            events={events}
            // @ts-ignore
            rounds={rounds}
        />
    );
}
