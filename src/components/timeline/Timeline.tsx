import { cn } from "~/lib/utils";
import { TimelineCard } from "~/components/timeline/TimelineCard";
import type { TimelineEventDef } from "~/components/timeline/VerticalTimeline";

interface TimelineProps {
    events: TimelineEventDef[];
}

export function Timeline({ events }: TimelineProps) {
    if (!events.length) {
        return (
            <div className="w-full text-center py-12 text-muted-foreground bg-white/50 rounded-2xl border border-dashed border-gray-200">
                <p>No upcoming events found on your timeline.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="relative w-full overflow-x-auto pb-12 pt-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="flex px-4 md:px-8 w-fit mx-auto pb-8 relative pt-4 [--pl-offset:1rem] md:[--pl-offset:2rem]">
                    {/* Horizontal Line (Background) */}
                    <div className="absolute top-[180px] left-0 w-full h-1 bg-gray-200 z-0" />

                    {/* Active Line Segment (Dynamic Progress) */}
                    {(() => {
                        const now = new Date().getTime();
                        let lastPastIndex = -1;

                        // Find the last event that has started
                        for (let i = 0; i < events.length; i++) {
                            const start = events[i].startDatetime.getTime();
                            if (start <= now) {
                                lastPastIndex = i;
                            } else {
                                break;
                            }
                        }

                        let progressRatio = 0;
                        if (lastPastIndex >= 0 && lastPastIndex < events.length - 1) {
                            const pastEventTime = events[lastPastIndex].startDatetime.getTime();
                            const nextEventTime = events[lastPastIndex + 1].startDatetime.getTime();
                            const totalDuration = nextEventTime - pastEventTime;
                            const elapsed = now - pastEventTime;

                            if (totalDuration > 0) {
                                progressRatio = Math.min(1, Math.max(0, elapsed / totalDuration));
                            }
                        } else if (lastPastIndex === events.length - 1) {
                            // All events past
                            progressRatio = 0; // Stays at the last dot
                        }

                        // Total units = events fully passed (index + 1? No, index is 0-based position)
                        // If index 0 is past, we want line to go to 0 + ratio to 1.
                        // So base units = lastPastIndex.
                        // Wait. 
                        // If 0 events past (lastPastIndex = -1), width should be 0? 
                        // Or start at the first dot? Usually start at 0 progress (left of screen? or first dot?)
                        // "Color it up the current date".
                        // If no events started, line should be at "start"? 
                        // So we should project BEFORE the first event?
                        // Or just show nothing/up to first dot?
                        // Let's stick to: line connects dots.
                        // If 0 items past: line is at first dot? Or 0 length?
                        // Let's assume starts at first dot (index 0).

                        // Refined Logic:
                        // We act as if there is a "Start" at index 0? No.
                        // We highlight the path traversed.
                        // If we are between Event A (idx 0) and Event B (idx 1). 
                        // lastPastIndex = 0. ratio = 0.5.
                        // Length should cover distance to A, plus 0.5 distance to B.

                        // Calculation:
                        // Card Center offset = 6rem.
                        // Card Stride = 15rem.
                        // Distance to Event `i` center = offset + (i * stride).

                        // If lastPastIndex = 0. We want length = (offset + 0*stride) + (ratio * stride).
                        // width = offset + (lastPastIndex * stride) + (ratio * stride).
                        // width = offset + stride * (lastPastIndex + ratio).

                        // Edge case: lastPastIndex = -1 (Before 1st event).
                        // width = offset + stride * (-1 + ratio). 
                        // Ratio? Time before 1st event? undefined.
                        // Let's default to width = 0 or just up to first dot if we want to show "ready".
                        // Let's default to 0 progress if before first event.

                        let totalProgressUnits = 0;
                        if (lastPastIndex === -1) {
                            totalProgressUnits = 0; // Starts at first dot? No, that would be offset.
                            // If we want it to start at the first dot, use -1? 
                            // calculated width = offset + 15rem * (-1) = offset - 15rem => negative.
                            // We probably want it to imply "start of time".
                            // Let's just set width to offset (start at first dot).
                            // But usually timelines fill from left.
                            // Let's set it to 6rem (offset) minimum?
                        } else {
                            totalProgressUnits = lastPastIndex + progressRatio;
                        }

                        // If lastPastIndex = -1, we might want it to start at the first dot.
                        // Let's assume minimum width is to the first dot (6rem).
                        // Actually, if we are strictly calculating time, maybe dynamic.
                        // But simplification:

                        const calculatedWidth = `calc(var(--pl-offset) + 6rem + (15rem * ${Math.max(0, totalProgressUnits)}))`;

                        return (
                            <div
                                className="absolute top-[180px] left-0 h-1 bg-green-500 z-0 transition-all duration-1000 ease-out"
                                style={{ width: calculatedWidth }}
                            />
                        );
                    })()}

                    {/* Active Line Segment (Dynamic based on active events could be complex, keeping simple for now or matching logic) */}
                    {/* For now, let's just show the gray line as the base. If we want a progress bar, we need to calculate % */}

                    {events.map((event, index) => {
                        const isActive = event.status === "active";
                        return (
                            <div key={event.id} className="relative flex flex-col items-center mr-12 last:mr-0 group w-48">

                                {/* Content Card */}
                                <TimelineCard
                                    variant="home"
                                    data={{
                                        competitionName: event.competitionName,
                                        eventName: event.eventName,
                                        status: event.status,
                                        startDatetime: event.startDatetime,
                                    }}
                                    className="mb-8"
                                />

                                {/* Dot on Line */}
                                <div className={cn(
                                    "z-10 w-6 h-6 rounded-full border-4 bg-white transition-all duration-300 absolute top-[170px]",
                                    // top-[170px] aligns with the line at top-[180px] (180 - 6/2 - 4/2 boundary? No, center is 180+2 = 182.
                                    // Dot is 24px height. Center is 12px.
                                    // Line top 180, height 4. Center 182.
                                    // Dot top should be 182 - 12 = 170. Correct.
                                    isActive ? "border-green-500 scale-125" : "border-gray-300 group-hover:border-primary"
                                )} />

                                {/* Status Label below line */}
                                <div className={cn(
                                    "mt-8 text-[10px] font-bold tracking-widest uppercase transition-colors absolute top-[190px]",
                                    isActive ? "text-green-600" : "text-gray-400"
                                )}>
                                    {isActive ? "Active" : "Upcoming"}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
