"use server";

import { revalidatePath } from "next/cache";
import { registerToCompetitionDAL } from "./register-to-competition";
import { getBookmarkedCompetitions } from "./bookmark";
import { getUserSession } from "~/data-access/getCurrentUser";
import { getNotifications } from "./notifications";

/**
 * Server action to register a user to a competition.
 */
export async function registerToCompetitionAction(competitionId: string) {
    try {
        const result = await registerToCompetitionDAL(competitionId);
        revalidatePath(`/c/${competitionId}`);
        revalidatePath("/dashboard");
        revalidatePath("/bookmarks");
        return result;
    } catch (error) {
        console.error("Registration failed:", error);
        return {
            error: (error as Error).message || "An unexpected error occurred during registration.",
        };
    }
}

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

/**
 * Server Action to get notifications for the current user
 */
export async function getNotificationsAction() {
    try {
        const session = await getUserSession();
        if (!session?.user) {
            return [];
        }
        const notifications = await getNotifications(session.user.id);
        return notifications;
    } catch (error) {
        console.error("Failed to fetch notifications:", error);
        return [];
    }
}
