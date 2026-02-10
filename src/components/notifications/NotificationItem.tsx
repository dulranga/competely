"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ChevronDown, ChevronUp, Bell, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "~/lib/utils";
import { type Notification, type NotificationType } from "~/data-access/delegate/notifications";
import { markAsReadAction } from "~/data-access/delegate/actions/notifications";
import { Button } from "~/components/ui/button";

interface NotificationItemProps {
    notification: Notification;
    compact?: boolean; // For dropdown view
    onClose?: () => void; // For closing dropdown on navigation
}

export function NotificationItem({ notification, compact = false, onClose }: NotificationItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isRead, setIsRead] = useState(notification.isRead);

    const handleMarkAsRead = async () => {
        if (!isRead) {
            setIsRead(true);
            try {
                await markAsReadAction(notification.id);
            } catch (error) {
                console.error("Failed to mark as read", error);
                setIsRead(false); // Revert on error
            }
        }
    };

    const toggleExpand = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleMarkAsRead();
        setIsExpanded(!isExpanded);
    };

    const handleLinkClick = () => {
        handleMarkAsRead();
        if (onClose) onClose();
    };

    // Styling based on type
    const getTypeStyles = (type: string) => {
        switch (type as NotificationType) {
            case "delegate":
                return "border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/10";
            case "oc":
                return "border-l-4 border-l-amber-500 bg-amber-50/50 dark:bg-amber-900/10";
            case "system":
                return "border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-900/10";
            default:
                return "border-l-4 border-l-gray-200";
        }
    };

    const getIcon = (type: string) => {
        switch (type as NotificationType) {
            case "delegate": return <Info className="h-4 w-4 text-blue-500" />;
            case "oc": return <AlertTriangle className="h-4 w-4 text-amber-500" />;
            case "system": return <Bell className="h-4 w-4 text-red-500" />;
            default: return <Bell className="h-4 w-4" />;
        }
    };

    // Truncation logic
    const isLongMessage = notification.message.length > 100;
    const displayedMessage = !isExpanded && isLongMessage && !compact
        ? `${notification.message.substring(0, 100)}...`
        : notification.message;

    return (
        <div
            className={cn(
                "relative flex flex-col gap-2 rounded-lg p-3 transition-colors hover:bg-muted/50",
                getTypeStyles(notification.type),
                !isRead && "bg-background shadow-sm"
            )}
            onClick={compact ? handleLinkClick : undefined} // Navigation/Read on click in dropdown
        >
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3 w-full">
                    <div className="mt-1 shrink-0">{getIcon(notification.type)}</div>
                    <div className="flex flex-col gap-1 w-full min-w-0">
                        <div className="flex items-center justify-between gap-2">
                            <span className={cn("text-sm font-semibold", !isRead && "text-foreground")}>
                                {notification.title}
                            </span>
                            <span className="shrink-0 text-xs text-muted-foreground whitespace-nowrap">
                                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                            </span>
                        </div>

                        <div
                            className={cn(
                                "text-sm text-muted-foreground break-words",
                                compact && "line-clamp-2"
                            )}
                        >
                            {compact ? notification.message : displayedMessage}
                        </div>

                        {/* Expand/Collapse for Full Page View */}
                        {!compact && isLongMessage && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-auto w-fit p-0 text-xs text-primary hover:bg-transparent"
                                onClick={toggleExpand}
                            >
                                {isExpanded ? (
                                    <span className="flex items-center gap-1">Show Less <ChevronUp className="h-3 w-3" /></span>
                                ) : (
                                    <span className="flex items-center gap-1">Show More <ChevronDown className="h-3 w-3" /></span>
                                )}
                            </Button>
                        )}

                        {/* Action Link */}
                        {notification.link && (isExpanded || compact || !isLongMessage) && (
                            <Link
                                href={notification.link}
                                onClick={handleLinkClick}
                                className={cn(
                                    "mt-2 inline-flex w-fit items-center text-xs font-medium text-primary hover:underline",
                                    compact && "mt-1"
                                )}
                            >
                                {notification.linkLabel || "View Details"}
                            </Link>
                        )}
                    </div>
                </div>

                {/* Unread Indicator */}
                {!isRead && (
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
                )}
            </div>
        </div>
    );
}
