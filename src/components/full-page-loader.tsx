"use client";

import { Trans } from "@lingui/react/macro";
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
            {/* High-tech background elements */}
            <div className="absolute inset-0 grid-bg pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-150 bg-primary/10 blur-[120px] rounded-full opacity-30 pointer-events-none" />

            {/* Random tech artifacts */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
                {/* Corner Marks */}
                <div className="absolute top-8 left-8 size-4 border-t border-l border-primary/40" />
                <div className="absolute top-8 right-8 size-4 border-t border-r border-primary/40" />
                <div className="absolute bottom-8 left-8 size-4 border-b border-l border-primary/40" />
                <div className="absolute bottom-8 right-8 size-4 border-b border-r border-primary/40" />

                {/* Floating Technical Data Blocks */}
                <div className="absolute top-[15%] left-[10%] font-mono text-[8px] text-primary/90 space-y-1">
                    <div>SEC_SECTOR: 0x4F9</div>
                    <div>LATENCY: 0.12ms</div>
                </div>
                <div className="absolute bottom-[20%] right-[12%] font-mono text-[8px] text-primary/90 text-right space-y-1">
                    <div>UPLINK_STABLE</div>
                    <div>ENCR_LEVEL_09</div>
                </div>

                {/* Vertical Scanning Line */}
                <div className="absolute inset-y-0 left-1/4 w-px bg-linear-to-b from-transparent via-primary/10 to-transparent" />
                <div className="absolute inset-y-0 right-1/4 w-px bg-linear-to-b from-transparent via-primary/10 to-transparent" />

                {/* Tiny Floating Bits */}
                <div className="absolute top-1/4 right-[15%] size-1 bg-primary/40 rounded-full animate-ping" />
                <div className="absolute bottom-1/3 left-[18%] size-1 bg-primary/40 rounded-full animate-ping [animation-delay:1s]" />

                {/* Bottom Center Telemetry */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[7px] tracking-[0.8em] text-primary/80 uppercase">
                    ApeX_Terminal_V1.0_Global_Uplink
                </div>
            </div>

            <div className="relative z-10 space-y-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-[0.2em] text-primary drop-shadow-[0_0_15px_rgba(0,242,255,0.5)]">
                    {statusText}
                </h1>
                <p className="text-muted-foreground tracking-[0.5em] uppercase text-xs md:text-sm font-light">
                    {subText}
                </p>
            </div>

            <div className="relative z-10 w-full max-w-2xl space-y-4">
                <div className="relative h-8 w-full border border-primary/40 bg-card/50 backdrop-blur-sm p-1 ">
                    <div
                        className="relative h-full bg-primary neon-glow-cyan transition-all duration-500 ease-out overflow-hidden"
                        style={{ width: `${progress}%` }}
                    >
                        {/* Technical Stripes Pattern */}
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(0,0,0,0.2)_4px,rgba(0,0,0,0.2)_6px)]" />
                        <div className="h-full w-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] animate-shimmer"></div>
                    </div>
                </div>
                <div className="flex justify-between items-center text-primary font-mono">
                    <span className="text-[10px] md:text-xs opacity-50 uppercase tracking-tighter">
                        <Trans>Gateway Connection: Secured</Trans>
                    </span>
                    <span className="text-2xl md:text-3xl">{progress}%</span>
                </div>
            </div>
        </div>
    );
}
