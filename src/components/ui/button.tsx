"use client";

import { cva, type VariantProps } from "class-variance-authority";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(0,242,255,0.2)] hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(0,242,255,0.4)]",
                destructive:
                    "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                outline:
                    "border border-primary/30 bg-background shadow-xs hover:bg-primary/10 hover:text-primary hover:border-primary/60 dark:bg-input/10 dark:hover:bg-primary/20",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-[0_0_10px_rgba(168,85,247,0.2)] hover:bg-secondary/80 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]",
                ghost: "hover:bg-primary/10 hover:text-primary active:bg-primary/20 transition-colors",
                link: "text-primary underline-offset-4 hover:underline",
                neon: "border border-primary/50 bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,242,255,0.15)] hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(0,242,255,0.35)] backdrop-blur-md",
                gateway:
                    "tech-gateway-inner tech-glow-hover text-primary shadow-[0_0_15px_rgba(0,242,255,0.1)] hover:text-white tracking-[0.1em]",
            },
            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
                lg: "h-12 text-base px-6 has-[>svg]:px-4",
                icon: "size-9",
                "icon-sm": "size-8",
                "icon-lg": "size-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

const wrapperVariants = cva("relative inline-block shrink-0", {
    variants: {
        variant: {
            default: "contents",
            destructive: "contents",
            outline: "contents",
            secondary: "contents",
            ghost: "contents",
            link: "contents",
            neon: "contents",
            gateway: "tech-gateway-wrapper",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

type ButtonProps = ButtonPrimitive.Props &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        ref?: React.RefObject<HTMLButtonElement | null>;
        wrapperClassName?: string;
    };

function Button({ className, variant, size, ref, asChild = false, wrapperClassName, children, ...props }: ButtonProps) {
    const Comp = asChild ? Slot : ButtonPrimitive;
    const isDisabled = props.disabled;

    const content = (
        <>
            {variant === "gateway" && !asChild && (
                <>
                    {/* Technical Stripes Pattern */}
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(0,0,0,0.1)_4px,rgba(0,0,0,0.1)_5px)] pointer-events-none z-0" />
                    {/* Animated Glint */}
                    {/* <div className="absolute inset-y-0 w-full bg-linear-to-r from-transparent via-primary/10 to-transparent -translate-x-full animate-[shimmer_6s_infinite] pointer-events-none z-0" /> */}
                </>
            )}
            <span
                className={cn(
                    variant === "gateway" && !asChild && "relative z-10 flex items-center justify-center gap-2",
                )}
            >
                {children}
            </span>
        </>
    );

    return (
        <div className={cn(wrapperVariants({ variant, className: wrapperClassName }))}>
            <Comp
                ref={ref}
                data-slot="button"
                className={cn(
                    buttonVariants({ variant, size, className }),
                    isDisabled && "opacity-50 pointer-events-none cursor-not-allowed",
                    variant === "gateway" && "relative overflow-hidden",
                )}
                {...props}
            >
                {variant === "gateway" && !asChild ? content : children}
            </Comp>
        </div>
    );
}

export { Button, buttonVariants };
