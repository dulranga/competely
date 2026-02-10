"use client";

import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

export type CompetitionStatusType = "Upcoming" | "Ongoing" | "Finished" | "Registered" | "Open" | "Closed" | "Ended";

interface StatusBadgeProps {
    startDate?: Date | string | null;
    endDate?: Date | string | null;
    isRegistered?: boolean;
    overrideStatus?: CompetitionStatusType | string;
    className?: string;
}

const statusStyles: Record<string, string> = {
    Upcoming: "bg-blue-500/90 text-white hover:bg-blue-600 shadow-[0_0_12px_rgba(59,130,246,0.4)] border-blue-400/20",
    Ongoing: "bg-amber-500/90 text-white hover:bg-amber-600 shadow-[0_0_12px_rgba(245,158,11,0.4)] border-amber-400/20",
    Finished: "bg-gray-600/90 text-white hover:bg-gray-700 border-gray-500/20",
    Registered: "bg-green-500/90 text-white hover:bg-green-600 shadow-[0_0_12px_rgba(34,197,94,0.4)] border-green-400/20",
    Open: "bg-emerald-500/90 text-white hover:bg-emerald-600 shadow-[0_0_12px_rgba(16,185,129,0.4)] border-emerald-400/20",
    Closed: "bg-red-500/90 text-white hover:bg-red-600 shadow-[0_0_12px_rgba(239,68,68,0.4)] border-red-400/20",
    Ended: "bg-gray-500/90 text-white hover:bg-gray-600 border-gray-400/20",
};

function getCompetitionStatus(startDate: Date | string | null | undefined, endDate: Date | string | null | undefined, isRegistered: boolean = false): CompetitionStatusType {
    const now = new Date();

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    // 1. Check if finished (Highest Priority for completion)
    if (end && now > end) {
        return "Finished";
    }

    // 2. Check if registered (Overrides Ongoing/Upcoming if not finished)
    if (isRegistered) {
        return "Registered";
    }

    // 3. Check if upcoming
    if (start && now < start) {
        return "Upcoming";
    }

    // 4. Default to Ongoing if started and not finished
    return "Ongoing";
}

export function StatusBadge({ startDate, endDate, isRegistered = false, overrideStatus, className }: StatusBadgeProps) {
    const calculatedStatus = getCompetitionStatus(startDate, endDate, isRegistered);
    const status = overrideStatus || calculatedStatus;

    // Fallback style if status is not found in map
    const style = statusStyles[status] || statusStyles.Ongoing;

    return (
        <Badge
            variant="secondary"
            className={cn(
                "px-4 py-1.5 text-sm font-bold uppercase rounded-sm backdrop-blur-md border",
                style,
                className
            )}
        >
            {status}
        </Badge>
    );
}
