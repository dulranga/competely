import "server-only";

import { eq } from "drizzle-orm";
import { getUserSession } from "~/data-access/getCurrentUser";
import db from "~/db/client";
import { competitions } from "~/db/schema";

/**
 * Retrieves the currently active competition for the authenticated user.
 * It assumes that the active organization in the session corresponds to a competition.
 *
 * @returns The active competition record or null if not found.
 */
export async function getActiveCompetition() {
    const session = await getUserSession();
    const activeOrgId = session.session.activeOrganizationId;

    if (!activeOrgId) {
        return null;
    }

    const competition = await db.query.competitions.findFirst({
        where: eq(competitions.organizationId, activeOrgId),
        with: {
            organization: true,
        },
    });

    return competition || null;
}
