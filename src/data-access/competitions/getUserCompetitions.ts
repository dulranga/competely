import "server-only";

import { eq, and, desc, inArray } from "drizzle-orm";
import db from "~/db/client";
import { competitions, members, organizations, files } from "~/db/schema";
import { getUserSession } from "../getCurrentUser";

/**
 * Fetches all competitions where the current authenticated user is a member
 * of the linked organization.
 *
 * @returns  List of competitions with their organization details
 */
export async function getUserCompetitions() {
    const session = await getUserSession();

    const results = await db
        .select({
            id: competitions.id,
            name: organizations.name,
            role: members.role,
            posterId: files.id,
            status: competitions.status,
        })
        .from(competitions)
        .innerJoin(organizations, eq(competitions.organizationId, organizations.id))
        .innerJoin(members, and(eq(members.organizationId, organizations.id), eq(members.userId, session.user.id)))
        .leftJoin(files, eq(competitions.posterId, files.id))
        .where(
            and(
                eq(members.userId, session.user.id),
                inArray(members.role, ["owner", "oc_member"]),
                // eq(competitions.status, "published"),
            ),
        )
        .orderBy(desc(competitions.createdAt));

    console.log(results);

    return results;
}
