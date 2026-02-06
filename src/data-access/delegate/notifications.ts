// Notifications db operations

import "server-only";

import { eq, desc } from "drizzle-orm";
import db from "~/db/client";
import { notifications } from "~/db/schema";

/**
 * Creates a new notification for a user.
 * 
 * @param userId - The ID of the user to notify
 * @param message - The notification message
 * @returns The created notification
 */
export async function createNotification(userId: string, message: string) {
    const [notification] = await db
        .insert(notifications)
        .values({
            userId,
            message,
        })
        .returning();

    return notification;
}

/**
 * Retrieves notifications for a user, ordered by creation date (newest first).
 * 
 * @param userId - The ID of the user to fetch notifications for
 * @returns Array of notifications
 */
export async function getNotifications(userId: string) {
    const userNotifications = await db.query.notifications.findMany({
        where: eq(notifications.userId, userId),
        orderBy: [desc(notifications.createdAt)],
    });

    return userNotifications;
}

/**
 * Sends a registration confirmation notification to the user.
 * 
 * @param userId - The ID of the user
 * @param competitionId - The ID of the competition registered for
 */
export async function sendRegistrationNotification(userId: string, competitionId: string) {
    const message = `Registered for ${competitionId}, stay connect for more updates`;
    return await createNotification(userId, message);
}