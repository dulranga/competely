import { cn } from "~/lib/utils";
import { TimelineCard } from "~/components/timeline/TimelineCard";

interface TimelineSectionProps {
    events: any[];
}

export function TimelineSection({ events }: TimelineSectionProps) {
    if (!events || events.length === 0) {
        return (
            <section className="py-16 bg-muted/30">
                <div className="max-w-[1500px] mx-auto px-4 md:px-8 text-center text-muted-foreground">
                    <h2 className="text-4xl font-black text-foreground mb-2 uppercase">Timeline</h2>
                    <p className="mb-4">No timeline events scheduled yet.</p>
                    {/* Debug info - hidden in production ideally, but helpful now */}
                    <div className="text-xs text-left bg-gray-100 p-4 rounded overflow-auto max-h-40 hidden">
                        DEBUG: Events is empty or null.
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-muted/30">
            <div className="max-w-[1500px] mx-auto px-4 md:px-8">
                <h2 className="text-4xl font-black text-foreground mb-2 uppercase">Timeline</h2>
                <p className="text-lg text-muted-foreground mb-12">Know what's happening and when.</p>

                <div className="w-full">
                    <div className="relative w-full overflow-x-auto pb-12 pt-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="flex px-4 md:px-8 w-fit mx-auto pb-8 relative pt-4 [--pl-offset:1rem] md:[--pl-offset:2rem]">
                            {/* Horizontal Line (Background) */}
                            <div className="absolute top-[180px] left-0 w-full h-1 bg-gray-200 z-0" />

                            {/* Active Line Segment (Dynamic Progress) */}
                            {(() => {
                                const now = new Date().getTime();
                                let lastPastIndex = -1;

                                for (let i = 0; i < events.length; i++) {
                                    const start = events[i].startDatetime ? new Date(events[i].startDatetime).getTime() : 0;
                                    if (start <= now && start > 0) {
                                        lastPastIndex = i;
                                    } else {
                                        break;
                                    }
                                }

                                let progressRatio = 0;
                                if (lastPastIndex >= 0 && lastPastIndex < events.length - 1) {
                                    const pastEventTime = new Date(events[lastPastIndex].startDatetime).getTime();
                                    const nextEventTime = new Date(events[lastPastIndex + 1].startDatetime).getTime();
                                    const totalDuration = nextEventTime - pastEventTime;
                                    const elapsed = now - pastEventTime;

                                    if (totalDuration > 0) {
                                        progressRatio = Math.min(1, Math.max(0, elapsed / totalDuration));
                                    }
                                }

                                let totalProgressUnits = 0;
                                if (lastPastIndex === -1) {
                                    totalProgressUnits = 0;
                                } else {
                                    totalProgressUnits = lastPastIndex + progressRatio;
                                }

                                const calculatedWidth = `calc(var(--pl-offset) + 6rem + (15rem * ${Math.max(0, totalProgressUnits)}))`;

                                return (
                                    <div
                                        className="absolute top-[180px] left-0 h-1 bg-green-500 z-0 transition-all duration-1000 ease-out"
                                        style={{ width: calculatedWidth }}
                                    />
                                );
                            })()}

                            {events.map((event) => {
                                const isActive = event.status === "active";
                                return (
                                    <div key={event.id} className="relative flex flex-col items-center mr-12 last:mr-0 group w-48">
                                        {/* Content Card */}
                                        <TimelineCard
                                            variant="home"
                                            data={{
                                                competitionName: event.roundName, // Showing round name as requested
                                                eventName: event.eventName,
                                                status: event.status,
                                                startDatetime: event.startDatetime,
                                            }}
                                            className="mb-8"
                                        />

                                        {/* Dot on Line */}
                                        <div className={cn(
                                            "z-10 w-6 h-6 rounded-full border-4 bg-white transition-all duration-300 absolute top-[170px]",
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
            </div>
        </section>
    );
}
