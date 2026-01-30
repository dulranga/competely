import { cn } from "~/lib/utils";

interface ScrollIndicatorProps {
  className?: string;
}

export function ScrollIndicator({ className }: ScrollIndicatorProps) {
  return (
    <div className={cn("animate-bounce", className)}>
      <div className="w-6 h-10 border-2 border-primary/30 rounded-full mx-auto flex items-start justify-center p-1">
        <div className="w-1.5 h-2.5 bg-primary rounded-full" />
      </div>
    </div>
  );
}
