"use client";

import { Calendar, MapPin, Users, Shapes, Bookmark } from "lucide-react";
import Image from "next/image";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { useState } from "react";

export type CompetitionStatus = "Ongoing" | "Upcoming" | "Ended" | "Open" | "Closed" | "Registered" | "Finished";

interface CompetitionCardProps {
    title?: string;
    description?: string;
    imageUrl?: string;
    deadline?: string;
    location?: string;
    registeredCount?: number;
    category?: string;
    organizerName?: string;
    status?: CompetitionStatus;
    variant?: "grid" | "list";
    isBookmarked?: boolean;
    onClick?: () => void;
}

const statusStyles: Record<CompetitionStatus, string> = {
    Ongoing: "bg-amber-500/90 text-white hover:bg-amber-600 shadow-[0_0_12px_rgba(245,158,11,0.4)] border-amber-400/20",
    Upcoming: "bg-blue-500/90 text-white hover:bg-blue-600 shadow-[0_0_12px_rgba(59,130,246,0.4)] border-blue-400/20",
    Open: "bg-emerald-500/90 text-white hover:bg-emerald-600 shadow-[0_0_12px_rgba(16,185,129,0.4)] border-emerald-400/20",
    Ended: "bg-gray-500/90 text-white hover:bg-gray-600 border-gray-400/20",
    Closed: "bg-red-500/90 text-white hover:bg-red-600 shadow-[0_0_12px_rgba(239,68,68,0.4)] border-red-400/20",
    Registered: "bg-green-500/90 text-white hover:bg-green-600 shadow-[0_0_12px_rgba(34,197,94,0.4)] border-green-400/20",
    Finished: "bg-gray-600/90 text-white hover:bg-gray-700 border-gray-500/20",
};

export function CompetitionCard({
    title = "HackExtreme",
    description = "Add a description here. Add a description here. Add a description here. Add a description here. Add a description here.",
    imageUrl = "https://images.unsplash.com/photo-1504384308090-c54be3855833?q=80&w=2574&auto=format&fit=crop",
    deadline = "Jan 17, 2026 (deadline)",
    location = "Lyceum College, Nugegoda.",
    registeredCount = 74,
    category = "School Category",
    organizerName = "Hack dev Club",
    status = "Ongoing",
    variant = "grid",
    isBookmarked: initialIsBookmarked = false,
    onClick,
}: CompetitionCardProps) {
    const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);

    if (variant === "list") {
        return (
            <Card
                onClick={onClick}
                className="w-full relative overflow-hidden rounded-xl border-border/40 hover:border-primary/20 shadow-sm hover:shadow-md hover:bg-gray-50/80 cursor-pointer active:scale-[0.995] transition-all duration-200 bg-white group flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4 sm:gap-6"
            >
                {/* Status Badge */}
                <div className="shrink-0">
                    <Badge variant="secondary" className={cn("rounded-full px-3 py-1 text-[10px] font-bold tracking-wide uppercase", statusStyles[status] || statusStyles.Ongoing)}>
                        {status}
                    </Badge>
                </div>

                {/* Main Info */}
                <div className="flex-1 min-w-0 space-y-1 pr-6 sm:pr-0">
                    <h3 className="text-lg font-bold text-foreground leading-tight truncate">
                        {title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-primary/70" />
                            <span>{deadline}</span>
                        </div>
                        <div className="flex items-center gap-1.5 hidden sm:flex">
                            <Users className="h-3.5 w-3.5 text-primary/70" />
                            <span>{registeredCount} Reg</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Shapes className="h-3.5 w-3.5 text-primary/70" />
                            <span>{category}</span>
                        </div>
                    </div>
                </div>

                {/* Right Actions / Organizer */}
                <div className="flex items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0 justify-between sm:justify-end">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs font-medium text-muted-foreground hover:text-foreground hidden sm:flex"
                        >
                            {organizerName}
                        </Button>
                        <button
                            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors absolute top-3 right-3 sm:static"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsBookmarked(!isBookmarked);
                            }}
                        >
                            <Bookmark
                                className={cn(
                                    "h-4 w-4 transition-all",
                                    isBookmarked
                                        ? "fill-primary text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            />
                        </button>
                    </div>
                    {/* View Details Button mainly for mobile logic if needed, but the whole card could be clickable */}
                </div>
            </Card>
        )
    }

    return (
        <Card
            onClick={onClick}
            className="w-full max-w-[350px] overflow-hidden rounded-[2.5rem] border-0 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer active:scale-[0.995] group bg-card relative"
        >
            {/* Image Header Area */}
            <div className="relative h-56 w-full overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Overlay with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 transition-opacity duration-300" />

                {/* Badge (Top Left) */}
                <div className="absolute top-5 left-5 z-10">
                    <Badge variant="secondary" className={cn("backdrop-blur-md border rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase transition-all duration-300", statusStyles[status] || statusStyles.Ongoing)}>
                        {status}
                    </Badge>
                </div>

                {/* Bookmark Icon (Top Right) */}
                <button
                    className="absolute top-5 right-5 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 active:scale-95 group/bookmark"
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setIsBookmarked(!isBookmarked);
                    }}
                    type="button"
                >
                    <Bookmark
                        className={cn(
                            "h-5 w-5 transition-all duration-300",
                            isBookmarked
                                ? "fill-white text-white scale-110"
                                : "text-white/90 group-hover/bookmark:scale-110 group-hover/bookmark:text-white"
                        )}
                    />
                </button>

                {/* Center Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-0 mt-4">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-3 font-sans drop-shadow-2xl transform transition-transform duration-300 group-hover:scale-105">
                        {title}
                    </h2>
                </div>
            </div>

            {/* Content Body */}
            <CardContent className="p-6 pt-5 space-y-5">
                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed font-medium">
                    {description}
                </p>

                {/* Metadata List */}
                <div className="space-y-3.5">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <Calendar className="h-4 w-4 shrink-0 text-primary/80 group-hover:text-primary transition-colors" />
                        <span className="font-medium">{deadline}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <MapPin className="h-4 w-4 shrink-0 text-primary/80 group-hover:text-primary transition-colors" />
                        <span className="truncate font-medium">{location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <Users className="h-4 w-4 shrink-0 text-primary/80 group-hover:text-primary transition-colors" />
                        <span className="font-medium">{registeredCount} registered</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <Shapes className="h-4 w-4 shrink-0 text-primary/80 group-hover:text-primary transition-colors" />
                        <span className="font-medium">{category}</span>
                    </div>
                </div>
            </CardContent>

            {/* Footer */}
            <CardFooter className="p-6 pt-0">
                <Button
                    variant="outline"
                    className="w-full rounded-2xl border-2 border-muted-foreground/10 text-muted-foreground hover:text-primary hover:border-primary/50 bg-secondary/5 hover:bg-secondary/20 h-11 font-semibold transition-all duration-300"
                >
                    {organizerName}
                </Button>
            </CardFooter>
        </Card>
    );
}
