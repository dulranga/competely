"use client";

import { cn } from "~/lib/utils";
import { LucideIcon } from "lucide-react";

interface TopicCardProps {
    title: string;
    description?: string[];
    keywords?: string[];
    icon: LucideIcon;
    colorClass: string; // Tailwincss class for background gradient
    textColorClass?: string;
    onClick?: () => void;
}

export function TopicCard({
    title,
    description = [],
    icon: Icon,
    colorClass,
    textColorClass = "text-white",
    onClick,
}: TopicCardProps) {
    return (
        <div
            onClick={onClick}
            className={cn("relative flex h-full w-full min-h-[140px] items-start justify-between overflow-hidden rounded-xl p-5 shadow-sm transition-all hover:shadow-md hover:scale-[1.01] cursor-pointer", colorClass)}
        >
            <div className="flex flex-col gap-2 relative z-10 w-2/3">
                <h3 className={cn("text-lg font-bold tracking-tight leading-snug", textColorClass)}>
                    {title}
                </h3>
                {description.length > 0 && (
                    <div className={cn("flex flex-col gap-0.5 mt-1", textColorClass)}>
                        {description.map((item, i) => (
                            <span key={i} className="text-[10px] opacity-90 font-mono tracking-wide">
                                {item}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className={cn("relative z-10 opacity-90", textColorClass)}>
                <Icon className="h-10 w-10 md:h-12 md:w-12" strokeWidth={1.5} />
            </div>

            {/* Subtle Texture/Pattern Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        </div>
    );
}
