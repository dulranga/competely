import "server-only";

import { and, desc, eq, sql } from "drizzle-orm";
import db from "~/db/client";
import { bookmarks, competitions, files, members, organizations } from "~/db/schema";
import { getAllCompetitions } from "../competitions/getAllCompetitions";

/**
 * Fetches all competitions the user is registered for.
 * Uses the 'bookmarks' table where isRegistered = true as the source of truth.
 *
 * @param userId - The ID of the user to fetch competitions for
 * @returns List of registered competitions with details
 */
export async function getRegisteredCompetitions(userId: string) {
    const results = await db
        .select({
            id: competitions.id,
            title: organizations.name, // Following getAllCompetitions pattern
            tagline: competitions.tagline,
            shortDescription: competitions.shortDescription,
            societyName: competitions.societyName,
            organizerName: organizations.name,
            category: competitions.category,
            hashtags: competitions.hashtags,
            status: competitions.status,
            deadline: competitions.registrationDeadline,
            startDate: competitions.startDate,
            endDate: competitions.endDate,
            bannerId: competitions.bannerId,
            imageUrl: competitions.posterId, // Using posterId for card image as per getAllCompetitions
            isRegistered: bookmarks.isRegistered,
            isBookmarked: bookmarks.isBookmarked,
            registeredCount: sql<number>`(
                SELECT count(${members.id})
                FROM ${members}
                WHERE ${members.organizationId} = ${competitions.organizationId}
                AND ${members.role} = 'delegate'
            )`.mapWith(Number),
        })
        .from(bookmarks)
        .innerJoin(competitions, eq(bookmarks.competitionId, competitions.id))
        .innerJoin(organizations, eq(competitions.organizationId, organizations.id))
        .leftJoin(files, eq(competitions.posterId, files.id))
        .where(
            and(
                eq(bookmarks.userId, userId),
                eq(bookmarks.isRegistered, true)
            )
        )
        .orderBy(desc(competitions.endDate));

    return results;
}
