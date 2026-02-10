"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CheckCheck, Bell } from "lucide-react";
import { getNotificationsAction, markAllAsReadAction } from "~/data-access/delegate/actions/notifications";
import { NotificationItem } from "~/components/notifications/NotificationItem";
import { type Notification } from "~/data-access/delegate/notifications";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { FooterBottom } from "~/components/ui/footer-bottom";
import { cn } from "~/lib/utils";

export default function NotificationsPage() {
    const { data: notifications = [], isLoading, refetch } = useQuery({
        queryKey: ["notifications"],
        queryFn: () => getNotificationsAction(),
    });

    const [isMarkingAll, setIsMarkingAll] = useState(false);

    const handleMarkAllAsRead = async () => {
        setIsMarkingAll(true);
        try {
            await markAllAsReadAction();
            await refetch();
        } catch (error) {
            console.error("Failed to mark all as read", error);
        } finally {
            setIsMarkingAll(false);
        }
    };

    const hasUnread = notifications.some((n: Notification) => !n.isRead);

    return (
        <div className="flex flex-col min-h-screen bg-[#fbf6f3]">
            <div className="flex-1 pb-20 pt-10 px-4 md:px-8">
                <div className="max-w-[1500px] mx-auto space-y-8">
                    {/* Header Section */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-[#1a1b25]">Notifications</h1>
                            <p className="text-[#1a1b25]/70 mt-1 font-medium">
                                Stay updated with your competition activities and announcements.
                            </p>
                        </div>
                        {notifications.length > 0 && (
                            <Button
                                onClick={handleMarkAllAsRead}
                                disabled={!hasUnread || isMarkingAll}
                                variant="outline"
                                className="gap-2 rounded-full border-2 border-[#1a1b25] text-[#1a1b25] hover:bg-[#1a1b25] hover:text-white font-bold transition-all"
                            >
                                <CheckCheck className="h-4 w-4" />
                                Mark all as read
                            </Button>
                        )}
                    </div>

                    <Separator className="bg-[#1a1b25]/10" />

                    {/* Content Section */}
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <div className="animate-spin h-8 w-8 border-4 border-[#1a1b25] border-t-transparent rounded-full" />
                            <p className="text-[#1a1b25]/70 font-medium">Loading notifications...</p>
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 space-y-6 text-center border-2 border-dashed border-[#1a1b25]/10 rounded-3xl bg-white/50">
                            <div className="p-6 bg-white rounded-full shadow-sm">
                                <Bell className="h-10 w-10 text-[#1a1b25]/40" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-[#1a1b25]">No new notifications</h3>
                                <p className="text-[#1a1b25]/60 max-w-sm mx-auto">
                                    You're all caught up! Check back later for updates on your competitions.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 max-w-5xl">
                            <div className="flex items-center justify-between text-sm font-medium text-[#1a1b25]/60 px-1">
                                <span>{notifications.length} Total</span>
                            </div>

                            <div className="grid gap-4">
                                {notifications.map((notification: Notification) => (
                                    <div key={notification.id} className="bg-white rounded-xl shadow-sm border border-[#1a1b25]/5 overflow-hidden transition-all hover:shadow-md">
                                        <NotificationItem
                                            notification={notification}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <FooterBottom />
        </div>
    );
}
