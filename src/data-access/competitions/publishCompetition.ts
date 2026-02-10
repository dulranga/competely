import "server-only";

import { eq } from "drizzle-orm";
import db from "~/db/client";
import { competitions } from "~/db/schema";

export async function publishCompetition(competitionId: string) {
    const [updated] = await db
        .update(competitions)
        .set({ status: "published" })
        .where(eq(competitions.id, competitionId))
        .returning();

    return updated;
}
