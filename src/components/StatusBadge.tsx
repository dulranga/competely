"use client";

import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

export type CompetitionStatusType = "Upcoming" | "Ongoing" | "Finished";

interface StatusBadgeProps {
    startDate?: Date | null;
    endDate?: Date | null;
    className?: string;
}

const statusStyles: Record<CompetitionStatusType, string> = {
    Upcoming: "bg-blue-500/90 text-white hover:bg-blue-600 shadow-[0_0_12px_rgba(59,130,246,0.4)] border-blue-400/20",
    Ongoing: "bg-amber-500/90 text-white hover:bg-amber-600 shadow-[0_0_12px_rgba(245,158,11,0.4)] border-amber-400/20",
    Finished: "bg-gray-600/90 text-white hover:bg-gray-700 border-gray-500/20",
};

function getCompetitionStatus(startDate: Date | null | undefined, endDate: Date | null | undefined): CompetitionStatusType {
    const now = new Date();

    // If no dates provided, default to Upcoming
    if (!startDate) return "Upcoming";

    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    // Competition hasn't started yet
    if (now < start) {
        return "Upcoming";
    }

    // Competition has ended
    if (end && now > end) {
        return "Finished";
    }

    // Competition is currently ongoing
    return "Ongoing";
}

export function StatusBadge({ startDate, endDate, className }: StatusBadgeProps) {
    const status = getCompetitionStatus(startDate, endDate);

    return (
        <Badge
            variant="secondary"
            className={cn(
                "px-4 py-1.5 text-sm font-bold uppercase rounded-sm backdrop-blur-md border",
                statusStyles[status],
                className
            )}
        >
            {status}
        </Badge>
    );
}
