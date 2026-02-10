"use server";

import { getBookmarkedCompetitions } from "../bookmark";

/**
 * Server Action to get bookmark count
 */
export async function getBookmarksCountAction() {
    try {
        const bookmarks = await getBookmarkedCompetitions();
        return bookmarks.length;
    } catch (error) {
        return 0;
    }
}
