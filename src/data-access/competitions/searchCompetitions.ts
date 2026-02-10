import "server-only";

import { desc, or, ilike, eq } from "drizzle-orm";
import db from "~/db/client";
import { competitions, organizations, files } from "~/db/schema";

/**
 * Searches for competitions based on title or organizer name
 * 
 * @param query - The search query to filter competitions
 * @returns List of competitions matching the search query
 */
export async function searchCompetitions(query: string) {
    if (!query.trim()) {
        return [];
    }

    const searchPattern = `%${query}%`;

    const results = await db
        .select({
            id: competitions.id,
            title: organizations.name,
            tagline: competitions.tagline,
            organizerName: organizations.name,
            category: competitions.category,
            hashtags: competitions.hashtags,
            status: competitions.status,
            deadline: competitions.registrationDeadline,
            startDate: competitions.startDate,
            endDate: competitions.endDate,
            bannerId: competitions.bannerId,
            imageUrl: competitions.posterId,
        })
        .from(competitions)
        .innerJoin(organizations, eq(competitions.organizationId, organizations.id))
        .leftJoin(files, eq(competitions.posterId, files.id))
        .where(
            or(
                ilike(organizations.name, searchPattern),
                ilike(competitions.tagline, searchPattern)
            )
        )
        .orderBy(desc(competitions.createdAt));

    return results;
}
