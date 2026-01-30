"use client";

import { Badge } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import Image from "next/image";
import { User } from "lucide-react";

export type CompetitionRole = "Owner" | "Admin" | "Judge" | "Committee";

interface MyCompetitionCardProps {
    name: string;
    imageUrl: string;
    role: CompetitionRole;
    ownerName?: string; // If not owner
    variant?: "grid" | "list";
    className?: string;
    onClick?: () => void;
}

const roleStyles: Record<CompetitionRole, string> = {
    Owner: "bg-[#ff4d4f] hover:bg-[#ff4d4f]/90 text-white border-transparent", // Redish
    Admin: "bg-[#1890ff] hover:bg-[#1890ff]/90 text-white border-transparent", // Blue
    Judge: "bg-[#faad14] hover:bg-[#faad14]/90 text-white border-transparent", // Amber
    Committee: "bg-[#52c41a] hover:bg-[#52c41a]/90 text-white border-transparent", // Green
};

export function MyCompetitionCard({
    name,
    imageUrl,
    role,
    ownerName,
    variant = "grid",
    className,
    onClick
}: MyCompetitionCardProps) {

    if (variant === "list") {
        return (
            <Card
                onClick={onClick}
                className={cn(
                    "w-full flex flex-row items-center justify-between p-4 rounded-xl border border-border/40 shadow-sm hover:shadow-md transition-all cursor-pointer bg-white group",
                    className
                )}
            >
                <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">
                        {name}
                    </h3>
                    {role !== "Owner" && ownerName && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span>Owner: {ownerName}</span>
                        </div>
                    )}
                </div>

                <Badge className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", roleStyles[role])}>
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
                "w-full overflow-hidden rounded-xl border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-white group",
                className
            )}
        >
            <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="p-4 flex items-center justify-between gap-2">
                <h3 className="font-semibold text-base text-gray-900 truncate" title={name}>
                    {name}
                </h3>
                <Badge className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", roleStyles[role])}>
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
