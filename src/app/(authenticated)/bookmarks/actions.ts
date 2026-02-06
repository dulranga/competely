"use server";

import { toggleBookmark, getBookmarkedCompetitions } from "~/data-access/delegate/bookmark";
import { revalidatePath } from "next/cache";

/**
 * Server Action to toggle bookmark status
 * @param competitionId - The ID of the competition to bookmark/unbookmark
 */
export async function toggleBookmarkAction(competitionId: string) {
    try {
        const newStatus = await toggleBookmark(competitionId);

        // Revalidate relevant pages
        revalidatePath("/bookmarks");
        revalidatePath("/discover");

        return { success: true, isBookmarked: newStatus };
    } catch (error) {
        console.error("Failed to toggle bookmark:", error);
        return { success: false, error: "Failed to toggle bookmark" };
    }
}
