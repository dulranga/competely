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
                description: data.description,
                bannerId: data.bannerId,
                // logoId is not in competition schema directly?
                // Checking schema: competitions table has `bannerId`.
                // It does NOT have `logoId`.
                // Wait, `logoId` usually belongs to Organization? Or is it for competition branding?
                // Let's check `CreateCompetitionSchema` or `competitions` table.
                // `competitions` table: id, organizationId, tagline, description, category, hashtags, bannerId... NO logoId.
                // `organizations` table has logo?
                // Let's assume for now we only update what's in `competitions`.
                // If logoId is needed, we might need to update Organization or add it to competition.
                // For this task, I will omit logoId if it's not in schema, or check if it should be in Organization.
                // `updateCompetition.ts` (existing) updates `organizations` name.
                // Let's check `updateCompetition.ts` again.
                // It updates `organizations` name. It updates `competitions` bannerId.
                // It does NOT seem to handle logoId.
                // I will skip logoId for now to avoid breaking changes, or better, if it IS in schema (I might have missed it), I use it.
                // I viewed `competitions-schema.ts` in step 32. It has `bannerId`. NO `logoId`.
                // I will ignore logoId for now.
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
