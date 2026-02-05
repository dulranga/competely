import "server-only";

import { eq } from "drizzle-orm";
import db from "~/db/client";
import { competitions } from "~/db/schema";
import type { MainInfoSchema } from "~/components/dashboard/editor/maininformationsection/constants";

export async function getCompetitionMainInfo(competitionId: string): Promise<MainInfoSchema> {
    const competition = await db.query.competitions.findFirst({
        where: eq(competitions.id, competitionId),
        with: {
            prizes: true,
            resources: true,
            socialLinks: true,
            publishOptions: true,
        },
        columns: {
            id: true,
            description: true,
            bannerId: true,
            // logoId is not in competition schema, skipping
        },
    });

    if (!competition) {
        throw new Error("Competition not found");
    }

    // Map to Zod Schema
    return {
        bannerId: competition.bannerId,
        logoId: null, // Not persisted yet
        description: competition.description || "",
        prizes: competition.prizes.map((p) => ({
            id: p.id,
            name: p.title,
            amount: p.cashPrize.toString(),
        })),
        resources: competition.resources.map((r) => ({
            id: r.id,
            type: (r.type as "document" | "url") || "url", // Fallback safety
            label: r.label,
            url: r.url || "",
            fileId: r.fileId,
        })),
        socials: competition.socialLinks.map((s) => ({
            platform: s.platform,
            url: s.url,
        })),
        // Publish Options (Defaults if not present, though migration adds them)
        showParticipantCount: competition.publishOptions?.showParticipantCount ?? true,
        showTimeline: competition.publishOptions?.showTimeline ?? true,
        showCountdown: competition.publishOptions?.showCountdown ?? true,
        showPrizes: competition.publishOptions?.showPrizes ?? true,
    };
}
