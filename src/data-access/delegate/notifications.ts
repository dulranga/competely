// Notifications db operations

import "server-only";

import { eq, desc, and } from "drizzle-orm";
import db from "~/db/client";
import { notifications } from "~/db/schema";
import { type InferSelectModel } from "drizzle-orm";

export type Notification = InferSelectModel<typeof notifications>;
export type NotificationType = "delegate" | "oc" | "system";

/**
 * Creates a new notification for a user.
 */
export async function createNotification(params: {
    userId: string;
    title: string;
    message: string;
    type: NotificationType;
    link?: string;
    linkLabel?: string;
}) {
    const [notification] = await db
        .insert(notifications)
        .values({
            userId: params.userId,
            title: params.title,
            message: params.message,
            type: params.type,
            link: params.link,
            linkLabel: params.linkLabel,
            isRead: false,
        })
        .returning();

    return notification;
}

/**
 * Retrieves notifications for a user, ordered by creation date (newest first).
 */
export async function getNotifications(userId: string) {
    const userNotifications = await db.query.notifications.findMany({
        where: eq(notifications.userId, userId),
        orderBy: [desc(notifications.createdAt)],
    });

    return userNotifications;
}

/**
 * Marks a single notification as read.
 */
export async function markNotificationAsRead(notificationId: string) {
    await db
        .update(notifications)
        .set({ isRead: true })
        .where(eq(notifications.id, notificationId));
}

/**
 * Marks all notifications for a user as read.
 */
export async function markAllNotificationsAsRead(userId: string) {
    await db
        .update(notifications)
        .set({ isRead: true })
        .where(
            and(
                eq(notifications.userId, userId),
                eq(notifications.isRead, false)
            )
        );
}


