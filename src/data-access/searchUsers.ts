import "server-only";

import { or, ilike, eq } from "drizzle-orm";
import db from "~/db/client";
import { users, members, organizations } from "~/db/schema";
import { getUserSession } from "./getCurrentUser";

/**
 * Searches for users based on name or email within the current competition/organization
 * 
 * @param query - The search query to filter users
 * @returns List of users matching the search query
 */
export async function searchUsers(query: string) {
    const session = await getUserSession();
    const activeOrganizationId = session.session.activeOrganizationId;

    if (!query.trim()) {
        return [];
    }

    if (!activeOrganizationId) {
        return [];
    }

    const searchPattern = `%${query}%`;

    const results = await db
        .select({
            id: users.id,
            name: users.name,
            email: users.email,
            image: users.image,
            role: members.role,
            createdAt: users.createdAt,
        })
        .from(users)
        .innerJoin(members, eq(users.id, members.userId))
        .where(
            or(
                ilike(users.name, searchPattern),
                ilike(users.email, searchPattern)
            )
        )
        .orderBy(users.name);

    return results;
}
