import "server-only";

import { eq, and, desc } from "drizzle-orm";
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
            bannerId: files.id, // In a real app, you might map this to a URL
        })
        .from(competitions)
        .innerJoin(organizations, eq(competitions.organizationId, organizations.id))
        .innerJoin(members, and(eq(members.organizationId, organizations.id), eq(members.userId, session.user.id)))
        .leftJoin(files, eq(competitions.bannerId, files.id))
        .orderBy(desc(competitions.createdAt));

    return results;
}
