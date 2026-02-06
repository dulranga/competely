"use client";

import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { TechBorder } from "~/components/ui/tech-border";
import { AnimatedBackground } from "~/components/ui/animated-background";
import { Bell, Check, Clock, Info, AlertTriangle, CheckCircle2, X } from "lucide-react";
import { cn } from "~/lib/utils";

type NotificationType = "info" | "success" | "warning" | "error";

interface Notification {
    id: string;
    title: string;
    description: string;
    time: string;
    type: NotificationType;
    read: boolean;
}

const initialNotifications: Notification[] = [
    {
        id: "1",
        title: "Registration Confirmed",
        description: "You have successfully registered for the Stanford IV competition.",
        time: "2 mins ago",
        type: "success",
        read: false,
    },
    {
        id: "2",
        title: "New Team Member",
        description: "Sarah joined your team 'Code Wizards'.",
        time: "1 hour ago",
        type: "info",
        read: false,
    },
    {
        id: "3",
        title: "Submission Deadline Approaching",
        description: "The deadline for 'AI for Good' is in 24 hours.",
        time: "5 hours ago",
        type: "warning",
        read: true,
    },
    {
        id: "4",
        title: "System Maintenance",
        description: "Scheduled maintenance on Saturday, 10 PM UTC.",
        time: "1 day ago",
        type: "info",
        read: true,
    },
];

export default function NotificationsPage() {
    const [filter, setFilter] = useState<"all" | "unread">("all");
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

    const filteredNotifications = notifications.filter(
        (n) => filter === "all" || (filter === "unread" && !n.read)
    );

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const getIcon = (type: NotificationType) => {
        switch (type) {
            case "success": return <CheckCircle2 size={18} className="text-[#6dd594]" />;
            case "warning": return <AlertTriangle size={18} className="text-[#e5ab7d]" />;
            case "error": return <X size={18} className="text-red-500" />;
            default: return <Info size={18} className="text-blue-500" />;
        }
    };

    return (
        <div className="relative min-h-screen pb-20">
            {/* Background elements */}
            <div className="fixed inset-0 bg-[#fbf6f3] -z-20" />
            <AnimatedBackground className="fixed -z-10 opacity-60" />

            <div className="container mx-auto px-4 pt-8 max-w-4xl">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-[#0c0803] tracking-tight flex items-center gap-3">
                            <Bell className="fill-current text-[#e5ab7d]" />
                            Notifications
                        </h1>
                        <p className="text-[#0c0803]/50 mt-1">Stay updated with your latest activities.</p>
                    </div>

                    <div className="flex items-center gap-2 bg-white/50 p-1 rounded-xl border border-[#e8e2de]">
                        <button
                            onClick={() => setFilter("all")}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300",
                                filter === "all"
                                    ? "bg-[#0c0803] text-white shadow-md"
                                    : "text-[#0c0803]/50 hover:text-[#0c0803] hover:bg-white/80"
                            )}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter("unread")}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 flex items-center gap-2",
                                filter === "unread"
                                    ? "bg-[#0c0803] text-white shadow-md"
                                    : "text-[#0c0803]/50 hover:text-[#0c0803] hover:bg-white/80"
                            )}
                        >
                            Unread
                            {notifications.some(n => !n.read) && (
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end mb-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-[#0c0803]/50 hover:text-[#0c0803]"
                        disabled={!notifications.some(n => !n.read)}
                    >
                        <Check size={16} className="mr-2" />
                        Mark all as read
                    </Button>
                </div>

                {/* Notification List */}
                <div className="space-y-4">
                    {filteredNotifications.length === 0 ? (
                        <div className="text-center py-20 bg-white/50 rounded-3xl border border-[#e8e2de] border-dashed">
                            <Bell size={48} className="mx-auto text-[#0c0803]/10 mb-4" />
                            <p className="text-[#0c0803]/40 font-medium">No notifications found.</p>
                        </div>
                    ) : (
                        filteredNotifications.map((notification) => (
                            <TechBorder
                                key={notification.id}
                                className={cn(
                                    "rounded-2xl transition-all duration-300 group",
                                    notification.read ? "bg-white/60 border border-[#e8e2de]" : "bg-white border-transparent shadow-md"
                                )}
                            >
                                <div className="p-5 flex items-start gap-4">
                                    {/* Icon */}
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                                        notification.read ? "bg-[#fbf6f3]" : "bg-[#0c0803] text-white shadow-lg"
                                    )}>
                                        {getIcon(notification.type)}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4">
                                            <h3 className={cn(
                                                "text-sm font-bold truncate pr-4",
                                                notification.read ? "text-[#0c0803]/70" : "text-[#0c0803]"
                                            )}>
                                                {notification.title}
                                            </h3>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0c0803]/30 flex items-center gap-1 shrink-0">
                                                <Clock size={10} />
                                                {notification.time}
                                            </span>
                                        </div>
                                        <p className={cn(
                                            "text-sm mt-1 leading-relaxed",
                                            notification.read ? "text-[#0c0803]/50" : "text-[#0c0803]/80"
                                        )}>
                                            {notification.description}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {!notification.read && (
                                            <button
                                                onClick={() => markAsRead(notification.id)}
                                                className="p-1.5 rounded-lg hover:bg-[#fbf6f3] text-[#0c0803]/40 hover:text-[#6dd594] transition-colors"
                                                title="Mark as read"
                                            >
                                                <Check size={14} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteNotification(notification.id)}
                                            className="p-1.5 rounded-lg hover:bg-[#fbf6f3] text-[#0c0803]/40 hover:text-red-500 transition-colors"
                                            title="Delete"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                </div>
                            </TechBorder>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
