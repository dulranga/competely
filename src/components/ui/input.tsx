import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const inputVariants = cva(
    "file:text-foreground placeholder:text-muted-foreground/60 border-input flex w-full min-w-0 rounded-md border bg-input-background shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default: "px-4 py-4 text-base",
                sm: "px-3 py-2 text-sm rounded-md",
                lg: "px-5 py-5 text-lg rounded-lg",
                ghost: "bg-transparent border-none shadow-none px-0",
            },
            state: {
                normal: "",
                error: "border-destructive focus-visible:ring-destructive/50",
                success: "border-green-500 focus-visible:ring-green-500/50",
            },
        },
        defaultVariants: {
            variant: "default",
            state: "normal",
        },
    },
);

export interface InputProps extends React.ComponentProps<"input">, VariantProps<typeof inputVariants> {}

function Input({ className, disabled, variant, state, type, ...props }: InputProps) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(inputVariants({ variant, state }), { "opacity-50 pointer-events-none": disabled }, className)}
            {...props}
        />
    );
}

export { Input };
