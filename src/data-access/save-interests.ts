import "server-only";

import db from "~/db/client";
import { userInterests } from "~/db/schemas/interests-schema";
import { eq } from "drizzle-orm";

/**
 * Creates or overwrites the interests for a given user.
 * It first deletes any existing interests for the user to ensure the list is fresh,
 * then inserts the new selection.
 * 
 * @param userId - The ID of the user.
 * @param interests - Array of interest IDs.
 */
export async function createUserInterests(userId: string, interests: string[]) {
    // Use a transaction to ensure atomic update (delete + insert happen together or not at all)
    await db.transaction(async (tx) => {
        // 1. Delete existing interests (if any) to allow "updating" by overwriting
        await tx.delete(userInterests).where(eq(userInterests.userId, userId));

        // 2. Insert new interests
        if (interests.length > 0) {
            const values = interests.map((interest) => ({
                userId,
                interest,
            }));
            await tx.insert(userInterests).values(values);
        }
    });

    console.log(`[DAL] Saved ${interests.length} interests for user ${userId}`);
}
