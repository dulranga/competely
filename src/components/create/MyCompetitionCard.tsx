"use client";

import { Badge } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import Image from "next/image";
import { User } from "lucide-react";
import Link from "next/link";

export type CompetitionRole = "Owner" | "Admin" | "Judge" | "Committee";
export type CompetitionStatus = "draft" | "published" | "archived";

interface MyCompetitionCardProps {
    id: string;
    name: string;
    imageUrl: string;
    role: CompetitionRole;
    status?: CompetitionStatus;
    ownerName?: string; // If not owner
    variant?: "grid" | "list";
    className?: string;
    onClick?: () => void;
}

const roleStyles: Record<CompetitionRole, string> = {
    Owner: "bg-primary text-primary-foreground border-transparent",
    Admin: "bg-secondary text-secondary-foreground border-transparent",
    Judge: "bg-accent text-accent-foreground border-transparent",
    Committee: "bg-muted text-muted-foreground border-transparent",
};

const statusStyles: Record<CompetitionStatus, string> = {
    draft: "bg-foreground text-background dark:bg-muted dark:text-muted-foreground border-transparent",
    published: "bg-accent text-accent-foreground border-transparent",
    archived: "bg-destructive text-destructive-foreground border-transparent",
};

export function MyCompetitionCard({
    id,
    name,
    imageUrl,
    role,
    status,
    ownerName,
    variant = "grid",
    className,
    onClick,
}: MyCompetitionCardProps) {
    if (variant === "list") {
        return (
            <Card
                onClick={onClick}
                className={cn(
                    "relative w-full flex flex-row items-center justify-between p-4 rounded-xl border border-border/40 shadow-sm hover:shadow-md transition-all cursor-pointer bg-white group",
                    className,
                )}
            >
                <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">
                        <Link href={`/dashboard/competition?id=${id}`} className="after:absolute after:inset-0">
                            {name}
                        </Link>
                    </h3>
                    <div className="flex items-center gap-2">
                        {status && (
                            <Badge
                                variant="outline"
                                className={cn(
                                    "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                                    statusStyles[status],
                                )}
                            >
                                {status}
                            </Badge>
                        )}
                        {role !== "Owner" && ownerName && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <User className="h-3 w-3" />
                                <span>Owner: {ownerName}</span>
                            </div>
                        )}
                    </div>
                </div>

                <Badge
                    className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                        roleStyles[role],
                    )}
                >
                    {role}
                </Badge>
            </Card>
        );
    }

    // Grid Variant (Default)
    return (
        <Card
            onClick={onClick}
            className={cn(
                "relative w-full overflow-hidden rounded-xl border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-white group pt-0",
                className,
            )}
        >
            <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {status && (
                    <div className="absolute top-2 right-2 z-10">
                        <Badge
                            className={cn(
                                "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm border-0 bg-background",
                                statusStyles[status],
                            )}
                        >
                            {status}
                        </Badge>
                    </div>
                )}
            </div>
            <div className="px-4 flex items-center justify-between gap-2">
                <h3 className="font-semibold text-base text-gray-900 truncate" title={name}>
                    <Link href={`/dashboard/competition?id=${id}`} className="after:absolute after:inset-0">
                        {name}
                    </Link>
                </h3>
                <Badge
                    className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                        roleStyles[role],
                    )}
                >
                    {role}
                </Badge>
            </div>
            {role !== "Owner" && ownerName && (
                <div className="px-4 pb-4 pt-0 text-xs text-muted-foreground flex items-center gap-1">
                    <span className="truncate">by {ownerName}</span>
                </div>
            )}
        </Card>
    );
}
