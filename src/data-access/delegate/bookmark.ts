import "server-only";

import { eq, and } from "drizzle-orm";
import db from "~/db/client";
import { bookmarks, competitions, organizations, files } from "~/db/schema";
import { getUserSession } from "../getCurrentUser";

/**
 * Toggle bookmark status for a competition
 * @param competitionId - The ID of the competition to bookmark/unbookmark
 * @returns The updated bookmark status
 */
export async function toggleBookmark(competitionId: string) {
    const session = await getUserSession();

    // Check if bookmark exists
    const existingBookmark = await db.query.bookmarks.findFirst({
        where: and(
            eq(bookmarks.userId, session.user.id),
            eq(bookmarks.competitionId, competitionId)
        ),
    });

    if (existingBookmark) {
        // Toggle the isBookmarked status
        const newStatus = !existingBookmark.isBookmarked;
        await db
            .update(bookmarks)
            .set({ isBookmarked: newStatus })
            .where(
                and(
                    eq(bookmarks.userId, session.user.id),
                    eq(bookmarks.competitionId, competitionId)
                )
            );
        return newStatus;
    } else {
        // Create new bookmark entry with isBookmarked = true
        await db.insert(bookmarks).values({
            userId: session.user.id,
            competitionId,
            isBookmarked: true,
            isRegistered: false,
        });
        return true;
    }
}

/**
 * Get all bookmarked competitions for the current user
 * @returns List of bookmarked competitions with details
 */
export async function getBookmarkedCompetitions() {
    const session = await getUserSession();

    const results = await db
        .select({
            id: competitions.id,
            title: organizations.name,
            tagline: competitions.tagline,
            organizerName: organizations.name,
            category: competitions.category,
            status: competitions.status,
            deadline: competitions.registrationDeadline,
            startDate: competitions.startDate,
            endDate: competitions.endDate,
            bannerId: competitions.bannerId,
            imageUrl: competitions.bannerId,
            isBookmarked: bookmarks.isBookmarked,
        })
        .from(bookmarks)
        .innerJoin(competitions, eq(bookmarks.competitionId, competitions.id))
        .innerJoin(organizations, eq(competitions.organizationId, organizations.id))
        .leftJoin(files, eq(competitions.bannerId, files.id))
        .where(
            and(
                eq(bookmarks.userId, session.user.id),
                eq(bookmarks.isBookmarked, true)
            )
        )
        .orderBy(bookmarks.createdAt);

    return results;
}

/**
 * Get bookmark status for multiple competitions
 * @param competitionIds - Array of competition IDs to check
 * @returns Map of competition ID to bookmark status
 */
export async function getBookmarkStatuses(competitionIds: string[]) {
    const session = await getUserSession();

    const results = await db.query.bookmarks.findMany({
        where: and(
            eq(bookmarks.userId, session.user.id),
            eq(bookmarks.isBookmarked, true)
        ),
    });

    // Create a map of competitionId -> isBookmarked
    const statusMap = new Map<string, boolean>();
    for (const bookmark of results) {
        statusMap.set(bookmark.competitionId, bookmark.isBookmarked);
    }

    return statusMap;
}

/**
 * Check if a specific competition is bookmarked by the current user
 * @param competitionId - The ID of the competition to check
 * @returns Boolean indicating if the competition is bookmarked
 */
export async function isCompetitionBookmarked(competitionId: string): Promise<boolean> {
    const session = await getUserSession();

    const bookmark = await db.query.bookmarks.findFirst({
        where: and(
            eq(bookmarks.userId, session.user.id),
            eq(bookmarks.competitionId, competitionId)
        ),
    });

    return bookmark ? bookmark.isBookmarked : false;
}

/**
 * Get the count of bookmarked competitions for the current user
 * @returns Number of bookmarked competitions
 */
export async function getBookmarkedCount(): Promise<number> {
    const session = await getUserSession();

    const result = await db
        .select({ count: bookmarks.competitionId })
        .from(bookmarks)
        .where(
            and(
                eq(bookmarks.userId, session.user.id),
                eq(bookmarks.isBookmarked, true)
            )
        );

    return result.length;
}
