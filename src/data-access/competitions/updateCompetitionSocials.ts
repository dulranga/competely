import "server-only";

import { eq } from "drizzle-orm";
import { competitionSocialLinks } from "~/db/schema";
import type { MainInfoSchema } from "~/components/dashboard/editor/maininformationsection/constants";
import type { DbTransaction } from "~/db/client";
import type { SocialPlatform } from "~/db/enums";

export async function updateCompetitionSocials(
    tx: DbTransaction,
    competitionId: string,
    socials: MainInfoSchema["socials"]
) {
    // 1. Delete existing socials
    await tx.delete(competitionSocialLinks).where(eq(competitionSocialLinks.competitionId, competitionId));

    // 2. Insert new socials
    if (socials.length > 0) {
        await tx.insert(competitionSocialLinks).values(
            socials.map((social) => ({
                competitionId,
                platform: social.platform as SocialPlatform, // Ensure type safety or cast if validated by Zod
                url: social.url,
            }))
        );
    }
}
