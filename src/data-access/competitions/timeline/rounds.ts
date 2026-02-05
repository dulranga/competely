import "server-only";

import { asc, eq } from "drizzle-orm";
import db from "~/db/client";
import { InferSelectModel } from "drizzle-orm";
import { competitionRounds } from "~/db/schema";

export type CompetitionRound = InferSelectModel<typeof competitionRounds>;

/**
 * Fetches all rounds for a specific competition, ordered by creation time.
 * @param competitionId 
 */
export async function getCompetitionRounds(competitionId: string) {
    return await db.query.competitionRounds.findMany({
        where: eq(competitionRounds.competitionId, competitionId),
        orderBy: [asc(competitionRounds.createdAt)],
    });
}

/**
 * Fetches a single round by ID.
 * @param roundId 
 */
export async function getCompetitionRound(roundId: string) {
    return await db.query.competitionRounds.findFirst({
        where: eq(competitionRounds.id, roundId),
    });
}

/**
 * Creates a new round for a competition.
 * @param competitionId 
 * @param name 
 */
export async function createCompetitionRound(competitionId: string, name: string, isSystem: boolean = false) {
    const [newRound] = await db
        .insert(competitionRounds)
        .values({
            competitionId,
            name,
            isSystem,
        })
        .returning();
    return newRound;
}

/**
 * Updates the name of a specific round.
 * @param roundId 
 * @param name 
 */
export async function updateCompetitionRound(roundId: string, name: string) {
    const [updatedRound] = await db
        .update(competitionRounds)
        .set({ name })
        .where(eq(competitionRounds.id, roundId))
        .returning();
    return updatedRound;
}

/**
 * Deletes a specific round.
 * @param roundId 
 */
export async function deleteCompetitionRound(roundId: string) {
    const [deletedRound] = await db
        .delete(competitionRounds)
        .where(eq(competitionRounds.id, roundId))
        .returning();
    return deletedRound;
}
