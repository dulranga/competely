import "server-only";

import { eq } from "drizzle-orm";
import { competitionPublishOptions } from "~/db/schema";
import type { DbTransaction } from "~/db/client";

interface PublishOptionsData {
    showParticipantCount: boolean;
    showTimeline: boolean;
    showCountdown: boolean;
    showPrizes: boolean;
}

export async function updateCompetitionPublishOptions(
    tx: DbTransaction,
    competitionId: string,
    options: PublishOptionsData
) {
    // Upsert equivalent: Try to update, if no rows updated (or check existence), insert.
    // Since it's 1:1, we can check existence first or use `onConflictDoUpdate` if supported and constrained properly.
    // Let's use standard check-then-op for simplicity within transaction, or specialized onConflict if index exists.
    // The schema has specific ID primary key and competition_id index, but not a UNIQUE constraint on competition_id in schema definition (it's 1:1 logically but maybe not enforced uniquely in DB? I should check relations again).
    // Checking schema: `competitionId` is NOT marked unique in `competition_publish_options`. It should be for strict 1:1.
    // But assuming application logic enforces it. We will delete old ones to be safe or update first.
    // Let's safe-guard: delete existing for this competitionId, then insert one.

    await tx.delete(competitionPublishOptions).where(eq(competitionPublishOptions.competitionId, competitionId));

    await tx.insert(competitionPublishOptions).values({
        competitionId,
        showParticipantCount: options.showParticipantCount,
        showTimeline: options.showTimeline,
        showCountdown: options.showCountdown,
        showPrizes: options.showPrizes,
    });
}
