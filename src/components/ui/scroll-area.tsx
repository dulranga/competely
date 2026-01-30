"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "~/lib/utils";

function ScrollArea({ className, children, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
    return (
        <ScrollAreaPrimitive.Root data-slot="scroll-area" className={cn("relative", className)} {...props}>
            <ScrollAreaPrimitive.Viewport
                data-slot="scroll-area-viewport"
                className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
            >
                {children}
            </ScrollAreaPrimitive.Viewport>
            <ScrollBar />
            <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
    );
}

function ScrollBar({
    className,
    orientation = "vertical",
    ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
    return (
        <ScrollAreaPrimitive.ScrollAreaScrollbar
            data-slot="scroll-area-scrollbar"
            orientation={orientation}
            className={cn(
                "flex touch-none p-0.5 transition-all select-none hover:bg-white/3 group/scrollbar bg-transparent",
                orientation === "vertical" && "h-full w-2 border-l border-white/5",
                orientation === "horizontal" && "h-2 flex-col border-t border-white/5",
                className,
            )}
            {...props}
        >
            <ScrollAreaPrimitive.ScrollAreaThumb
                data-slot="scroll-area-thumb"
                className={cn(
                    "relative flex-1 bg-primary/20 transition-all duration-300 rounded-none",
                    "group-hover/scrollbar:bg-primary/60 group-hover/scrollbar:shadow-[0_0_15px_rgba(0,242,255,0.3)]",
                    // Micro-accents at the ends of the thumb for a technical look
                    "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-primary/50",
                    "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-primary/50",
                    orientation === "vertical" ? "w-full" : "h-full",
                )}
            />
        </ScrollAreaPrimitive.ScrollAreaScrollbar>
    );
}

export { ScrollArea, ScrollBar };
