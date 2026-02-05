"use server";

import { revalidatePath } from "next/cache";
import { getActiveCompetition } from "~/data-access/competitions/get-active-competition";
import {
    createCompetitionRound,
    deleteCompetitionRound,
    getCompetitionRound,
    getCompetitionRounds,
    updateCompetitionRound,
} from "~/data-access/competitions/timeline/rounds";
import { createCompetitionEvent, getEventsByRound } from "~/data-access/competitions/timeline/events";

/**
 * Fetches all rounds for the active competition.
 * If no rounds exist, initializes a default "Registration" round.
 */
export async function fetchRoundsAction() {
    const competition = await getActiveCompetition();
    if (!competition) {
        throw new Error("No active competition found in session.");
    }

    const rounds = await getCompetitionRounds(competition.id);

    // Check if Registration round exists (by name or isSystem flag preferably, but for now name "Registration" is the key)
    // Actually, we should check logic: if no rounds, create Registration.
    // If Registration exists, ensure it has the default event.

    let registrationRound = rounds.find((r) => r.name === "Registration");

    if (!registrationRound) {
        // Initialize default round if none exist (or if Registration is missing)
        registrationRound = await createCompetitionRound(competition.id, "Registration", true);

        // Re-fetch rounds to include the new one
        // Actually we can just push it to the local array if we want, but simpler to refetch or just continue.
    }

    // Now ensure Registration round has the default event
    if (registrationRound) {
        const events = await getEventsByRound(registrationRound.id);
        if (events.length === 0) {
            await createCompetitionEvent({
                roundId: registrationRound.id,
                name: "Registration Period",
                type: "phase", // or 'system'
                startDate: competition.startDate, // Sync with competition date initially
                endDate: competition.endDate,
                resources: [],
                isSystem: true,
            });
        }
    }

    // Return latest rounds
    return await getCompetitionRounds(competition.id);
}

/**
 * Creates a new round.
 */
export async function createRoundAction(name: string) {
    const competition = await getActiveCompetition();
    if (!competition) {
        throw new Error("No active competition found.");
    }

    const newRound = await createCompetitionRound(competition.id, name);
    revalidatePath("/dashboard/timeline");
    return newRound;
}

/**
 * Updates a round's name.
 */
export async function updateRoundAction(id: string, name: string) {
    const round = await getCompetitionRound(id);
    if (round?.isSystem) {
        throw new Error("Cannot rename a system round.");
    }
    const updatedRound = await updateCompetitionRound(id, name);
    revalidatePath("/dashboard/timeline");
    return updatedRound;
}

// ... existing code ...

/**
 * Deletes a round.
 */
export async function deleteRoundAction(id: string) {
    const round = await getCompetitionRound(id);
    if (round?.isSystem) {
        throw new Error("Cannot delete a system round.");
    }
    const deletedRound = await deleteCompetitionRound(id);
    revalidatePath("/dashboard/timeline");
    return deletedRound;
}

/**
 * Fetches the active competition details.
 */
export async function fetchCompetitionAction() {
    return await getActiveCompetition();
}
