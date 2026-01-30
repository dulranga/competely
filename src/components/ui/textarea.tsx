"use client";

import * as React from "react";
import { useSound } from "~/hooks/use-sound";

import { cn, mergeRefs } from "~/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(function Textarea(
    { className, ...props },
    ref,
) {
    const soundRef = useSound<HTMLTextAreaElement>(["onClick", "onFocus"]);
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-card/40 border-input flex min-h-32 w-full rounded-none border bg-transparent px-3 py-2 text-base font-mono shadow-none transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-primary/50 focus-visible:bg-primary/2",
                "aria-invalid:border-destructive/60 aria-invalid:bg-destructive/5",
                className,
            )}
            {...props}
            ref={mergeRefs(ref, soundRef)}
        />
    );
});
Textarea.displayName = "Textarea";

export { Textarea };
