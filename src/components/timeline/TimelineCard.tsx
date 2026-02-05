"use client";

import { format } from "date-fns";
import {
    Bell,
    BellOff,
    Calendar,
    Clock,
    Edit,
    FileText,
    Link as LinkIcon,
    MapPin,
    Trash2,
    X,
} from "lucide-react";
import { cn } from "~/lib/utils";

export type TimelineVariant = "event" | "delegate" | "home" | "calendar";

export interface TimelineResource {
    id: string;
    label: string;
    url?: string | null;
    fileId?: string | null;
    type: "url" | "document" | string;
}

export interface TimelineCardProps {
    variant: TimelineVariant;
    data: {
        competitionName?: string;
        roundName?: string;
        eventName?: string;
        type?: string;
        status?: "active" | "upcoming" | "completed" | string;
        startDatetime?: string | Date; // ISO string or Date
        endDatetime?: string | Date;
        location?: string | null;
        description?: string | null;
        notificationEnabled?: boolean;
        addToTimeline?: boolean;
        resources?: TimelineResource[];
    };
    onEdit?: () => void;
    onDelete?: () => void;
    className?: string;
}

export function TimelineCard({
    variant,
    data,
    onEdit,
    onDelete,
    className,
}: TimelineCardProps) {
    const {
        competitionName,
        roundName,
        eventName,
        type,
        status,
        startDatetime,
        endDatetime,
        location,
        description,
        notificationEnabled,
        addToTimeline,
        resources,
    } = data;

    const startDate = startDatetime ? new Date(startDatetime) : null;
    const endDate = endDatetime ? new Date(endDatetime) : null;

    // --- Variant 1: Competition Event ---
    if (variant === "event") {
        return (
            <div
                className={cn(
                    "relative w-full bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all",
                    className
                )}
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold text-gray-900">{eventName}</h3>
                        {/* Chips */}
                        <div className="flex items-center gap-2">
                            {startDate && (
                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                                    {format(startDate, "MXdd, yyyy")}
                                </span>
                            )}
                            {startDate && (
                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                                    {format(startDate, "h:mm a")}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {type && (
                            <span
                                className={cn(
                                    "px-3 py-1 rounded-full text-sm font-medium",
                                    type.toLowerCase() === 'session' ? "bg-green-100 text-green-700" :
                                        type.toLowerCase() === 'submission' ? "bg-green-100 text-green-700" :
                                            "bg-gray-100 text-gray-700"
                                )}
                            >
                                {type}
                            </span>
                        )}
                        <div className="flex items-center gap-1 ml-2">
                            {onEdit && (
                                <button
                                    onClick={onEdit}
                                    className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                            )}
                            {onDelete && (
                                <button
                                    onClick={onDelete}
                                    className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    {/* Resources */}
                    {resources && resources.length > 0 && (
                        <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-700 underline underline-offset-2">
                            {resources.map((res) => (
                                <a
                                    key={res.id}
                                    href={res.url || "#"}
                                    className="flex items-center gap-1 hover:text-black transition-colors"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {res.type === "url" ? (
                                        <LinkIcon className="w-4 h-4" />
                                    ) : (
                                        <FileText className="w-4 h-4" />
                                    )}
                                    {res.label}
                                </a>
                            ))}
                        </div>
                    )}

                    {/* Description */}
                    {description && (
                        <div className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                            {description}
                        </div>
                    )}

                    {/* Location */}
                    {location && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin className="w-4 h-4" /> {location}
                        </div>
                    )}
                </div>

                {/* Footer Icons */}
                <div className="absolute bottom-6 right-6 flex items-center gap-3">
                    {notificationEnabled === true ? (
                        <Bell className="w-5 h-5 text-gray-700" />
                    ) : (
                        <BellOff className="w-5 h-5 text-gray-300" />
                    )}
                    {addToTimeline === true ? (
                        <Clock className="w-5 h-5 text-gray-700" />
                    ) : (
                        <Clock className="w-5 h-5 text-gray-300" />
                    )}
                </div>
            </div>
        );
    }

    // --- Variant 2: Delegate Personal Timeline ---
    if (variant === "delegate") {
        return (
            <div
                className={cn(
                    "w-full bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all",
                    className
                )}
            >
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                            {competitionName} • {roundName}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{eventName}</h3>

                        <div className="flex items-center gap-2 mb-4">
                            {startDate && (
                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                                    {format(startDate, "MMM dd, yyyy")}
                                </span>
                            )}
                            {startDate && (
                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                                    {format(startDate, "h:mm a")}
                                </span>
                            )}
                        </div>
                    </div>
                    {type && (
                        <span
                            className={cn(
                                "px-3 py-1 rounded-full text-sm font-medium",
                                type.toLowerCase() === 'session' ? "bg-green-100 text-green-700" :
                                    type.toLowerCase() === 'submission' ? "bg-green-100 text-green-700" :
                                        "bg-gray-100 text-gray-700"
                            )}
                        >
                            {type}
                        </span>
                    )}
                </div>

                {description && (
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
        );
    }

    // --- Variant 3: Home Page Timeline ---
    if (variant === "home") {
        const isActive = status === 'active';
        return (
            <div
                className={cn(
                    "relative w-48 bg-white rounded-2xl p-4 border border-border/40 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 text-center group",
                    isActive ? "ring-2 ring-green-500/20 py-6" : "mb-8", // slight height diff or just styling
                    className
                )}
            >
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-b border-r border-border/40" />

                <div className={cn(
                    "text-xs font-bold tracking-widest uppercase mb-1",
                    isActive ? "text-green-600" : "text-muted-foreground"
                )}>
                    {startDate ? format(startDate, "MMM dd") : "TBD"}
                </div>

                <h3 className="font-bold text-gray-900 leading-tight mb-1 text-sm">
                    {competitionName}
                </h3>
                <p className="text-xs text-muted-foreground font-medium mb-3">
                    {eventName}
                </p>

                {startDate && (
                    <div className="px-2 py-1 bg-gray-50 rounded-lg text-xs font-bold text-gray-600 inline-block">
                        {format(startDate, "h.mm a")}
                    </div>
                )}
            </div>
        );
    }

    // --- Variant 4: Calendar Version ---
    if (variant === "calendar") {
        return (
            <div
                className={cn(
                    "bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all",
                    className
                )}
            >
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            {competitionName}
                        </div>
                        <h4 className="font-bold text-lg text-gray-900 leading-tight">
                            {eventName}
                        </h4>
                        {roundName && (
                            <div className="text-xs text-muted-foreground font-medium mt-0.5">
                                {roundName}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-50 flex flex-col gap-1 text-xs text-gray-500">
                    {startDate && (
                        <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{format(startDate, "MMM d, yyyy")} • {format(startDate, "h:mm a")}</span>
                            {endDate && <span> - {format(endDate, "h:mm a")}</span>}
                        </div>
                    )}
                    {location && (
                        <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{location}</span>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return null;
}
