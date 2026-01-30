import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/lib/utils";

interface TechBorderProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    asChild?: boolean;
}

/**
 * A component that adds a technical, glowing border effect with a gradient mask.
 * This replaces the .conic-gradient-border CSS class.
 *
 * It uses a before pseudo-element to simulate a gradient border that respects border-radius.
 */
export const TechBorder = React.forwardRef<HTMLDivElement, TechBorderProps>(
    ({ children, className, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "div";

        return (
            <Comp
                ref={ref}
                className={cn(
                    "relative overflow-hidden",
                    // The "border" effect is created by this pseudo-element simulation
                    "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:p-0.5",
                    "before:bg-[linear-gradient(to_bottom,var(--primary),transparent_40%,transparent_60%,var(--secondary))]",
                    "before:opacity-30 before:transition-opacity before:duration-500",
                    // Explicit cross-browser masking: only shows the 1px padding area (the border)
                    "before:mask-[linear-gradient(#fff_0_0),linear-gradient(#fff_0_0)]",
                    "before:[mask-clip:content-box,border-box]",
                    "before:mask-exclude before:[-webkit-mask-composite:xor]",
                    // Default hover effect if used within a group
                    "group-hover/border:before:opacity-60",
                    className,
                )}
                {...props}
            >
                {children}
            </Comp>
        );
    },
);

TechBorder.displayName = "TechBorder";
