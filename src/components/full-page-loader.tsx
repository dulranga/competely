"use client";

import { cn } from "~/lib/utils";

interface FullPageLoaderProps {
  progress?: number;
  statusText?: string;
  subText?: string;
  className?: string;
}

/**
 * FullPageLoader component
 * Displays a high-tech "Gateway" style loading screen with Matrix-like aesthetics.
 */
export function FullPageLoader({
  progress = 72,
  statusText = "SYSTEM INITIALIZATION",
  subText = "MODULE LOADING: ERP PLATFORMS",
  className,
}: FullPageLoaderProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 min-h-screen flex flex-col items-center justify-center p-4 space-y-12 overflow-hidden w-full z-120 bg-background ",
        className,
      )}
    >
      loading
    </div>
  );
}
