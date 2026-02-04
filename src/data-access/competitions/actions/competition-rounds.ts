"use server";

import { revalidatePath } from "next/cache";
import { getActiveCompetition } from "~/data-access/competitions/get-active-competition";
import {
    createCompetitionRound,
    deleteCompetitionRound,
    getCompetitionRounds,
    updateCompetitionRound,
} from "~/data-access/competitions/timeline/rounds";

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

    if (rounds.length === 0) {
        // Initialize default round if none exist
        await createCompetitionRound(competition.id, "Registration");
        return await getCompetitionRounds(competition.id);
    }

    return rounds;
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
    const updatedRound = await updateCompetitionRound(id, name);
    revalidatePath("/dashboard/timeline");
    return updatedRound;
}

/**
 * Deletes a round.
 */
export async function deleteRoundAction(id: string) {
    const deletedRound = await deleteCompetitionRound(id);
    revalidatePath("/dashboard/timeline");
    return deletedRound;
}
