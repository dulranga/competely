import "server-only";

import { desc, eq, sql } from "drizzle-orm";
import db from "~/db/client";
import { competitions, organizations, files, members } from "~/db/schema";

/**
 * Fetches trending competitions based on the number of registered delegates.
 * 
 * @param limit Number of competitions to fetch (default: 5)
 * @returns List of trending competitions
 */
export async function getTrendingCompetitions(limit = 5) {
    const results = await db
        .select({
            id: competitions.id,
            title: organizations.name, // Using organization name as title for now as per getAllCompetitions pattern
            tagline: competitions.tagline,
            shortDescription: competitions.shortDescription,
            organizerName: organizations.name,
            category: competitions.category,
            hashtags: competitions.hashtags,
            status: competitions.status,
            deadline: competitions.registrationDeadline,
            startDate: competitions.startDate,
            endDate: competitions.endDate,
            bannerId: competitions.bannerId,
            imageUrl: competitions.posterId,
            registeredCount: sql<number>`(
                SELECT count(${members.id})
                FROM ${members}
                WHERE ${members.organizationId} = ${competitions.organizationId}
                AND ${members.role} = 'delegate'
            )`.mapWith(Number),
        })
        .from(competitions)
        .innerJoin(organizations, eq(competitions.organizationId, organizations.id))
        .leftJoin(files, eq(competitions.posterId, files.id))
        .where(eq(competitions.status, "published"))
        .orderBy(desc(sql`(
            SELECT count(${members.id})
            FROM ${members}
            WHERE ${members.organizationId} = ${competitions.organizationId}
            AND ${members.role} = 'delegate'
        )`), desc(competitions.createdAt))
        .limit(limit);

    return results;
}
