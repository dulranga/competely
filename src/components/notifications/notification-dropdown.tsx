"use client";

import { useState } from "react";
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

export default function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const { data: notifications = [], isLoading } = useQuery({
        queryKey: ["notifications"],
        queryFn: () => getNotificationsAction(),
        // Refetch when opening the dropdown could be good, but for now simple mount fetch
    });

    // Simple unread logic: if there are ANY notifications, show badge
    // In a real app we'd check 'read' status
    const hasUnread = notifications.length > 0;

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" title="Notifications">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                    {hasUnread && (
                        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary animate-pulse" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="font-semibold">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <div className="max-h-[300px] overflow-y-auto">
                    {isLoading ? (
                        <div className="p-4 text-center text-sm text-balance text-muted-foreground">
                            Loading...
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            No notifications
                        </div>
                    ) : (
                        notifications.map((notification: any) => (
                            <div key={notification.id} className="p-3 border-b last:border-0 hover:bg-muted/50 transition-colors">
                                <p className="text-sm text-foreground mb-1 line-clamp-2">
                                    {notification.message}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {new Date(notification.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))
                    )}
                </div>

                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="w-full cursor-pointer justify-center p-2 text-primary font-medium focus:text-primary">
                    <Link href="/notifications" onClick={() => setIsOpen(false)}>
                        See more
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
