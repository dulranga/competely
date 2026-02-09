import "server-only";

import { eq } from "drizzle-orm";
import db from "~/db/client";
import { competitions } from "~/db/schema";
import type { MainInfoSchema } from "~/components/dashboard/editor/maininformationsection/constants";
import { updateCompetitionPrizes } from "./updateCompetitionPrizes";
import { updateCompetitionResources } from "./updateCompetitionResources";
import { updateCompetitionSocials } from "./updateCompetitionSocials";
import { updateCompetitionPublishOptions } from "./updateCompetitionPublishOptions";

export async function updateCompetitionMainInfo(competitionId: string, data: MainInfoSchema) {
    return await db.transaction(async (tx) => {
        // 1. Update basic fields in competitions table
        await tx
            .update(competitions)
            .set({
                tagline: data.tagline,
                description: data.description,
                bannerId: data.bannerId || null,
                logoId: data.logoId || null,
            })
            .where(eq(competitions.id, competitionId));

        // 2. Update Relations
        await updateCompetitionPrizes(tx, competitionId, data.prizes);
        await updateCompetitionResources(tx, competitionId, data.resources);
        await updateCompetitionSocials(tx, competitionId, data.socials);

        // 3. Update Publish Options
        await updateCompetitionPublishOptions(tx, competitionId, {
            showParticipantCount: data.showParticipantCount,
            showTimeline: data.showTimeline,
            showCountdown: data.showCountdown,
            showPrizes: data.showPrizes,
        });

        return { success: true };
    });
}
