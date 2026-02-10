"use server";

import { revalidatePath } from "next/cache";
import { getUserSession } from "~/data-access/getCurrentUser";
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "../notifications";

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

/**
 * server action to mark a notification as read
 * @param notificationId - ID of the notification
 */
export async function markAsReadAction(notificationId: string) {
    if (!notificationId) {
        throw new Error("Notification ID is required");
    }
    await markNotificationAsRead(notificationId);
    revalidatePath("/notifications");
    // Also revalidate dashboard if notifications are shown there
    revalidatePath("/dashboard");
}

/**
 * server action to mark all notifications as read for a user
 */
export async function markAllAsReadAction() {
    const session = await getUserSession();
    if (!session?.user) {
        throw new Error("Unauthorized");
    }
    await markAllNotificationsAsRead(session.user.id);
    revalidatePath("/notifications");
    revalidatePath("/dashboard");
}
