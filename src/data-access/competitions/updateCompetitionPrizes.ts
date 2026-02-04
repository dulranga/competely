import "server-only";

import { eq } from "drizzle-orm";
import { competitionPrizes } from "~/db/schema";
import type { MainInfoSchema } from "~/components/dashboard/editor/maininformationsection/constants";
import type { DbTransaction } from "~/db/client";

export async function updateCompetitionPrizes(
    tx: DbTransaction,
    competitionId: string,
    prizes: MainInfoSchema["prizes"]
) {
    // 1. Delete existing prizes
    await tx.delete(competitionPrizes).where(eq(competitionPrizes.competitionId, competitionId));

    // 2. Insert new prizes
    if (prizes.length > 0) {
        await tx.insert(competitionPrizes).values(
            prizes.map((prize) => ({
                competitionId,
                title: prize.name,
                cashPrize: parseFloat(prize.amount) || 0, // Ensure valid number
            }))
        );
    }
}
