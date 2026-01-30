import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const inputVariants = cva(
    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-card/40 border-input h-12 w-full min-w-0 rounded-none border-b bg-transparent px-1 py-2 text-base shadow-none transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm font-mono focus-visible:border-primary/50 focus-visible:bg-primary/2 aria-invalid:border-destructive/60 aria-invalid:bg-destructive/5",
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
