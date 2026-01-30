"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";
import { useSound } from "~/hooks/use-sound";

import { cn, mergeRefs } from "~/lib/utils";

const RadioGroup = React.forwardRef<
    React.ComponentRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(function RadioGroup({ className, ...props }, ref) {
    return (
        <RadioGroupPrimitive.Root
            data-slot="radio-group"
            className={cn("grid gap-3", className)}
            {...props}
            ref={ref}
        />
    );
});
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef<
    React.ComponentRef<typeof RadioGroupPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(function RadioGroupItem({ className, ...props }, ref) {
    const soundRef = useSound<HTMLButtonElement>(["onClick"]);
    return (
        <RadioGroupPrimitive.Item
            ref={mergeRefs(ref, soundRef)}
            data-slot="radio-group-item"
            className={cn(
                "border-input text-primary bg-card/40 aspect-square size-4 shrink-0 rounded-none border transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50",
                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "data-[state=checked]:border-primary",
                "aria-invalid:border-destructive/60 aria-invalid:bg-destructive/10",
                className,
            )}
            {...props}
        >
            <RadioGroupPrimitive.Indicator
                data-slot="radio-group-indicator"
                className="relative flex items-center justify-center"
            >
                <div className="bg-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    );
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
