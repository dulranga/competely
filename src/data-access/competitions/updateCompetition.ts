import "server-only";

import { eq } from "drizzle-orm";
import db from "~/db/client";
import { competitions, organizations } from "~/db/schema";
import type { CreateCompetitionSchema } from "~/lib/schemas/competition.schema";

export async function updateCompetition(competitionId: string, data: Partial<CreateCompetitionSchema>) {
    console.log("updateCompetition called with:", { competitionId, data }); // Debug log
    
    // 1. Get the organizationId for this competition
    const competition = await db.query.competitions.findFirst({
        where: eq(competitions.id, competitionId),
        columns: {
            organizationId: true,
        },
    });

    if (!competition) {
        throw new Error("Competition not found");
    }

    console.log("Found competition:", competition); // Debug log

    // 2. Update the organization name if provided
    if (data.name) {
        await db.update(organizations).set({ name: data.name }).where(eq(organizations.id, competition.organizationId));
    }

    // 3. Update the competition details
    const updateData = {
        tagline: data.tagline,
        category: data.category,
        hashtags: data.hashtags,
        bannerId: data.bannerId,
        startDate: data.startDate,
        endDate: data.endDate,
        registrationDeadline: data.registrationDeadline,
    };
    
    console.log("Updating competition with:", updateData); // Debug log
    
    const result = await db
        .update(competitions)
        .set({
            tagline: data.tagline,
            societyName: data.societyName,
            category: data.category,
            posterId: data.posterId,
            startDate: data.startDate,
            endDate: data.endDate,
            registrationDeadline: data.registrationDeadline,
        })
        .where(eq(competitions.id, competitionId));

    return { success: true };
}
