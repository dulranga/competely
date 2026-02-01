import "server-only";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import db from "~/db/client";
import { competitions } from "~/db/schema";
import { auth } from "~/lib/auth";

/**
 * Sets the active organization for the current session based on a competition ID.
 * This updates the `activeOrganizationId` in the session via Better Auth.
 *
 * @param competitionId - The UUID of the competition
 * @returns The updated session or organization information
 */
export async function setActiveCompetition(competitionId: string) {
    // 1. Find the organization ID associated with the competition
    const competition = await db.query.competitions.findFirst({
        where: eq(competitions.id, competitionId),
        columns: {
            organizationId: true,
        },
    });

    if (!competition) {
        throw new Error("Competition not found");
    }

    // TODO: limit access when the role is judge or delegate

    // 2. Set the active organization in Better Auth
    // This will update the session's activeOrganizationId
    const response = await auth.api.setActiveOrganization({
        body: {
            organizationId: competition.organizationId,
        },
        headers: await headers(),
    });

    return response;
}
