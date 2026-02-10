"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { getNotificationsAction } from "~/data-access/delegate/actions/notifications";
import { cn } from "~/lib/utils";
import { NotificationItem } from "./NotificationItem";
import { type Notification } from "~/data-access/delegate/notifications";

export default function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const { data: notifications = [], isLoading, refetch } = useQuery({
        queryKey: ["notifications"],
        queryFn: () => getNotificationsAction(),
        staleTime: 1000 * 60, // 1 minute
    });

    // Refetch when opening the dropdown to get latest status
    useEffect(() => {
        if (isOpen) {
            refetch();
        }
    }, [isOpen, refetch]);

    const unreadCount = notifications.filter((n: Notification) => !n.isRead).length;

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative group" title="Notifications">
                    <Bell className="h-5 w-5 group-hover:text-primary transition-colors" />
                    <span className="sr-only">Notifications</span>
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-1 ring-background animate-in zoom-in spin-in-12">
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[380px] p-0 overflow-hidden rounded-xl border border-border shadow-lg">
                <div className="flex items-center justify-between p-4 bg-muted/30 border-b">
                    <DropdownMenuLabel className="font-semibold text-lg p-0">Notifications</DropdownMenuLabel>
                    {unreadCount > 0 && (
                        <span className="text-xs font-medium text-muted-foreground bg-background px-2 py-0.5 rounded-full border shadow-sm">
                            {unreadCount} New
                        </span>
                    )}
                </div>

                <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    {isLoading ? (
                        <div className="p-8 flex items-center justify-center">
                            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="p-8 text-center flex flex-col items-center gap-2 text-muted-foreground">
                            <Bell className="h-8 w-8 opacity-20" />
                            <p className="text-sm font-medium">No notifications yet</p>
                            <p className="text-xs text-muted-foreground/80">We'll let you know when something important happens.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {notifications.slice(0, 5).map((notification: Notification) => (
                                <div key={notification.id} className="border-b last:border-0 hover:bg-muted/30">
                                    <NotificationItem
                                        notification={notification}
                                        compact={true}
                                        onClose={() => setIsOpen(false)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-2 bg-muted/30 border-t">
                    <Link href="/notifications" onClick={() => setIsOpen(false)} className="w-full">
                        <Button variant="ghost" className="w-full text-xs h-9 justify-center gap-1 font-medium text-muted-foreground hover:text-primary hover:bg-background">
                            See all notifications
                        </Button>
                    </Link>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
