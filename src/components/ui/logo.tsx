import { cn } from "~/lib/utils";

interface LogoProps {
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
    animated?: boolean;
}

const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl md:text-8xl"
};

export function Logo({ className, size = "md", animated = false }: LogoProps) {
    return (
        <span className={cn(
            "font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
            animated && "animate-shimmer bg-[length:200%_100%]",
            sizeClasses[size],
            className
        )}>
            Competely
        </span>
    );
}
