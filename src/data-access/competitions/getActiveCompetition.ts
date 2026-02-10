import "server-only";

import { eq } from "drizzle-orm";
import db from "~/db/client";
import { competitions, organizations } from "~/db/schema";
import { getUserSession } from "../getCurrentUser";

/**
 * Fetches the currently active competition based on the user's session activeOrganizationId.
 * Joins with the organization table to get the competition name.
 */
export async function getActiveCompetition() {
    const session = await getUserSession();

    if (!session.session.activeOrganizationId) {
        return null; // Or throw error depending on desired behavior, but null is safer for UI handling
    }

    const result = await db
        .select({
            id: competitions.id,
            name: organizations.name,
            societyName: competitions.societyName,
            tagline: competitions.tagline,
            category: competitions.category,
            hashtags: competitions.hashtags,
            bannerId: competitions.bannerId,
            posterId: competitions.posterId,
            startDate: competitions.startDate,
            endDate: competitions.endDate,
            registrationDeadline: competitions.registrationDeadline,
        })
        .from(competitions)
        .innerJoin(organizations, eq(competitions.organizationId, organizations.id))
        .where(eq(competitions.organizationId, session.session.activeOrganizationId))
        .limit(1);

    return result[0] || null;
}
