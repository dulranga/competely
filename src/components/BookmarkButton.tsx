"use client";

import { Bookmark } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { cn } from "~/lib/utils";
import { toggleBookmarkAction } from "~/app/(authenticated)/bookmarks/actions";

interface BookmarkButtonProps {
    competitionId: string;
    initialIsBookmarked?: boolean;
    className?: string;
    size?: "sm" | "md" | "lg";
}

const sizeStyles = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
};

export function BookmarkButton({
    competitionId,
    initialIsBookmarked = false,
    className,
    size = "md",
}: BookmarkButtonProps) {
    const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
    const [isPending, startTransition] = useTransition();

    const handleClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        if (!competitionId) {
            toast.error("Competition ID is missing");
            return;
        }

        const newState = !isBookmarked;
        setIsBookmarked(newState);

        startTransition(async () => {
            try {
                const result = await toggleBookmarkAction(competitionId);
                if (result.success) {
                    setIsBookmarked(result.isBookmarked ?? newState);
                    toast.success(result.isBookmarked ? "Bookmarked!" : "Bookmark removed");
                } else {
                    setIsBookmarked(!newState);
                    toast.error(result.error || "Failed to update bookmark");
                }
            } catch (error) {
                setIsBookmarked(!newState);
                toast.error("Failed to update bookmark");
            }
        });
    };

    return (
        <button
            className={cn(
                "rounded-full transition-all duration-300 active:scale-95 p-2",
                "bg-white/10 hover:bg-white/20 backdrop-blur-sm",
                className
            )}
            onClick={handleClick}
            disabled={isPending}
            type="button"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
            <Bookmark
                className={cn(
                    "transition-all",
                    sizeStyles[size],
                    isBookmarked
                        ? "fill-current text-white"
                        : "text-white/90 hover:scale-110 hover:text-white"
                )}
            />
        </button>
    );
}
