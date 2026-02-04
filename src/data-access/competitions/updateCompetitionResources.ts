import "server-only";

import { eq } from "drizzle-orm";
import { competitionResources } from "~/db/schema";
import type { MainInfoSchema } from "~/components/dashboard/editor/maininformationsection/constants";
import type { DbTransaction } from "~/db/client";

export async function updateCompetitionResources(
    tx: DbTransaction,
    competitionId: string,
    resources: MainInfoSchema["resources"]
) {
    // 1. Delete existing resources
    await tx.delete(competitionResources).where(eq(competitionResources.competitionId, competitionId));

    // 2. Insert new resources
    if (resources.length > 0) {
        await tx.insert(competitionResources).values(
            resources.map((res) => ({
                competitionId,
                label: res.label,
                type: res.type,
                url: res.type === "url" ? res.url : null,
                fileId: res.type === "document" ? res.fileId : null,
            }))
        );
    }
}
